import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Mídia',
    plural: 'Mídias',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'Título',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
