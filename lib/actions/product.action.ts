"use server";
import { prisma } from '@/db/prisma';
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// Get latest products
export const getLatestProducts = async () => {
  const products = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });
  const payload = convertToPlainObject(products);
  return payload.map((product) => {
    return {
      ...product,
      price: Number(product.price),
    }
  })
};

// Get single product by slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}