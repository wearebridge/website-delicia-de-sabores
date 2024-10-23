import Link from "@/fields/Link";
import { GlobalConfig } from "payload";


export const Social: GlobalConfig = {
    slug: "socials",
    label: "Redes sociais",
    fields: [
        {
            name: 'links',
            type: 'array',
            labels: {
                singular: 'Link',
                plural: 'Links',
            },
            fields: [
                Link
            ]
        }
    ],
}