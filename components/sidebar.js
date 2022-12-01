import Link from 'next/link'
import styles from '../styles/Sidebar.module.css'

import { useState } from 'react';

export default function Sidebar({categories}) {
    const [links, setLinks] = useState([]);
    const [categoryId, setCategoryId] = useState();

    const showLinks = categoryId => {
        setCategoryId(categoryId);

        const category = categories.find(c => c.id === categoryId);
        setLinks(category.links ?? []);
    };

    const catalog = categories.map((c, i) => (
        <li key={i}>
            <div onClick={() => showLinks(c.id)}>{c.title.en}</div>
            {categoryId === c.id && (
                <div className="links">
                {links.length > 0 && (
                    <ul>
                        {links.map((l, j) => (
                            <Link key={j} href={`/category/${l.slug}`}>{l.title.en}</Link>
                        ))}
                    </ul>
                )}
            </div>
            )}
        </li>
    ));

    return (
        <div className={styles.sidebar}>
            <div><h2>Catalog</h2></div>
            <ul>{catalog}</ul>
        </div>
    )
}