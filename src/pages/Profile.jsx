import React, { useState } from 'react';

function Profile() {
  const [allergies, setAllergies] = useState([
    { id: 1, name: 'peanuts' },
    { id: 2, name: 'dairy' }
  ]);

  const [preferences] = useState([
    { id: 1, category: 'Cuisine', value: 'Italian' },
    { id: 2, category: 'Spice Level', value: 'Medium' }
  ]);

  const [newAllergy, setNewAllergy] = useState('');

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([
        ...allergies,
        { id: allergies.length + 1, name: newAllergy.trim() }
      ]);
      setNewAllergy('');
    }
  };

  const removeAllergy = (id) => {
    setAllergies(allergies.filter(allergy => allergy.id !== id));
  };

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              defaultValue="John Doe"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              defaultValue="john@example.com"
            />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Allergies</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg"
              placeholder="Add new allergy"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
            />
            <button
              onClick={addAllergy}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {allergies.map(allergy => (
              <div
                key={allergy.id}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{allergy.name}</span>
                <button
                  onClick={() => removeAllergy(allergy.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Food Preferences</h2>
        <div className="space-y-4">
          {preferences.map(pref => (
            <div key={pref.id} className="flex justify-between items-center">
              <span className="text-gray-700">{pref.category}</span>
              <span className="font-semibold">{pref.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Profile;