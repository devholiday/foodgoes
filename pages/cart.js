import Head from 'next/head'
import styles from '../styles/Cart.module.css'
import Button from '../components/button'
import ProductCart from '../components/product-cart'
import Link from 'next/link'

import CartContext from '../contexts/cart-context'
import {useState, useEffect, useContext} from 'react'
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc, addDoc, serverTimestamp} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [totals, setTotals] = useState(0);

  const cartFromContext = useContext(CartContext);

  const shippingtotal = 25;

  useEffect(() => {
    if (!cartFromContext || !cartFromContext.cart) return;
    const productIds = cartFromContext.cart?.products?.map(p => p.productId);

    async function fetchProducts(productIds) {
      try {
        if  (!productIds || productIds.length === 0) {
          return;
        }

        const products = [];
        const db = getFirestore();

        const querySnapshot = await getDocs(query(collection(db, "products"), 
        where("__name__", "in", productIds), 
        where("enabled", "==", true)));
        querySnapshot.forEach((doc) => {
          products.push({
            id: doc.id,
            ...doc.data(),
            image: doc.data().images.length > 0 ? doc.data().images[0] : null,
            quantity: cartFromContext.cart.products.find(p => p.productId === doc.id).quantity,
          });
        });
  
        setProducts(products);

        const totals = products.reduce((acc, p) => {
          const price = p.discountPrice || p.price;
          acc += p.quantity * price;
          return acc;
        }, 0);
        setTotals(totals);
      } catch(e) {
        console.log(e);
      }
    }

    fetchProducts(productIds);
  }, [cartFromContext]);

  const clearCart = async () => {
    const db = getFirestore();

    const {cart: {id}, deleteCart} = cartFromContext;
    await deleteDoc(doc(db, "cart", id));
    deleteCart();
    setProducts([]);
  };

  const order = async () => {
    const user = getAuth().currentUser;
    if (user) {
      const userId = user.uid;

      const db = getFirestore();
      const docRef = await addDoc(collection(db, "orders"), {
        userId, products, createdAt: serverTimestamp(), status: 'pending', 
        shippingtotal, productsTotal: totals, total: totals+shippingtotal
      });
      if (docRef.id) {
        clearCart();
      }
    } else {
      console.log('Авторизуйтесь, чтобы оформить заказ');
    }
  };

  if (products.length === 0) {
    return (
      <>
        <Head>
          <title>FoodGoes - Cart</title>
        </Head>
        <div className='infoBlock'>
          <div>
            <h1 className='heading'>Корзина</h1>
          </div>
        </div>
        <div className={styles.container}>
          <h2>В вашей корзине пока пусто</h2>
          <p>Тут появятся товары, которые вы закажете</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>FoodGoes - Cart</title>
      </Head>
      <div className='breadcrumbs'>
        <Link href="/">Вернуться в каталог</Link>
      </div>
      <div className='infoBlock'>
        <div>
          <h1 className='heading'>Корзина</h1>
        </div>
        <div>
          <Button onClick={() => clearCart()}>Очистить корзину</Button>
        </div>
      </div>
      <div className={styles.container}>
        <ul className={styles.products}>
          {products.map(p => <li key={p.id}><ProductCart product={p}/></li>)}
        </ul>
        <div className={styles.totals}>
          <div>
            <div className={styles.top}>
              <h2 className={styles.subheading}>Итого</h2>
              <span className={styles.deliveryInfo}>Доставка 25–35 мин</span>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Товары</th>
                  <td>&#8362; {totals}</td>
                </tr>
                <tr>
                  <th>Доставка</th>
                  <td>&#8362; shippingtotal</td>
                </tr>
                <tr>
                  <th>К оплате</th>
                  <td>&#8362; {totals + shippingtotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button onClick={() => order()}>Заказать</Button>
        </div>
      </div>
    </>
  )
}