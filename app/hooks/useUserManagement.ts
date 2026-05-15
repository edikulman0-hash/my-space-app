"use client";

import { useState } from "react";

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: "admin" | "operator" | "analyst";
  status: "active" | "suspended";
  lastActive: string;
}

export function useUserManagement() {
  // Исходное состояние базы данных пользователей терминала
  const [users, setUsers] = useState<UserType[]>([
    { id: "OP-089", name: "Алексей Новиков", email: "novikov@astro.control", role: "admin", status: "active", lastActive: "10 мин назад" },
    { id: "OP-112", name: "Елена Костылева", email: "kostyleva@astro.control", role: "operator", status: "active", lastActive: "2 ч назад" },
    { id: "OP-043", name: "Михаил Зубов", email: "zubov@astro.control", role: "analyst", status: "suspended", lastActive: "3 дня назад" },
    { id: "OP-201", name: "Дмитрий Серов", email: "serov@astro.control", role: "operator", status: "active", lastActive: "В сети" }
  ]);

  // Состояния фильтрации и поиска
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "operator" | "analyst">("all");

  // Состояния модальных окон
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  // Формы ввода данных
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "operator" as "admin" | "operator" | "analyst",
    status: "active" as "active" | "suspended"
  });

  // Логика фильтрации списка пользователей
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.id.includes(searchQuery);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Добавление нового оператора
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserType = {
      id: `OP-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      lastActive: "Только что"
    };
    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
    setFormData({ name: "", email: "", role: "operator", status: "active" });
  };

  // Инициализация редактирования
  const handleEditClick = (user: UserType) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsEditModalOpen(true);
  };

  // Сохранение изменений оператора
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...formData } : u));
    setIsEditModalOpen(false);
    setCurrentUser(null);
    setFormData({ name: "", email: "", role: "operator", status: "active" });
  };

  // Удаление (деактивация) оператора
  const handleDeleteUser = (id: string) => {
    if (confirm(`Вы уверены, что хотите деактивировать доступ для протокола ${id}?`)) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return {
    users,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    currentUser,
    formData,
    setFormData,
    filteredUsers,
    handleAddUser,
    handleEditClick,
    handleUpdateUser,
    handleDeleteUser
  };
}