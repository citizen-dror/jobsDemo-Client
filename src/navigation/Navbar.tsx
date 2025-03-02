import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="px-4 py-2 hover:bg-blue-700 rounded-md">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="px-4 py-2 hover:bg-blue-700 rounded-md">
            Jobs
          </Link>
        </li>
        <li>
          <Link to="/about" className="px-4 py-2 hover:bg-blue-700 rounded-md">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
