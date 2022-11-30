import Link from 'next/link'
import styles from '../styles/Sidebar.module.css'

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div><h2>Catalog</h2></div>
            <ul>
                <li>
                    <Link href="/">Water and drinks</Link>
                </li>
                <li>
                    <Link href="/">Sweets and snacks</Link>
                </li>
                <li>
                    <Link href="/">vegetable counter</Link>
                </li>
                <li>
                    <Link href="/">milk counter</Link>
                </li>
                <li>
                    <Link href="/">Bakery</Link>
                </li>
                <li>
                    <Link href="/">Grocery</Link>
                </li>
                <li>
                    <Link href="/">Everything for a picnic and party</Link>
                </li>
                <li>
                    <Link href="/">For school and office</Link>
                </li>
            </ul>
        </div>
    )
}