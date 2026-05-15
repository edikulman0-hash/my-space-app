"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("astro_admin_session");
    if (session === "active") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "mars2026") {
        localStorage.setItem("astro_admin_session", "active");
        setIsAuthenticated(true);
        setIsLoading(false);
        router.push("/admin"); // Перенаправляем на главный экран админки
      } else {
        setError("ОШИБКА: Неверный идентификатор или ключ доступа подсистемы.");
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("astro_admin_session");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    router.push("/admin/login"); // Выкидываем обратно на экран входа
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    isAuthenticated,
    handleLogin,
    handleLogout
  };
}