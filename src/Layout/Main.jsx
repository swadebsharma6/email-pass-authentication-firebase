import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Main = () => {
  return (
    <>
      <Header></Header>
      <div className="max-w-screen-xl mx-auto">
      <Outlet></Outlet>
      </div>
    </>
  );
};

export default Main;
