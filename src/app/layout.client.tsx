'use client'
import AddMemberModal from "@/components/AddMember";
import Header from "@/components/Header";
import React, { useState } from "react";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
       <Header activeTab="dashboard" onTabChange={() => {}} onAddMemberClick={() => {
        setIsModalOpen(true);
       }} />
          {children}
          <AddMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </React.Fragment>
  );
}
