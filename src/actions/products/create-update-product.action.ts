import { ImageUpload } from "@/utils/image-upload";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, Product, ProductImage } from "astro:db";
import { promise } from "astro:schema";
import { getSession } from "auth-astro/server";
import { v4 as UUID } from "uuid";

const MAX_FILE_SIZE = 5_000_000; // 5MB
const ACCEPTERD_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg",
];

export const createUpdateProduct = defineAction({
  accept: "form",
  input: z.object({
    id: z.string().optional(),
    stock: z.number(),
    slug: z.string(),
    price: z.number(),
    sizes: z.string(),
    type: z.string(),
    tags: z.string(),
    title: z.string(),
    description: z.string(),
    gender: z.string(),

    imageFiles: z
      .array(
        z
          .instanceof(File)
          .refine((file) => file.size <= MAX_FILE_SIZE, "Max image size 5MB")
          .refine((file) => {
            //permite archivos vacios
            if (file.size === 0) return true;

            return (
              ACCEPTERD_IMAGE_TYPES.includes(file.type),
              `Supported image files: ${ACCEPTERD_IMAGE_TYPES.join(", ")}`
            );
          })
      )
      .optional(),
  }),
  handler: async (form, { request }) => {
    const session = await getSession(request);
    const user = session?.user;

    if (!user || !user.id) {
      throw new Error("Unauthorized");
    }
    const { id = UUID(), imageFiles, ...rest } = form;

    rest.slug = rest.slug.toLowerCase().replaceAll(" ", "-").trim();

    const product = { id, user: user.id, ...rest };

    const queries: any = [];
    //create/update product
    if (!form.id) {
      queries.push(db.insert(Product).values(product));
    } else {
      queries.push(db.update(Product).set(product).where(eq(Product.id, id)));
    }
    let secureUrls: any = [];
    if (
      form.imageFiles &&
      form.imageFiles.length &&
      form.imageFiles[0].size > 0
    ) {
      secureUrls = await Promise.all(
        form.imageFiles.map(async (imageFile) =>
          ImageUpload.uploadImage(imageFile)
        )
      );
    }

    secureUrls.forEach((imageUrl: string) => {
      const imageObject = { id: UUID(), productId: id, image: imageUrl };
      queries.push(db.insert(ProductImage).values(imageObject));
    });

    await db.batch(queries);
    return product;
  },
});
