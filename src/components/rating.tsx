import Star from "./svgs/star";

type Props = {
    setRating:React.Dispatch<React.SetStateAction<number>>,
    rating:number
};

const Rating = ({setRating,rating}: Props) => {
  return (
    <div className="flex h-[42px] items-center gap-3 pl-3">
      <div onClick={() => setRating(1)}>
        <Star
          textColor={`scale-[1.7] cursor-pointer transition ${
            rating >= 1 ? "text-yellow-500 hover:text-yellow-400" : "text-gray-200 hover:text-gray-100"
          }`}
        />
      </div>
      <div onClick={() => setRating(2)}>
        <Star
          textColor={`scale-[1.7] cursor-pointer transition ${
            rating >= 2 ? "text-yellow-500 hover:text-yellow-400" : "text-gray-200 hover:text-gray-100"
          }`}
        />
      </div>
      <div onClick={() => setRating(3)}>
        <Star
          textColor={`scale-[1.7] cursor-pointer transition ${
            rating >= 3 ? "text-yellow-500 hover:text-yellow-400" : "text-gray-200 hover:text-gray-100"
          }`}
        />
      </div>
      <div onClick={() => setRating(4)}>
        <Star
          textColor={`scale-[1.7] cursor-pointer transition ${
            rating >= 4 ? "text-yellow-500 hover:text-yellow-400" : "text-gray-200 hover:text-gray-100"
          }`}
        />
      </div>
      <div onClick={() => setRating(5)}>
        <Star
          textColor={`scale-[1.7] cursor-pointer transition ${
            rating >= 5 ? "text-yellow-500 hover:text-yellow-400" : "text-gray-200 hover:text-gray-100"
          }`}
        />
      </div>
    </div>
  );
};

export default Rating;
