import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

function ClientesTable({ clientes, onEdit, onDelete, onNew, loading, error, limit }) {
  const displayClientes = limit ? clientes.slice(0, limit) : clientes;
  
  // Función para confirmar eliminación
  const confirmDelete = (id, name) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al cliente ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#bf50a8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, llamamos a la función onDelete
        onDelete(id);
        toast.success('Cliente eliminado correctamente');
      }
    });
  };
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#bf50a8] px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Clientes</h2>
        <div className="flex space-x-2">
          {limit && (
            <Link 
              to="/clientes" 
              className="bg-[#a8469a] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#933c87] transition-colors"
            >
              Ver Todos
            </Link>
          )}
          <button
            onClick={onNew}
            className="bg-white text-[#bf50a8] px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
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
                        className="text-[#bf50a8] hover:text-[#933c87] mr-3"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmDelete(cliente.id, `${cliente.first_name} ${cliente.last_name}`)}
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
              <Link to="/clientes" className="ml-1 text-[#bf50a8] hover:text-[#933c87]">
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