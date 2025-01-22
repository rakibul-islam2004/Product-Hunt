import { Link } from "react-router-dom";
import UpvoteButton from "./UpvoteButton";

const ProductCard = ({ product, onUpvote }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
      <p className="text-gray-500 mt-2">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <UpvoteButton
          onUpvote={() => onUpvote(product._id)}
          count={product.upvotes}
        />
        <Link to={`/products/${product._id}`} className="text-blue-600">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
