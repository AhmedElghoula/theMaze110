// components/ReminderList.js
import React from 'react';

function ReminderList({reminders}) {
  // Fetch reminders from local storage or backend


  return (
    <div className="reminder-list">
      <h2>Upcoming Reminders</h2>
      <ul>
        {reminders?.map((reminder, index) => (
          <li key={index}>{reminder}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReminderList;
