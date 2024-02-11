interface CartItemInfoProps {
    product: Record<string, any>;
}

export const CartItemInfo: React.FC<CartItemInfoProps> = ({
    product
}) => {
    console.log(product[0], `product`)
    return (
        <div>
            <div className="flex justify-between">
                <p className=" text-sm font-semibold text-black">
                    {product[0].name}
                </p>
            </div>

            <div className="mt-1 flex text-sm">
                <p className="text-gray-500">{product[0].color.name}</p>
                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">{product[0].price}</p>
        </div>
    );
}

