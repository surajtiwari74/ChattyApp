import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css'
import Singup from "./Componets/Singup";
import Login from "./Componets/Login";
import HomePage from "./Componets/HomePage";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "./redux/userSlice";
import io from "socket.io-client";
import { setSocket } from "./redux/soketSlice";
import { useEffect } from "react";
const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>
   },
  {
  path:'/signup',
  element:<Singup/>
 },
 {
  path:'/login',
  element: <Login/>
 },
])
function App() {
 
const {authUser} = useSelector(store=>store.user);
const {socket} = useSelector(store=>store.socket);
const dispatch = useDispatch();

useEffect(()=>{
  if(authUser){
    const socketio = io(`http://localhost:8080`, {
        query:{
          userId:authUser._id
        }
    });
    dispatch(setSocket(socketio));

    socketio?.on('getOnlineUsers', (onlineUsers)=>{
      dispatch(setOnlineUsers(onlineUsers))
    });
    return () => socketio.close();
  }else{
    if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
  }

},[authUser]);
useEffect(() => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}, []);

  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
          <RouterProvider router={appRouter}/>
       </div>
    </>
  )
}

export default App
