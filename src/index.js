// index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MedicationForm from './components/MedicationForm';
import ReminderList from './components/ReminderList';

function Index() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const storedMeds = JSON.parse(localStorage.getItem('medications')) || [];
    setMedications(storedMeds);
  }, []);

  const addMedication = (medication) => {
    const newMedications = [...medications, medication];
    setMedications(newMedications);
    localStorage.setItem('medications', JSON.stringify(newMedications));
  };

  return (
    <React.StrictMode>
      <App />
 
    </React.StrictMode>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
