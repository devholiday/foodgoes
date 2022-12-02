import styles from '../styles/Home.module.css'

import Sidebar from '../components/sidebar'
import Catalog from '../components/catalog';

export default function Home({categories, products}) {
  return (
    <>
      <Sidebar categories={categories} />

      <div className={styles.main}>
        <div className='alert'>
            <div className='icon'></div>
            <div>Minus 30% on the first order</div>
        </div>  

        <Catalog products={products} />
      </div>
    </>
  )
}

const getCategories = async () => {
  const res = await fetch(`${process.env.DOMAIN}/api/categories`);
  const categories = await res.json();

  return categories;
};

const getProducts = async () => {
  const res = await fetch(`${process.env.DOMAIN}/api/products`);
  const products = await res.json();

  return products;
};

export async function getServerSideProps() {
  const categories = await getCategories();
  const products = await getProducts();

  return { props: { categories, products } };
}