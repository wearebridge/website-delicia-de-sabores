import { CollectionConfig, CollectionSlug } from 'payload'

export type ProductType = {
    id: string
    name: string
    price: number
    category: string
    type: 'flavour' | 'description'
    image?: string
    description?: string
    flavour?: string[]
}

export const Product: CollectionConfig = {
    slug: 'produtos',
    admin: {
        useAsTitle: 'name'
    },
    labels: {
        singular: 'Produto',
        plural: 'Produtos',
    },
    fields: [
        {
            name: 'name',
            label: 'Nome',
            type: 'text',
            required: true
        },
        {
            name: 'price',
            label: 'Preço (em R$)',
            type: 'number',
            required: true
        },
        {
            name: 'category',
            label: 'Categoria',
            type: 'relationship',
            relationTo: 'categorias' as CollectionSlug,
            required: true
        },
        {
            name: 'type',
            label: 'Característica',
            type: 'radio',
            options: [
                {
                    label: 'Sabor',
                    value: 'flavour'
                },
                {
                    label: 'Ingredientes',
                    value: 'description'
                }
            ],
            defaultValue: 'flavour',
        },
        {
            name: 'flavour',
            label: 'Sabor',
            type: 'relationship',
            hasMany: true,
            relationTo: 'sabores' as CollectionSlug,
            required: true,
            admin: {
                condition: (_, siblingData) => {
                    return siblingData.type === 'flavour'}
            }
        },
        {
            name: 'description',
            label: 'Ingredientes',
            type: 'text',
            required: true,
            admin: {
                condition: (_, siblingData) => siblingData.type === 'description'
            }
        },
        {
            name: 'image',
            label: 'Imagem',
            type: 'upload',
            relationTo: 'media' as CollectionSlug
        }
    ]
}