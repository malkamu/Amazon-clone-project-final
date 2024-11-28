
import { useContext, useEffect } from "react";
import "./App.css";
import Router from "./Router/Router";
import { DataContext } from "./Component/DataProvider/DataProvider";
import { auth } from "./Utility/firebase";
import { DiPerl } from "react-icons/di";
import { Type } from "./Utility/action.type";


function App() {
  const[{user},dispatch] = useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }
      else{
        dispatch({
          type:Type.SET_USER,
          user:null
        })
      }
  })
  })
  return (
    <>
     
<Router/>
    </>
  );
}

export default App;
