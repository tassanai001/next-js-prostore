'use client';

import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { Loader, Minus, Plus } from 'lucide-react';
import { Cart } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const CartTable = ({ cart }: { cart?: Cart }) => {

    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    return (
        <>
            <h1 className='py-4 h2-bold'>Shopping Cart</h1>
            {!cart || cart.items.length === 0 ? (
                <div>
                    Cart is empty. <Link href='/'>Go shopping</Link>
                </div>
            ) : (
                <div className='grid md:grid-cols-4 md:gap-5'>
                    <div className='overflow-x-auto md:col-span-3'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead className='text-center'>Quantity</TableHead>
                                    <TableHead className='text-right'>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.items.map((item) => (
                                    <TableRow key={item.slug}>
                                        <TableCell>
                                            <Link href={`/product/${item.slug}`} className='flex items-center'>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={50}
                                                    height={50}
                                                ></Image>
                                                <span className='px-2'>{item.name}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className='flex-center gap-2'>
                                            <Button
                                                disabled={isPending}
                                                variant='outline'
                                                type='button'
                                                onClick={() =>
                                                    startTransition(async () => {
                                                        const res = await removeItemFromCart(item.productId);
                                                        if (!res.success) {
                                                            toast({
                                                                variant: 'destructive',
                                                                description: res.message,
                                                            });
                                                        }
                                                    })
                                                }
                                            >
                                                {isPending ? (
                                                    <Loader className='w-4 h-4  animate-spin' />
                                                ) : (
                                                    <Minus className='w-4 h-4' />
                                                )}
                                            </Button>
                                            <span>{item.qty}</span>
                                            <Button
                                                disabled={isPending}
                                                variant='outline'
                                                type='button'
                                                onClick={() =>
                                                    startTransition(async () => {
                                                        const res = await addItemToCart(item);
                                                        if (!res.success) {
                                                            toast({
                                                                variant: 'destructive',
                                                                description: res.message,
                                                            });
                                                        }
                                                    })
                                                }
                                            >
                                                {isPending ? (
                                                    <Loader className='w-4 h-4  animate-spin' />
                                                ) : (
                                                    <Plus className='w-4 h-4' />
                                                )}
                                            </Button>
                                        </TableCell>
                                        <TableCell className='text-right'>${item.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartTable;