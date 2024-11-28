import React from 'react'

function PrintedOrder({order}: any) {

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Pedido para {order.adress}</h2>
      <p><strong>Contato:</strong> {order.contactInfo}</p>
      <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</p>


      <h3 style={{ marginTop: '20px' }}>Produtos</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Produto</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantidade</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Preço</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
        {order.products.map((product: any, index: number) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {product.selectedProductName} ({product.selectedFlavour})
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
              {product.quantity}
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>
              R${(product.totalProductsPrice / product.quantity).toFixed(2)}
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>
              R${product.totalProductsPrice.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
      </table>

      <h3 style={{ textAlign: 'right', marginTop: '20px' }}>
        <strong>Total:</strong> ${order.totalProductsPrice.toFixed(2)}
      </h3>
    </div>
  )
}

export default PrintedOrder