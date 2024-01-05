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
  <div class="mt-10">
    <img src="/Images/mag_high_resolution_logo_transparent.png" class="h-40 w-30 mx-auto mb-10"></img>
    <div class="mx-auto mb-20 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form onSubmit={submitHandler} class="space-y-6">
            <h5 class="text-center text-xl font-medium text-gray-900">Sign in</h5>
            <div>
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Your Username</label>
                <input type="text" ref={UsernameRef} name="username" id="username" class="bg-gray-50 border rounded border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out w-full p-2.5" placeholder="Enter Username" required />
            </div>
            <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                <input type="password" ref={PasswordRef} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border rounded border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out w-full p-2.5" required />
            </div>
            <div class="flex items-start">
                <div class="flex items-start">
                    <div class="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                    </div>
                    <label for="remember" class="ms-2 text-sm font-medium text-gray-900">Remember me</label>
                </div>
                <a href="#" class="ms-auto text-sm text-blue-700 hover:underline">Lost Password?</a>
            </div>
            <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
            <div class="text-sm font-medium text-gray-500">
                Not registered? <a href="#" class="text-blue-700 hover:underline">Create account</a>
            </div>
        </form>
      {modalIsOpen && <AlertModal onCancel={closeModalHandler} onClick={closeModalHandler} />}
        </div>
        </div>
    );
}
export default LoginForm;
