import React, { useState, useEffect } from 'react';


const Greeting = () => {
  const [currentName, setCurrentName] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);

  const names = ['Bangaram', 'Baby', 'Mardala', 'Baby','Rakshashi', 'Bujji', 'Kanna'];
  const colors = ['#007BFF', '#FFC107', '#28A745', '#DC3545', '#6610f2', '#17a2b8'];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < names.length) {
        setCurrentName(names[index]);
        index++;
      } else {
        clearInterval(interval);
        setShowGreeting(true);
      }
    }, 2000); // Change name every 2 seconds

    return () => clearInterval(interval);
  }, []); //eslint-disable-line

  return (
    <div className="greeting-container">
      <div className={showGreeting ? "greeting-message" : "greeting-name"} style={{ color: showGreeting ? '#DC3545' : colors[names.indexOf(currentName)] }}>
        {showGreeting ? 'Satya Bangaram I Love You' : currentName}
      </div>
    </div>
  );
};

export default Greeting;
