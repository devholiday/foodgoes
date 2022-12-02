import styles from '../styles/Product.module.css'

import Link from 'next/link';
import Button from './button'

export default function Product({product: p}) {
    const buy = () => {
        console.log('buy');
    };

    return (
        <div className={styles.product}>
            <Link href={'/product/' + p.id} className={styles.link}></Link>

            <div className={styles.wrapper}>
                <div>
                    {p.image && <img src={p.image} />}
                </div>
                <div className={styles.info}>
                    <div className={styles.priceBlock}>
                        {p.discountPrice ? (
                            <>
                                <span className={styles.discountPrice}>&#8362;{p.discountPrice}</span>
                                <span className={styles.oldPriceWithLine}>
                                    <span className={styles.oldPrice}>&#8362;{p.price}</span>
                                    <span className={styles.line}></span>
                                </span>
                            </>
                        ) : <span className={styles.price}>&#8362;{p.price}</span>}
                    </div>
                    
                    <h3 className={styles.title}>{p.title.en}</h3>
                    {p.description.en && <p>{p.description.en}</p>}
                </div>
                <div>
                    <div className={styles.buyBtn}  style={{padding: '0 8px 8px'}}>
                        <div><Button onClick={() => buy()}>Buy</Button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}