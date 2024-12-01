'use client'
import React, { useRef } from 'react';
import { Button } from '@payloadcms/ui';
import { useReactToPrint } from 'react-to-print';
import PrintedOrder from '@/components/PrintableOrder';
import { useAllFormFields } from '@payloadcms/ui';
import { usePathname } from 'next/navigation';

const PrintButton = () => {
    const pathname = usePathname();
    const idFromUrl = pathname.split('/pedidos/')[1];

    const [fields, dispatchFields] = useAllFormFields();

    const order = {
        id: idFromUrl,
        updatedAt: fields.updatedAt?.value,
        createdAt: fields.createdAt?.value,
        status: fields.status?.value,
        adress: fields.adress?.value,
        paymentMethod: fields.paymentMethod?.value,
        exchange: fields.exchange?.value,
        reference: fields.reference?.value,
        contactInfo: fields.contactInfo?.value,
        totalProductsPrice: fields.totalProductsPrice?.value,
        products: Object.keys(fields)
          .filter((key) => key.startsWith("products.") && key.endsWith(".productSelect"))
          .map((key) => fields[key]?.value)
    };

    const contentRef = useRef<HTMLDivElement>(null);

    const reactToPrintFn = useReactToPrint({
        contentRef: contentRef as React.RefObject<Element>,
        documentTitle: 'Pedido',
    });

    return (
        <div>
            <div className='hidden max-w-[58mm]'>
                <div ref={contentRef}>
                    <PrintedOrder order={order} />
                </div>
            </div>
            <Button type="button" onClick={() => reactToPrintFn?.()}>
                Imprimir Pedido
            </Button>
        </div>
    );
};

export default PrintButton;
