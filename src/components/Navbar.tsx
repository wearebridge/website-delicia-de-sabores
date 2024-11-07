'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import React from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { useCart } from '@/context/cart'

function Navbar({categories}: any) {

    const { cartQuantity } = useCart()

  return (
    <div className='h-20 w-[100vw] bg-foreground flex items-center text-background'>
        <div className='container flex justify-between items-center'>
            <Link href={'/'}>
            <h1 className='text-base md:text-2xl font-semibold'>Sorveteria</h1>
            </Link>
            <ul className='flex "gap-2 sm:gap-4 items-center text-sm md:text-lg'>
                <li>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='hover:bg-background/10 p-2 rounded-md'>
                            Produtos
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-foreground border-background border-2 rounded-md'>
                            {categories.map((category: any) => (
                                <DropdownMenuItem  key={category.name}>
                                    <Link href={category.slug}>
                                        {category.name}
                                    </Link>
                                </DropdownMenuItem>

                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </li>
                <li>
                    <Link href={'/carrinho'} className='hover:bg-background/10 p-2 rounded-md'>
                        Carrinho ({cartQuantity})
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar