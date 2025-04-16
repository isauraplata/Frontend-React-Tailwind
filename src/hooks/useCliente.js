import { useState, useCallback } from 'react';
import { clienteService } from '../services/apiServices';

const useCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteForm, setClienteForm] = useState({ 
    id: null, 
    first_name: '', 
    last_name: '', 
    phone: '', 
    email: '', 
    address: '' 
  });
  const [clienteEditing, setClienteEditing] = useState(false);
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar clientes
  const fetchClientes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await clienteService.getAll();
      setClientes(data);
      setError(null);
    } catch (err) {
      console.error('Error al obtener clientes:', err);
      setError('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Guardar cliente (crear o actualizar)
  const saveCliente = useCallback(async (formData) => {
    try {
      if (clienteEditing) {
        // Actualizar cliente existente
        await clienteService.update(formData.id, formData);
      } else {
        // Crear nuevo cliente
        await clienteService.create(formData);
      }
      
      // Recargar la lista de clientes
      fetchClientes();
      
      // Resetear el formulario y cerrar el modal
      setClienteForm({ id: null, first_name: '', last_name: '', phone: '', email: '', address: '' });
      setClienteEditing(false);
      setShowClienteModal(false);
      return true;
    } catch (err) {
      console.error('Error al guardar cliente:', err);
      return false;
    }
  }, [clienteEditing, fetchClientes]);
  
  // Eliminar cliente
  const deleteCliente = useCallback(async (id) => {
    try {
      await clienteService.delete(id);
      fetchClientes();
      return true;
    } catch (err) {
      console.error('Error al eliminar cliente:', err);
      return false;
    }
  }, [fetchClientes]);
  
  // Editar cliente
  const editCliente = useCallback((cliente) => {
    setClienteForm(cliente);
    setClienteEditing(true);
    setShowClienteModal(true);
  }, []);
  
  // Abrir modal para nuevo cliente
  const openNewClienteModal = useCallback(() => {
    setClienteForm({ id: null, first_name: '', last_name: '', phone: '', email: '', address: '' });
    setClienteEditing(false);
    setShowClienteModal(true);
  }, []);
  
  // Función para encontrar un cliente por su ID
  const getClienteById = useCallback((id) => {
    return clientes.find(c => c.id === parseInt(id)) || { first_name: 'Cliente', last_name: 'no encontrado' };
  }, [clientes]);

  return {
    clientes,
    clienteForm,
    clienteEditing,
    showClienteModal,
    loading,
    error,
    fetchClientes,
    saveCliente,
    deleteCliente,
    editCliente,
    openNewClienteModal,
    getClienteById,
    setClienteForm,
    setShowClienteModal
  };
};

export default useCliente;