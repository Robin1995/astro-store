import { db, User, Role, Product, ProductImage } from "astro:db";
import { v4 as UUID } from "uuid";
import bcrypt from "bcryptjs";
import { seedProducts } from "./seed-data";
export default async function () {
  const roles = [
    { id: "admin", name: "Administrador" },
    { id: "user", name: "Usuario de sistema" },
  ];

  const jhonDoe = {
    id: "ABC-123-JHON", //UUID(),
    name: "Jhon Doe",
    email: "jhon.doe@yopmail.com",
    password: bcrypt.hashSync("123456"),
    role: "admin",
  };

  const janeDoe = {
    id: "ABC-123-JANE", //UUID(),
    name: "Jane Doe",
    email: "jane.doe@yopmail.com",
    password: bcrypt.hashSync("123456"),
    role: "user",
  };

  await db.insert(Role).values(roles);
  await db.insert(User).values([jhonDoe, janeDoe]);

  const queries: any = [];

  seedProducts.forEach((p) => {
    const product = {
      id: UUID(),
      description: p.description,
      stock: p.stock,
      price: p.price,
      sizes: p.sizes.join(","),
      slug: p.slug,
      type: p.type,
      tags: p.tags.join(","),
      title: p.title,
      gender: p.gender,
      user: jhonDoe.id,
    };

    queries.push(db.insert(Product).values(product));
    p.images.forEach((img) => {
      const image = {
        id: UUID(),
        image: img,
        productId: product.id,
      };
      queries.push(db.insert(ProductImage).values(image));
    });
  });
  await db.batch(queries);
}
