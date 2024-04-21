import React, { useState } from 'react';

const MedTrack = () => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [intakeTime, setIntakeTime] = useState('');

  const handleAddMedication = () => {
    const medication = {
      name: medicationName,
      dosage: dosage,
      frequency: frequency,
      intakeTime: intakeTime
    };

    // Save medication details to local storage
    localStorage.setItem('medication', JSON.stringify(medication));

    // Clear form fields
    setMedicationName('');
    setDosage('');
    setFrequency('daily');
    setIntakeTime('');
  };

  return (
    <div>
      <h2>MedTrack - Medication Input</h2>
      <form>
        <div>
          <label>Medication Name:</label>
          <input
            type="text"
            value={medicationName}
            onChange={(e) => setMedicationName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Dosage:</label>
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Frequency:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div>
          <label>Intake Time:</label>
          <input
            type="time"
            value={intakeTime}
            onChange={(e) => setIntakeTime(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleAddMedication}>
          Add Medication
        </button>
      </form>
    </div>
  );
};

export default MedTrack;
