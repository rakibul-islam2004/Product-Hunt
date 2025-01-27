import { Link } from "react-router-dom";
import useAuth from "./../hooks/useAuth";

const ProductCard = ({ product }) => {
  const { user } = useAuth();

  // Handle missing product data
  const truncatedDescription = product?.description
    ? product.description.split(" ").slice(0, 20).join(" ") +
      (product.description.split(" ").length > 20 ? "..." : "")
    : "No description available.";

  return (
    <div className="bg-white p-4 rounded-lg shadow-md bg-cover">
      {product?.image ? (
        <img
          src={product.image}
          alt={product.name || "Product"}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-t-lg">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <h2 className="text-xl font-semibold mt-4 text-gray-900">
        {product?.name || "Unknown Product"}
      </h2>
      <p className="text-gray-500 mt-2">{truncatedDescription}</p>
      <p className="font-bold text-gray-500 mt-2">
        Votes: {product?.upvotes?.length || 0}
      </p>
      <div className="flex justify-center items-center text-center mt-4">
        {user ? (
          product?._id && (
            <Link to={`/products/${product._id}`} className="text-blue-600">
              View Details
            </Link>
          )
        ) : (
          <Link to={`/login`} className="text-blue-600">
            Log in to View Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
