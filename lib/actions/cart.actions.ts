'use server';

import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { formatError } from '../utils';
import { prisma } from '@/db/prisma';
import { CartItem } from '@/types';
import { convertToPlainObject } from '../utils';
import { cartItemSchema } from '../validator';

export async function addItemToCart(data: CartItem) {
  try {
    // Check for session cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart Session not found');

    // Get session and user ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
    // Get cart from database
    const cart = await getMyCart();
    // Parse and validate submitted item data
    const item = cartItemSchema.parse(data);
    // Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error('Product not found');

    // Testing
    console.log({
      'Session Cart ID': sessionCartId,
      'User ID': userId,
      'Item Requested': item,
      'Product Found': product,
      cart: cart,
    });

    return {
      success: true,
      message: 'Testing Cart',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export async function getMyCart() {
  // Check for session cart cookie
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) return undefined;

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert Decimal values to strings
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}