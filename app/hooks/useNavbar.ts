"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function useNavbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Автоматически закрываем бургер при смене роута
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return {
    isOpen,
    toggleMenu,
    closeMenu
  };
}