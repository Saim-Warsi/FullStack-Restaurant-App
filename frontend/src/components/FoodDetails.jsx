import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { assets } from '../assets/assets';
import { ArrowLeft, Star } from 'lucide-react';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list, url, cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  
  const foodItem = food_list.find(item => item._id === id);
  
  if (!foodItem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Food item not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 sm:mb-8 font-medium transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="w-full">
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100">
            <img 
              src={`${url}/images/${foodItem.image}`} 
              alt={foodItem.name}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {foodItem.name}
            </h1>
            <div className="flex items-center gap-2">
              <img src={assets.rating_starts} alt="rating" className="w-20" />
              <span className="text-gray-600 text-sm">(4.5)</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {foodItem.description}
            </p>
          </div>

          <div className="mb-8">
            <span className="text-sm font-medium text-gray-600 block mb-1">Price</span>
            <span className="text-4xl font-bold text-green-800">
              ${foodItem.price}
            </span>
          </div>

          <div className="mt-auto">
            {!cartItems[id] ? (
              <button
                onClick={() => addToCart(id)}
                className="w-full py-4 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-between bg-white border-2 border-yellow-500 rounded-xl p-4">
                <button
                  onClick={() => removeFromCart(id)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img src={assets.remove_icon_red} alt="remove" className="w-6 h-6" />
                </button>
                
                <span className="text-2xl font-bold text-gray-900">
                  {cartItems[id]}
                </span>
                
                <button
                  onClick={() => addToCart(id)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img src={assets.add_icon_green} alt="add" className="w-6 h-6" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">Category</h4>
            <p className="text-gray-600">{foodItem.category || 'Food Item'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">Availability</h4>
            <p className="text-green-800 font-semibold">In Stock</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;