'use client';

import { useState } from 'react';
import { Review } from '@/types';
import Link from 'next/link';

const ReviewList = ({
    productId,
    userId,
    productSlug,
}: {
    productId: string;
    userId: string;
    productSlug: string;
}) => {

    console.log(productId, userId, productSlug);
    const [reviews, setReviews] = useState<Review[]>([]);

    return (
        <div className='space-y-4'>
            {reviews.length === 0 && <div>No reviews yet</div>}
            {userId ? (
                <>{/* REVIEW FORM HERE */}</>
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
            <div className='flex flex-col gap-3'>{/* REVIEWS HERE */}</div>
        </div>
    );
};

export default ReviewList;