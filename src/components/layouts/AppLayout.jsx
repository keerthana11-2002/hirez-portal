 
import { Outlet } from "react-router-dom";
import Header from "../Header";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background  "></div>
      <main className="min-h-screen container ">
        <Header/>
        <Outlet/>
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10 font-bold text-xl sm:text-xl md:text-2xl xl:text-4xl">
        Hirez crafted with passion to find your dream job👍
      </div>
    </div>
  );
};

export default AppLayout;
