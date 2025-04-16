import React from 'react';

function AccessCard({ title, description, buttonText, bgColor, textColor, onClick }) {
  return (
    <div className={`bg-gradient-to-r ${bgColor} rounded-lg shadow-lg p-6 text-white`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4 opacity-80">{description}</p>
      <button 
        onClick={onClick} 
        className={`px-4 py-2 bg-white ${textColor} rounded-lg hover:bg-opacity-90 transition-colors`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default AccessCard;