"use client";

import { useCardModal } from "@/hoooks/use-card-modal";
import { useEffect, useState } from "react";
import CardModal from "../modals/card-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { id } = useCardModal();

  useEffect(() => {
    if (id) {
      setIsMounted(true);
    }
  }, [id]);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CardModal />
    </>
  );
};

export default ModalProvider;
