"use client";

import { use, useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });
  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Store"
      description="Are you sure you want to delete this store? This action cannot be undone."
    >
      <div className="flex flex-row justify-end gap-3">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
          confirm
        </Button>
      </div>
    </Modal>
  );
};
