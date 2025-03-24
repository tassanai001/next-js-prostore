'use client';

import { useEffect, useState } from 'react';
import { Review } from '@/types';
import Link from 'next/link';
import ReviewForm from './review-form';
import { getReviews } from '@/lib/actions/review.actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import Rating from '@/components/shared/product/rating';

const ReviewList = ({
    productId,
    userId,
    productSlug,
}: {
    productId: string;
    userId: string;
    productSlug: string;
}) => {

    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        /// Load reviews from the database
        const loadReviews = async () => {
            const res = await getReviews({ productId });
            setReviews(res.data);
        };
        loadReviews();
    }, [productId]);

    // Reload reviews when a review is submitted
    const reload = async () => {
        console.log('review submitted');
    };

    return (
        <div className='space-y-4'>
            {reviews.length === 0 && <div>No reviews yet</div>}
            {userId ? (
                <ReviewForm
                    userId={userId}
                    productId={productId}
                    onReviewSubmitted={() => reload()}
                />
            ) : (
                <div>
                    Please{' '}
                    <Link
                        className='text-primary px-2'
                        href={`/api/auth/signin?callbackUrl=/product/${productSlug}`}
                    >
                        sign in
                    </Link>{' '}
                    to write a review
                </div>
            )}
            <div className='flex flex-col gap-3'>{
                reviews.map((review) => (
                    <Card key={review.id}>
                        <CardHeader>
                            <div className='flex-between'>
                                <CardTitle>{review.title}</CardTitle>
                            </div>
                            <CardDescription>{review.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='flex space-x-4 text-sm text-muted-foreground'>
                                <Rating value={review.rating} />
                                <div className='flex items-center'>
                                    <User className='mr-1 h-3 w-3' />
                                    {review.user ? review.user.name : 'Deleted User'}
                                </div>
                                <div className='flex items-center'>
                                    <Calendar className='mr-1 h-3 w-3' />
                                    {formatDateTime(review.createdAt).dateTime}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }</div>
        </div>
    );
};

export default ReviewList;