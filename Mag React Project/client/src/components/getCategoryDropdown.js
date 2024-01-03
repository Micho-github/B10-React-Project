
function getCategoryDropdown() {
    const categories = [
      "Electronics",
      "Clothing",
      "Home and Garden",
      "Sports and Outdoors",
      "Books and Stationery",
      "Health and Beauty",
      "Toys and Games",
      "Automotive",
      "Appliances",
      "Jewelry and Accessories",
      "Grocery and Gourmet",
      "Music and Instruments"
    ];
  
    const dropdownHTML = `

      <select id="category" name="category">
        <option value="">Select a category</option>
        ${categories.map(category => `<option value="${category}">${category}</option>`).join("\n")}
      </select>
    `;
  
    return dropdownHTML;
  }
  export default getCategoryDropdown;
  