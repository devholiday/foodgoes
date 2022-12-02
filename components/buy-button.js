import styles from '../styles/BuyButton.module.css'

import Button from './button'

export default function BuyButton({disabled}) {
    const buy = () => {
        console.log('buy');
    };

    return (
        <div className={styles.buyBtn}>
            <div><Button onClick={() => buy()} disabled={disabled}>Buy</Button></div>
        </div>
    );
}