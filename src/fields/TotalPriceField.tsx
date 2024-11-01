'use client'

import { useAllFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

const TotalPriceField = () => {
    const [fields, dispatchFields] = useAllFormFields()
    const [totalPrice, setTotalPrice] = useState(0)
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [minPrice, setMinPrice] = useState(0)

    useEffect(() => {
        const fetchFee = async () => {
            try {
                const response = await fetch('/api/globals/deliveryFee')
                const data = await response.json()
                setDeliveryFee(data.fee)
                setMinPrice(data.minPrice)
            } catch (error) {
                console.log(error)
            }
        }

        fetchFee()
    }, [])

    useEffect(() => {
        const productsTotal = Object.keys(fields)
            .filter(key => key.startsWith('products.') && key.endsWith('.productSelect'))
            .reduce((sum, key) => {
                const product: any = fields[key].value
                return sum + (product?.totalProductsPrice || 0)
            }, 0)

        const finalTotal = productsTotal < minPrice ? productsTotal + deliveryFee : productsTotal
        setTotalPrice(finalTotal)

    }, [fields, deliveryFee, minPrice])

    useEffect(() => {
        dispatchFields({
            type: 'UPDATE',
            path: 'totalProductsPrice',
            value: totalPrice
        })
    }, [totalPrice, dispatchFields])

    return (
        <div>
            <label className="field-label">Preço total:</label>
            <h2>R$ {totalPrice.toFixed(2)}</h2>
        </div>
    )
}

export default TotalPriceField
