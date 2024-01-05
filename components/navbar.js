import { Link } from "react-router-dom";

function Navbar(props){
  const Id = props.USERID;
    return(
      <header>
        <nav class="bg-red border-gray-200 dark:bg-indigo-500">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to={`/${Id}`} class="flex items-center space-x-3 rtl:space-x-reverse">
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MAG</span>
            </Link>
    
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-indigo-500 dark:border-gray-700">
                <li>
                  <Link to={`/${Id}`} class="block py-2 px-3 text-gray-200 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:p-0 text-gray-200 hover:text-white" aria-current="page">Home</Link>
                </li>
                <li>
                  <Link to={`/${Id}/MyItems`} class="block py-2 px-3 text-gray-200 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:p-0 text-gray-200 hover:text-white">My Items</Link>
                </li>
                <li>
                  <Link to={`/${Id}/Reserved`} class="block py-2 px-3 text-gray-200 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:p-0 text-gray-200 hover:text-white">Reserved</Link>
                </li>
                <li>
                  <Link to={`/${Id}/Profile`} class="block py-2 px-3 text-gray-200 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:p-0 text-gray-200 hover:text-white">Profile</Link>
                </li>
                <li>
                  <Link to="/" class="block py-2 px-3 text-gray-200 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:p-0 text-gray-200 hover:text-white">Log out</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
}
export default Navbar;