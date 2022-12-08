import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

import {useState, useCallback, useContext} from 'react'

import { LocaleContext } from '../context/locale-context'

import Modal from './modal'
import Button from './button'
import Login from './login/login'
import Logout from './logout'

export default function Navbar({isAuth}) {
  const [active, setActive] = useState(false);
  const {i18n, setLocale} = useContext(LocaleContext);

  const handleChange = useCallback(() => setActive(!active), [active]);
  const activator = <Button onClick={handleChange}>{i18n.login}</Button>;

  const search = q => {
    console.log(q)
  };

  return (
    <div className={styles.header}>
       <div>
          <Link className={styles.logo} href="/">FoodGoes</Link>
        </div>

        <div className={styles.search}>
          <input type="text" placeholder={i18n.search} onChange={e => search(e.target.value)} />
        </div>

        <div className={styles.buttons}>
          <div className={styles.langs}>
            <Button onClick={() => setLocale('en')}>En</Button>
            <Button onClick={() => setLocale('he')}>He</Button>
            <Button onClick={() => setLocale('ru')}>Ru</Button>
          </div>
          <div>
            <div className={styles.cart}>
              <Link className={styles.cartButton} href="/cart">{i18n.cart}</Link>
            </div>
            
            <div className={styles.auth}>
              {isAuth === false && <Modal
                  activator={activator}
                  open={active}
                  onClose={handleChange}
                  title={i18n.loginTitle}
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