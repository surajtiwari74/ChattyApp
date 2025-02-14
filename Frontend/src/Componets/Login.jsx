import React, { useState } from 'react'
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

export default function Login() {
 
    const [user, setUser] = useState({
       
        username: "",
        password: "",
      });
       const navigate = useNavigate();
       const dispatch =  useDispatch()
      const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
        
          const res = await axios.post(`http://localhost:8080/api/v1/chatty/user/login`, user, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          });
          if (res.data.success) {
             console.log("data",res)
             dispatch(setAuthUser(res.data?.payload))
              navigate("/");
             toast.success(res.data.message);
          }
        } catch (error) {
           toast.error(error.response.data.message);
          console.log(error);
        }
        setUser({
       
          username: "",
          password: "",
    
        })
      }
      return (
        <div className="min-w-96 mx-auto">
          <div className='w-full p-6 rounded-lg shadow-md bg-blue-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <form onSubmit={onSubmitHandler} action="">
              <div>
                <label className='label p-2'>
                  <span className='text-base label-text'>Username</span>
                </label>
                <input
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className='w-full input input-bordered h-10'
                  type="text"
                  placeholder='Username' />
              </div>
              <div>
                <label className='label p-2'>
                  <span className='text-base label-text'>Password</span>
                </label>
                <input
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className='w-full input input-bordered h-10 focus:none'
                  type="password"
                  placeholder='Password' />
              </div>
              <p className='text-center my-2'>Don't have an account? <Link to="/signup"> <span className='text-blue-500'>signup</span> </Link></p>
              <div>
                <button type='submit' className="btn btn-block btn-sm mt-2 p-1 border border-slate-700 w-full cursor-pointer"
                
                >Login</button>
              </div>
            </form>
          </div>
        </div>
  )
}
