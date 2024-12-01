import { CollectionConfig } from "payload";
import { SelectProduct } from "../fields/SelectProduct";

export const Order: CollectionConfig = {
    slug: "pedidos",
    admin: {
        useAsTitle: 'adress'
    },
    access: {
        create: () => true
    },
    labels: {
        singular: "Pedido",
        plural: "Pedidos",

    },
    fields: [
        {
            name: "status",
            label: "Status",
            type: "select",
            required: true,
            options: [
                {
                    label: "Pendente",
                    value: "pending"
                },
                {
                    label: "Confirmado",
                    value: "completed"
                }
            ],
            defaultValue: "pending",
            admin: {
                position: 'sidebar'
            },
        },
        {
            name: "adress",
            label: "Endereço",
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "reference",
            label: "Ponto de referência",
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'paymentMethod',
            label: 'Forma de pagamento',
            type: 'select',
            admin: {
                position: 'sidebar'
            },
            required: true,
            options: [
                {
                    label: 'Dinheiro',
                    value: 'cash'
                },
                {
                    label: 'Cartão',
                    value: 'card'
                },
                {
                    label: 'Pix',
                    value: 'pix'
                }
            ]
        },
        {
            name: 'exchange',
            label: 'Troco para (em R$)',
            type: 'number',
            required: true,
            admin: {
                position: 'sidebar',
            },
            defaultValue: 0
        },
        {
            name: "contactInfo",
            label: "Informação de contato",
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'products',
            label: 'Produtos',
            type: 'array',
            minRows: 1,
            fields: [
                {
                    type: 'row',
                    fields: [
                        SelectProduct,
                    ]
                }
            ]
        },
        {
            name: 'totalProductsPrice',
            label: 'Valor do pedido (em R$)',
            type: 'number',
            required: true,
            admin: {
                position: 'sidebar',
                components: {
                    Field: '/fields/TotalPriceField'}
            }
        },
        {
            name: 'printButton',
            type: 'ui',
            admin: {
                position: 'sidebar',
                components: {
                    Field: '/fields/PrintButton'
                }
            }
        }
    ],
}
