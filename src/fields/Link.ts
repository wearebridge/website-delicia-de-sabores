import { Field } from 'payload'

const Link: Field = {
    name: 'link',
    label: 'Link',
    type: 'group',
    fields: [
        {
            name: 'text',
            label: 'Texto',
            type: 'text',
            required: true,
        },
        {
            name: 'url',
            label: 'URL',
            type: 'text',
            required: true,
        }
    ],
}

export default Link