'use client'
import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '@/store/global.store'
import { Member } from '@/store/store.type';
import { Gender } from '@/types/gender.type';
const AddMemberModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const today = new Date().toISOString().split('T')[0];
  const { members, setMembers } = useGlobalStore()

  const [form, setForm] = useState<Member>({
    id: 0,
    name: '',
    surname: '',
    phone: '',
    height: 0,
    weight: 0,
    gender: 'male',
    memberStartDate: new Date(today),
    memberEndDate: new Date(today),
    identityNumber: ''
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        ...form,
        name: '',
        surname: '',
        phone: '',
        height: 0,
        weight: 0,
        gender: 'male',
        memberStartDate: new Date(today),
        memberEndDate: new Date(today)
      });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'memberStartDate' || name === 'memberEndDate') {
      setForm({ ...form, [name]: new Date(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Üye başarıyla eklendi!');
    console.log('Üye bilgileri:', form);
    setMembers([...members, {
        id: members.length + 1,
        name: form.name,
        surname: form.surname,
        phone: form.phone,
        height: form.height,
        weight: form.weight,
        gender: form.gender,
        memberStartDate: form.memberStartDate,
        memberEndDate: form.memberEndDate,
        identityNumber: form.identityNumber
    }])
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto relative z-10">
        <div className="bg-blue-600 text-white py-4 px-6 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">ÜYE EKLE</h2>
          <button
            className="cursor-pointer text-white hover:text-gray-200 text-2xl font-bold focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Kişisel Bilgiler</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Ad
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Soyad
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={form.surname}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    TC Kimlik Numarası
                  </label>
                  <input
                    type="text"
                    name="identityNumber"
                    value={form.identityNumber}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Telefon
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Boy (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    placeholder="170"
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Kilo (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    min="30"
                    max="250"
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Cinsiyet
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value as Gender })}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                    required
                  >
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Üyelik Bilgileri</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Başlangıç Tarihi
                  </label>
                  <input
                    type="date"
                    name="memberStartDate"
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    name="memberEndDate"
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 border-t pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                İptal
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Üye Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
