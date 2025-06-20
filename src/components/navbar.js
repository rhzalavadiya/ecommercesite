import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cart = useSelector(state => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-gray-100 shadow">
      <h1 className="text-xl font-bold">🛍️ My E-Commerce</h1>
      <div className="space-x-4">
        <Link to="/home" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/checkout" className="text-blue-600 hover:underline">
          Cart ({cartCount})
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
