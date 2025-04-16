import React from 'react';

function StatCard({ title, value, bgColor, textColor, icon }) {
  return (
    <div className={`${bgColor} ${textColor} rounded-lg shadow-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-75">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
        </div>
        <div className="text-2xl opacity-75">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;