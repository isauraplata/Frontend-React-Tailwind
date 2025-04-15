import React from 'react';

function MotocicletasTable({ motocicletas, getClienteById, onEdit, onDelete, onNew }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-green-500 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Motocicletas</h2>
        <button 
          onClick={onNew}
          className="bg-white text-green-500 px-4 py-2 rounded-lg font-medium hover:bg-green-100 transition-colors"
        >
          Nueva Moto
        </button>
      </div>
      <div className="overflow-x-auto">
        {motocicletas.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propietario</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {motocicletas.map(moto => (
                <tr key={moto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{moto.marca} {moto.modelo}</div>
                    <div className="text-xs text-gray-500">Placa: {moto.placa} | Año: {moto.año}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getClienteById(moto.cliente_id).nombre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => onEdit(moto)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => onDelete(moto.id)}
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
            No hay motocicletas registradas. ¡Agrega una nueva!
          </div>
        )}
      </div>
    </div>
  );
}

export default MotocicletasTable;