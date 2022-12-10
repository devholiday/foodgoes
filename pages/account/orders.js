import Head from 'next/head'
import styles from '../../styles/Orders.module.css'
import Link from 'next/link'

import { useTranslation } from '../../hooks/useTranslation';

import {useState, useEffect} from 'react'
import {collection, query, where, getDocs} from "firebase/firestore";

import {firebaseAuth, firebaseDB} from '../../utils/init-firebase';

import Order from '../../components/order';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const {translate} = useTranslation();  

  useEffect(() => {
    async function fetchOrders() {
      try {
        const user = firebaseAuth.currentUser;

        if (!user) return;

        const orders = [];

        const querySnapshot = await getDocs(query(collection(firebaseDB, "orders"), where("userId", "==", user.uid)));
        querySnapshot.forEach((doc) => {
          orders.push({
            id: doc.id,
            ...doc.data()
          });
        });
  
        setOrders(orders);
      } catch(e) {
        console.log(e);
      }
    }

    fetchOrders();
  }, [firebaseAuth.currentUser]);

  return (
    <>
      <Head>
        <title>FoodGoes - Orders</title>
      </Head>
      <div className='breadcrumbs'>
        <Link href="/">{translate('btnBackToCatalog')}</Link>
      </div>
      <div className='infoBlock'>
        <div>
          <h1 className='heading'>{translate('ordersTitlePage')}</h1>
        </div>
      </div>
      <div className={styles.container}>
        {orders.map(order => (
          <div key={order.id}><Order order={order}/></div>
        ))}
      </div>
    </>
  )
}