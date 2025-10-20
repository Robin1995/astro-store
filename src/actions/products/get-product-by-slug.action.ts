import type { ProductWithImages } from "@/interfaces";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, Product, ProductImage } from "astro:db";

const newProduct: Partial<ProductWithImages> = {
  id: "",
  stock: 10,
  slug: "nuevo-producto",
  price: 100,
  sizes: "S,M",
  type: "shirts",
  tags: "shirt,t-shirt",
  title: "Nuevo producto",
  description: "Nueva descripción del producto",
  gender: "men",
};

export const getProductBySlug = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (slug) => {
    if (slug === "new") {
      return { product: newProduct, images: [] };
    }

    const [product] = await db
      .select()
      .from(Product)
      .where(eq(Product.slug, slug));

    if (!product) {
      throw new Error("Product not found");
    }
    const images = await db
      .select()
      .from(ProductImage)
      .where(eq(ProductImage.productId, product.id));

    return { product, images: images };
  },
});
