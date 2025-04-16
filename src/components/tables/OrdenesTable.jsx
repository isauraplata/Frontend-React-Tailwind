import React from 'react';
import { Link } from 'react-router-dom';
import { generarOrdenPDF } from '../../utils/PDFGenerator';

function OrdenesTable({ ordenes, getClienteById, getMotoById, onEdit, onDelete, onNew, loading, error, limit }) {
  const displayOrdenes = limit ? ordenes.slice(0, limit) : ordenes;

  const formatDate = (dateString) => {
    try {
      if (!dateString) {
        console.error('Fecha no proporcionada');
        return 'Fecha no disponible';
      }

      const date = new Date(dateString);
      
      // Verifica si la fecha es válida
      if (isNaN(date.getTime())) {
        console.error('Fecha inválida:', dateString);
        return 'Fecha no disponible';
      }
      
      // Formatea la fecha según la localización del navegador
      return date.toLocaleDateString();
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return 'Fecha no disponible';
    }
  };

  // Handler para generar PDF
  const handleGenerarPDF = (orden) => {
    const moto = getMotoById(orden.motorcycle_id);
    const cliente = moto ? getClienteById(moto.customer_id) : null;
    generarOrdenPDF(orden, moto, cliente);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-800 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Órdenes de Servicio</h2>
        <div className="flex space-x-2">
          {limit && (
            <Link 
              to="/ordenes" 
              className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Ver Todas
            </Link>
          )}
          <button
            onClick={onNew}
            className="bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors"
          >
            Nueva Orden
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="p-6 text-center">
          <p className="text-gray-500">Cargando órdenes...</p>
        </div>
      ) : error ? (
        <div className="p-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {displayOrdenes.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente / Moto</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayOrdenes.map(orden => {
                  const moto = getMotoById(orden.motorcycle_id);
                  const cliente = moto ? getClienteById(moto.customer_id) : null;
                  
                  return (
                    <tr key={orden.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(orden.creation_date || orden.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {cliente ? `${cliente.first_name} ${cliente.last_name}` : 'Cliente no encontrado'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {moto ? `${moto.brand} ${moto.model} (${moto.license_plate})` : 'Moto no encontrada'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${orden.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          orden.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                          {orden.status === 'Pending' ? 'Pendiente' : 
                           orden.status === 'In Progress' ? 'En progreso' : 
                           orden.status === 'Completed' ? 'Completada' : 
                           orden.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${orden.total.toLocaleString()}</div>
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
                          className="text-red-600 hover:text-red-900 mr-3"
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => handleGenerarPDF(orden)}
                          className="text-green-600 hover:text-green-900"
                        >
                          PDF
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
          
          {/* Show a message with count of hidden items if limit is applied */}
          {limit && ordenes.length > limit && (
            <div className="p-3 bg-gray-50 text-center text-sm text-gray-500">
              Mostrando {limit} de {ordenes.length} órdenes. 
              <Link to="/ordenes" className="ml-1 text-blue-600 hover:text-blue-800">
                Ver todas las órdenes
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrdenesTable;