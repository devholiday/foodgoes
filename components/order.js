import Catalog from './catalog';

export default function Order({order}) {
    return (
        <div>
            <h3>{order.id}</h3>
            <div>Статус: {order.status}</div>
            <div>Доставка: {order.shippingtotal}</div>
            <div>Продуктов на: {order.productsTotal}</div>
            <div>Итого: {order.total}</div>
            <div><Catalog view='list' products={order.products} disabledBuy={true} /></div>
        </div>
    )
}