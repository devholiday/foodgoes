import styles from '../styles/Catalog.module.css'

export default function Catalog({products}) {
    return (
        <div className={styles.catalog}>
            {products.map(p => (
                <div key={p.id} className={styles.product}>
                    {p.image && <img src={p.image} />}
                    <div className={styles.info}>
                        {p.discountPrice ? (
                            <>
                                <span className={styles.discountPrice}>&#8362;{p.discountPrice}</span>
                                <span className={styles.oldPriceWithLine}>
                                    <span className={styles.oldPrice}>&#8362;{p.price}</span>
                                    <span className={styles.line}></span>
                                </span>
                            </>
                        ) : <span className={styles.price}>&#8362;{p.price}</span>}
                        
                        <h3>{p.title.en}</h3>
                        {p.description.en && <p>{p.description.en}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
}