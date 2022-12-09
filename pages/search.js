import styles from '../styles/Home.module.css'

import Sidebar from '../components/sidebar'
import Catalog from '../components/catalog';

import { useTranslation } from '../hooks/useTranslation';

export default function Search({categories, search}) {
  const { translate } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Sidebar categories={categories} />

      <div className={styles.main}>
        {search && !search.count && <p>{translate('emptySearch').replace('[searchPhrase]', search.phrase)}</p>}
        {search && (
          <>
            <p>{translate('notEmptySearch').replace('[searchPhrase]', search.phrase).replace('[searchCount]', search.count)}</p>
            <Catalog products={search.products ?? []} />
          </>
        )}
      </div>
    </div>
  )
}

const getCategories = async () => {
  const res = await fetch(`${process.env.DOMAIN}/api/categories`);
  const categories = await res.json();

  return categories;
};
const getProductsByQuery = async (query, locale='en') => {
  const res = await fetch(`${process.env.DOMAIN}/api/search?q=${query}&locale=${locale}`);
  return await res.json();
};

export async function getServerSideProps(context) {
  const {text} = context.query;
  const {locale} = context;

  if (!text) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  const categories = await getCategories();
  const search = text && await getProductsByQuery(text, locale);

  return { props: { categories, search } };
}