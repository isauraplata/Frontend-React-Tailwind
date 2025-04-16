import React, { useEffect } from 'react';
import OrdenModal from '../components/modals/OrdenModal';
import OrdenesTable from '../components/tables/OrdenesTable';
// Importamos nuestros hooks personalizados
import useOrden from '../hooks/useOrden';
import useCliente from '../hooks/useCliente';
import useMoto from '../hooks/useMoto';

export default function OrdenesPage() {
  // Utilizamos los hooks personalizados
  const orden = useOrden();
  const cliente = useCliente();
  const moto = useMoto();
  
  // Fetch inicial de datos
  useEffect(() => {
    orden.fetchOrdenes();
    cliente.fetchClientes();
    moto.fetchMotocicletas();
  }, [orden.fetchOrdenes, cliente.fetchClientes, moto.fetchMotocicletas]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Órdenes de Servicio</h1>
        
        {/* Tabla de Órdenes - sin límite */}
        <OrdenesTable
          ordenes={orden.ordenes}
          getClienteById={cliente.getClienteById}
          getMotoById={moto.getMotoById}
          onEdit={orden.editOrden}
          onDelete={orden.deleteOrden}
          onNew={orden.openNewOrdenModal}
          loading={orden.loading}
          error={orden.error}
          // No limit prop means show all
        />
        
        {/* Modal de Orden */}
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