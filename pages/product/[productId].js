import { useRouter } from 'next/router'

import styles from '../../styles/Product.module.css'

import BuyButton from '../../components/buy-button';

const Product = ({product}) => {
  const router = useRouter()
  const { productId } = router.query

  return (
    <>
      <div>
        <h1 className={styles.title}>{product.title.en}</h1>
      </div>
      <div className={styles.container}>
        <div><img src={product.image} /></div>
        <div>
          <div className={styles.priceBlock}>
              {product.discountPrice ? (
                  <>
                      <span className={styles.discountPrice}>&#8362;{product.discountPrice}</span>
                      <span className={styles.oldPriceWithLine}>
                          <span className={styles.oldPrice}>&#8362;{product.price}</span>
                          <span className={styles.line}></span>
                      </span>
                  </>
              ) : <span className={styles.price}>&#8362;{product.price}</span>}
          </div>
          <div><BuyButton disabled={!product.quantity} /></div>
          <div>
            <div>
              <span>О товаре</span>
              <p>{product.description.en}</p>
            </div>
            <div>
              <span>Бренд</span>
              <p>{product.vendor}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const getProduct = async productId => {
  const res = await fetch(`${process.env.DOMAIN}/api/product?productId=${productId}`);
  const product = await res.json();

  return product;
};

export async function getServerSideProps(context) {
  const {productId} = context.params;

  const product = await getProduct(productId);

  return { props: { product } };
}

export default Product