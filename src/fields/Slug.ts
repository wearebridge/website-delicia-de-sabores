import { Field } from 'payload'
import fortmatSlug from '../utils/formatSlug'
const Slug: Field = {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    admin: {
        position: 'sidebar',
    },
    hooks: {
        beforeValidate: [
            fortmatSlug('slug')
        ]
    }
}

export default Slug