"use client";

import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import ConfirmationDialog from "@/components/shared/confirm dialog/confirmationDialog";

interface DeleteButtonProps {
  onDelete: () => void;
}
const MemberDeleteButton = ({ onDelete }: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const handleDeleteUser = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        <FaTrashAlt className="text-red-600 hover:red-blue-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none" />
      </button>
      <ConfirmationDialog
        title="Delete Member"
        description="This will permanently delete the user account and remove all their data from our servers."
        open={open}
        setOpen={setOpen}
        confirm={handleDeleteUser}
      />
    </>
  );
};

export default MemberDeleteButton;
