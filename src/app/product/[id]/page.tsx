"use client";

import { useParams } from "next/navigation";
import { getProduct } from "@/services/productService";
import { addToCart } from "@/services/cartService";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "../../../styles/product.module.css";
import useAuth from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { addToCart as cartSlice } from "@/redux/slices/cartSlice";

interface ProductDetail {
    image: string;
    name: string;
    price: number;
    description: string;
    _id: string;
}

const ProductPage = () => {
  const params = useParams();
  const { token } = useAuth();
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct(String(params.id));
        setProductDetail(res);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please log in to add items to the cart.");
      return;
    }

    if (!productDetail) return;

    const cartItem = {
      productId: String(params.id),
      name: productDetail.name,
      image: productDetail.image,
      price: productDetail.price,
      quantity: 1,
    };

    try {
      await addToCart(productDetail?._id as string, 1, token);
      dispatch(cartSlice(cartItem));
    } catch (error) {
      console.log(error)
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading product...</p>;
  if (!productDetail) return <p className="text-center text-red-500">Product not found.</p>;

  return (
      <div className={style.product}>
        <Image
          // src={productDetail.image}
          src="https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/65038654434d0-iPhone%2015%20Pro%20Natural%20titanium%20png.png"
          alt={productDetail.name}
          width={300}
          height={300}
          className={style.productImage}
        />
        <div className={style.innerProduct}>
          <h1 className={style.productName}>{productDetail.name}</h1>
          <p className={style.productPrice}>${productDetail.price.toFixed(2)}</p>
          <p className={style.productDesc}>{productDetail.description}</p>
          <button onClick={handleAddToCart} className={style.productAddtoCart}>
            Add to Cart
          </button>
        </div>
      </div>
  );
};

export default ProductPage;
