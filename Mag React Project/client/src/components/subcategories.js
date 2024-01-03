const subcategories = {
    Electronics: [
      "Smartphones",
      "Laptops",
      "Cameras",
      "Audio Devices",
      "Headphones",
      "Speakers"
    ],
    Clothing: [
      "Men's",
      "Shirts",
      "Pants",
      "Jackets",
      "Women's",
      "Dresses",
      "Skirts",
      "Blouses",
      "Children's",
      "Boys",
      "Girls"
    ],
    "Home and Garden": [
      "Furniture",
      "Living Room",
      "Bedroom",
      "Outdoor",
      "Appliances",
      "Kitchen",
      "Laundry",
      "Home Decor",
      "Lighting",
      "Wall Art",
      "Rugs"
    ],
    "Sports and Outdoors": [
      "Exercise Equipment",
      "Treadmills",
      "Weights",
      "Yoga Mats",
      "Outdoor Recreation",
      "Camping",
      "Hiking",
      "Biking"
    ],
    "Books and Stationery": [
      "Fiction",
      "Non-Fiction",
      "Notebooks",
      "Pens",
      "Calendars"
    ],
    "Health and Beauty": [
      "Skincare",
      "Cleansers",
      "Moisturizers",
      "Serums",
      "Haircare",
      "Shampoo",
      "Conditioner",
      "Styling Products",
      "Makeup",
      "Lipstick",
      "Eyeshadow",
      "Foundation"
    ],
    "Toys and Games": [
      "Board Games",
      "Puzzles",
      "Action Figures",
      "Outdoor Toys"
    ],
    Automotive: [
      "Car Parts",
      "Tools",
      "Accessories",
      "Tires"
    ],
    Appliances: [
      "Kitchen Appliances",
      "Blenders",
      "Coffee Makers",
      "Microwaves",
      "Home Appliances",
      "Vacuum Cleaners",
      "Air Purifiers",
      "Irons"
    ],
    "Jewelry and Accessories": [
      "Necklaces",
      "Bracelets",
      "Watches",
      "Sunglasses"
    ],
    "Grocery and Gourmet": [
      "Snacks",
      "Beverages",
      "Cooking Ingredients",
      "Organic and Natural"
    ],
    "Music and Instruments": [
      "Guitars",
      "Keyboards",
      "Headphones",
      "Sheet Music"
    ]
  };


  function getSubcategories() {
    const categoryDropdown = document.getElementById("category");
    const subcategoryDropdown = document.getElementById("subcategory");

    // Clear existing subcategory options
    subcategoryDropdown.innerHTML = '<option value="">Select a subcategory</option>';

    // Get the selected category
    const selectedCategory = categoryDropdown.value;

    // Populate subcategory options based on the selected category
    if (subcategories[selectedCategory]) {
      subcategories[selectedCategory].forEach(addSubcategoryOption);
    }
  }

  function addSubcategoryOption(subcategory) {
    const subcategoryDropdown = document.getElementById("subcategory");
    const option = document.createElement("option");
    option.value = subcategory;
    option.textContent = subcategory;
    subcategoryDropdown.appendChild(option);
  }
  export default getSubcategories;