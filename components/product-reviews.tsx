import React from 'react'
import { Product } from '@/types';



interface ProductReviewsProps {
    title: string;
    data: Product;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
    title,
    data,
}) => {
    const sortedReviews = data.reviews.slice().sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );


    return (
        <div className='space-y-2'>
            <h3 className='font-semibold text-xl'>{title}</h3>
            {sortedReviews.map((review) => (
                <div key={review.id} className="bg-white cursor-pointer rounded-lg border p-2 space-y-2">
                    <div className="flex items-center space-x-2">
                        <div className="font-medium text-sm">{review.reviewerName}</div>
                    </div>

                    <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                            <svg key={index} className={`h-4 w-4 ${index < Number(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.602-.921 1.902 0l1.286 3.942h4.163c.97 0 1.37 1.24.588 1.817l-3.362 2.451 1.286 3.942c.3.921-.756 1.68-1.588 1.157l-3.362-2.451-3.362 2.451c-.832.523-1.888-.236-1.588-1.157l1.286-3.942-3.362-2.451c-.782-.577-.382-1.817.588-1.817h4.163l1.286-3.942z" />
                            </svg>
                        ))}
                    </div>

                    <p className="text-sm text-gray-600">
                        {review.comment}
                    </p>

                    <div className="text-xs text-gray-500">
                        Posted on: {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZoneName: 'short'
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

