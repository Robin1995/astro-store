import type { CartItem } from "@/interfaces";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { db, eq, inArray, Product, ProductImage } from "astro:db";

export const loadProductsFromCart = defineAction({
  accept: "json",
  input: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
      size: z.string(),
    })
  ),
  handler: async (cart, { cookies }) => {
    const productIds = cart.map((item) => item.productId);
    console.log(productIds);

    const dbProducts = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .where(inArray(Product.id, productIds));


    if (!cart.length) {
      return [];
    }

    return cart.map((item) => {
      const dbProduct = dbProducts.find((p) => p.Product.id === item.productId);

      if (!dbProduct) {
        throw new Error(`Product with id ${item.productId} not found`);
      }
      const { title, price, slug } = dbProduct.Product;
      const image = dbProduct.ProductImage.image;
      return {
        productId: item.productId,
        title,
        price,
        size: item.size,
        quantity: item.quantity,
        image: image.startsWith("http")
          ? image
          : `${import.meta.env.PUBLIC_URL}/images/products/${image}`,
        slug
      };
    });
  },
});
