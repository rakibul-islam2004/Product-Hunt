import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const truncatedDescription =
    product.description.split(" ").slice(0, 20).join(" ") +
    (product.description.split(" ").length > 20 ? "..." : "");

  return (
    <div className="bg-white p-4 rounded-lg shadow-md bg-cover">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h2 className="text-xl font-semibold mt-4 text-gray-900">
        {product.name}
      </h2>
      <p className="text-gray-500 mt-2">{truncatedDescription}</p>
      <p className="font-bold text-gray-500 mt-2">
        Votes: {product.upvotes?.length}
      </p>
      <div className="flex justify-center items-center text-center mt-4">
        {product._id && (
          <Link to={`/products/${product._id}`} className="text-blue-600">
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
