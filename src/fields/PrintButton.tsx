'use client'
import React, { useRef } from 'react';
import { Button } from '@payloadcms/ui';
import { useReactToPrint } from 'react-to-print';
import PrintedOrder from '@/components/PrintableOrder';

const PrintButton = () => {
    // Dados de exemplo para o pedido
    const order = {
        adress: 'Rua Exemplo, 123',
        contactInfo: '(11) 99999-9999',
        createdAt: '2024-11-24',
        products: [
            {
                productSelect: {
                    selectedProductName: 'Sorvete',
                    selectedFlavour: 'Chocolate',
                    quantity: 2,
                    totalProductsPrice: 40.0,
                },
            },
            {
                productSelect: {
                    selectedProductName: 'Picolé',
                    selectedFlavour: 'Morango',
                    quantity: 3,
                    totalProductsPrice: 15.0,
                },
            },
        ],
        totalProductsPrice: 55.0,
    };

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
