import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Determinar la ruta activa para destacarla en el menú
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white text-xl font-bold">Taller Motocicletas</span>
            </div>
            
            {/* Menú para pantallas medianas y grandes */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') 
                    ? 'bg-blue-900 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/clientes" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/clientes') 
                    ? 'bg-blue-900 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                Clientes
              </Link>
              <Link 
                to="/motocicletas" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/motocicletas') 
                    ? 'bg-blue-900 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                Motocicletas
              </Link>
              <Link 
                to="/ordenes" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/ordenes') 
                    ? 'bg-blue-900 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                Órdenes de Servicio
              </Link>
            </div>
          </div>
          
          {/* Botón de perfil o configuración */}
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div>
                <button className="bg-blue-700 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white">
                  <span className="sr-only">Abrir menú de usuario</span>
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Botón de menú móvil */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-blue-900 text-white' 
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/clientes" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/clientes') 
                  ? 'bg-blue-900 text-white' 
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Clientes
            </Link>
            <Link 
              to="/motocicletas" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/motocicletas') 
                  ? 'bg-blue-900 text-white' 
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Motocicletas
            </Link>
            <Link 
              to="/ordenes" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/ordenes') 
                  ? 'bg-blue-900 text-white' 
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Órdenes de Servicio
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;