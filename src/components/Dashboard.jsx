import React, { useEffect } from 'react';
import ClienteModal from '../components/modals/ClienteModal';
import MotoModal from '../components/modals/MotoModal';
import OrdenModal from '../components/modals/OrdenModal';
import StatCard from './cards/StatCard';
import ClientesTable from '../components/tables/ClientesTable';
import MotocicletasTable from '../components/tables/MotocicletasTable';
import OrdenesTable from '../components/tables/OrdenesTable';

// Importamos nuestros hooks personalizados
import useCliente from '../hooks/useCliente';
import useMoto from '../hooks/useMoto';
import useOrden from '../hooks/useOrden';

function Dashboard() {
  // Utilizamos los hooks personalizados
  const cliente = useCliente();
  const moto = useMoto();
  const orden = useOrden();

  // Cantidad de elementos a mostrar en cada tabla en el Dashboard
  const tableLimit = 3;

  // Fetch inicial de datos
  useEffect(() => {
    cliente.fetchClientes();
    moto.fetchMotocicletas();
    orden.fetchOrdenes();
  }, [cliente.fetchClientes, moto.fetchMotocicletas, orden.fetchOrdenes]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel de Control</h1>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Clientes"
            value={cliente.clientes.length}
            bgColor="bg-blue-500"
            textColor="text-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            loading={cliente.loading}
          />
          
          <StatCard
            title="Total Motocicletas"
            value={moto.motocicletas.length}
            bgColor="bg-blue-500"
            textColor="text-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
            loading={moto.loading}
          />
          
          <StatCard
            title="Órdenes de Servicio"
            value={orden.ordenes.length}
            bgColor="bg-blue-500"
            textColor="text-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            }
            loading={orden.loading}
          />
          
          <StatCard
            title="Ingresos Totales"
            value={`$${orden.calcularIngresosTotales().toLocaleString()}`}
            bgColor="bg-blue-500"
            textColor="text-white"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            loading={orden.loading}
          />
        </div>
        
        {/* Secciones de datos con botones para añadir y límite de 3 elementos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Clientes - limitados a 3 en el dashboard */}
          <ClientesTable 
            clientes={cliente.clientes} 
            onEdit={cliente.editCliente} 
            onDelete={cliente.deleteCliente} 
            onNew={cliente.openNewClienteModal} 
            loading={cliente.loading}
            error={cliente.error}
            limit={tableLimit}
          />
          
          {/* Motocicletas - limitadas a 3 en el dashboard */}
          <MotocicletasTable 
            motocicletas={moto.motocicletas} 
            getClienteById={cliente.getClienteById} 
            onEdit={moto.editMoto} 
            onDelete={moto.deleteMoto} 
            onNew={moto.openNewMotoModal} 
            loading={moto.loading}
            error={moto.error}
            limit={tableLimit}
          />
        </div>
        
        {/* Órdenes de Servicio - limitadas a 3 en el dashboard */}
        <OrdenesTable 
          ordenes={orden.ordenes} 
          getClienteById={cliente.getClienteById} 
          getMotoById={moto.getMotoById} 
          onEdit={orden.editOrden} 
          onDelete={orden.deleteOrden} 
          onNew={orden.openNewOrdenModal} 
          loading={orden.loading}
          error={orden.error}
          limit={tableLimit}
        />
        
        {/* Modales */}
        {cliente.showClienteModal && (
          <ClienteModal 
            cliente={cliente.clienteForm}
            isEditing={cliente.clienteEditing}
            onSave={cliente.saveCliente}
            onClose={() => cliente.setShowClienteModal(false)}
          />
        )}
        
        {moto.showMotoModal && (
          <MotoModal 
            moto={moto.motoForm}
            clientes={cliente.clientes}
            isEditing={moto.motoEditing}
            onSave={moto.saveMoto}
            onClose={() => moto.setShowMotoModal(false)}
          />
        )}
        
        {orden.showOrdenModal && (
          <OrdenModal 
            orden={orden.ordenForm}
            motocicletas={moto.motocicletas}
            getClienteById={cliente.getClienteById}
            isEditing={orden.ordenEditing}
            onSave={orden.saveOrden}
            onClose={() => orden.setShowOrdenModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;