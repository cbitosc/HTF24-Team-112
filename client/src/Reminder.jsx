import React, { useState, useEffect } from 'react';

const Reminder = () => {
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [times, setTimes] = useState('');

  // Request notification permission on load
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const addMedicine = () => {
    if (!medicineName || !dosage || !frequency || !times) {
      alert('Please fill in all fields');
      return;
    }

    const newMedicine = {
      id: Date.now(),
      name: medicineName,
      dosage,
      frequency,
      times: times.split(',').map(time => time.trim()),
    };

    setMedicines([...medicines, newMedicine]);
    setMedicineName('');
    setDosage('');
    setFrequency('');
    setTimes('');
  };

  const deleteMedicine = (id) => {
    setMedicines(medicines.filter(medicine => medicine.id !== id));
  };

  const sendNotification = (medicine) => {
    if (Notification.permission === 'granted') {
      new Notification(`Time to take your medicine: ${medicine.name}`, {
        body: `Dosage: ${medicine.dosage}`,
      });
    }
  };

  // Check every minute if it's time for any medication
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      medicines.forEach(medicine => {
        if (medicine.times.includes(currentTime)) {
          sendNotification(medicine);
        }
      });
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [medicines]);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-md text-white">
      <h1 className="text-3xl font-bold text-center text-red-400 mb-6">Medicines Reminder</h1>
  
      <input
        type="text"
        placeholder="Medicine Name"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:border-red-400 text-white"
      />
      <input
        type="text"
        placeholder="Dosage (e.g., 500mg)"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:border-red-400 text-white"
      />
      <input
        type="text"
        placeholder="Frequency (e.g., twice a day)"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:border-red-400 text-white"
      />
      <input
        type="text"
        placeholder="Times (e.g., 9:00 AM, 5:00 PM)"
        value={times}
        onChange={(e) => setTimes(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:border-red-400 text-white"
      />
  
      <button
        onClick={addMedicine}
        className="w-full p-3 bg-red-400 text-gray-900 font-semibold rounded-lg hover:bg-red-500 transition duration-300"
      >
        Add Medicine
      </button>
  
      <div className="mt-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="p-4 mb-4 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-lg font-semibold text-red-400">{medicine.name}</h3>
            <p className="text-gray-300">Dosage: {medicine.dosage}</p>
            <p className="text-gray-300">Frequency: {medicine.frequency}</p>
            <p className="text-gray-300">Times: {medicine.times.join(', ')}</p>
            <button
              onClick={() => deleteMedicine(medicine.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-gray-900 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Reminder;
