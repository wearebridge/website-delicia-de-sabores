import { fetchCategoryBySlug, fetchProductsByCategory } from '@/actions'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export const revalidate = 60;

async function Page({ params }: { params: Promise<{ slug: string }> }) {

  const slug = (await params).slug
  if (!slug) {
    redirect('/')
  }

  const category = await fetchCategoryBySlug(slug)

  if (!category) {
    return (
      <section className='w-full h-screen flex flex-col gap-4 justify-center items-center'>
          <p>Parece que não tem nada aqui...</p>
          <Link href={'/'}><Button>Voltar ao início</Button></Link>
      </section>
    )
  }

  const products = await fetchProductsByCategory(category.id)

  return (
    <section className='container mt-8'>
      {/* @ts-ignore */}
      <h1 className='text-lg md:text-xl font-semibold'>{category.name}</h1>
      {/* @ts-ignore */}
      <p className='text-foreground/50 text-base md:text-lg'>Aqui você confere tudo relacionado a {category.name}</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-8'>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Page