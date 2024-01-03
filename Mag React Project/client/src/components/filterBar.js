import { Dropdown, DropdownItem } from 'flowbite-react';



function FilterBar() {
  return (
  <div class="flex items-center justify-center m-4">
    <div id="city" class="m-4">
    <Dropdown label="City">
          <DropdownItem>Submenu Item 1</DropdownItem>
          <DropdownItem>Submenu Item 2</DropdownItem>
        </Dropdown>
    </div>
    <div id="category" class="m-4">
    <Dropdown label="Category" dismissOnClick={false}>
      <DropdownItem>
        <Dropdown label="Dashboard Submenu" placement="right">
          <DropdownItem>Submenu Item 1</DropdownItem>
        </Dropdown>
      </DropdownItem>
    </Dropdown>
    </div>
  </div>  
  );
}

export default FilterBar;