import { GlobalConfig } from "payload";


export const DeliveryFee: GlobalConfig = {
    slug: "deliveryFee",
    label: "Taxa de entrega",
    fields: [
        {
            name: 'whatsapp',
            label: 'Valor (em R$)',
            type: 'number',

        }
    ],
}