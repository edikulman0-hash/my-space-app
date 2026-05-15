"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAdminAuth } from "@/app/hooks/useAdminAuth";
import { useUserManagement } from "@/app/hooks/useUserManagement";
import { 
  UserPlus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Shield, 
  ShieldAlert, 
  Terminal, 
  LogOut,
  Activity,
  Server,
  Cpu
} from "lucide-react";

export default function AdminDashboardPage() {
  const { handleLogout } = useAdminAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "dashboard";

  const {
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
  } = useUserManagement();

  // Локальная обёртка для безопасного и чистого выхода на главную страницу без 404
  const executeLogout = () => {
    localStorage.removeItem("astro_admin_session");
    // Оповещаем корневой макет о том, что сессия закрыта
    window.dispatchEvent(new Event("admin_logout"));
    // Безопасно редиректим пользователя на главную страницу сайта
    router.push("/");
  };

  return (
    <div className="w-full min-h-screen font-mono bg-slate-950 text-slate-100 selection:bg-red-500 selection:text-white flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1 flex flex-col">
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scan {
            0% { top: -100%; }
            100% { top: 200%; }
          }
          .group-hover\\:animate-scan:hover::after {
            content: "";
            position: absolute;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.4), transparent);
            box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
            animation: scan 1.5s linear infinite;
          }
          .group-hover\\:animate-scan-red:hover::after {
            content: "";
            position: absolute;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to bottom, transparent, rgba(239, 68, 68, 0.4), transparent);
            box-shadow: 0 0 12px rgba(239, 68, 68, 0.6);
            animation: scan 1.5s linear infinite;
          }
        `}} />

        <header className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-6 shrink-0">
          <div>
            <h1 className="text-2xl font-black text-slate-100 uppercase tracking-tight flex items-center gap-2">
              <Terminal className="text-red-500" size={22} /> 
              {activeTab === "dashboard" ? "Главный Терминал Мониторинга" : "Управление Персоналом Терминала"}
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
              {activeTab === "dashboard" 
                ? "Центральный узел // Телеметрия активности ядра и системных ресурсов" 
                : "Безопасный шлюз авторизации // Мониторинг прав доступа операторов"
              }
            </p>
          </div>
          <button
            onClick={executeLogout}
            className="flex items-center gap-2 bg-red-950/40 hover:bg-red-900/40 border border-red-800 text-red-400 text-xs uppercase px-4 py-2 transition-colors"
          >
            <LogOut size={14} /> Завершить сессию
          </button>
        </header>

        {activeTab === "dashboard" && (
          <div className="space-y-6 flex-1 flex flex-col justify-start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
              
              {/* Карточка 1 */}
              <div 
                onDragStart={(e) => e.preventDefault()}
                className="bg-slate-900/30 border border-slate-900 p-6 relative overflow-hidden group group-hover:animate-scan cursor-grab active:cursor-grabbing active:scale-[0.98] select-none transition-all"
              >
                <div className="absolute top-0 right-0 p-4 text-emerald-500"><Activity size={20} /></div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Статус Системы</div>
                <div className="text-xl font-black text-emerald-400 mt-2">ONLINE // SECURE</div>
                <div className="text-[9px] text-slate-600 uppercase tracking-wider mt-1">Все шлюзы авторизации стабильны</div>
              </div>

              {/* Карточка 2 */}
              <div 
                onDragStart={(e) => e.preventDefault()}
                className="bg-slate-900/30 border border-slate-900 p-6 relative overflow-hidden group group-hover:animate-scan cursor-grab active:cursor-grabbing active:scale-[0.98] select-none transition-all"
              >
                <div className="absolute top-0 right-0 p-4 text-blue-500"><Server size={20} /></div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Активные Сессии</div>
                <div className="text-xl font-black text-blue-400 mt-2">{filteredUsers.filter(u => u.status === 'active').length} OPERATORS</div>
                <div className="text-[9px] text-slate-600 uppercase tracking-wider mt-1">Выделенные токены верифицированы</div>
              </div>

              {/* Карточка 3 */}
              <div 
                onDragStart={(e) => e.preventDefault()}
                className="bg-slate-900/30 border border-slate-900 p-6 relative overflow-hidden group group-hover:animate-scan-red cursor-grab active:cursor-grabbing active:scale-[0.98] select-none transition-all"
              >
                <div className="absolute top-0 right-0 p-4 text-red-500"><Cpu size={20} /></div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Загрузка Ядра</div>
                <div className="text-xl font-black text-red-400 mt-2">0.24% SYSLOAD</div>
                <div className="text-[9px] text-slate-600 uppercase tracking-wider mt-1">Оптимизация NextJS выполнена</div>
              </div>
            </div>

            {/* Системный лог */}
            <div 
              onDragStart={(e) => e.preventDefault()}
              className="bg-slate-900/20 border border-slate-900 p-6 relative overflow-hidden group group-hover:animate-scan cursor-grab active:cursor-grabbing active:scale-[0.99] select-none transition-all flex-1 min-h-[150px]"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Shield size={14} className="text-blue-500" /> Системный Лог Безопасности
              </h3>
              <div className="space-y-2 text-[11px] text-slate-500">
                <div className="flex gap-4"><span className="text-blue-500">[15:33:10]</span> <span>AUTH_SUCCESS: Сессия администратора инициализирована на хосте.</span></div>
                <div className="flex gap-4"><span className="text-blue-500">[15:31:02]</span> <span>ROUTE_CLEANUP: Устаревшие modules авторизации успешно декомпилированы.</span></div>
                <div className="flex gap-4"><span className="text-emerald-500">[15:30:00]</span> <span>CORE_READY: Система Astro готова к обработке CRUD запросов.</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="flex-1 flex flex-col justify-start">
            <div className="bg-slate-950 border border-slate-900 p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex flex-wrap items-center gap-4 flex-1 max-w-2xl">
                <div className="relative flex-1 min-w-[240px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск оператора по ID, имени или e-mail..."
                    className="w-full bg-slate-900 border border-slate-800 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500/50"
                  />
                </div>
                
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-none">
                  <Filter size={12} className="text-slate-500" />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value as any)}
                    className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer uppercase font-mono"
                  >
                    <option value="all" className="bg-slate-950">Все Сигнатуры</option>
                    <option value="admin" className="bg-slate-950">Администраторы</option>
                    <option value="operator" className="bg-slate-950">Операторы</option>
                    <option value="analyst" className="bg-slate-950">Аналитики</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-red-950/40 hover:bg-red-900/40 border border-red-700/50 text-red-400 font-mono text-xs uppercase tracking-wider px-4 py-2 transition-colors flex items-center gap-2"
              >
                <UserPlus size={14} /> Регистрация Operator
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-900 overflow-x-auto flex-1 min-h-[200px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 bg-slate-900/40 text-[10px] text-slate-500 uppercase tracking-widest">
                    <th className="p-4">Код Доступа</th>
                    <th className="p-4">Сотрудник</th>
                    <th className="p-4">Уровень (Роль)</th>
                    <th className="p-4">Статус Узла</th>
                    <th className="p-4">Активность</th>
                    <th className="p-4 text-right">Контроль</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 text-xs">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-600 uppercase tracking-wider">
                        Записи по заданным параметров ядра отсутствуют
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-900/20 transition-colors group">
                        <td className="p-4 font-bold text-slate-400 group-hover:text-red-400 transition-colors">
                          {user.id}
                        </td>
                        <td className="p-4">
                          <div className="font-sans font-bold text-slate-200">{user.name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{user.email}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 text-[10px] uppercase font-bold border ${
                            user.role === "admin" ? "bg-red-500/5 border-red-500/20 text-red-400" :
                            user.role === "operator" ? "bg-blue-500/5 border-blue-500/20 text-blue-400" :
                            "bg-amber-500/5 border-amber-500/20 text-amber-400"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`flex items-center gap-1.5 text-[10px] uppercase ${
                            user.status === "active" ? "text-green-500" : "text-slate-600 line-through"
                          }`}>
                            {user.status === "active" ? <Check size={12} /> : <X size={12} />}
                            {user.status === "active" ? "Online" : "Suspended"}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 text-[11px]">
                          {user.lastActive}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(user)}
                              className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                              title="Модифицировать параметры"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-1.5 bg-slate-900 border border-slate-800 text-slate-500 hover:text-red-500 hover:border-red-950 transition-colors"
                              title="Ограничить доступ"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* МОДАЛЬНОЕ ОКНО: ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-slate-950 border border-slate-900 p-6 relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-700" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-700" />
            
            <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Shield size={16} className="text-red-500" /> Ввод новой сигнатуры доступа
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-500 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-widest block">Имя сотрудника</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Имя Фамилия..."
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-widest block">Защищенный E-mail</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="username@astro.control"
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest block">Класс Доступа</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-300 focus:outline-none uppercase"
                  >
                    <option value="admin">Admin</option>
                    <option value="operator">Operator</option>
                    <option value="analyst">Analyst</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest block">Статус инициализации</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-300 focus:outline-none uppercase"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-900 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs uppercase transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-950/40 hover:bg-red-900/40 border border-red-800 text-red-400 text-xs uppercase font-bold transition-colors"
                >
                  Записать сигнатуру
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО: РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЯ */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-slate-950 border border-slate-900 p-6 relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-700" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-700" />
            
            <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <ShieldAlert size={16} className="text-amber-500" /> Изменение прав протокола {currentUser?.id}
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-widest block">Имя сотрудника</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-widest block">Защищенный E-mail</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest block">Класс Доступа</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-300 focus:outline-none uppercase"
                  >
                    <option value="admin">Admin</option>
                    <option value="operator">Operator</option>
                    <option value="analyst">Analyst</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest block">Статус узла</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-300 focus:outline-none uppercase"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-900 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs uppercase transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800 text-amber-400 text-xs uppercase font-bold transition-colors"
                >
                  Обновить конфигурацию
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}