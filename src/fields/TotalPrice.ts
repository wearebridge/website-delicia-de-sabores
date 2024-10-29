import { Field } from "payload";

export const SelectProduct: Field = {
    name: 'productSelect',
    type: 'number',
    label: 'Valor do pedido (em R$)',
    admin: {
        width: '50%',
        components: {
            Field: '/fields/SelectProductField'
        }
    }
}