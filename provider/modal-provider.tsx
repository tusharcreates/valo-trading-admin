"use client";

import { StoreModalProvider } from "@/components/modals/store-modal";
import React, { useEffect } from "react";

export const modalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <StoreModalProvider />;
};
