import { useState } from 'react';
import { Star } from '@phosphor-icons/react';
import { Tooltip } from '@nextui-org/react';

type StarRatingProps = {
  maxStars?: number;
  onRatingChange?: (rating: number) => void;
};

export const StarRating = ({ maxStars = 5, onRatingChange }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index: number) => {
    setRating(index);
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <Tooltip key={index} content={`${starValue} Star${starValue > 1 ? 's' : ''}`}>
            <div
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer"
            >
              <Star
                size={24}
                color={hoverRating >= starValue || rating >= starValue ? '#CC3EA4' : '#920B3A'}
                style={{ opacity: hoverRating >= starValue || rating >= starValue ? 1 : 0.3 }}
              />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};
