import styles from '../styles/Catalog.module.css'

import Product from './product';

export default function Catalog({products}) {
    return (
        <div className={styles.catalog}>
            {products.map(p => <div key={p.id}><Product product={p} /></div>)}
        </div>
    );
}