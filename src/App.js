import React, { useState, useEffect } from 'react';

function App() {
  const [medications, setMedications] = useState([]);
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [intakeTime, setIntakeTime] = useState('');
  const [validationError, setValidationError] = useState('');

  const addMedication = () => {
    if (!medName || !dosage || !frequency || !intakeTime) {
      setValidationError('All fields are required');
      return;
    }

    setMedications([...medications, { medName, dosage, frequency, intakeTime }]);
    setMedName('');
    setDosage('');
    setFrequency('');
    setIntakeTime('');
    setValidationError('');
  };

  const removeMedication = (index) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  const scheduleReminders = () => {
    medications.forEach((medication) => {
      const { medName, intakeTime } = medication;
      const now = new Date();
      const intakeTimeArray = intakeTime.split(':');
      const intakeHour = parseInt(intakeTimeArray[0], 10);
      const intakeMinute = parseInt(intakeTimeArray[1], 10);
      const intakeDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), intakeHour, intakeMinute);

      if (intakeDateTime > now) {
        const timeDifference = intakeDateTime.getTime() - now.getTime();
        setTimeout(() => {
          showReminderNotification(medName);
        }, timeDifference);
      }
    });
  };

  const showReminderNotification = (medName) => {
    new Notification('MedTrack Reminder', {
      body: `It's time to take your medication: ${medName}`,
      icon: 'path_to_your_icon',
    });
  };

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
    scheduleReminders();

    // Request permission for notifications
    Notification.requestPermission();
  }, [medications]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>MedTrack</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        addMedication();
      }} style={styles.form}>
        <input type="text" value={medName} onChange={(e) => setMedName(e.target.value)} placeholder="Medication Name" style={styles.input} />
        <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="Dosage" style={styles.input} />
        <input type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="Frequency" style={styles.input} />
        <input type="time" value={intakeTime} onChange={(e) => setIntakeTime(e.target.value)} style={styles.input} />
        <button type="submit" style={styles.addButton}>Add Medication</button>
        {validationError && <div style={styles.error}>{validationError}</div>}
      </form>
      <ul style={styles.medicationList}>
        {medications.map((medication, index) => (
          <li key={index} style={styles.medicationItem}>
            <div><strong>Medication Name:</strong> {medication.medName}</div>
            <div><strong>Dosage:</strong> {medication.dosage}</div>
            <div><strong>Frequency:</strong> {medication.frequency}</div>
            <div><strong>Intake Time:</strong> {medication.intakeTime}</div>
            <button onClick={() => removeMedication(index)} style={styles.removeButton}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    marginRight: '10px',
    padding: '5px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '5px',
  },
  medicationList: {
    listStyleType: 'none',
    padding: 0,
  },
  medicationItem: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  removeButton: {
    marginTop: '5px',
    padding: '5px 10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default App;
