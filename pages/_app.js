import Layout from '../components/layout'

import '../styles/globals.css'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from 'react';

import localFont from '@next/font/local';

const roboto = localFont({
  src: [
    {
      path: '../fonts/roboto/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/roboto/Roboto-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ]
});

function MyApp({ Component, pageProps }) {
  const [isAuth, setAuth] = useState(null);

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
    
    onAuthStateChanged(auth, (user) => {
      setAuth(!!user);
    });
  }, []);
  
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <main className={roboto.className}>
      <Layout isAuth={isAuth}>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </main>
  );
}

export default MyApp
