import { ProductReviewForm } from '@/app/(routes)/product/[productId]/review/components/product-review-form'
import { Container } from '@/components/ui/container'
import React from 'react'

function ReviewPage() {
    return (
        <div>
            <Container>
                <ProductReviewForm />
            </Container>
        </div>
    )
}

export default ReviewPage