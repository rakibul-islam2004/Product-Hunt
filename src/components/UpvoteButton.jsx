import { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';

const UpvoteButton = ({ onUpvote, count }) => {
  const [hasVoted, setHasVoted] = useState(false);

  const handleClick = () => {
    setHasVoted(!hasVoted);
    onUpvote();
  };

  return (
    <button
      onClick={handleClick}
      className={`py-2 px-4 rounded-md flex items-center gap-2 ${hasVoted ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}
    >
      <FaThumbsUp className={`text-xl ${hasVoted ? 'text-white' : 'text-gray-600'}`} />
      Upvote ({count})
    </button>
  );
};

export default UpvoteButton;
