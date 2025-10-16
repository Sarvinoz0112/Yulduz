import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
// Предполагается, что эти компоненты и хук существуют в структуре вашего проекта
import { useAuth } from './hooks/useAuth';
import Dashboard from './components/Devonxona';
import Taskbar from './components/Taskbar';
import CorrespondenceView from './components/CorrespondenceView';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import DisciplineManagement from './components/DisciplineManagement';
import ApiManagement from './components/ApiManagement';

/* Иконки с className для адаптивного изменения размера */
const EyeIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const EyeSlashIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
  </svg>
);

const App: React.FC = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  /* ==================== LOGIN SCREEN ==================== */
  if (!user) {
    return (
      <HashRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <div className="flex items-center justify-center h-screen relative p-4">

                {/* Обновленные значения CLAMP для поддержки 8K (7680x4320).
                  Максимальный размер (последнее значение в clamp()) значительно увеличен,
                  чтобы обеспечить пропорциональное масштабирование.
                */}
                <div
                  className="
                    flex flex-col gap-[clamp(0.75rem,1.4vmin,3.5rem)] 
                    bg-black/35 backdrop-blur-md
                    p-[clamp(1rem,2.2vmin,6rem)]
                    rounded-2xl shadow-2xl
                    w-[clamp(28rem,50vmin,192rem)] 
                    text-white
                  "
                >
                  <h2
                    className="
                      text-center font-extrabold tracking-wider
                      text-[clamp(1.25rem,2.2vmin,5.5rem)] 
                    "
                  >
                    TIZIMGA KIRISH
                  </h2>

                  <input
                    type="text"
                    placeholder="Login"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="
                      bg-transparent border-b border-white/60
                      px-[clamp(0.75rem,1.2vmin,3rem)] 
                      py-[clamp(0.6rem,1.2vmin,3.5rem)] 
                      text-[clamp(0.95rem,1.4vmin,3rem)] 
                      focus:outline-none focus:border-white
                      placeholder:text-white/80 text-white text-center
                    "
                  />

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Parol"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="
                        w-full bg-transparent border-b border-white/60
                        px-[clamp(0.75rem,1.2vmin,3rem)] 
                        py-[clamp(0.6rem,1.2vmin,3.5rem)] 
                        text-[clamp(0.95rem,1.4vmin,3rem)] 
                        focus:outline-none focus:border-white
                        placeholder:text-white/80 text-white text-center
                      "
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-[clamp(0.5rem,1.2vmin,2.5rem)] flex items-center text-white/80 hover:text-white"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword
                        ? <EyeSlashIcon className="w-[clamp(1rem,1.6vmin,4.5rem)] h-[clamp(1rem,1.6vmin,4.5rem)]" />
                        : <EyeIcon      className="w-[clamp(1rem,1.6vmin,4.5rem)] h-[clamp(1rem,1.6vmin,4.5rem)]" />
                      }
                    </button>
                  </div>

                  <button
                    onClick={() => login(username, password)}
                    className="
                      mt-[clamp(0.25rem,0.8vmin,2rem)] 
                      py-[clamp(0.7rem,1.4vmin,4rem)] 
                      rounded-2xl
                      text-[clamp(1rem,1.6vmin,4rem)] 
                      bg-gray-800/85 hover:bg-gray-700 transition
                    "
                  >
                    KIRISH
                  </button>
                </div>
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </HashRouter>
    );
  }

  /* ==================== MAIN APPLICATION ==================== */
  return (
    <HashRouter>
      <div className="w-full h-screen flex items-center justify-center p-4">
        {/* Обновленная максимальная ширина: изменена с max-w-7xl (1280px) на max-w-[384rem] (6144px),
          чтобы обеспечить масштабирование контейнера на 8K-дисплеях.
        */}
        <div className="w-full h-full max-w-[384rem] mx-auto bg-gray-900/40 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden relative">
          <div className="flex-shrink-0 h-10 bg-black/10 flex items-center px-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <Routes>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/correspondence/:id" element={<ProtectedRoute><CorrespondenceView /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
              <Route path="/roles" element={<ProtectedRoute><RoleManagement /></ProtectedRoute>} />
              <Route path="/discipline" element={<ProtectedRoute><DisciplineManagement /></ProtectedRoute>} />
              <Route path="/api-docs" element={<ProtectedRoute><ApiManagement /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>

          <Taskbar />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;