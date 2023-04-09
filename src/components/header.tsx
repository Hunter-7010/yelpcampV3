import { useSession } from "next-auth/react";

const Header = () => {
  const { data: sessionData } = useSession();
  return (
    <div
      className="relative flex h-80 w-full select-none flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1530488562579-7c1dd2e6667b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")`,
      }}
    >
      <div className=" absolute inset-0 z-10 bg-black/50" />
      <div className="z-20 flex flex-col items-center justify-center">
        <div className="text-5xl text-white">Welcome to YelpCamp</div>
        <div className="mt-2 text-lg text-white ">
          View CampGround form all around the world!
        </div>
        {!sessionData ? (
          <div className="mt-2 text-lg font-bold text-white ">
            Sign in to Add a Campground
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
