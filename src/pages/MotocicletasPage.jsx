import React, { useState } from 'react';

function MotocicletasPage() {
  // Datos de ejemplo para clientes
  const [clientes] = useState([
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María López' },
    { id: 3, nombre: 'Carlos Ruiz' }
  ]);

  // Datos de motocicletas
  const [motocicletas, setMotocicletas] = useState([
    { id: 1, marca: 'Honda', modelo: 'CBR 600', año: 2021, placa: 'ABC123', color: 'Rojo', cliente_id: 1, vinChasis: 'JHMCB7653LC051940' },
    { id: 2, marca: 'Yamaha', modelo: 'YZF R3', año: 2022, placa: 'DEF456', color: 'Azul', cliente_id: 2, vinChasis: 'JYARN23E18A012345' },
    { id: 3, marca: 'Suzuki', modelo: 'GSX-R750', año: 2020, placa: 'GHI789', color: 'Negro', cliente_id: 3, vinChasis: 'JS1GR7KA7L7100123' }
  ]);

  const [formData, setFormData] = useState({
    id: null,
    marca: '',
    modelo: '',
    año: new Date().getFullYear(),
    placa: '',
    color: '',
    cliente_id: '',
    vinChasis: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Filtrar motocicletas según término de búsqueda
  const filteredMotocicletas = motocicletas.filter(moto =>
    moto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    moto.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    moto.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    moto.vinChasis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clientes.find(c => c.id === moto.cliente_id)?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(moto.año).includes(searchTerm)
  );

  // Agregar o actualizar motocicleta
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Actualizar motocicleta existente
      setMotocicletas(motocicletas.map(moto =>
        moto.id === formData.id ? formData : moto
      ));
    } else {
      // Crear nueva motocicleta
      const newMoto = {
        ...formData,
        id: motocicletas.length > 0 ? Math.max(...motocicletas.map(m => m.id)) + 1 : 1
      };
      setMotocicletas([...motocicletas, newMoto]);
    }

    // Resetear formulario
    setFormData({
      id: null,
      marca: '',
      modelo: '',
      año: new Date().getFullYear(),
      placa: '',
      color: '',
      cliente_id: '',
      vinChasis: ''
    });
    setIsEditing(false);
  };

  // Editar motocicleta
  const handleEdit = (moto) => {
    setFormData(moto);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Eliminar motocicleta
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar esta motocicleta?')) {
      setMotocicletas(motocicletas.filter(moto => moto.id !== id));
    }
  };

  // Obtener nombre del cliente por ID
  const getClienteName = (clienteId) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nombre : 'Cliente no asignado';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Gestión de Motocicletas</h1>
              <p className="mt-1 text-gray-600">Administra las motocicletas de tus clientes</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar motocicletas..."
                  className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Grid layout para formulario y tabla */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Editar Motocicleta' : 'Registrar Nueva Motocicleta'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cliente_id" className="block text-sm font-medium text-gray-700 mb-1">Propietario</label>
                    <select
                      id="cliente_id"
                      name="cliente_id"
                      value={formData.cliente_id}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                      required
                    >
                      <option value="">-- Seleccionar Cliente --</option>
                      {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                      <input
                        type="text"
                        id="marca"
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                      <input
                        type="text"
                        id="modelo"
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="año" className="block text-sm font-medium text-gray-700 mb-1">Año</label>
                      <input
                        type="number"
                        id="año"
                        name="año"
                        min="1970"
                        max={new Date().getFullYear() + 1}
                        value={formData.año}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                      <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="placa" className="block text-sm font-medium text-gray-700 mb-1">Placa</label>
                      <input
                        type="text"
                        id="placa"
                        name="placa"
                        value={formData.placa}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="vinChasis" className="block text-sm font-medium text-gray-700 mb-1">VIN/Chasis</label>
                      <input
                        type="text"
                        id="vinChasis"
                        name="vinChasis"
                        value={formData.vinChasis}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            id: null,
                            marca: '',
                            modelo: '',
                            año: new Date().getFullYear(),
                            placa: '',
                            color: '',
                            cliente_id: '',
                            vinChasis: ''
                          });
                          setIsEditing(false);
                        }}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                      >
                        Cancelar
                      </button>
                    )}
                    <button
                      type="submit"
                      className={`px-4 py-2 ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ml-auto`}
                    >
                      {isEditing ? 'Actualizar Motocicleta' : 'Registrar Motocicleta'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Tabla de motocicletas */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca/Modelo</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMotocicletas.length > 0 ? (
                      filteredMotocicletas.map(moto => (
                        <tr key={moto.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{moto.marca} {moto.modelo}</div>
                            <div className="text-sm text-gray-500">Año: {moto.año}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Placa: {moto.placa}</div>
                            <div className="text-sm text-gray-500">Color: {moto.color}</div>
                            <div className="text-xs text-gray-500">VIN: {moto.vinChasis}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{getClienteName(moto.cliente_id)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEdit(moto)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(moto.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                          No se encontraron motocicletas
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {motocicletas.length > 0 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{filteredMotocicletas.length}</span> de <span className="font-medium">{motocicletas.length}</span> motocicletas
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MotocicletasPage;