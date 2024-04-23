import React, { useEffect } from "react";

import { Link } from "react-router-dom";

const ProductsList = ({ productData }) => {
  return (
    <>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {productData &&
          productData.map((product) => (
            <div
              key={product.id}
              className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md"
            >
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-contain md:w-38"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
                  {product.category}
                </div>
                <a
                  href="#"
                  className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                >
                  {product.title}
                </a>
                <p className="mt-2 text-gray-500">
                  {product.description.length > 100
                    ? product.description.substring(0, 100) + "..."
                    : product.description}
                </p>
                {product.description.length > 100 && (
                  <a href="#" className="text-orange-700 hover:underline">
                    Read More
                  </a>
                )}
                <div className="mt-4">
                  <span className="text-gray-900 font-medium">
                    ${product.price}
                  </span>
                  <Link to={`/productDetail/${product.id}`}>
                    <button className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-orange-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                      View Product
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductsList;
