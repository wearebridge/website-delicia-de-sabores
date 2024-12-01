import React from 'react';

function PrintedOrder({ order }: any) {
  return (
    <div
      style={{
        width: '58mm',
        fontFamily: 'Courier New, monospace',
        fontSize: '16px',
        fontWeight: 900,
        padding: '0',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ padding: '5mm' }}>
        Pedido: {order?.id ? `${order.id.toString().slice(-3)}` : 'ID do pedido'}
        <br />
        Endereço: {order?.adress || 'Endereço não informado'}
        <br />
        Referência: {order?.reference || 'Ponto de referência'}
        <br />
        Contato: {order?.contactInfo || 'Contato não informado'}
        <br />
        Data: {order?.createdAt
          ? new Date(order.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
          : 'Data não disponível'}
      </div>

      <div
        style={{
          margin: '0 auto',
          width: '100%',
          borderTop: '1px dashed #000',
        }}
      ></div>

      <div style={{ padding: '5mm' }}>
        {(order?.products || []).map((product: any, index: number) => (
          <div
            key={index}
            style={{
              marginBottom: '5mm', // Adicionando mais espaço entre os produtos
            }}
          >
            {product?.quantity || 0} {product?.selectedProductName || 'Produto não especificado'}{' '}
            {product?.selectedFlavour ? `${product.selectedFlavour}` : ''}{' '}
            R${product?.totalProductsPrice?.toFixed(2) || '0.00'}
          </div>
        ))}
      </div>

      <div
        style={{
          margin: '0 auto',
          width: '100%',
          borderTop: '1px dashed #000',
        }}
      ></div>

      <div style={{ padding: '5mm', textAlign: 'right' }}>
        Total: R${order?.totalProductsPrice?.toFixed(2) || '0.00'}
      </div>
    </div>
  );
}

export default PrintedOrder;
