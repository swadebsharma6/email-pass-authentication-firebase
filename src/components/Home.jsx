import { useContext } from "react";
import { AuthContext } from "../Proider/AuthProvider";


const Home = () => {

      const user = useContext(AuthContext);
      

      return (
            <div>
               <h2>HOME :</h2>   
            </div>
      );
};

export default Home;