import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const dummyOrders = [
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      restaurant: "Pizza Palace",
      items: ["Margherita Pizza", "Garlic Bread"],
      status: "In Queue",
      estimatedTime: "30-35 min",
      location: "Kitchen",
      driver: "John D.",
      price: 28.99
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      restaurant: "Burger Barn",
      items: ["Classic Burger", "Fries", "Milkshake"],
      status: "Preparing",
      estimatedTime: "15-20 min",
      location: "On the way",
      driver: "Sarah M.",
      price: 24.50
    }
  ];

  const aiRecommendation = {
    dish: "Margherita Pizza",
    restaurant: "Pizza Palace",
    reason: "Based on your recent orders, preference for Italian cuisine, and current weather (perfect for pizza!)",
    confidence: 95
  };

  const friendActivity = [
    {
      id: 1,
      name: "Alex",
      action: "just ordered from Sushi Master",
      time: "2 minutes ago"
    },
    {
      id: 2,
      name: "Maria",
      action: "is looking at Thai Garden menu",
      time: "5 minutes ago"
    },
    {
      id: 3,
      name: "John",
      action: "rated Burger Barn 5 stars",
      time: "15 minutes ago"
    }
  ];

  const recentOrders = [
    {
      id: 1,
      restaurant: "Sushi Master",
      items: ["California Roll", "Miso Soup"],
      date: "Yesterday",
      rating: 5
    },
    {
      id: 2,
      restaurant: "Thai Garden",
      items: ["Pad Thai", "Green Curry"],
      date: "2 days ago",
      rating: 4
    },
    {
      id: 3,
      restaurant: "Pizza Palace",
      items: ["Pepperoni Pizza", "Cola"],
      date: "Last week",
      rating: 5
    }
  ];

  const promotions = [
    {
      id: 1,
      restaurant: "Burger Barn",
      offer: "Get 20% off on combo meals",
      code: "COMBO20",
      expiresIn: "2 days"
    },
    {
      id: 2,
      restaurant: "Sushi Master",
      offer: "Free California Roll on orders above $30",
      code: "SUSHI30",
      expiresIn: "5 days"
    }
  ];

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Orders</h2>
        <div className="space-y-4">
          {dummyOrders.map(order => (
            <div key={order.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{order.restaurant}</h3>
                <span className="text-indigo-600">{order.status}</span>
              </div>
              <div className="mt-2 space-y-2">
                <p className="text-gray-600">Order #{order.orderNumber}</p>
                <p className="text-gray-600">Items: {order.items.join(', ')}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Estimated time: {order.estimatedTime}</p>
                  <p className="text-gray-600">{order.location}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Driver: {order.driver}</p>
                  <p className="font-semibold">${order.price}</p>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600" 
                    style={{ width: order.status === "In Queue" ? "30%" : "70%" }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Recommendation</h2>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-indigo-600">
                  {aiRecommendation.dish} from {aiRecommendation.restaurant}
                </h3>
                <p className="text-gray-600 mt-2">{aiRecommendation.reason}</p>
              </div>
              <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                {aiRecommendation.confidence}% Match
              </div>
            </div>
            <Link 
              to="/menu" 
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Order Now
            </Link>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Friend Activity</h2>
          <div className="space-y-4">
            {friendActivity.map(activity => (
              <div key={activity.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-gray-800">
                    <span className="font-semibold">{activity.name}</span> {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">{order.restaurant}</h3>
                  <p className="text-sm text-gray-600">{order.items.join(', ')}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < order.rating ? 'fill-current' : 'stroke-current'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <button className="text-indigo-600 text-sm hover:text-indigo-800 mt-2">
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Special Offers</h2>
          <div className="space-y-4">
            {promotions.map(promo => (
              <div key={promo.id} className="border border-dashed border-indigo-300 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-indigo-600">{promo.restaurant}</h3>
                    <p className="text-gray-800 mt-1">{promo.offer}</p>
                    <p className="text-sm text-gray-500 mt-2">Expires in: {promo.expiresIn}</p>
                  </div>
                  <div className="bg-indigo-50 px-3 py-1 rounded-lg">
                    <p className="text-indigo-600 font-mono">{promo.code}</p>
                  </div>
                </div>
                <Link 
                  to="/menu" 
                  className="mt-3 inline-block text-indigo-600 text-sm hover:text-indigo-800"
                >
                  Order Now →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Link 
            to="/menu" 
            className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100"
          >
            <h3 className="font-semibold">Browse Menu</h3>
            <p className="text-gray-600 text-sm mt-1">Explore restaurants</p>
          </Link>
          <Link 
            to="/friends" 
            className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100"
          >
            <h3 className="font-semibold">Group Order</h3>
            <p className="text-gray-600 text-sm mt-1">Order with friends</p>
          </Link>
          <Link 
            to="/profile" 
            className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100"
          >
            <h3 className="font-semibold">Preferences</h3>
            <p className="text-gray-600 text-sm mt-1">Update your taste</p>
          </Link>
          <Link 
            to="/order-history" 
            className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100"
          >
            <h3 className="font-semibold">Past Orders</h3>
            <p className="text-gray-600 text-sm mt-1">View history</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;