import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [allergies] = useState(['peanuts', 'dairy', 'shellfish']);
  const [dietaryPreferences] = useState(['vegetarian']);
  const [sortBy, setSortBy] = useState('recommended');

  const categories = ['All', 'Fast Food', 'Italian', 'Asian', 'Mexican', 'Healthy', 'Desserts'];

  const dummyRestaurants = [
    {
      id: 1,
      name: "Gourmet Burger Co",
      cuisine: "Fast Food",
      rating: 4.5,
      totalRatings: 2547,
      estimatedTime: "25-35 mins",
      deliveryFee: 2.99,
      minOrder: 15.00,
      distance: "1.2 km",
      isOpen: true,
      trending: true,
      promotion: "Free delivery on orders above $25",
      image: "burger-restaurant.jpg",
      tags: ["burgers", "american", "fast food"],
      dietaryOptions: ["halal", "gluten-free available"],
      menu: [
        {
          id: 1,
          name: "Classic Cheeseburger",
          price: 12.99,
          description: "Premium beef patty with aged cheddar",
          calories: 850,
          preparationTime: "15 mins",
          spicyLevel: 1,
          allergies: ["dairy"],
          image: "classic-burger.jpg",
          popular: true,
          ingredients: ["beef", "cheese", "lettuce", "tomato", "onion", "brioche bun"],
          customizations: ["extra cheese", "bacon", "avocado", "gluten-free bun"],
          rating: 4.8,
          reviews: 342
        },
        {
          id: 2,
          name: "Veggie Supreme",
          price: 11.99,
          description: "Plant-based patty with fresh vegetables",
          calories: 650,
          preparationTime: "12 mins",
          spicyLevel: 0,
          allergies: [],
          image: "veggie-burger.jpg",
          popular: false,
          ingredients: ["plant-based patty", "lettuce", "tomato", "vegan cheese"],
          customizations: ["extra veggies", "vegan mayo", "gluten-free bun"],
          rating: 4.6,
          reviews: 156,
          dietaryTags: ["vegetarian", "vegan-optional"]
        }
      ]
    },
    {
      id: 2,
      name: "Bella Italia",
      cuisine: "Italian",
      rating: 4.7,
      totalRatings: 3241,
      estimatedTime: "35-45 mins",
      deliveryFee: 3.99,
      minOrder: 20.00,
      distance: "2.1 km",
      isOpen: true,
      trending: false,
      promotion: "20% off on pasta dishes",
      image: "italian-restaurant.jpg",
      tags: ["pizza", "pasta", "italian"],
      dietaryOptions: ["vegetarian options", "gluten-free available"],
      menu: [
        {
          id: 1,
          name: "Truffle Mushroom Pizza",
          price: 18.99,
          description: "Wild mushrooms, truffle oil, mozzarella",
          calories: 780,
          preparationTime: "20 mins",
          spicyLevel: 0,
          allergies: ["dairy"],
          image: "truffle-pizza.jpg",
          popular: true,
          ingredients: ["mushrooms", "mozzarella", "truffle oil", "garlic"],
          customizations: ["extra cheese", "gluten-free base", "extra mushrooms"],
          rating: 4.9,
          reviews: 289,
          dietaryTags: ["vegetarian"]
        },
        {
          id: 2,
          name: "Seafood Linguine",
          price: 21.99,
          description: "Fresh seafood in white wine sauce",
          calories: 850,
          preparationTime: "25 mins",
          spicyLevel: 1,
          allergies: ["shellfish"],
          image: "seafood-pasta.jpg",
          popular: true,
          ingredients: ["linguine", "shrimp", "mussels", "white wine", "garlic"],
          customizations: ["extra seafood", "spicy", "light sauce"],
          rating: 4.7,
          reviews: 187
        }
      ]
    },
    {
      id: 3,
      name: "Sushi Master",
      cuisine: "Asian",
      rating: 4.6,
      totalRatings: 1876,
      estimatedTime: "40-50 mins",
      deliveryFee: 4.99,
      minOrder: 25.00,
      distance: "3.5 km",
      isOpen: true,
      trending: true,
      promotion: "Free miso soup with orders above $40",
      image: "sushi-restaurant.jpg",
      tags: ["sushi", "japanese", "asian"],
      dietaryOptions: ["gluten-free options", "vegan options"],
      menu: [
        {
          id: 1,
          name: "Premium Sushi Platter",
          price: 32.99,
          description: "Selection of premium nigiri and rolls",
          calories: 640,
          preparationTime: "30 mins",
          spicyLevel: 0,
          allergies: ["fish", "shellfish"],
          image: "sushi-platter.jpg",
          popular: true,
          ingredients: ["salmon", "tuna", "shrimp", "rice", "nori"],
          customizations: ["soy sauce", "extra wasabi", "no raw fish"],
          rating: 4.8,
          reviews: 234
        }
      ]
    }
  ];

  const getAiSuggestion = (menuItem) => {
    const suggestions = [];
    
    // Check allergies
    const allergyWarnings = menuItem.allergies.filter(allergy => allergies.includes(allergy));
    if (allergyWarnings.length > 0) {
      suggestions.push(`⚠️ Contains ${allergyWarnings.join(", ")}`);
    }

    // Check dietary preferences
    if (dietaryPreferences.includes('vegetarian') && menuItem.dietaryTags?.includes('vegetarian')) {
      suggestions.push("✅ Suitable for vegetarians");
    }

    // Personalized recommendation
    if (menuItem.rating >= 4.7 && menuItem.reviews > 200) {
      suggestions.push("🔥 Highly recommended based on your preferences");
    }

    return suggestions.length > 0 ? suggestions : ["✅ Safe to eat based on your preferences"];
  };

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const filteredRestaurants = dummyRestaurants
    .filter(restaurant => 
      (selectedCategory === 'All' || restaurant.cuisine === selectedCategory) &&
      (searchQuery === '' || 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'delivery':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'price':
          return a.deliveryFee - b.deliveryFee;
        default:
          return b.trending - a.trending;
      }
    });

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              className="w-full px-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select 
              className="px-4 py-2 border rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select 
              className="px-4 py-2 border rounded-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Top Rated</option>
              <option value="delivery">Fastest Delivery</option>
              <option value="price">Lowest Delivery Fee</option>
            </select>
          </div>
        </div>
        
        {/* Dietary Preferences Display */}
        <div className="flex flex-wrap gap-2 mb-4">
          {allergies.map(allergy => (
            <span key={allergy} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
              {allergy}
            </span>
          ))}
          {dietaryPreferences.map(pref => (
            <span key={pref} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {pref}
            </span>
          ))}
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Restaurants</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {filteredRestaurants.map(restaurant => (
            <div 
              key={restaurant.id} 
              className={`border p-4 rounded-lg cursor-pointer hover:border-indigo-600 transition-colors ${
                selectedRestaurant === restaurant.id ? 'border-indigo-600' : ''
              }`}
              onClick={() => setSelectedRestaurant(restaurant.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                  <p className="text-gray-600">{restaurant.cuisine}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span>{restaurant.rating}</span>
                      <span className="text-gray-500">({restaurant.totalRatings})</span>
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{restaurant.distance}</span>
                  </div>
                </div>
                {restaurant.trending && (
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                    🔥 Trending
                  </span>
                )}
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery fee: ${restaurant.deliveryFee}</span>
                  <span className="text-indigo-600">{restaurant.estimatedTime}</span>
                </div>
                {restaurant.promotion && (
                  <p className="text-green-600 text-sm">🎉 {restaurant.promotion}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {restaurant.dietaryOptions.map((option, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedRestaurant && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <section className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Min. order: ${dummyRestaurants.find(r => r.id === selectedRestaurant)?.minOrder}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    dummyRestaurants.find(r => r.id === selectedRestaurant)?.isOpen
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {dummyRestaurants.find(r => r.id === selectedRestaurant)?.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {dummyRestaurants
                  .find(r => r.id === selectedRestaurant)
                  ?.menu.map(item => (
                    <div key={item.id} className="border p-4 rounded-lg hover:border-indigo-200 transition-colors">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            {item.popular && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mt-1">{item.description}</p>
                          
                          <div className="flex flex-wrap gap-4 mt-2 text-sm">
                            <span className="text-gray-500">🕒 {item.preparationTime}</span>
                            <span className="text-gray-500">🔥 Spice: {"🌶️".repeat(item.spicyLevel)}</span>
                            <span className="text-gray-500">🍽️ {item.calories} cal</span>
                          </div>

                          <div className="mt-3 space-y-2">
                            {getAiSuggestion(item).map((suggestion, idx) => (
                              <p key={idx} className="text-sm text-indigo-600">
                                {suggestion}
                              </p>
                            ))}
                          </div>

                          <div className="mt-3">
                            <p className="text-sm text-gray-500">Ingredients:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {item.ingredients.map((ingredient, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {ingredient}
                                </span>
                              ))}
                            </div>
                          </div>

                          {item.dietaryTags && (
                            <div className="flex gap-2 mt-3">
                              {item.dietaryTags.map((tag, idx) => (
                                <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end text-yellow-400">
                            <span className="text-sm text-gray-600">{item.rating}</span>
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-current' : 'stroke-current'}`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{item.reviews} reviews</p>
                          <p className="font-semibold text-lg mt-2">${item.price.toFixed(2)}</p>
                          <button
                            onClick={() => addToCart(item)}
                            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors w-full"
                          >
                            Add to Order
                          </button>
                          
                          {item.customizations?.length > 0 && (
                            <div className="mt-3">
                              <select className="w-full text-sm border rounded-lg p-2">
                                <option value="">Customize</option>
                                {item.customizations.map((option, idx) => (
                                  <option key={idx} value={option}>{option}</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>

          {/* Cart Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Order</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-semibold">${dummyRestaurants.find(r => r.id === selectedRestaurant)?.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4">
                      <span>Total</span>
                      <span>${(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 
                        (dummyRestaurants.find(r => r.id === selectedRestaurant)?.deliveryFee || 0)).toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;