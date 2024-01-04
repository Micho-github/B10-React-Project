import { useNavigate } from 'react-router-dom';
import AlertModal from './AlertModal';
import React, { useRef, useState } from 'react';
import axios from 'axios';
function LoginForm(){
    const [modalIsOpen, setModalIsOpen ] = useState(false);

    const UsernameRef = useRef()
    const PasswordRef = useRef()

    const OpenModalHandler = () => {
        setModalIsOpen(true);
      };

    const closeModalHandler = () => {
        setModalIsOpen(false);
      };
      const navigate=useNavigate();


      const submitHandler = async (event) => {
        event.preventDefault();
    
        // Access the selected indices within the submitHandler function
        const enteredUsername = UsernameRef.current.value;
        const enteredPassword = PasswordRef.current.value;
        try {
        const res = await axios.post("http://localhost:8000/Login", {
          username: enteredUsername,
          password: enteredPassword,
        });
    if (res.data && res.data.message === "Login successful") {
        const userId = res.data.user.User_id;
        navigate(`/${userId}`);
      } else {
        setModalIsOpen(true);
      }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      };
    
    return(
        <div className="align-top pb-5 bg-gray-200 my-10 mx-10 border-double border-blue-500 border-2 rounded-lg">
            <h1 className="pt-10 text-center text-5xl w-full text-blue-600">Login</h1>
            <form onSubmit={submitHandler}>
            <input type="text" ref={UsernameRef} placeholder="Enter Username" className=" flex mx-auto mt-20 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <input type="password" ref={PasswordRef} placeholder="Enter Password" className="flex mx-auto mt-10 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <button className=" flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
            </form>
            <div className="text-center mt-16 text-lg text-red-400 hover:text-red-600"><a href="./">Forgot your password?</a></div>
            <button type="submit" className=" flex mx-auto mt-16 mb-5 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create New Account</button>
            {modalIsOpen && <AlertModal onCancel={closeModalHandler} onClick={closeModalHandler} />}
        </div>
    );
}
export default LoginForm;
