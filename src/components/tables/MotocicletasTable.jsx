import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

function MotocicletasTable({ motocicletas, getClienteById, onEdit, onDelete, onNew, loading, error, limit }) {
  const displayMotocicletas = limit ? motocicletas.slice(0, limit) : motocicletas;

  const confirmDelete = (id, motoInfo) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la motocicleta ${motoInfo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b5b800',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, llamamos a la función onDelete
        onDelete(id);
        toast.success('La motocicleta ha sido eliminada.');
      }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#b5b800] px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Motocicletas</h2>
        <div className="flex space-x-2">
          {limit && (
            <Link 
              to="/motocicletas" 
              className="bg-[#a3a600] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#918f00] transition-colors"
            >
              Ver Todas
            </Link>
          )}
          <button
            onClick={onNew}
            className="bg-white text-[#b5b800] px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Nueva Motocicleta
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="p-6 text-center">
          <p className="text-gray-500">Cargando motocicletas...</p>
        </div>
      ) : error ? (
        <div className="p-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {displayMotocicletas.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propietario</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayMotocicletas.map(moto => {
                  const cliente = getClienteById(moto.customer_id);
                  return (
                    <tr key={moto.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{moto.brand} {moto.model}</div>
                        <div className="text-sm text-gray-500">Placa: {moto.license_plate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {cliente ? `${cliente.first_name} ${cliente.last_name}` : 'Cliente no encontrado'}
                        </div>
                        {cliente && (
                          <div className="text-sm text-gray-500">
                            {cliente.phone || cliente.email ? `${cliente.phone || ''} ${cliente.email || ''}`.trim() : ''}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => onEdit(moto)}
                          className="text-[#b5b800] hover:text-[#918f00] mr-3"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => confirmDelete(moto.id, `${moto.brand} ${moto.model} (${moto.license_plate})`)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No hay motocicletas registradas. ¡Agrega una nueva!
            </div>
          )}
          
          {/* Show a message with count of hidden items if limit is applied */}
          {limit && motocicletas.length > limit && (
            <div className="p-3 bg-gray-50 text-center text-sm text-gray-500">
              Mostrando {limit} de {motocicletas.length} motocicletas. 
              <Link to="/motocicletas" className="ml-1 text-[#b5b800] hover:text-[#918f00]">
                Ver todas las motocicletas
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MotocicletasTable;