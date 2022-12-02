import { useRouter } from 'next/router'
import Catalog from '../../components/catalog'

const Category = ({linksWithProducts}) => {
  const router = useRouter()
  const { slug } = router.query;

  console.log(linksWithProducts)

  return (
    <>
      {linksWithProducts.map((linkWithProducts, i) => (
        <div key={i}>
          <h3>{linkWithProducts.title.en}</h3>
          <div><Catalog products={linkWithProducts.products}/></div>
        </div>
      ))}
    </>
  );
}

const getLinksWithProducts = async slug => {
  const res = await fetch(`${process.env.DOMAIN}/api/links-with-products?slug=${slug}`);
  const linksWithProducts = await res.json();

  return linksWithProducts;
};

export async function getServerSideProps(context) {
  const {slug} = context.params;

  const linksWithProducts = await getLinksWithProducts(slug);

  return { props: { linksWithProducts } };
}

export default Category