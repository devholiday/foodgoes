import {useContext} from 'react'

import styles from '../styles/ProductCard.module.css'

import Link from 'next/link';
import BuyButton from './buy-button';

import { LocaleContext } from '../context/locale-context'

export default function Product({product: p}) {
    const {locale} = useContext(LocaleContext);

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
                    
                    <h3 className={styles.title}>{p.title[locale]}</h3>
                </div>
                <div>
                    <BuyButton productId={p.id} disabled={!p.quantity} />
                </div>
            </div>
        </div>
    );
}