'use client'

import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import axios from 'axios';
import * as z from 'zod'
import toast from 'react-hot-toast';


const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const reviewSchema = z.object({
    reviewerName: z.string().min(1, 'Reviewer Name is required'),
    rating: z.number().min(1, 'Rating is required').max(5, 'Rating is required'),
    comment: z.string().min(1, 'Comment must be at least 1 character'),
    productId: z.string()
});


export const ProductReviewForm: React.FC = () => {
    const param = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState({
        reviewerName: '',
        rating: '',
        comment: '',
        productId: param.productId
    });
    const [errors, setErrors] = useState({
        reviewerName: '',
        rating: '',
        comment: '',
        productId: param.productId
    });


    const handleChange = (e: any) => {
        const value = e.target.name === 'rating' ? parseInt(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        setErrors({ ...errors, [e.target.name]: '' });
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {

            reviewSchema.parse(formData);
            const response = await axios.post(`${URL}/reviews`, formData);
            router.push(`/product/${param.productId}`)
            router.refresh()
            toast.success('Review Submitted.');
            return response
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(error.errors.reduce((acc: any, cur: any) => {
                    acc[cur.path[0]] = cur.message;
                    return acc;
                }, {}));
            } else {
                console.error('Error submitting form:', error);
            }

            toast.error('Review submission unsuccessful.');
        }

    };


    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[999]">
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-3/4 max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">Product Review</h2>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label htmlFor="reviewerName" className="block text-sm font-bold text-gray-700 mb-2">
                            Reviewer Name
                        </label>
                        <input
                            id="reviewerName"
                            name="reviewerName"
                            type="text"
                            value={formData.reviewerName}
                            onChange={handleChange}
                            className="border rounded w-full p-2 text-gray-700 focus:outline-none focus:shadow-outline"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-sm font-bold text-gray-700 mb-2">
                            Rating
                        </label>
                        <select
                            id='rating'
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="border rounded w-full p-2 text-gray-700 focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select rating</option>
                            <option value={5}>5 - Excellent</option>
                            <option value={4}>4 - Good</option>
                            <option value={3}>3 - Average</option>
                            <option value={2}>2 - Below Average</option>
                            <option value={1}>1 - Poor</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-bold text-gray-700 mb-2">
                            Your Comment
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            rows={4}
                            className="border rounded w-full p-2 text-gray-700 focus:outline-none focus:shadow-outline"
                            placeholder="Write your comment here"
                        >
                        </textarea>
                    </div>
                    <div className='space-x-4'>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit Review
                        </button>
                        <button onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </div>
                    {errors.reviewerName && <p className="text-red-500">{errors.reviewerName}</p>}
                    {errors.rating && <p className="text-red-500">Rating is required</p>}
                    {errors.comment && <p className="text-red-500">{errors.comment}</p>}
                </form>
            </div>
        </div>
    )
}

