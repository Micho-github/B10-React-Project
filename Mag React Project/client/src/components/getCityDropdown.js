
function getCityDropdown() {
        const cities = [
            "Beirut",
            "Tripoli",
            "Sidon (Saida)",
            "Tyre (Sour)",
            "Byblos (Jbeil)",
            "Jounieh",
            "Baabda",
            "Nabatieh",
            "Zahle",
            "Anjar",
            "Baalbek",
            "Bcharre",
            "Bint Jbeil",
            "Chouf",
            "Jezzine",
            "Keserwan",
            "Rashaya",
            "Zgharta",
            "Aley",
            "Batroun",
            "Hermel"
        ]
    const dropdownHTML = `
      <select id="city" name="city">
        <option value="">Select a city</option>
        ${cities.map(city => `<option value="${city}">${city}</option>`).join("\n")}
      </select>
    `;
  
    return dropdownHTML;
  }
  export default getCityDropdown;
  