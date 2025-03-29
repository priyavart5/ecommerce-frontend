"use client"
import styles from "@/styles/page.module.css";
import Products from "@/components/Products";

const Home = () => {
  
  return (
    <div className={styles.page}>
      <Products />
    </div>
  );
};

export default Home;
