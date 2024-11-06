import { fetchCategoryBySlug, fetchProductsByCategory } from '@/actions'
import ProductCard from '@/components/ProductCard'
import React from 'react'

async function Page({ params }: { params: Promise<{ slug: string }> }) {

  const slug = (await params).slug

  const category = await fetchCategoryBySlug(slug)

  const products = await fetchProductsByCategory(category.id)

  return (
    <section className='container mt-8'>
      <h1 className='text-lg md:text-xl font-semibold'>{category.name}</h1>
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