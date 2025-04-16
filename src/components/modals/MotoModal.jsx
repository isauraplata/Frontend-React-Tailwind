import React, { useState, useEffect } from 'react';

function MotoModal({ moto, clientes, isEditing, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: null,
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    license_plate: '',
    color: '',
    chassis_number: '',
    customer_id: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Inicializar el formulario cuando se abre el modal
  useEffect(() => {
    if (moto) {
      setFormData(moto);
    }
  }, [moto]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'year' || name === 'customer_id' ? parseInt(value) || '' : value
    });
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.brand.trim()) {
      newErrors.brand = 'La marca es requerida';
    }
    
    if (!formData.model.trim()) {
      newErrors.model = 'El modelo es requerido';
    }
    
    if (!formData.license_plate.trim()) {
      newErrors.license_plate = 'La placa es requerida';
    }
    
    if (!formData.color.trim()) {
      newErrors.color = 'El color es requerido';
    }
    
    if (!formData.chassis_number?.trim()) {
      newErrors.chassis_number = 'El número de chasis es requerido';
    }
    
    if (!formData.customer_id) {
      newErrors.customer_id = 'El cliente es requerido';
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
  
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 50 }, (_, i) => currentYear - i);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Editar Motocicleta' : 'Nueva Motocicleta'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
              Marca
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.brand ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Marca de la motocicleta"
            />
            {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
              Modelo
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.model ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Modelo de la motocicleta"
            />
            {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              Año
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="license_plate">
              Placa
            </label>
            <input
              type="text"
              id="license_plate"
              name="license_plate"
              value={formData.license_plate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.license_plate ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Placa de la motocicleta"
            />
            {errors.license_plate && <p className="text-red-500 text-xs mt-1">{errors.license_plate}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.color ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Color de la motocicleta"
            />
            {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chassis_number">
              Número de Chasis
            </label>
            <input
              type="text"
              id="chassis_number"
              name="chassis_number"
              value={formData.chassis_number}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.chassis_number ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Número de chasis"
            />
            {errors.chassis_number && <p className="text-red-500 text-xs mt-1">{errors.chassis_number}</p>}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer_id">
              Cliente
            </label>
            <select
              id="customer_id"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.customer_id ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.first_name} {cliente.last_name}
                </option>
              ))}
            </select>
            {errors.customer_id && <p className="text-red-500 text-xs mt-1">{errors.customer_id}</p>}
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              {isEditing ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MotoModal;