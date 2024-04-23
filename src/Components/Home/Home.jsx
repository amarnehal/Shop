import React, { useCallback, useEffect, useState } from "react";
import ProductsList from "../Products/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/features/categorySlice";
import { fetchProducts } from "../../store/features/productSlice";
import { filterProducts } from "../../store/features/productSlice";
import { filterProductsByCategory } from "../../store/features/productSlice";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const products = useSelector((state) => state.product);
  const productsByPrice = useSelector((state) => state.product.filteredByPrice);
  const productByCategory = useSelector(
    (state) => state.product.filterByCategory
  );
  const auth = useSelector((state) => state.auth);
  //// getting min and max values for Price range filter
  const maxValue = products?.data?.reduce((accumulator, currentValue) => {
    if (currentValue.price >= accumulator) {
      return currentValue.price;
    } else {
      return accumulator;
    }
  }, Number.MIN_VALUE);

  const minValue = products?.data?.reduce((accumulator, currentValue) => {
    if (currentValue.price <= accumulator) {
      return currentValue.price;
    } else {
      return accumulator;
    }
  }, Number.MAX_VALUE);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const productSort = useCallback(() => {
    if (selectedCategory && price > 0) {
      dispatch(filterProductsByCategory(selectedCategory));
      dispatch(filterProducts(price));
    } else if (selectedCategory) {
      dispatch(filterProductsByCategory(selectedCategory));
    } else if (price > 0) {
      dispatch(filterProducts(price));
    }
  }, [price, dispatch, selectedCategory]);

  useEffect(() => {
    productSort();
  }, [productSort]);

  useEffect(() => {
    if (categories?.data && categories.data.length > 0) {
      setSelectedCategory(categories?.data[0]?.name);
    }
  }, [categories.data]);

  const filteredProducts = selectedCategory
    ? productByCategory
    : price > 0
    ? productsByPrice
    : products.data;

  function handleReset() {
    setSelectedCategory([]);
    setPrice(0);
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }

  return (
    <div className="container w-full flex">
      <div className="w-80 container-leftSide ml-5 flex-5 pr-8 border-r border-gray-300 mt-5">
        {/* Category Filter */}
        <div className="mt-6 mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Category
          </label>
          <select
            id="category"
            name="category"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value={""}>Select Category</option>
            {categories.data &&
              categories.data.length > 0 &&
              categories.data.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>
        {/* Price Filter */}
        <div className="mt-6 mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price Range
          </label>
          <input
            type="range"
            id="price"
            name="price"
            min={minValue}
            max={maxValue}
            value={price}
            className="block w-full"
            onChange={(e) => {
              setPrice(e.target.value);
              if (products?.data?.price?.includes(selectedPrice)) {
                setPrice(selectedPrice);
              }
            }}
          />
          <label className="cursor-pointer">Price :${price}</label>
        </div>
        <hr className="my-6 border-t border-gray-300" />

        <div className="mt-6 mb-4">
          <button
            onClick={() => handleReset()}
            className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-orange-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Reset Filters
          </button>
        </div>

        <hr className="my-6 border-t border-gray-300" />
      </div>

      <div className="container-rightSide flex-6">
        <ProductsList productData={filteredProducts} />
      </div>
    </div>
  );
};

export default Home;
