import { Route, Routes, redirect } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Registration/Registration";
import Home from "./Home/Home";
import { UserTable } from "./UserTable/UserTable";
import { isAuth } from "store/slices/user-slice";
import { TripsTable } from "./TripsTable/TripsTable";


export const App = () => {
  if(!isAuth){
    redirect('/')
  }
  return (
    <div className="App">
      {/* <Header/> */}
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={ <Login/>}/>
        <Route path="/register"  element={<Register/>}/>
        <Route path="/users" element={<UserTable/>}/>
        <Route path="/trips" element={<TripsTable/>}/>
      </Routes>
     
    </div>
  );
};
