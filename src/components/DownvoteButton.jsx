import { useState } from "react";
import { FaThumbsDown } from "react-icons/fa";

const DownvoteButton = ({ onDownvote, count }) => {
  const [hasVoted, setHasVoted] = useState(false);

  const handleClick = () => {
    setHasVoted(!hasVoted);
    onDownvote();
  };

  return (
    <button
      onClick={handleClick}
      className={`py-2 px-4 rounded-md flex items-center gap-2 ${
        hasVoted ? "bg-red-600 text-white" : "bg-gray-300 text-gray-600"
      }`}
    >
      <FaThumbsDown
        className={`text-xl ${hasVoted ? "text-white" : "text-gray-600"}`}
      />
      Downvote ({count})
    </button>
  );
};

export default DownvoteButton;
