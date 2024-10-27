import React, { useState } from 'react';

const SymptomSelection = () => {
  const [symptoms, setSymptoms] = useState({
    nausea: 'low',
    headaches: 'low',
    fever: 'low',
    bodyPains: 'low',
    breathlessness: 'low',
    description: '',
  });
  const [tips, setTips] = useState({
    nausea: '',
    headaches: '',
    fever: '',
    bodyPains: '',
    breathlessness: '',
  });

  const remedies = {
    nausea: {
      low: "Try sipping ginger tea or cold water to relieve mild nausea.",
      medium: "Avoid strong odors and try eating bland foods.",
      high: "Consider medication for nausea and stay hydrated. Consult a doctor if persistent.",
    },
    headaches: {
      low: "Rest in a dark, quiet room and try gentle neck stretches.",
      medium: "Drink water and try an over-the-counter pain reliever.",
      high: "Consider seeking medical attention for severe headaches.",
    },
    fever: {
      low: "Drink plenty of fluids and rest.",
      medium: "Use a cold compress and take fever-reducing medication if needed.",
      high: "High fever requires medical attention; contact your healthcare provider.",
    },
    bodyPains: {
      low: "Try light stretching or a warm bath for relief.",
      medium: "Consider over-the-counter pain relief and rest.",
      high: "For severe body pains, consult a doctor and avoid physical exertion.",
    },
    breathlessness: {
      low: "Practice deep breathing exercises to ease mild breathlessness.",
      medium: "Sit upright and focus on slow, deep breaths.",
      high: "Severe breathlessness may indicate a serious condition; seek medical help immediately.",
    },
  };

  const handleSymptomChange = (e) => {
    const { name, value } = e.target;
    setSymptoms((prevSymptoms) => ({
      ...prevSymptoms,
      [name]: value,
    }));
    setTips((prevTips) => ({
      ...prevTips,
      [name]: remedies[name][value],
    }));
  };

  const handleDescriptionChange = (e) => {
    setSymptoms((prevSymptoms) => ({
      ...prevSymptoms,
      description: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Symptoms:', symptoms);
    alert('Symptoms submitted!');
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
    <h2 className="text-3xl font-bold mb-6 text-red-400">Select Your Symptoms</h2>
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
      {['nausea', 'headaches', 'fever', 'bodyPains', 'breathlessness'].map((symptom) => (
        <div key={symptom} className="mb-5">
          <label className="block text-sm font-semibold text-gray-300 capitalize">{symptom}:</label>
          <select
            name={symptom}
            value={symptoms[symptom]}
            onChange={handleSymptomChange}
            className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:border-red-400 focus:ring-red-400 bg-gray-700 text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <p className="mt-2 text-sm text-gray-400 italic">{tips[symptom]}</p>
        </div>
      ))}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-300">Descriptive Answer:</label>
        <textarea
          name="description"
          value={symptoms.description}
          onChange={handleDescriptionChange}
          className="w-full mt-1 p-3 border border-gray-600 rounded-md focus:border-red-400 focus:ring-red-400 bg-gray-700 text-white"
          placeholder="Describe your symptoms here..."
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-red-400 text-gray-900 font-semibold rounded-md hover:bg-red-500 transition duration-300"
      >
        Submit
      </button>
    </form>
  </div>
  
  );
};

export default SymptomSelection;
