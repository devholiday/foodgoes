import Link from 'next/link'
import styles from '../styles/Sidebar.module.css'

import { useEffect, useState } from 'react';
import {useRouter} from 'next/router'

import { useTranslation } from '../hooks/useTranslation';

export default function Sidebar({categories, slug, slug2}) {
    const [links, setLinks] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [currentLink, setCurrentLink] = useState();
    
    const { locale } = useRouter();
    const { translate } = useTranslation();

    const showLinks = categoryId => {
        setCategoryId(categoryId);

        const category = categories.find(c => c.id === categoryId);
        setLinks(category.links ?? []);
    };

    useEffect(() => {
        let _l;
        categories.forEach(c => {
            if (c.links) {
                c.links.forEach((l) => {
                    if (l.slug === slug) {
                        _l = l;
                    }
                });
            }
        });
        setCurrentLink(_l);
    }, []);

    const catalog = categories.map((c, i) => (
        <li key={i}>
            <div onClick={() => showLinks(c.id)}>{c.title[locale]}</div>
            {categoryId === c.id && (
                <div className="links">
                {links.length > 0 && (
                    <ul>
                        {links.map((l, j) => (
                            <Link key={j} href={`/category/${l.slug}`}>{l.title[locale]}</Link>
                        ))}
                    </ul>
                )}
            </div>
            )}
        </li>
    ));
    
    return (
        <div className={styles.sidebar}>
            {!currentLink && (
                <>
                    <div><h2>{translate('catalog')}</h2></div>
                    <ul>{catalog}</ul>
                </>
            )}
            
            {currentLink && (
                <>
                    <div><h2>{currentLink.title[locale]}</h2></div>
                    <ul>{currentLink.links.map((c, i) => (
                        <li key={i}>
                            <div>
                                <Link href={`/category/${slug}/${c.slug}`}>{c.title[locale]}</Link>
                            </div>
                        </li>
                    ))}</ul>
                </>
            )}
        </div>
    )
}