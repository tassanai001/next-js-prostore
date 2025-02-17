'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { productDefaultValues } from '@/lib/constants';
import { insertProductSchema, updateProductSchema } from '@/lib/validator';
import { ControllerRenderProps, SubmitHandler } from 'react-hook-form';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import slugify from 'slugify';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createProduct, updateProduct } from '@/lib/actions/product.action';

const ProductForm = ({
    type,
    product,
    productId,
}: {
    type: 'Create' | 'Update';
    product?: Product;
    productId?: string;
}) => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof insertProductSchema>>({
        resolver:
            type === 'Update'
                ? zodResolver(updateProductSchema)
                : zodResolver(insertProductSchema),
        defaultValues: product && type === 'Update' ? product : productDefaultValues,
    });

    // Handle form submit
    const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
        values
    ) => {
        if (type === 'Create') {
            const res = await createProduct(values);

            if (!res.success) {
                toast({
                    variant: 'destructive',
                    description: res.message,
                });
            } else {
                toast({
                    description: res.message,
                });
                router.push(`/admin/products`);
            }
        }
        if (type === 'Update') {
            if (!productId) {
                router.push(`/admin/products`);
                return;
            }

            const res = await updateProduct({ ...values, id: productId });

            if (!res.success) {
                toast({
                    variant: 'destructive',
                    description: res.message,
                });
            } else {
                router.push(`/admin/products`);
            }
        }
    };

    return (
        <Form {...form}>
            <form
                method='post'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'>
                <div className='flex flex-col gap-5 md:flex-row'>
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'name'>;
                        }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter product name' {...field}
                                        onClick={() => {
                                            form.setValue('slug', slugify(form.getValues('name'), { lower: true }));
                                        }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Slug */}
                    <FormField
                        control={form.control}
                        name='slug'
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'slug'>;
                        }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <Input
                                            placeholder='Enter product slug'
                                            className='pl-8'
                                            {...field}
                                        />
                                        <Button
                                            type='button'
                                            className='bg-gray-500 text-white px-4 py-1 mt-2 hover:bg-gray-600'
                                            onClick={() => {
                                                form.setValue('slug', slugify(form.getValues('name'), { lower: true }));
                                            }}
                                        >
                                            Generate
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5 md:flex-row'>
                    {/* Category */}
                    <FormField
                        control={form.control}
                        name='category'
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchema>,
                                'category'
                            >;
                        }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter category' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Brand */}
                    <FormField
                        control={form.control}
                        name='brand'
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchema>,
                                'brand'
                            >;
                        }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Brand</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter product brand' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5 md:flex-row'>
                    {/* Price */}
                    <FormField
                        control={form.control}
                        name='price'
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchema>,
                                'price'
                            >;
                        }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter product price' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Stock */}
                    <FormField
                        control={form.control}
                        name='stock'
                        render={({
                            field,
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchema>,
                                'stock'
                            >;
                        }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='Enter product stock' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='upload-field flex flex-col gap-5 md:flex-row'>
                    {/* Images */}
                </div>
                <div className='upload-field'>{/* Is Featured */}</div>
                <FormField
                    control={form.control}
                    name='description'
                    render={({
                        field,
                    }: {
                        field: ControllerRenderProps<
                            z.infer<typeof insertProductSchema>,
                            'description'
                        >;
                    }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Enter product description'
                                    className='resize-none'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button type='submit' size='lg' disabled={form.formState.isSubmitting} className='button col-span-2 w-full'>
                        {form.formState.isSubmitting ? "Submitting..." : `${type} Product`}
                    </Button></div>
            </form>
        </Form>
    );
};

export default ProductForm;