import React, { useEffect } from 'react';
import ClienteModal from '../components/modals/ClienteModal';
import ClientesTable from '../components/tables/ClientesTable';
import useCliente from '../hooks/useCliente';

export default function ClientesPage() {
  // Utilizamos el hook personalizado
  const cliente = useCliente();
  
  useEffect(() => {
    cliente.fetchClientes();
  }, [cliente.fetchClientes]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Clientes</h1>
        
        {/* Tabla de Clientes - sin límite */}
        <ClientesTable
          clientes={cliente.clientes}
          onEdit={cliente.editCliente}
          onDelete={cliente.deleteCliente}
          onNew={cliente.openNewClienteModal}
          loading={cliente.loading}
          error={cliente.error}
        />
        
        {/* Modal de Cliente */}
        {cliente.showClienteModal && (
          <ClienteModal
            cliente={cliente.clienteForm}
            isEditing={cliente.clienteEditing}
            onSave={cliente.saveCliente}
            onClose={() => cliente.setShowClienteModal(false)}
          />
        )}
      </div>
    </div>
  );
}

