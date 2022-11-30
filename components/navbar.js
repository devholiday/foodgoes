import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

import {useState, useCallback} from 'react'

import Modal from './modal'
import Button from './button'
import Login from './login/login'
import Logout from './logout'

export default function Navbar({isAuth}) {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);
  const activator = <Button onClick={handleChange}>Log in</Button>;

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <div>
          <Link className={styles.logo} href="/">FoodGoes</Link>
        </div>

        <div>
          <div className={styles.cart}>
            <Link className={styles.cartButton} href="/cart">Cart</Link>
          </div>
          
          <div className={styles.auth}>
            {isAuth === false && <Modal
                activator={activator}
                open={active}
                onClose={handleChange}
                title="Sign in to FoodGoes"
            >
                <Login onClose={handleChange} />
            </Modal>
            }
            {isAuth === true && <Logout />}
          </div>
        </div>
      </div>

      <div className={styles.search}>
        <input type="text" placeholder="search" />
      </div>
    </div>
  )
}