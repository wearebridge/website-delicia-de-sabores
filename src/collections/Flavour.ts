import { CollectionConfig } from 'payload'

export const Flavour: CollectionConfig = {
    slug: 'sabores',
    admin: {
        useAsTitle: 'name'
    },
    labels: {
        singular: 'Sabor',
        plural: 'Sabores',
    },
    fields: [
        {
            name: 'name',
            label: 'Nome',
            type: 'text',
            required: true,
            unique: true
        }
    ],
}