import React, { useState } from 'react';
import ClienteModal from '../components/modals/ClienteModal';
import MotoModal from '../components/modals/MotoModal';
import OrdenModal from '../components/modals/OrdenModal';
import StatCard from '../components/dashboard/StatCard';
import ClientesTable from '../components/tables/ClientesTable';
import MotocicletasTable from '../components/tables/MotocicletasTable';
import OrdenesTable from '../components/tables/OrdenesTable';



function Dashboard() {
  // Estados para controlar los modales
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [showMotoModal, setShowMotoModal] = useState(false);
  const [showOrdenModal, setShowOrdenModal] = useState(false);
  
  // Estados para los datos
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Juan Pérez', telefono: '555-123-4567', email: 'juan@example.com', direccion: 'Av. Principal 123' },
    { id: 2, nombre: 'María López', telefono: '555-234-5678', email: 'maria@example.com', direccion: 'Calle Central 456' },
    { id: 3, nombre: 'Carlos Ruiz', telefono: '555-345-6789', email: 'carlos@example.com', direccion: 'Blvd. Norte 789' }
  ]);
  
  const [motocicletas, setMotocicletas] = useState([
    { id: 1, marca: 'Honda', modelo: 'CBR 600', año: 2022, placa: 'ABC123', color: 'Rojo', cliente_id: 1 },
    { id: 2, marca: 'Yamaha', modelo: 'YZF R3', año: 2023, placa: 'DEF456', color: 'Azul', cliente_id: 2 },
    { id: 3, marca: 'Suzuki', modelo: 'GSX-R750', año: 2021, placa: 'GHI789', color: 'Negro', cliente_id: 3 }
  ]);
  
  const [ordenes, setOrdenes] = useState([
    { 
      id: 1, 
      fecha: '2025-04-10', 
      motocicleta_id: 1, 
      servicios: ['Cambio de aceite', 'Revisión de frenos'],
      diagnostico: 'Desgaste en pastillas de freno delanteras',
      kilometraje: 15000,
      estado: 'Completada',
      total: 1850
    },
    { 
      id: 2, 
      fecha: '2025-04-12', 
      motocicleta_id: 2, 
      servicios: ['Afinación completa'],
      diagnostico: 'Mantenimiento preventivo',
      kilometraje: 8000,
      estado: 'En proceso',
      total: 2500
    },
    { 
      id: 3, 
      fecha: '2025-04-14', 
      motocicleta_id: 3, 
      servicios: ['Cambio de frenos', 'Cambio de batería'],
      diagnostico: 'Batería sin carga y frenos desgastados',
      kilometraje: 12500,
      estado: 'Pendiente',
      total: 3200
    }
  ]);
  
  // Estados para los formularios
  const [clienteForm, setClienteForm] = useState({ id: null, nombre: '', telefono: '', email: '', direccion: '' });
  const [motoForm, setMotoForm] = useState({ id: null, marca: '', modelo: '', año: new Date().getFullYear(), placa: '', color: '', cliente_id: '' });
  const [ordenForm, setOrdenForm] = useState({ 
    id: null, 
    fecha: new Date().toISOString().split('T')[0], 
    motocicleta_id: '', 
    servicios: [],
    diagnostico: '',
    kilometraje: '',
    estado: 'Pendiente',
    total: 0
  });
  
  // Estados para edición
  const [clienteEditing, setClienteEditing] = useState(false);
  const [motoEditing, setMotoEditing] = useState(false);
  const [ordenEditing, setOrdenEditing] = useState(false);
  
  // Funciones para guardar los datos
  const saveCliente = (formData) => {
    if (clienteEditing) {
      setClientes(clientes.map(c => c.id === formData.id ? formData : c));
    } else {
      const newCliente = {
        ...formData,
        id: Math.max(...clientes.map(c => c.id), 0) + 1
      };
      setClientes([...clientes, newCliente]);
    }
    
    setClienteForm({ id: null, nombre: '', telefono: '', email: '', direccion: '' });
    setClienteEditing(false);
    setShowClienteModal(false);
  };
  
  const saveMoto = (formData) => {
    if (motoEditing) {
      setMotocicletas(motocicletas.map(m => m.id === formData.id ? formData : m));
    } else {
      const newMoto = {
        ...formData,
        id: Math.max(...motocicletas.map(m => m.id), 0) + 1
      };
      setMotocicletas([...motocicletas, newMoto]);
    }
    
    setMotoForm({ id: null, marca: '', modelo: '', año: new Date().getFullYear(), placa: '', color: '', cliente_id: '' });
    setMotoEditing(false);
    setShowMotoModal(false);
  };
  
  const saveOrden = (formData) => {
    if (ordenEditing) {
      setOrdenes(ordenes.map(o => o.id === formData.id ? formData : o));
    } else {
      const newOrden = {
        ...formData,
        id: Math.max(...ordenes.map(o => o.id), 0) + 1
      };
      setOrdenes([...ordenes, newOrden]);
    }
    
    setOrdenForm({
      id: null, 
      fecha: new Date().toISOString().split('T')[0], 
      motocicleta_id: '', 
      servicios: [],
      diagnostico: '',
      kilometraje: '',
      estado: 'Pendiente',
      total: 0
    });
    setOrdenEditing(false);
    setShowOrdenModal(false);
  };
  
  // Funciones para editar
  const editCliente = (cliente) => {
    setClienteForm(cliente);
    setClienteEditing(true);
    setShowClienteModal(true);
  };
  
  const editMoto = (moto) => {
    setMotoForm(moto);
    setMotoEditing(true);
    setShowMotoModal(true);
  };
  
  const editOrden = (orden) => {
    setOrdenForm(orden);
    setOrdenEditing(true);
    setShowOrdenModal(true);
  };
  
  // Funciones para eliminar
  const deleteCliente = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };
  
  const deleteMoto = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar esta motocicleta?')) {
      setMotocicletas(motocicletas.filter(m => m.id !== id));
    }
  };
  
  const deleteOrden = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar esta orden?')) {
      setOrdenes(ordenes.filter(o => o.id !== id));
    }
  };
  
  // Funciones auxiliares
  const getClienteById = (id) => {
    return clientes.find(c => c.id === parseInt(id)) || { nombre: 'Cliente no encontrado' };
  };
  
  const getMotoById = (id) => {
    return motocicletas.find(m => m.id === parseInt(id)) || { marca: 'Desconocida', modelo: 'Desconocido' };
  };
  
  // Función para abrir modal de nueva entidad
  const openNewClienteModal = () => {
    setClienteForm({ id: null, nombre: '', telefono: '', email: '', direccion: '' });
    setClienteEditing(false);
    setShowClienteModal(true);
  };
  
  const openNewMotoModal = () => {
    setMotoForm({ id: null, marca: '', modelo: '', año: new Date().getFullYear(), placa: '', color: '', cliente_id: '' });
    setMotoEditing(false);
    setShowMotoModal(true);
  };
  
  const openNewOrdenModal = () => {
    setOrdenForm({
      id: null, 
      fecha: new Date().toISOString().split('T')[0], 
      motocicleta_id: '', 
      servicios: [],
      diagnostico: '',
      kilometraje: '',
      estado: 'Pendiente',
      total: 0
    });
    setOrdenEditing(false);
    setShowOrdenModal(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel de Control</h1>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Clientes"
            value={clientes.length}
            bgColor="bg-blue-500"
            textColor="text-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          
          <StatCard
            title="Total Motocicletas"
            value={motocicletas.length}
            bgColor="bg-green-500"
            textColor="text-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
          />
          
          <StatCard
            title="Órdenes de Servicio"
            value={ordenes.length}
            bgColor="bg-purple-500"
            textColor="text-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            }
          />
          
          <StatCard
            title="Ingresos Totales"
            value={`$${ordenes.reduce((sum, orden) => sum + orden.total, 0).toLocaleString()}`}
            bgColor="bg-red-500"
            textColor="text-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
        
        {/* Secciones de datos con botones para añadir */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Clientes */}
          <ClientesTable 
            clientes={clientes} 
            onEdit={editCliente} 
            onDelete={deleteCliente} 
            onNew={openNewClienteModal} 
          />
          
          {/* Motocicletas */}
          <MotocicletasTable 
            motocicletas={motocicletas} 
            getClienteById={getClienteById} 
            onEdit={editMoto} 
            onDelete={deleteMoto} 
            onNew={openNewMotoModal} 
          />
        </div>
        
        {/* Órdenes de Servicio */}
        <OrdenesTable 
          ordenes={ordenes} 
          getClienteById={getClienteById} 
          getMotoById={getMotoById} 
          onEdit={editOrden} 
          onDelete={deleteOrden} 
          onNew={openNewOrdenModal} 
        />
        
        {/* Accesos rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <AccessCard 
            title="Reporte de Clientes"
            description="Genera un reporte detallado de todos los clientes registrados."
            buttonText="Generar Reporte"
            bgColor="from-blue-400 to-blue-600"
            textColor="text-blue-600"
          />
          
          <AccessCard 
            title="Reporte de Motocicletas"
            description="Obtén información detallada sobre todas las motocicletas."
            buttonText="Generar Reporte"
            bgColor="from-green-400 to-green-600"
            textColor="text-green-600"
          />
          
          <AccessCard 
            title="Reporte de Ventas"
            description="Visualiza los ingresos y las órdenes completadas."
            buttonText="Generar Reporte"
            bgColor="from-purple-400 to-purple-600"
            textColor="text-purple-600"
          />
        </div>
        
        {/* Modales */}
        {showClienteModal && (
          <ClienteModal 
            cliente={clienteForm}
            isEditing={clienteEditing}
            onSave={saveCliente}
            onClose={() => setShowClienteModal(false)}
          />
        )}
        
        {showMotoModal && (
          <MotoModal 
            moto={motoForm}
            clientes={clientes}
            isEditing={motoEditing}
            onSave={saveMoto}
            onClose={() => setShowMotoModal(false)}
          />
        )}
        
        {showOrdenModal && (
          <OrdenModal 
            orden={ordenForm}
            motocicletas={motocicletas}
            getClienteById={getClienteById}
            isEditing={ordenEditing}
            onSave={saveOrden}
            onClose={() => setShowOrdenModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;