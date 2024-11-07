import { fetchProductsByCategory } from '@/actions'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import ProductCard from './ProductCard'

async function ProductsDisplay({categoryId}: {categoryId: string}) {

  const products = await fetchProductsByCategory(categoryId)

  if (products.length === 0) {
    return
  }

  return (
    <div className='container px-8'>
        <Carousel
            opts={{ align: "start", loop: false }}
            className='w-full'>
            <CarouselContent>
                {products.map((product: any) => (
                    <CarouselItem key={product.id} className='basis-full md:basis-1/2 lg:basis-1/3'>
                        <ProductCard product={product} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
        </Carousel>
    </div>
  )
}

export default ProductsDisplay