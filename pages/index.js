import styles from '../styles/Home.module.css'

import Sidebar from '../components/sidebar'
import Catalog from '../components/catalog';

export default function Home({categories}) {
  return (
    <>
      <Sidebar categories={categories} />

      <div className="container">
        <div className='alert'>
            <div className='icon'></div>
            <div>Minus 30% on the first order</div>
        </div>  

        <div className='catalog'><Catalog /></div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/categories`);
  const categories = await res.json();

  return { props: { categories } };
}

