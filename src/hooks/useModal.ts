import { useState, useEffect, useCallback } from "react";

export const useModal = <T>(storageKey: string) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  useEffect(() => {
    const savedItem = localStorage.getItem(storageKey);
    if (savedItem) {
      setSelectedItem(JSON.parse(savedItem));
    }
  }, [storageKey]);

  const openModal = useCallback(
    (item: T) => {
      setSelectedItem(item);
      localStorage.setItem(storageKey, JSON.stringify(item));
    },
    [storageKey]
  );

  const closeModal = useCallback(() => {
    setSelectedItem(null);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    selectedItem,
    openModal,
    closeModal,
  };
};
