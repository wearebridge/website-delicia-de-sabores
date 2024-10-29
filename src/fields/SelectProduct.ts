import { Field } from "payload";

export const SelectProduct: Field = {
    name: 'productSelect',
    type: 'json',
    label: 'Produto',
    validate: () => {
        return true
    },
    admin: {
        width: '50%',
        components: {
            Field: '/fields/SelectProductField'
        }
    }
}