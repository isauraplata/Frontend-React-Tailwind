import React, { useState, useEffect } from 'react';

function OrdenModal({ orden, motocicletas, getClienteById, isEditing, onSave, onClose }) {
  const initialService = { name: '', price: 0 };
  
  const [formData, setFormData] = useState({
    id: null,
    date: new Date().toISOString().split('T')[0],
    motorcycle_id: '',
    services: [],
    diagnosis: '',
    mileage: 0,
    status: 'Pending',
    total: 0
  });
  
  const [currentService, setCurrentService] = useState(initialService);
  const [errors, setErrors] = useState({});
  
  // Status options
  const statusOptions = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
  
  // Inicializar el formulario cuando se abre el modal
  useEffect(() => {
    if (orden) {
      setFormData(orden);
    }
  }, [orden]);
  
  // Calcular el total cuando cambian los servicios
  useEffect(() => {
    const total = formData.services.reduce((sum, service) => sum + (parseFloat(service.price) || 0), 0);
    setFormData(prev => ({ ...prev, total }));
  }, [formData.services]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'mileage' || name === 'motorcycle_id' 
        ? parseInt(value) || 0 
        : value
    });
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setCurrentService({
      ...currentService,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    });
  };
  
  const addService = () => {
    if (!currentService.name.trim()) {
      setErrors({
        ...errors,
        serviceName: 'El nombre del servicio es requerido'
      });
      return;
    }
    
    if (currentService.price <= 0) {
      setErrors({
        ...errors,
        servicePrice: 'El precio debe ser mayor que 0'
      });
      return;
    }
    
    setFormData({
      ...formData,
      services: [...formData.services, { ...currentService }]
    });
    
    setCurrentService(initialService);
    setErrors({
      ...errors,
      serviceName: null,
      servicePrice: null
    });
  };
  
  const removeService = (index) => {
    const updatedServices = [...formData.services];
    updatedServices.splice(index, 1);
    
    setFormData({
      ...formData,
      services: updatedServices
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.motorcycle_id) {
      newErrors.motorcycle_id = 'La motocicleta es requerida';
    }
    
    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = 'El diagnóstico es requerido';
    }
    
    if (formData.mileage <= 0) {
      newErrors.mileage = 'El kilometraje debe ser mayor que 0';
    }
    
    if (formData.services.length === 0) {
      newErrors.services = 'Debe agregar al menos un servicio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  // Obtener el cliente asociado a la motocicleta seleccionada
  const getClientInfo = () => {
    if (!formData.motorcycle_id) return null;
    
    const moto = motocicletas.find(m => m.id === parseInt(formData.motorcycle_id));
    if (!moto) return null;
    
    const cliente = getClienteById(moto.customer_id);
    return cliente;
  };
  
  const clienteInfo = getClientInfo();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Editar Orden de Servicio' : 'Nueva Orden de Servicio'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Fecha
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                Estado
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="motorcycle_id">
              Motocicleta
            </label>
            <select
              id="motorcycle_id"
              name="motorcycle_id"
              value={formData.motorcycle_id}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.motorcycle_id ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Seleccione una motocicleta</option>
              {motocicletas.map(moto => (
                <option key={moto.id} value={moto.id}>
                  {moto.brand} {moto.model} - {moto.license_plate}
                </option>
              ))}
            </select>
            {errors.motorcycle_id && <p className="text-red-500 text-xs mt-1">{errors.motorcycle_id}</p>}
          </div>
          
          {clienteInfo && (
            <div className="p-4 mb-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800">Información del Cliente:</h4>
              <p>{clienteInfo.first_name} {clienteInfo.last_name}</p>
              <p>{clienteInfo.phone}</p>
              <p>{clienteInfo.email}</p>
              <p>{clienteInfo.address}</p>
            </div>
          )}
            
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mileage">
              Kilometraje
            </label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.mileage ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Kilometraje actual"
              min="0"
            />
            {errors.mileage && <p className="text-red-500 text-xs mt-1">{errors.mileage}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnosis">
              Diagnóstico
            </label>
            <textarea
              id="diagnosis"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.diagnosis ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Diagnóstico detallado"
              rows="3"
            ></textarea>
            {errors.diagnosis && <p className="text-red-500 text-xs mt-1">{errors.diagnosis}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Servicios
            </label>
            
            <div className="mb-4 p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    id="serviceName"
                    name="name"
                    value={currentService.name}
                    onChange={handleServiceChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.serviceName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Nombre del servicio"
                  />
                  {errors.serviceName && <p className="text-red-500 text-xs mt-1">{errors.serviceName}</p>}
                </div>
                
                <div>
                  <input
                    type="number"
                    id="servicePrice"
                    name="price"
                    value={currentService.price}
                    onChange={handleServiceChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.servicePrice ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Precio"
                    min="0"
                    step="0.01"
                  />
                  {errors.servicePrice && <p className="text-red-500 text-xs mt-1">{errors.servicePrice}</p>}
                </div>
                
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addService}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Agregar
                  </button>
                </div>  
              </div>
            </div>
            
            {formData.services.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Servicio</th>
                      <th className="py-2 px-4 border-b text-left">Precio</th>
                      <th className="py-2 px-4 border-b text-left">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.services.map((service, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{service.name}</td>
                        <td className="py-2 px-4 border-b">${service.price.toFixed(2)}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            type="button"
                            onClick={() => removeService(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-bold">
                      <td className="py-2 px-4 border-b">Total</td>
                      <td className="py-2 px-4 border-b" colSpan="2">${formData.total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No hay servicios agregados</p>
              </div>
            )}
            
            {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services}</p>}
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
            >
              {isEditing ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrdenModal;