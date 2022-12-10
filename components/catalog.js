import styles from '../styles/Catalog.module.css'

import Product from './product';

export default function Catalog({view='card', products, disabledBuy=false}) {
    return (
        <div className={styles.catalog + ' ' + (view==='list' ? styles.list : styles.card) }>
            {products.map(p => <div key={p.id}><Product product={p} disabledBuy={disabledBuy}/></div>)}
        </div>
    );
}