import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import FilterButton from "./filterButton";

const SearchBar = () => {
    const [search_input, setSearch_Input] = useState('');
    const [itemSearch, setItemSearch] = useState([]);
    const [searchMessage, setSearchMessage] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleChangeSearch = (e) => {
        setSearch_Input(e.target.value);
    };

    const fetchSearchItem = async () => {
        try {
            if (!search_input.trim()) {
                setSearchMessage('Please enter a search term.');
                setItemSearch([]);
                setShowResults(true);
                return;
            }

            const res = await axios.get(`http://localhost:8000/itemSearch?search_input=${search_input}`);
            setItemSearch(res.data);

            if (res.data.length === 0) {
                setSearchMessage('No items found for the given search term.');
            } else {
                setSearchMessage('');
            }

            setShowResults(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearchButtonClick = () => {
        console.log('Input Value:', search_input);
        fetchSearchItem();
    };

    return (
        <div>
            <div className="form" class="flex items-center justify-center">
                <label for="default-search" class="mb-2 text-sm font-medium text-white sr-only dark:text-white">Search</label>
                <div class="relative w-2/3">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-blue-600 dark:text-blue-600" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input onChange={handleChangeSearch} type="text" value={search_input} id="search_input" class="block w-full p-4 ps-10 text-sm text-white border border-white rounded-lg bg-white focus:ring-white focus:border-blue-600 dark:bg-white dark:border-blue-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Item Names..." required />
                    <button type="button" onClick={handleSearchButtonClick} class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-indigo-600 dark:focus:ring-blue-800">Search</button>
                </div>
            </div>
            <FilterButton/>

            {showResults && (
                <div className="mt-12 text-center">
                    {searchMessage && <p className="text-red-500">{searchMessage}</p>}
                </div>
            )}

            {showResults && (
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Searched Items</h2>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {itemSearch.map((item) => (
                                <Link key={item.Item_id} to={`/item/${item.Item_id}`} className="group">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        {item.Item_Image && (
                                            <img
                                                src={`data:image/jpeg;base64,${item.Item_Image}`}
                                                alt={item.Item_Name}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        )}
                                    </div>
                                    <h3 className="mt-4 text-sm text-gray-700">{item.Item_Name}</h3>
                                    <p className="mt-1 text-lg font-medium text-blue-600">${item.Price}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;