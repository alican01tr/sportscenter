
'use client'
import React from 'react';
import { useGlobalStore } from '@/store/global.store'
const Members = () => {
  const { members, setMembers, paymentComingMembersIds } = useGlobalStore()

  return (
    <div>
      <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Ad Soyad</th>
              <th className="px-4 py-2 text-left">Başlangıç Tarihi</th>
              <th className="px-4 py-2 text-left">Bitiş Tarihi</th>
              <th className="px-4 py-2 text-left">Durum</th>
            </tr>
          </thead>
          <tbody>
            {members.sort((a, b) => b.id - a.id).map(member => (
              <tr key={member.id} className={`border-t ${paymentComingMembersIds.includes(member.id) ? 'bg-red-400' : ''}`}>
                <td className="px-4 py-2">{member.id}</td>
                <td className="px-4 py-2">{member.name}</td>
                <td className="px-4 py-2">{new Date(member.memberStartDate).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                <td className="px-4 py-2">{new Date(member.memberEndDate).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    new Date(member.memberEndDate) >= new Date() ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {new Date(member.memberEndDate) >= new Date() ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
};

export default Members;
