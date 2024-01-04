import { useState } from "react";
import { useEffect } from "react";
import { Link,useLocation } from 'react-router-dom';
import axios from 'axios';

const FilterBar = () => {

  const location=useLocation();
  const user_Id = location.pathname.split("/")[1];

  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await axios.get('http://localhost:8000/cities2');
        setCities(citiesResponse.data);

        const categoriesResponse = await axios.get('http://localhost:8000/categories2');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        if (selectedCategory) {
          const subCategoriesResponse = await axios.get(
            `http://localhost:8000/subCategories2?category=${selectedCategory}`
          );
          setSubCategories(subCategoriesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching sub-categories:', error);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsResponse = await axios.get(
          `http://localhost:8000/itemFilter?city=${selectedCity}&category=${selectedCategory}&subCategory=${selectedSubCategory}`
        );
        setItems(itemsResponse.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [selectedCity, selectedCategory, selectedSubCategory]);

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className='m-4'>
          <label htmlFor="cityDropdown"></label>
          <select
            id="cityDropdown"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-indigo-600 focus:outline-none dark:focus:ring-blue-800"
          >
            <option value="">City</option>
            {cities.map((city) => (
              <option key={city.City_Code} value={city.City_Description}>
                {city.City_Description}
              </option>
            ))}
          </select>
        </div>

        <div className='m-4'>
          <label htmlFor="categoryDropdown"></label>
          <select
            id="categoryDropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-indigo-600 focus:outline-none dark:focus:ring-blue-800"
          >
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category.Category_Code} value={category.Category_Description}>
                {category.Category_Description}
              </option>
            ))}
          </select>
        </div>

        <div className='m-4'>
          <label htmlFor="subCategoryDropdown"></label>
          <select
            id="subCategoryDropdown"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-indigo-600 focus:outline-none dark:focus:ring-blue-800"
          >
            <option value="">Sub-Category</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.Sub_Category_Code} value={subCategory.Sub_Category_Description}>
                {subCategory.Sub_Category_Description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Filter Items</h2>

          {items.length === 0 ? (
            <p className="text-center text-red-500">No results found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {items.map((item) => (
                <Link key={item.Item_id} to={`/${user_Id}/item/${item.Item_id}`} className="group">
                  <div key={item.Item_id} className="group">
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;