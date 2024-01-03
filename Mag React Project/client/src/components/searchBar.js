export default function SearchBar() {
    return (
    <div class="flex items-center justify-center">
    <form class="w-2/3">   
        <label for="default-search" class="mb-2 text-sm font-medium text-white sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-blue-600 dark:text-blue-600" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="search_input" class="block w-full p-4 ps-10 text-sm text-white border border-white rounded-lg bg-white focus:ring-white focus:border-blue-600 dark:bg-white dark:border-blue-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Item Names..." required/>
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-indigo-600 dark:focus:ring-blue-800">Search</button>
        </div>
    </form>
    </div>
    )
}