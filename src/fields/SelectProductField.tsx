'use client'

import { useEffect, useState } from "react"
import { SelectInput, TextInput, useField, useFieldProps } from '@payloadcms/ui'
import { ProductType } from "@/collections/Product"

interface ProductValue {
  selectedProductId: string | null;
  selectedProductName: string | null;
  selectedFlavour: string | null;
  quantity: number;
  totalProductsPrice: number;
}

const SelectProductField = () => {
  const { path } = useFieldProps()
  const { value = {} as ProductValue, setValue } = useField<ProductValue>({ path })

  const [selectedProductId, setSelectedProductId] = useState<string | null>(value.selectedProductId)
  const [selectedProductName, setSelectedProductName] = useState<string | null>(value.selectedProductName)
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)
  const [flavourOptions, setFlavourOptions] = useState<{ label: string, value: string }[]>([])
  const [selectedFlavour, setSelectedFlavour] = useState<string | ''>(value.selectedFlavour || '')
  const [description, setDescription] = useState<string | null>(value.selectedFlavour)
  const [quantity, setQuantity] = useState<string | '1'>(value.quantity?.toString() || '1')
  const [totalProductsPrice, setTotalProductsPrice] = useState<number | 0>(value.totalProductsPrice)
  const [options, setOptions] = useState<{ label: string, value: string }[]>([])

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (/^\d*$/.test(inputValue)) {
      setQuantity(inputValue)
    }
  }

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/produtos?depth=0&limit=25')
        const data = await response.json()

        const productOptions = data.docs.map((product: { name: string, id: string }) => ({
          label: product.name,
          value: product.id
        }))

        setOptions(productOptions)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [])


  useEffect(() => {

    if (selectedProductId) {
      const fetchSelectedProduct = async () => {
        try {
          const response = await fetch(`/api/produtos/${selectedProductId}`)
          const data = await response.json()

          const product: ProductType = {
            id: data.id,
            name: data.name,
            type: data.type,
            flavour: data.flavour || [],
            category: data.category,
            description: data.description || null,
            price: data.price,
          }

          setSelectedProduct(product)
          setSelectedProductName(product.name)
          setDescription(description || product.description || null)

          if (product.type === 'flavour' && product.flavour) {
            const flavourOptions = product.flavour.map((flavourItem: any) => ({
              label: flavourItem.name,
              value: flavourItem.name
            }))
            setFlavourOptions(flavourOptions)
          }
        } catch (error) {
          console.log(error)
        }
      }

      fetchSelectedProduct()
    }
  }, [selectedProductId, selectedProductName])

  useEffect(() => {
    if (selectedProduct && quantity) {
      const total = selectedProduct.price * parseInt(quantity, 10)
      setTotalProductsPrice(total)
    } else {
      setTotalProductsPrice(0)
    }
  }, [selectedProduct, quantity])


  useEffect(() => {
    if (selectedProduct) {
      const newValue: ProductValue = {
        selectedProductId,
        selectedProductName,
        selectedFlavour: selectedFlavour || description || '',
        quantity: parseInt(quantity, 10),
        totalProductsPrice: totalProductsPrice
      }
      setValue(newValue)
    }
  }, [selectedProduct, selectedProductName, selectedFlavour, description, quantity, totalProductsPrice, setValue])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="field-label">
          Produto
        </label>
        <SelectInput
          style={{ width: '100%' }}
          path={path}
          name={path}
          isClearable={false}
          value={selectedProductId || ''}
          options={options}
          required={true}
          onChange={(e: any) => {
            setSelectedProductId(e.value)
            const selectedOption = options.find(option => option.value === e.value)
            setSelectedProductName(selectedOption ? selectedOption.label : null)
            setSelectedProduct(null)
          }}
        />
      </div>
      {selectedProduct && (
        <>
          <div>
            {selectedProduct.type === 'description' ? (
              <>
                <label className="field-label">
                  Descrição
                </label>
                <TextInput style={{ width: '100%' }} path={path} value={description || ''} onChange={(e: any) => setDescription(e.target.value)} />
              </>
            ) : (
              <div>
                <label className="field-label">
                  Sabor
                </label>
                <SelectInput
                  style={{ width: '100%' }}
                  path={`${path}-flavour`}
                  name={`${path}-flavour`}
                  required
                  isClearable={false}
                  value={selectedFlavour || ''}
                  options={flavourOptions}
                  onChange={(e: any) => {
                    setSelectedFlavour(e.value)
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <label className="field-label">
              Quantidade
            </label>
            <TextInput
              path={`${path}-quantity`}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div>
            <label className="field-label">Preço total:</label>
            <h2>R$ {totalProductsPrice.toFixed(2)}</h2>
          </div>
        </>
      )}
    </div>
  )
}

export default SelectProductField
