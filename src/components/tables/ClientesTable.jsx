import React from 'react';
import { Link } from 'react-router-dom';

function ClientesTable({ clientes, onEdit, onDelete, onNew, loading, error, limit }) {
  // If limit is provided, only show that many items
  const displayClientes = limit ? clientes.slice(0, limit) : clientes;
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-800 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Clientes</h2>
        <div className="flex space-x-2">
          {limit && (
            <Link 
              to="/clientes" 
              className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Ver Todos
            </Link>
          )}
          <button
            onClick={onNew}
            className="bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors"
          >
            Nuevo Cliente
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="p-6 text-center">
          <p className="text-gray-500">Cargando clientes...</p>
        </div>
      ) : error ? (
        <div className="p-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {displayClientes.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayClientes.map(cliente => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cliente.first_name} {cliente.last_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.phone}</div>
                      <div className="text-sm text-gray-500">{cliente.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEdit(cliente)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(cliente.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No hay clientes registrados. ¡Agrega uno nuevo!
            </div>
          )}
          
          {/* Show a message with count of hidden items if limit is applied */}
          {limit && clientes.length > limit && (
            <div className="p-3 bg-gray-50 text-center text-sm text-gray-500">
              Mostrando {limit} de {clientes.length} clientes. 
              <Link to="/clientes" className="ml-1 text-blue-600 hover:text-blue-800">
                Ver todos los clientes
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientesTable;