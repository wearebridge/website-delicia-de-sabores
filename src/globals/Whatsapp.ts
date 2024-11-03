import { GlobalConfig } from "payload";


export const Whatsapp: GlobalConfig = {
    slug: "whatsapp",
    label: "WhatsApp",
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'whatsapp',
            label: 'Número',
            type: 'text',

        }
    ],
}