import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { CollectionSlug, GlobalSlug } from 'payload'

const payload = await getPayloadHMR({ config })

export const fetchCategories = async () => {

    const result = await payload.find({
        collection: 'categorias' as CollectionSlug,
        depth: 0,
    })

    return result.docs
}


export const fetchProductsByCategory = async (categoryId: string) => {

    const result = await payload.find({
        collection: 'produtos' as CollectionSlug,
        depth: 1,
        limit: 25,
        where: {
            'category': {
                equals: categoryId
            }
        }
    })

    return result.docs
};


export const fetchCategoryBySlug = async (slug: string) => {

    const result = await payload.find({
        collection: 'categorias' as CollectionSlug,
        depth: 0,
        limit: 1,
        where: {
            'slug': {
                equals: slug
            }
        }
    })

    return result.docs[0]
}


export const createOrder = async (order: any) => {

    const orderResult = await payload.create({
        collection: 'pedidos' as CollectionSlug,
        data: order
    })

    return orderResult
}