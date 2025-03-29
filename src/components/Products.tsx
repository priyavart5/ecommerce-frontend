"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProduct } from "@/services/productService";
import useAuth from "@/hooks/useAuth";
import style from "@/styles/products.module.css";
import { addToCart } from "@/services/cartService";
import { useDispatch } from "react-redux";
import { addToCart as cartSlice } from "@/redux/slices/cartSlice";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useAuth();
  // const [totalCategories, setTotalCategories] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProduct({ search, category, minPrice, maxPrice, page });
        setProducts(res.products);
        setTotalPages(res.totalPages);
        
        // const uniqueCategories = Array.from(new Set(res.products.map((p: any) => p.category)));
        // setTotalCategories(uniqueCategories);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [search, category, minPrice, maxPrice, page]);

  const handleAddToCart = async (product: any) => {
    if (!token) {
      alert("Please log in first to add items to the cart.");
      return;
    }

    if (!product) return;
  
    const cartItem = {
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    };
  
    try {
      await addToCart(product._id, 1, token);
      dispatch(cartSlice(cartItem));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.productsComponent}>

      <div className={style.topBar_products}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={style.search_products}
        />

        {/* <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={style.category_products}
        >
          <option value="">All Categories</option>
          {totalCategories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select> */}

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className={style.minMaxPrice_products}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={style.minMaxPrice_products}
        />
      </div>

      <div className={style.allproducts}>
        {products.length > 0 ? (
          products.map((product: any) => (
            <div className={style.oneProduct_con} key={product._id}>
              <Link href={`/product/${product._id}`} className={style.innerOneProduct}>
                <Image
                  src="https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/65038654434d0-iPhone%2015%20Pro%20Natural%20titanium%20png.png"
                  alt={product.name}
                  width={200}
                  height={200}
                />
                <h4>{product.name}</h4>
                <p>${product.price.toFixed(2)}</p>
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={!token}
                className={`${style.addtocar_productspage} ${
                  !token ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white"
                }`}
              >Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <div className={style.productPagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={style.paginationButtons}
        >Previous</button>
        <span>{page} / {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={style.paginationButtons}
        >Next</button>
      </div>
    </div>
  );
};

export default Products;
