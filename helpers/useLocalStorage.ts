"use client";
import { useState, useEffect } from "react";

// Definicja hooka do zarządzania danymi w localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  // Sprawdzenie, czy obiekt window istnieje (czy jesteśmy w przeglądarce)
  const isClient = typeof window !== "undefined";

  // Pobranie wartości z localStorage podczas inicjalizacji (tylko jeśli jesteśmy w przeglądarce)
  const storedValue = isClient ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // Utworzenie stanu lokalnego
  const [value, setValue] = useState<T>(initial);

  // Zapisanie wartości do localStorage za każdym razem, gdy stan zostanie zaktualizowany (tylko jeśli jesteśmy w przeglądarce)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isClient]);

  return [value, setValue] as const;
}

export default useLocalStorage;
