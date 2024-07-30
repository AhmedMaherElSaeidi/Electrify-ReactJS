import "./Products.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../../services/products";
import SearchInput from "../../components/Form/SearchInput/SearchInput";
import ProductCard from "../../components/Products/ProductCard/ProductCard";

const Products = () => {
  const { id } = useParams();
  const [pageData, setPageData] = useState({
    products: [],
    filter: null,
    err: null,
    loadig: true,
  });

  const handleFiltering = (event) => {
    setPageData({ ...pageData, filter: event.target.value });
  };
  const filteredProducts = () => {
    return pageData.products
      .filter((product) => (id ? product.category_id === +id : true))
      .filter((product) =>
        pageData.filter
          ? product.name.toLowerCase().includes(pageData.filter.toLowerCase())
          : true
      );
  };

  useEffect(() => {
    fetchAllProducts()
      .then((res) => {
        setPageData((prevState) => ({
          ...prevState,
          products: res.data.data,
          loadig: false,
        }));
        // console.log(res.data.data);
      })
      .catch((err) => {
        setPageData((prevState) => ({
          ...prevState,
          err,
          loadig: false,
        }));
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div className="products-page mt-3 mb-3">
      <SearchInput placeholder="Filter Products" onChange={handleFiltering} />
      <div className="products-wrapper mt-4">
        {pageData.products &&
          filteredProducts().map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                header={product.name}
                image={product.image}
                category={product.product_category.name}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Products;
