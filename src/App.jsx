import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import  {login,logout} from './store/features/authSlice';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
function App() {
  //loader to be shown while we fetch the data from the server
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData)=>
    {
      if(userData)
      {
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    }
    ).finally(()=>
    {
      setLoading(false);
    })
  }, [])
  return loading ? (null) : (
    <div className="min-h-screen w-full flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>

    </div>
  )
}

export default App
