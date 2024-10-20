"use client";

import { useState } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = () => setIsLiked(!isLiked);
  const Icon = isLiked ? BiSolidHeart : BiHeart;

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={toggleLike}
    >
      <Icon color={isLiked ? "red" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
