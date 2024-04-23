import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../store/features/productDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/features/cartSlice";
import { getUserId } from "../../store/features/cartSlice";
import config from "../../conf/config";

const ProductDetail = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetail);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log("Auth", auth);
  console.log("product", product);

  /// getting userID

  useEffect(() => {
    dispatch(fetchProductDetails(userId));
  }, [userId]);

  const handleAddToCart = () => {
    ///check if user is logged in
    if (auth?.status === true && auth?.userData.$id) {
      const { data } = product;
      const { $id } = auth?.userData;
      dispatch(getUserId($id));

      dispatch(addToCart({ userId: $id, data }));
      navigate("/cart");
    } else {
      alert("Please Login first");
      navigate("/login");
    }
  };

  const { description, id, image, price, title } = product?.data || {};
  console.log("Testing ", description, id, image);
  return (
    <div className="mt-6 mb-4 max-w-4xl mx-auto p-6 bg-white bg-opacity-50 backdrop-blur-md backdrop-filter rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">{title}</h2>
        <p className="text-orange-600 font-bold">${price}</p>
      </div>
      <div className="mt-4 flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img src={image} alt={title} className="w-full rounded-lg" />
        </div>
        <div className="mx-4 md:w-1/2 md:ml-6 mt-4 md:mt-0">
          <p className="text-gray-700">{description}</p>
          <button
            onClick={(e) => handleAddToCart()}
            className="mt-4 inline-flex items-center px-6 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-orange-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
