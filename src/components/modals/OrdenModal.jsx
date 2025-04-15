import React, { useState } from 'react';

function OrdenModal({ orden, motocicletas, getClienteById, isEditing, onSave, onClose }) {
  const [formData, setFormData] = useState(orden);
  const [servicioActual, setServicioActual] = useState('');
  
  // Catálogo de servicios de ejemplo
  const catalogoServicios = [
    { id: 1, nombre: 'Cambio de aceite', precio: 450 },
    { id: 2, nombre: 'Cambio de frenos', precio: 800 },
    { id: 3, nombre: 'Afinación completa', precio: 1500 },
    { id: 4, nombre: 'Cambio de llantas', precio: 3500 },
    { id: 5, nombre: 'Reparación de embrague', precio: 1200 },
    { id: 6, nombre: 'Cambio de batería', precio: 750 },
    { id: 7, nombre: 'Limpieza de carburador', precio: 650 },
    { id: 8, nombre: 'Ajuste de cadena', precio: 250 }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calcular subtotal, IVA y total
    const subtotal = formData.servicios.reduce((total, servicio) => {
      // Si servicio es un string, buscar en catálogo
      if (typeof servicio === 'string') {
        const catalogItem = catalogoServicios.find(item => item.nombre === servicio);
        return total + (catalogItem ? catalogItem.precio : 0);
      }
      // Si servicio es un objeto con precio
      return total + (servicio.precio || 0);
    }, 0);
    
    const iva = subtotal * 0.16; // 16% IVA
    const total = subtotal + iva;
    
    const dataToSave = {
      ...formData,
      subtotal,
      iva,
      total
    };
    
    onSave(dataToSave);
  };
  
  const agregarServicio = () => {
    if (!servicioActual) return;
    
    const nuevosServicios = [...formData.servicios, servicioActual];
    setFormData({
      ...formData,
      servicios: nuevosServicios
    });
    setServicioActual('');
  };
  
  const eliminarServicio = (index) => {
    const nuevosServicios = formData.servicios.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      servicios: nuevosServicios
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 my-8">
        <div className="bg-purple-500 text-white px-6 py-4 rounded-t-lg">
          <h3 className="text-xl font-bold">{isEditing ? 'Editar Orden de Servicio' : 'Nueva Orden de Servicio'}</h3>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
                  Fecha
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="motocicleta_id">
                  Motocicleta
                </label>
                <select
                  id="motocicleta_id"
                  name="motocicleta_id"
                  value={formData.motocicleta_id}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">-- Seleccionar Motocicleta --</option>
                  {motocicletas.map(moto => (
                    <option key={moto.id} value={moto.id}>
                      {moto.marca} {moto.modelo} - {getClienteById(moto.cliente_id).nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kilometraje">
                Kilometraje
              </label>
              <input
                type="number"
                id="kilometraje"
                name="kilometraje"
                value={formData.kilometraje}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnostico">
                Diagnóstico
              </label>
              <textarea
                id="diagnostico"
                name="diagnostico"
                value={formData.diagnostico}
                onChange={handleChange}
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
            
            {/* Sección de servicios */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Servicios
              </label>
              
              <div className="flex mb-2">
                <select
                  value={servicioActual}
                  onChange={(e) => setServicioActual(e.target.value)}
                  className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                >
                  <option value="">-- Seleccionar Servicio --</option>
                  {catalogoServicios.map(servicio => (
                    <option key={servicio.id} value={servicio.nombre}>
                      {servicio.nombre} - ${servicio.precio}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={agregarServicio}
                  disabled={!servicioActual}
                  className={`px-4 py-2 rounded ${
                    servicioActual
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Agregar
                </button>
              </div>
              
              {formData.servicios.length > 0 ? (
                <ul className="bg-gray-100 p-3 rounded">
                  {formData.servicios.map((servicio, index) => (
                    <li key={index} className="flex justify-between items-center mb-2 p-2 bg-white rounded shadow">
                      <span>{typeof servicio === 'string' ? servicio : servicio.nombre}</span>
                      <button
                        type="button"
                        onClick={() => eliminarServicio(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic text-sm">No hay servicios agregados</p>
              )}
            </div>
            
            {isEditing && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
            )}
            
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                disabled={formData.servicios.length === 0}
              >
                {isEditing ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrdenModal;