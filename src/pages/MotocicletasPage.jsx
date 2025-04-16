import React, { useEffect } from 'react';
import MotoModal from '../components/modals/MotoModal';
import MotocicletasTable from '../components/tables/MotocicletasTable';

// Importamos nuestros hooks personalizados
import useCliente from '../hooks/useCliente';
import useMoto from '../hooks/useMoto';

export default function MotocicletasPage() {
  // Utilizamos los hooks personalizados
  const cliente = useCliente();
  const moto = useMoto();

  // Fetch inicial de datos
  useEffect(() => {
    cliente.fetchClientes();
    moto.fetchMotocicletas();
  }, [cliente.fetchClientes, moto.fetchMotocicletas]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Motocicletas</h1>
        
        {/* Tabla de Motocicletas */}
        <MotocicletasTable 
          motocicletas={moto.motocicletas} 
          getClienteById={cliente.getClienteById} 
          onEdit={moto.editMoto} 
          onDelete={moto.deleteMoto} 
          onNew={moto.openNewMotoModal} 
          loading={moto.loading}
          error={moto.error}
        />
        
        {/* Modal de Motocicleta */}
        {moto.showMotoModal && (
          <MotoModal 
            moto={moto.motoForm}
            clientes={cliente.clientes}
            isEditing={moto.motoEditing}
            onSave={moto.saveMoto}
            onClose={() => moto.setShowMotoModal(false)}
          />
        )}
      </div>
    </div>
  );
}
