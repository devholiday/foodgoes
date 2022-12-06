import Sidebar from './sidebar'
import styles from '../styles/Category.module.css'

function NestedLayoutCategory({children, categories, slug, slug2}) {
    return (
        <div className={styles.wrapper}>
            <Sidebar categories={categories} slug={slug} slug2={slug2} />
            <div className={styles.main}>{children}</div>
        </div>
    );
}

export default NestedLayoutCategory;