import { Link,useLocation } from "react-router-dom";

function FilterButton(){
    const location = useLocation()
    const user_Id = (location.pathname.split("/")[1])
    return(
        <div class="flex items-center justify-center m-4">
            <Link to={`/${user_Id}/Filters`} class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-indigo-600 focus:outline-none dark:focus:ring-blue-800">
                Filters&nbsp;&nbsp;&nbsp;
                <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clip-rule="evenodd"></path>
                </svg>
            </Link>
        </div>
    );
}

export default FilterButton;