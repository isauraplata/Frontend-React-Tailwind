import React, { useState } from 'react';

function OrdenesServicioPage() {
  // Datos de ejemplo para clientes y motocicletas
  const [clientes] = useState([
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María López' },
    { id: 3, nombre: 'Carlos Ruiz' }
  ]);

  const [motocicletas] = useState([
    { id: 1, marca: 'Honda', modelo: 'CBR 600', placa: 'ABC123', cliente_id: 1 },
    { id: 2, marca: 'Yamaha', modelo: 'YZF R3', placa: 'DEF456', cliente_id: 2 },
    { id: 3, marca: 'Suzuki', modelo: 'GSX-R750', placa: 'GHI789', cliente_id: 3 },
    { id: 4, marca: 'Kawasaki', modelo: 'Ninja 400', placa: 'JKL012', cliente_id: 1 }
  ]);

  // Catálogo de servicios
  const [catalogoServicios] = useState([
    { id: 1, nombre: 'Cambio de aceite', precio: 450 },
    { id: 2, nombre: 'Cambio de frenos', precio: 800 },
    { id: 3, nombre: 'Afinación completa', precio: 1500 },
    { id: 4, nombre: 'Cambio de llantas', precio: 3500 },
    { id: 5, nombre: 'Reparación de embrague', precio: 1200 },
    { id: 6, nombre: 'Cambio de batería', precio: 750 },
    { id: 7, nombre: 'Limpieza de carburador', precio: 650 },
    { id: 8, nombre: 'Ajuste de cadena', precio: 250 }
  ]);

  // Estado para órdenes
  const [ordenes, setOrdenes] = useState([
    { 
      id: 1, 
      fecha: '2025-04-10', 
      motocicleta_id: 2, 
      diagnostico: 'Problemas al frenar, ruido en el motor',
      kilometraje: 15700,
      servicios: [
        { id: 1, catalogo_id: 2, nombre: 'Cambio de frenos', precio: 800 },
        { id: 2, catalogo_id: 7, nombre: 'Limpieza de carburador', precio: 650 }
      ],
      subtotal: 1450,
      iva: 232,
      total: 1682,
      estado: 'Completada'
    },
    { 
      id: 2, 
      fecha: '2025-04-12', 
      motocicleta_id: 1, 
      diagnostico: 'Mantenimiento preventivo',
      kilometraje: 8500,
      servicios: [
        { id: 1, catalogo_id: 1, nombre: 'Cambio de aceite', precio: 450 },
        { id: 2, catalogo_id: 8, nombre: 'Ajuste de cadena', precio: 250 }
      ],
      subtotal: 700,
      iva: 112,
      total: 812,
      estado: 'En proceso'
    }
  ]);

  // Estado para el formulario de orden
  const [formData, setFormData] = useState({
    id: null,
    fecha: new Date().toISOString().split('T')[0],
    motocicleta_id: '',
    diagnostico: '',
    kilometraje: '',
    servicios: [],
    subtotal: 0,
    iva: 0,
    total: 0,
    estado: 'Pendiente'
  });

  // Estado para el servicio actual que se está agregando
  const [servicioActual, setServicioActual] = useState({
    catalogo_id: '',
    nombre: '',
    precio: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Filtrar órdenes según término de búsqueda
  const filteredOrdenes = ordenes.filter(orden => {
    const moto = motocicletas.find(m => m.id === orden.motocicleta_id);
    const cliente = moto ? clientes.find(c => c.id === moto.cliente_id) : null;
    
    return (
      orden.id.toString().includes(searchTerm) ||
      moto?.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moto?.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Funciones auxiliares
  const getClienteByMotoId = (motoId) => {
    const moto = motocicletas.find(m => m.id === motoId);
    if (!moto) return null;
    return clientes.find(c => c.id === moto.cliente_id);
  };

  const getMotocicletaById = (id) => {
    return motocicletas.find(m => m.id === id) || null;
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'motocicleta_id') {
      setFormData({
        ...formData,
        [name]: parseInt(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Manejar cambios en el servicio actual
  const handleServicioChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'catalogo_id') {
      const servicio = catalogoServicios.find(s => s.id.toString() === value);
      if (servicio) {
        setServicioActual({
          catalogo_id: servicio.id,
          nombre: servicio.nombre,
          precio: servicio.precio
        });
      } else {
        setServicioActual({
          catalogo_id: '',
          nombre: '',
          precio: ''
        });
      }
    } else {
      setServicioActual({
        ...servicioActual,
        [name]: value
      });
    }
  };

  // Agregar servicio a la orden
  const agregarServicio = () => {
    if (!servicioActual.catalogo_id) return;
    
    const nuevoServicio = {
      id: formData.servicios.length > 0 ? Math.max(...formData.servicios.map(s => s.id)) + 1 : 1,
      ...servicioActual
    };
    
    const nuevosServicios = [...formData.servicios, nuevoServicio];
    
    // Calcular subtotal, IVA y total
    const subtotal = nuevosServicios.reduce((acc, curr) => acc + curr.precio, 0);
    const iva = subtotal * 0.16; // 16% de IVA
    const total = subtotal + iva;
    
    setFormData({
      ...formData,
      servicios: nuevosServicios,
      subtotal,
      iva,
      total
    });
    
    // Resetear servicio actual
    setServicioActual({
      catalogo_id: '',
      nombre: '',
      precio: ''
    });
  };

  // Eliminar servicio de la orden
  const eliminarServicio = (id) => {
    const nuevosServicios = formData.servicios.filter(s => s.id !== id);
    
    // Recalcular subtotal, IVA y total
    const subtotal = nuevosServicios.reduce((acc, curr) => acc + curr.precio, 0);
    const iva = subtotal * 0.16; // 16% de IVA
    const total = subtotal + iva;
    
    setFormData({
      ...formData,
      servicios: nuevosServicios,
      subtotal,
      iva,
      total
    });
  };

  // Agregar o actualizar orden
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Actualizar orden existente
      setOrdenes(ordenes.map(orden =>
        orden.id === formData.id ? formData : orden
      ));
    } else {
      // Crear nueva orden
      const newOrden = {
        ...formData,
        id: ordenes.length > 0 ? Math.max(...ordenes.map(o => o.id)) + 1 : 1
      };
      setOrdenes([...ordenes, newOrden]);
    }
    
    // Resetear formulario
    setFormData({
      id: null,
      fecha: new Date().toISOString().split('T')[0],
      motocicleta_id: '',
      diagnostico: '',
      kilometraje: '',
      servicios: [],
      subtotal: 0,
      iva: 0,
      total: 0,
      estado: 'Pendiente'
    });
    setIsEditing(false);
    setShowForm(false);
  };

  // Editar orden
  const handleEdit = (orden) => {
    setFormData(orden);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Eliminar orden
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar esta orden?')) {
      setOrdenes(ordenes.filter(orden => orden.id !== id));
    }
  };

  // Generar PDF (simulado)
  const handleGenerarPDF = (id) => {
    alert(`PDF de la orden #${id} generado y listo para descargar`);
    // Aquí se integraría la generación real del PDF
  };

  // Iniciar nueva orden
  const iniciarNuevaOrden = () => {
    setFormData({
      id: null,
      fecha: new Date().toISOString().split('T')[0],
      motocicleta_id: '',
      diagnostico: '',
      kilometraje: '',
      servicios: [],
      subtotal: 0,
      iva: 0,
      total: 0,
      estado: 'Pendiente'
    });
    setIsEditing(false);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Órdenes de Servicio</h1>
              <p className="mt-1 text-gray-600">Gestiona las órdenes de servicio para las motocicletas</p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2 flex">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar órdenes..."
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
              <button
                onClick={iniciarNuevaOrden}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Nueva Orden
              </button>
            </div>
          </div>
        </header>

        {/* Formulario de Orden de Servicio */}
        {showForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Editar Orden de Servicio' : 'Nueva Orden de Servicio'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="motocicleta_id" className="block text-sm font-medium text-gray-700 mb-1">Motocicleta</label>
                  <select
                    id="motocicleta_id"
                    name="motocicleta_id"
                    value={formData.motocicleta_id}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                    required
                  >
                    <option value="">-- Seleccionar Motocicleta --</option>
                    {motocicletas.map(moto => (
                      <option key={moto.id} value={moto.id}>
                        {moto.marca} {moto.modelo} - {moto.placa} ({getClienteByMotoId(moto.id)?.nombre})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="kilometraje" className="block text-sm font-medium text-gray-700 mb-1">Kilometraje</label>
                  <input
                    type="number"
                    id="kilometraje"
                    name="kilometraje"
                    min="0"
                    value={formData.kilometraje}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="diagnostico" className="block text-sm font-medium text-gray-700 mb-1">Diagnóstico</label>
                <textarea
                  id="diagnostico"
                  name="diagnostico"
                  rows="3"
                  value={formData.diagnostico}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                  required
                ></textarea>
              </div>
              
              {/* Sección de Servicios */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium mb-3">Servicios</h3>
                
                {/* Agregar nuevo servicio */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <select
                      id="catalogo_id"
                      name="catalogo_id"
                      value={servicioActual.catalogo_id}
                      onChange={handleServicioChange}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                    >
                      <option value="">-- Seleccionar Servicio --</option>
                      {catalogoServicios.map(servicio => (
                        <option key={servicio.id} value={servicio.id}>
                          {servicio.nombre} - ${servicio.precio}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Precio"
                      value={servicioActual.precio}
                      readOnly
                      className="w-full border-gray-300 rounded-md shadow-sm p-2 border bg-gray-100"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={agregarServicio}
                      disabled={!servicioActual.catalogo_id}
                      className={`w-full px-4 py-2 rounded-md ${
                        servicioActual.catalogo_id
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Agregar Servicio
                    </button>
                  </div>
                </div>
                
                {/* Lista de servicios agregados */}
                {formData.servicios.length > 0 ? (
                  <div className="bg-white rounded-md shadow overflow-hidden mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.servicios.map((servicio) => (
                          <tr key={servicio.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${servicio.precio.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => eliminarServicio(servicio.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 italic">
                    No hay servicios agregados a esta orden
                  </div>
                )}
                
                {/* Totales */}
                {formData.servicios.length > 0 && (
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-sm">
                      <span className="font-medium mr-4">Subtotal:</span>
                      <span>${formData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium mr-4">IVA (16%):</span>
                      <span>${formData.iva.toFixed(2)}</span>
                    </div>
                    <div className="text-lg font-bold">
                      <span className="mr-4">Total:</span>
                      <span>${formData.total.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {isEditing && (
                <div className="mb-6">
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">Estado de la Orden</label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 border"
                    required
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completada">Completada</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      id: null,
                      fecha: new Date().toISOString().split('T')[0],
                      motocicleta_id: '',
                      diagnostico: '',
                      kilometraje: '',
                      servicios: [],
                      subtotal: 0,
                      iva: 0,
                      total: 0,
                      estado: 'Pendiente'
                    });
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  disabled={formData.servicios.length === 0}
                >
                  {isEditing ? 'Actualizar Orden' : 'Crear Orden'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Órdenes */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden #</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motocicleta/Cliente</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicios</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrdenes.length > 0 ? (
                  filteredOrdenes.map(orden => {
                    const moto = getMotocicletaById(orden.motocicleta_id);
                    const cliente = getClienteByMotoId(orden.motocicleta_id);
                    
                    return (
                      <tr key={orden.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{orden.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{new Date(orden.fecha).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">KM: {orden.kilometraje}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{moto ? `${moto.marca} ${moto.modelo}` : 'N/A'}</div>
                          <div className="text-xs text-gray-500">{cliente ? cliente.nombre : 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {orden.servicios.length} {orden.servicios.length === 1 ? 'servicio' : 'servicios'}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-2">
                            {orden.servicios.map(s => s.nombre).join(', ')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-gray-900">${orden.total.toFixed(2)}</div>
                          <div className="text-xs text-gray-500">Subtotal: ${orden.subtotal.toFixed(2)}</div>
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
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(orden)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleGenerarPDF(orden.id)}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            PDF
                          </button>
                          <button
                            onClick={() => handleDelete(orden.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No se encontraron órdenes de servicio
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {ordenes.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{filteredOrdenes.length}</span> de <span className="font-medium">{ordenes.length}</span> órdenes
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdenesServicioPage;