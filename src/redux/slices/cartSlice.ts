import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const initialState = {
  cartItems: loadCartFromLocalStorage(),  // ✅ Ensure proper initial state
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      state.cartItems = [...state.cartItems, action.payload];  // ✅ Ensure new array for React reactivity
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      state.cartItems = state.cartItems.filter((item: any) => item.productId !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setCart: (state, action: PayloadAction<any[]>) => {
      state.cartItems = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    }
  }
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
