
import { useContext, useEffect } from "react";

import {firebaseAuth, firebaseDB} from '../utils/init-firebase';
import {updateDoc, addDoc, collection, doc, serverTimestamp} from "firebase/firestore";

import styles from '../styles/BuyButton.module.css'

import Button from './button'

import CartContext from '../context/cart-context'
import { useTranslation } from '../hooks/useTranslation';

export default function BuyButton({disabled, productId}) {
    const cartFromContext = useContext(CartContext);
    const { translate } = useTranslation();

    useEffect(() => {
        if (!cartFromContext || !cartFromContext.cart) return;
    }, [cartFromContext]);
    
    const buy = async productId => {
        try {
            const user = firebaseAuth.currentUser;
            
            if (user) {
                const userId = user.uid;    
    
                const {cart, createCart, updateProductsCart} = cartFromContext;
                if (cart) {
                    const product = cart.products.find(p => p.productId === productId);
                    if (!product) {
                        const products = cart.products.concat({productId, quantity: 1});
                        await updateDoc(doc(firebaseDB, "cart", cart.id), {products, updatedAt: serverTimestamp()});
                        updateProductsCart(products);
                    }
                } else {
                    const docRef = await addDoc(collection(firebaseDB, "cart"), {userId, products: [{productId, quantity: 1}], createdAt: serverTimestamp()});
                    if (docRef.id) {
                        createCart({
                            id: docRef.id,
                            userId,
                            products: [{productId, quantity: 1}]
                        });
                    }
                }
            } else {
                console.log('Чтобы добавить товар в корзину авторизуйтесь')
            }
        } catch(e) {
            console.log(e);
            return;
        }
    };

    const counter = async (productId, action=null) => {
        try {
            const user = firebaseAuth.currentUser;
            if (user) {
                const {cart, updateProductsCart} = cartFromContext;
                if (!cart) {
                    throw 'Invalid Cart';
                }

                const product = cart.products.find(p => p.productId === productId);
                if (!product) {
                    throw 'Invalid Cart';
                }

                let quantity = product.quantity;
                if (action === 'inc') {
                    quantity += 1;
                } else {
                    quantity -= 1;
                }

                if (quantity < 1) {
                    const products = cart.products.filter(p => p.productId !== productId);
                    cart.products = products;
                } else {
                    const products = cart.products.map(p => {
                        return {
                            ...p,
                            quantity: p.productId === productId ? quantity: p.quantity
                        };
                    });
                    cart.products = products;   
                }

                cart.updatedAt = serverTimestamp();
                await updateDoc(doc(firebaseDB, "cart", cart.id), cart);
                updateProductsCart(cart.products);
            } else {
                console.log('Чтобы добавить товар в корзину авторизуйтесь')
            }
        } catch(e) {
            console.log(e);
            return;
        }
    };

    const getProductCartById = productId => {
        const {cart} = cartFromContext;

        return cart?.products.find(p => p.productId === productId) ?? null;
    };
    const inCart = getProductCartById(productId);

    return (
        <div className={styles.wrapper}>
            {inCart && (
                <div>
                    <Button onClick={() => counter(productId)}>-</Button>
                    <span>{inCart.quantity}</span>
                    <Button onClick={() => counter(productId, 'inc')}>+</Button>
                </div>
            )}
            {inCart === null && (
                (
                    <div className={styles.buyBtn}>
                        <div><Button onClick={() => buy(productId)} disabled={disabled}>{translate('buy')}</Button></div>
                    </div>
                )
            )}
        </div>
    );
}