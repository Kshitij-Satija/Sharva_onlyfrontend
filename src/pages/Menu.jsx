import React, { useState } from 'react';

function Menu() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [allergies] = useState(['peanuts', 'dairy']);

  const dummyRestaurants = [
    {
      id: 1,
      name: "Burger King",
      cuisine: "Fast Food",
      rating: 4.2,
      estimatedTime: "30-40 mins",
      menu: [
        { id: 1, name: "Whopper", price: 5.99, description: "Flame-grilled beef burger" },
        { id: 2, name: "Chicken Royale", price: 4.99, description: "Crispy chicken burger" }
      ]
    },
    {
      id: 2,
      name: "Pizza Hut",
      cuisine: "Italian",
      rating: 4.0,
      estimatedTime: "40-50 mins",
      menu: [
        { id: 1, name: "Margherita", price: 8.99, description: "Classic cheese pizza" },
        { id: 2, name: "Pepperoni", price: 10.99, description: "Spicy pepperoni pizza" }
      ]
    }
  ];

  const getAiSuggestion = (menuItem) => {
    // Dummy AI suggestion based on allergies
    if (allergies.includes('dairy') && menuItem.name.toLowerCase().includes('cheese')) {
      return "Warning: Contains dairy";
    }
    return "Safe to eat based on your allergies";
  };

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Restaurants</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {dummyRestaurants.map(restaurant => (
            <div 
              key={restaurant.id} 
              className={`border p-4 rounded-lg cursor-pointer ${
                selectedRestaurant === restaurant.id ? 'border-indigo-600' : ''
              }`}
              onClick={() => setSelectedRestaurant(restaurant.id)}
            >
              <h3 className="font-semibold text-lg">{restaurant.name}</h3>
              <p className="text-gray-600">{restaurant.cuisine}</p>
              <div className="flex justify-between mt-2">
                <span>⭐ {restaurant.rating}</span>
                <span className="text-indigo-600">{restaurant.estimatedTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedRestaurant && (
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu</h2>
          <div className="space-y-4">
            {dummyRestaurants
              .find(r => r.id === selectedRestaurant)
              ?.menu.map(item => (
                <div key={item.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-sm text-indigo-600 mt-2">
                        {getAiSuggestion(item)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.price}</p>
                      <button className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700">
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Menu;