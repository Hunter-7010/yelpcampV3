import { useSession } from "next-auth/react";

const Header = () => {
  const { data: sessionData } = useSession();
  return (
    <div
      className="relative flex h-80 w-full select-none items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("https://res.cloudinary.com/dddvtrxcz/image/upload/v1681039172/my-uploads/ultd4vzsv9phvkbftzqo.jpg")`,
      }}
    >
      <div className=" absolute inset-0 z-10 bg-black/50" />
      <div className="z-20 flex flex-col items-center justify-center">
        <div className="text-5xl text-white text-center">Welcome to YelpCamp</div>
        <div className="mt-2 text-lg text-white text-center">
          View CampGround form all around the world!
        </div>
        {!sessionData ? (
          <div className="mt-2 text-lg font-bold text-white text-center">
            Sign in to Add a Campground
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
