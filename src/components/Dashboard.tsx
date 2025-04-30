'use client'
import React, { useState } from 'react';
import Members from './Member';
import StatCard from './StatCard';
import { useGlobalStore } from '@/store/global.store';
const  Dashboard = () => {
  const { totalMembers, activeMembers } = useGlobalStore()
  const stats = [
    {
      title: 'Toplam Üye',
      value: totalMembers,
      icon: '👥'
    },
    {
      title: 'Aktif Üyeler',
      value: activeMembers,
      icon: '💪'
    },
    {
      title: 'Pasif Üyeler',
      value: totalMembers - activeMembers,
      icon: '🚫'
    },
    {
      title: 'Bu Ayki Gelir',
      value: `₺${activeMembers * 2000}`,
      icon: '💰'
    }
  ];

  return (
    <div className="p-6 bg-gray-100 h-[calc(100dvh-64px)]">
      <h2 className="text-2xl font-bold mb-6">Spor Salonu Üye Takip Sistemi</h2>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
            <StatCard
            key={index}
            title={stat.title.toString()}
            value={stat.value.toString()}
            icon={stat.icon}
            />
        ))}
      </div>

      {/* Üye Listesi */}
      <h3 className="text-xl font-bold mt-8 mb-4">Üyeler</h3>
      <div className="bg-white rounded shadow overflow-x-auto">
        <Members />
      </div>
    </div>
  );
};

export default Dashboard;
