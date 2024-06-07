import { MdInventory2 } from "react-icons/md";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex justify-between px-20 items-center py-4 border-b-2">
      <Link to={"/"} className="flex gap-2 items-center">
        <MdInventory2 size={30} />
        <h4 className="text-bold text-2xl font-poppins">Inventory</h4>
      </Link>
      <ul className="flex items-center gap-6">
        <li>
          <a href="/dashboard" className="text-base font-poppins">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/add" className="text-base font-poppins">
            Add Item
          </a>
        </li>
        <li>
          <a href="/edit" className="text-base font-poppins">
            Edit Item
          </a>
        </li>
        <li>
          <a href="/delete" className="tex font-poppins">
            Delete Item
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
