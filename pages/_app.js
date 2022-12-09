import Layout from '../components/layout'

import '../styles/globals.css'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, query, collection, where, getDocs } from "firebase/firestore";

import { useEffect, useState} from 'react';

import localFont from '@next/font/local';

import CartContext from '../context/cart-context'

const roboto = localFont({
  src: [
    {
      path: '../fonts/roboto/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/roboto/Roboto-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/roboto/Roboto-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ]
});

function MyApp({ Component, pageProps }) {
  const [isAuth, setAuth] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    
    onAuthStateChanged(auth, user => {
      setAuth(!!user);

      if (user) {
        if (!cart) {
          fetchCart(user.uid);
        }
      }
    });
  }, []);

  const fetchCart = async userId => {
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs((query(collection(db, "cart"), where("userId", "==", userId))));
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setCart({
          id: doc.id,
          ...doc.data()
        });
      }
    } catch(e) {
      console.log(e);
    }
  };

  const createCart = cart => {
    setCart(cart);
  };
  const updateProductsCart = products => {
    setCart(prevState => ({
      ...prevState,
      products
    }));
  };
  const deleteCart = () => {
    setCart(null);
  };

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <main className={roboto.className}>
      <CartContext.Provider value={{cart, createCart, updateProductsCart, deleteCart}}>
        <Layout isAuth={isAuth}>
            {getLayout(<Component {...pageProps} />)}
        </Layout>
      </CartContext.Provider>
    </main>
  );
}

export default MyApp
