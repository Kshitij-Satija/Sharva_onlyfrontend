import React, { useState } from 'react';

function Friends() {
  const [friends] = useState([
    {
      id: 1,
      name: "Alice Smith",
      preferences: ["Italian", "Japanese"],
      allergies: ["peanuts"],
      status: "online"
    },
    {
      id: 2,
      name: "Bob Johnson",
      preferences: ["Mexican", "Indian"],
      allergies: ["dairy", "shellfish"],
      status: "offline"
    }
  ]);

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Friends</h2>
        <div className="space-y-4">
          {friends.map(friend => (
            <div key={friend.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{friend.name}</h3>
                    <span className={`w-2 h-2 rounded-full ${
                      friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Preferences: {friend.preferences.join(', ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      Allergies: {friend.allergies.join(', ')}
                    </p>
                  </div>
                </div>
                <div>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Order Together
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Group Orders</h2>
        <div className="text-center py-8 text-gray-500">
          No active group orders at the moment
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Friend</h2>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg"
            placeholder="Enter friend's email"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Send Invitation
          </button>
        </div>
      </section>
    </div>
  );
}

export default Friends;