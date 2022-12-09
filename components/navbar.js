import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

import {useState, useCallback} from 'react'
import { useRouter } from 'next/router';

import { useTranslation } from '../hooks/useTranslation';

import Modal from './modal'
import Button from './button'
import Login from './login/login'
import Logout from './logout'

export default function Navbar({isAuth}) {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const { translate } = useTranslation();

  const handleChange = useCallback(() => setActive(!active), [active]);
  const activator = <Button onClick={handleChange}>{translate('login')}</Button>;

  const queue = [];
  const handleKeyUpSearch = event => {
    try {
      if (event.keyCode !== 8 && (event.keyCode < 48 || event.keyCode > 220)) {
        return;
      }

      queue.forEach(element => clearTimeout(element));

      const timeoutId = setTimeout(async () => {
        let q = event.target.value;
        q = q.trim().toLowerCase();

        if (q === '') {
          return;
        }
        if (q.length < 3) {
          return;
        }
        if (q.length > 25) {
          return;
        }

        const pathname = '/search';

        if (router.pathname !== pathname) {
          router.push({pathname, query: {text: q}}, undefined, { locale: router.locale });
        } else {
          router.replace({pathname, query: {text: q}}, undefined, { locale: router.locale });
        }
      }, 1500);

      queue.push(timeoutId);
    } catch(e) {
      return;
    }
  };

  const goToLocale = locale => router.push(router.asPath, router.asPath, { locale });

  return (
    <div className={styles.header}>
       <div>
          <Link className={styles.logo} href="/">FoodGoes</Link>
        </div>

        <div className={styles.search}>
          <input type="text" placeholder={translate('search')} onKeyUp={handleKeyUpSearch} />
        </div>

        <div className={styles.buttons}>
          <div className={styles.langs}>
            <Button onClick={() => goToLocale('en')}>En</Button>
            <Button onClick={() => goToLocale('he')}>He</Button>
            <Button onClick={() => goToLocale('ru')}>Ru</Button>
          </div>
          <div>
            <div className={styles.cart}>
              <Link className={styles.cartButton} href="/cart">{translate('cart')}</Link>
            </div>
            
            <div className={styles.auth}>
              {isAuth === false && <Modal
                  activator={activator}
                  open={active}
                  onClose={handleChange}
                  title={translate('loginTitle')}
              >
                  <Login onClose={handleChange} />
              </Modal>
              }
              {isAuth === true && <Logout />}
            </div>
          </div>
        </div>
    </div>
  )
}