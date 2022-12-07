import styles from '../styles/ProductCart.module.css'
import Link from 'next/link'
import BuyButton from './buy-button';

export default function ProductCart({product}) {
    return (
        <div className={styles.product}>
            <div className={styles.info}>
                <Link href={`/product/${product.id}`} className={styles.link}></Link>
                <div className={styles.image}>
                    <img src={product.image} />
                </div>
                <div>
                    <div className={styles.title}><h3>{product.title.en}</h3></div>
                    <div className={styles.priceBlock}>
                        {product.discountPrice ? (
                            <>
                                <span className={styles.discountPrice}>&#8362;{product.discountPrice}</span>
                                <span className={styles.oldPriceWithLine}>
                                    <span className={styles.oldPrice}>&#8362;{product.price}</span>
                                    <span className={styles.line}></span>
                                </span>
                            </>
                        ) : <span className={styles.price}>&#8362;{product.price}</span>}
                    </div>
                </div>
            </div>
            <div className={styles.quantityBlock}>
                <BuyButton productId={product.id} disabled={!product.quantity} />
            </div>
        </div>
    );
}