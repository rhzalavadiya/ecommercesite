import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage } from '../feature/productSlice';
import { addToCart } from '../feature/cartSlice';

const HomePage = () => {
  const dispatch = useDispatch();
const { products, loading, error, currentPage, total } = useSelector(state => state.products);
  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const totalPages = Math.ceil(total / 9);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-500">Category: {product.category}</p>
            <p className="text-blue-600 font-bold">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => dispatch(setPage(page))}
            className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage; 
