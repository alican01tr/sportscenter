'use client'
import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '@/store/global.store'
import { Member } from '@/store/store.type';
import { Gender } from '@/types/gender.type';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
const AddMemberSchema = z.object({
    name: z.string({
      message: 'Bu alan zorunludur.',
    })
    .min(3, { message: 'Bu alan en az 3 karakter olmalıdır.' })
    .regex(/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/, {
        message: 'Sadece harflerden oluşmalıdır.',
      }),
    surname: z
      .string({
        message: 'Bu alan zorunludur.',
      })
      .regex(/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/, {
        message: 'Sadece harflerden oluşmalıdır.',
      })
      .min(3, { message: 'Bu alan en az 3 karakter olmalıdır.' }),
    identityNumber: z
      .string({
        message: 'Bu alan zorunludur.',
      })
      .min(11, { message: 'Bu alan 11 karakter olmalıdır.' })
      .regex(/^\d+$/, {
        message: 'Bu alan sayısal olmalıdır.',
      }),
    phone: z
      .string({
        message: 'Bu alan zorunludur.',
      })
      .min(11, { message: 'Bu alan zorunludur.' }),
    height: z
      .number({
        message: 'Bu alan numara zorunludur.',
      })
      .min(1, { message: 'Bu alan minimum 1 olmalıdır.' })
      .max(999, { message: 'Bu alan maksimum 999 olmalıdır.' }),
    weight: z
      .number({
        message: 'Bu alan zorunludur.',
      })
      .min(1, { message: 'Bu alan minimum 1 olmalıdır.' })
      .max(999, { message: 'Bu alan maksimum 999 olmalıdır.' }),
    gender: z
      .enum(['male', 'female'], { message: 'Bu alan zorunludur.' }),
    memberStartDate: z
      .date({
        message: 'Bu alan zorunludur.'
      }),
    memberEndDate: z
      .date({
        message: 'Bu alan zorunludur.'
      })
  })

const AddMemberModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const today = new Date().toISOString().split('T')[0];
  const { members, setMembers } = useGlobalStore()
  const [ defaultValues, setDefaultValues] = useState<z.infer<typeof AddMemberSchema>>({
    name: '',
    surname: '',
    identityNumber: '',
    phone: '',
    height: 0,
    weight: 0,
    gender: 'male',
    memberStartDate: new Date(today),
    memberEndDate: new Date(today),
  })
  const form = useForm<z.infer<typeof AddMemberSchema>>({
    resolver: zodResolver(AddMemberSchema),
    defaultValues: defaultValues,
  })

  const handleSubmit = (data: z.infer<typeof AddMemberSchema>) => {
    alert('Üye başarıyla eklendi!');
    console.log('Üye bilgileri:', data);
    setMembers([...members, {
        id: members.length + 1,
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        height: data.height,
        weight: data.weight,
        gender: data.gender,
        memberStartDate: data.memberStartDate,
        memberEndDate: data.memberEndDate,
        identityNumber: data.identityNumber
    }])
    onClose();
    form.reset();
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
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Kişisel Bilgiler</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Ad
                  </label>
                  <input

                    name="name"
                    onChange={(e) => { form.setValue('name', e.target.value) }}
                    type="text"
                    value={form.watch('name')}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  />
                  {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Soyad
                  </label>
                  <input
                    name="surname"
                    onChange={(e) => { form.setValue('surname', e.target.value) }}
                    type="text"
                    value={form.watch('surname')}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    TC Kimlik Numarası
                  </label>
                  <input
                    name="identityNumber"
                    onChange={(e) => { form.setValue('identityNumber', e.target.value) }}
                    type="text"
                    value={form.watch('identityNumber')}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  />
                  {form.formState.errors.identityNumber && <p className="text-red-500 text-sm">{form.formState.errors.identityNumber.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Telefon
                  </label>

                  <input
                    name="phone"
                    onChange={(e) => { form.setValue('phone', e.target.value) }}
                    type="text"
                    value={form.watch('phone')}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  />
                  {form.formState.errors.phone && <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Boy (cm)
                  </label>
                  <input
                    name="height"
                    onChange={(e) => { console.log(parseInt(e.target.value)); form.setValue('height', parseInt(e.target.value)) }}
                    type="number"

                    value={form.watch('height')}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  />
                  {form.formState.errors.height && <p className="text-red-500 text-sm">{form.formState.errors.height.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Kilo (kg)
                  </label>
                  <input
                    name="weight"
                    onChange={(e) => { form.setValue('weight', parseInt(e.target.value)) }}
                    type="number"
                    value={form.watch('weight')}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  />
                  {form.formState.errors.weight && <p className="text-red-500 text-sm">{form.formState.errors.weight.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Cinsiyet
                  </label>
                  <select
                    name="gender"
                    onChange={(e) => { form.setValue('gender', e.target.value as Gender) }}
                    value={form.watch('gender')}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  >
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                  </select>
                  {form.formState.errors.gender && <p className="text-red-500 text-sm">{form.formState.errors.gender.message}</p>}
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
                    name="memberStartDate"
                    type="date"
                    value={(form.watch('memberStartDate')).toISOString().split('T')[0]}
                    onChange={(e) => { form.setValue('memberStartDate', new Date(e.target.value)) }}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  />
                  {form.formState.errors.memberStartDate && <p className="text-red-500 text-sm">{form.formState.errors.memberStartDate.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Bitiş Tarihi
                  </label>
                  <input
                    name="memberEndDate"
                    type="date"
                    value={(form.watch('memberEndDate')).toISOString().split('T')[0]}
                    onChange={(e) => { form.setValue('memberEndDate', new Date(e.target.value)) }}
                    className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  />
                  {form.formState.errors.memberEndDate && <p className="text-red-500 text-sm">{form.formState.errors.memberEndDate.message}</p>}
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
