import { fetchCategories } from '@/actions'
import Link from 'next/link'
import React from 'react'
import ProductsDisplay from './ProductsDisplay'

async function Categories() {

  const categories = await fetchCategories()

  return (
    <>
      {categories.map((category: any) => (
        <section className='container flex flex-col gap-4 mt-12 mb-12'>
            <div className='flex w-full justify-between items-center px-8'>
                <h1 className='text-2xl font-semibold'>{category.name}</h1>
                <Link href={category.slug} className='hover:underline text-foreground/50 text-lg'>Ver tudo</Link>
            </div>
            <ProductsDisplay categoryId={category.id} />
        </section>
      ))}
    </>
  )
}

export default Categories