import React from 'react';

function OrdenesTable({ ordenes, getClienteById, getMotoById, onEdit, onDelete, onNew }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
      <div className="bg-purple-500 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Órdenes de Servicio</h2>
        <button 
          onClick={onNew}
          className="bg-white text-purple-500 px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors"
        >
          Nueva Orden
        </button>
      </div>
      <div className="overflow-x-auto">
        {ordenes.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente/Moto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicios</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordenes.map(orden => {
                const moto = getMotoById(orden.motocicleta_id);
                const cliente = getClienteById(moto.cliente_id);
                
                return (
                  <tr key={orden.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{orden.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(orden.fecha).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cliente.nombre}</div>
                      <div className="text-xs text-gray-500">{moto.marca} {moto.modelo}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {Array.isArray(orden.servicios) 
                          ? orden.servicios.map(s => typeof s === 'string' ? s : s.nombre).join(', ')
                          : 'Sin servicios'
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        orden.estado === 'Completada' ? 'bg-green-100 text-green-800' :
                        orden.estado === 'En proceso' ? 'bg-blue-100 text-blue-800' :
                        orden.estado === 'Cancelada' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {orden.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      ${orden.total ? orden.total.toLocaleString() : '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => onEdit(orden)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => onDelete(orden.id)}
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
            No hay órdenes registradas. ¡Crea una nueva!
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdenesTable;