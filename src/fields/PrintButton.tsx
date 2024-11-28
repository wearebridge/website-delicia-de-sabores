'use client'
import React, { useRef } from 'react';
import { Button } from '@payloadcms/ui';
import { useReactToPrint } from 'react-to-print';
import PrintedOrder from '@/components/PrintableOrder';

import { useAllFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

const PrintButton = () => {


    const [fields, dispatchFields] = useAllFormFields()

    const order = {
        updatedAt: fields.updatedAt?.value,
        createdAt: fields.createdAt?.value,
        status: fields.status?.value,
        adress: fields.adress?.value,
        paymentMethod: fields.paymentMethod?.value,
        exchange: fields.exchange?.value,
        contactInfo: fields.contactInfo?.value,
        totalProductsPrice: fields.totalProductsPrice?.value,
        products: Object.keys(fields)
          .filter((key) => key.startsWith("products.") && key.endsWith(".productSelect"))
          .map((key) => fields[key]?.value)
      };

      console.log(order)

    const contentRef = useRef<HTMLDivElement>(null);

    const reactToPrintFn = useReactToPrint({
        contentRef: contentRef as React.RefObject<Element>,
        documentTitle: 'Pedido',
        onAfterPrint: () => console.log('Impressão concluída!'),
    });

    return (
        <div>
            <div className='hidden'>
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
