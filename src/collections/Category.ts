import Slug from '@/fields/Slug'
import { CollectionConfig } from 'payload'

export const Category: CollectionConfig = {
    slug: 'categorias',
    admin: {
        useAsTitle: 'name'
    },
    fields: [
        {
            name: 'name',
            label: 'Nome',
            type: 'text',
            required: true,
        },
        Slug
    ],
}