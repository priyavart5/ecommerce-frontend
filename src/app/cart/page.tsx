"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import style from "@/styles/cart.module.css";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const router = useRouter();

  const totalPrice = cartItems.reduce((sum: any, item: any) => sum + item.price * item.quantity, 0);

  return (
    <div className={style.cartPage}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className={style.cartItems}>
            {cartItems.map((item: any, index: any) => (
              <div key={index}>
                <Image src={item.image} alt={item.name} width={100} height={100} />
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)} x {item.quantity}</p>
                <button onClick={() => dispatch(removeFromCart(item.productId[index]))}>Remove</button>
              </div>
            ))}
          </div>

          <div className={style.cartSummary}>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className={style.checkoutButton} onClick={() => router.push("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
