import React, { useState, useEffect } from 'react';

function ClienteModal({ cliente, isEditing, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Inicializar el formulario cuando se abre el modal
  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'El nombre es requerido';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'El apellido es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
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
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
              Nombre
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Nombre del cliente"
            />
            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
              Apellido
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Apellido del cliente"
            />
            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Email del cliente"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Teléfono del cliente"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Dirección
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Dirección del cliente"
              rows="3"
            ></textarea>
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
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {isEditing ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClienteModal;