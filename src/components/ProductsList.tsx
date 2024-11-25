'use client'

import { useCart } from '@/context/cart'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Trash } from 'lucide-react'

function ProductsList() {

  const { cart, removeItemFromCart, cartQuantity } = useCart()

  if (cartQuantity === 0) {
      return (
        <div className='flex flex-col gap-4 items-center justify-center text-center'>
          <p className='font-normal text-lg text-foreground/50'>Parece que você ainda não escolheu nada...</p>
          <Button>
            <Link href={'/'}>Ver produtos</Link>
          </Button>
        </div>
      )
  }


  return (
    <div className='flex flex-col gap-4'>
        {cart.map((product: any, index) => (

            <Card key={index} className=''>
            <CardContent className='flex !p-1 md:!p-4 items-center gap-4 '>
                <div className='aspect-square relative size-12 md:size-24'>
                <Image
                    src={product.productSelect.productImage}
                    alt={product.productSelect.selectedProductName}
                    fill
                    className='object-center object-cover rounded-md'
                />
                </div>
                <div className='flex flex-1 items-center space-x-4 text-xs md:text-base'>
                    <span className='font-bold'>{product.productSelect.quantity}x</span>
                    <span>{product.productSelect.selectedProductName} {product.productSelect.selectedFlavour}</span>
                    <span className='flex-1 ml-auto font-bold'>R$ {product.productSelect.totalProductsPrice.toFixed(2)}</span>
                </div>
                <div>
                <Button onClick={() => removeItemFromCart(index)} variant={'destructive'}>
                    <Trash />
                </Button>
                </div>
            </CardContent>
            </Card>
        ))}
    </div>

  )
}

export default ProductsList

