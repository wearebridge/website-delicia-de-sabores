import { CollectionConfig, CollectionSlug } from "payload";
import payload from "payload";
import { ProductType } from "./Product";

export const Order: CollectionConfig = {
    slug: "pedidos",
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
            defaultValue: "pending"
        },
        {
            name: "adress",
            label: "Endereço",
            type: 'text',
            required: true
        },
        {
            name: "contactInfo",
            label: "Informação de contato",
            type: 'text',
            required: true
        },
        {
            name: 'products',
            labels: {
                singular: 'Produto',
                plural: 'Produtos',
            },
            type: 'array',
            minRows: 1,
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'product',
                            label: 'Produto',
                            type: 'relationship',
                            relationTo: 'produtos' as CollectionSlug,
                            required: true,
                            admin: {
                                width: '50%',
                            },
                            hooks: {
                                beforeChange: [async ({ value }) => {
                                    if (value) {
                                        const product = await payload.findByID({
                                            collection: 'produtos' as CollectionSlug,
                                            id: value
                                        });
                                        return product;
                                    }
                                    return value;
                                }]
                            }
                        },
                        {
                            name: 'flavour',
                            label: 'Sabor',
                            type: 'relationship',
                            relationTo: 'sabores' as CollectionSlug,
                            admin: {
                                width: '40%',
                                condition: (data, siblingData, product) => {
                                    console.log(siblingData)
                                    return siblingData?.product?.type === 'flavour'
                                }

                            }
                        },
                        {
                            name: 'description',
                            label: 'Ingredientes',
                            type: 'text',
                            admin: {
                                width: '40%',
                                condition: (data, siblingData) => {
                                    return siblingData?.product?.type === 'description'
                                }

                            }
                        },
                        {
                            name: 'quantity',
                            label: 'Quantidade',
                            type: 'number',
                            min: 1,
                            admin: {
                                width: '10%'
                            }
                        }
                    ]
                }
            ]
        }
    ],
}
