import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import ProductDetails from './ProductDetails'

function ProductCard({product}: {product: any}) {

  const imageUrl = product.image?.url
    ? `${process.env.URL}${product.image.url}`
    : '/assets/placeholder.png'

  return (
    <Card>
        <CardContent className='flex flex-col aspect-square justify-center p-3 md:p-6'>
             <div className='min-h-48 h-full md:max-h-80 w-full relative mx-auto'>
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className='object-center object-cover rounded-md'
                />
             </div>
             <div className='flex flex-col gap-4 mt-8'>
                <p className='text-left text-xl font-medium'>{product.name}</p>
                <div className='flex justify-between items-center'>
                    <div className='text-lg font-bold'>R$ {product.price.toFixed(2)}</div>
                    <ProductDetails product={product} />
                </div>
             </div>

        </CardContent>
    </Card>
  )
}

export default ProductCard