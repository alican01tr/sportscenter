// components/StatCard.js
import React from 'react';

const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
    <div className="flex justify-between">
      <span>{title}</span>
      <span className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
        {icon}
      </span>
    </div>
    <div className="text-2xl font-bold mt-2">{value}</div>
  </div>
  );
};

export default StatCard;
