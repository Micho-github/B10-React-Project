import Navbar from "../components/navbar";
function LoginPage(){
    return(
        <div>
            <Navbar/>
            <div className="align-top pb-5 bg-gray-200 my-10 mx-10 border-double border-blue-500 border-2 rounded-lg">
            <h1 className="pt-10 text-center text-5xl w-full text-blue-600">Login</h1>
            <form>
            <input type="text" placeholder="Username" className=" flex mx-auto mt-20 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <input type="password" placeholder="Password" className="flex mx-auto mt-10 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <button className=" flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
            </form>
            <div className="text-center mt-16 text-lg text-red-400 hover:text-red-600"><a href="./">Forgot your password?</a></div>
            <button className=" flex mx-auto mt-16 mb-5 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create New Account</button>
            </div>
        </div>
    );
}
export default LoginPage;