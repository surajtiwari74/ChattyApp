import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { Link,useNavigate } from 'react-router-dom';

export default function Singup() {
 
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        gender: "",
      });
      const navigate = useNavigate();
      const handleCheckbox = (gender) => {
        setUser({ ...user, gender });
      }
      const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
        
          const res = await axios.post(`http://localhost:8080/api/v1/chatty/user/singup`, user, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          });
          if (res.data.success) {
            navigate("/login");
             toast.success(res.data.message);
          }
        } catch (error) {
           toast.error(error.response.data.message);
          console.log(error);
        }
        setUser({
          fullName: "",
          username: "",
          password: "",
          gender: "",
        })
      }
      return (
        <div className="min-w-96 mx-auto">
          <div className='w-full p-6 rounded-lg shadow-md bg-blue-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
            <h1 className='text-3xl font-bold text-center'>Signup</h1>
            <form onSubmit={onSubmitHandler} action="">
              <div>
                <label className='label p-2'>
                  <span className='text-base label-text'>Full Name</span>
                </label>
                <input
                  value={user.fullName}
                  onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                  className='w-full input input-bordered h-10'
                  type="text"
                  placeholder='Full Name' />
              </div>
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
              <div className='flex items-center my-4'>
                <div className='flex items-center'>
                  <p>Male</p>
                  <input
                    type="checkbox"
                    checked={user.gender === "male"}
                    onChange={() => handleCheckbox("male")}
                    defaultChecked
                    className="checkbox mx-2" />
                </div>
                <div className='flex items-center'>
                  <p>Female</p>
                  <input
                    type="checkbox"
                    checked={user.gender === "female"}
                    onChange={() => handleCheckbox("female")}
                    defaultChecked
                    className="checkbox mx-2" />
                </div>
              </div>
              <p className='text-center my-2'>Already have an account? <Link to="/login">  <span className='text-blue-500'>login</span></Link></p>
              <div>
                <button type='submit' className="btn btn-block btn-sm mt-2 p-1 border border-slate-700 w-full cursor-pointer"
                
                >Singup</button>
              </div>
            </form>
          </div>
        </div>
  )
}
