import { useState, useCallback } from 'react';
import { ordenService } from '../services/apiServices';

const useOrden = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenForm, setOrdenForm] = useState({ 
    id: null, 
    date: new Date().toISOString().split('T')[0], 
    motorcycle_id: '', 
    services: [],
    diagnosis: '',
    mileage: 0,
    status: 'Pending',
    total: 0
  });
  const [ordenEditing, setOrdenEditing] = useState(false);
  const [showOrdenModal, setShowOrdenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar órdenes
  const fetchOrdenes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ordenService.getAll();
      setOrdenes(data);
      setError(null);
    } catch (err) {
      console.error('Error al obtener órdenes:', err);
      setError('Error al cargar las órdenes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Guardar orden (crear o actualizar)
  const saveOrden = useCallback(async (formData) => {
    try {
      // Calcular el total basado en los servicios
      const total = formData.services.reduce((sum, service) => sum + service.price, 0);
      
      const ordenData = {
        diagnosis: formData.diagnosis,
        mileage: formData.mileage,
        services: formData.services,
        motorcycle_id: formData.motorcycle_id,
        status: formData.status,
        total: total
      };
      
      if (ordenEditing) {
        // Actualizar orden existente
        await ordenService.update(formData.id, ordenData);
      } else {
        // Crear nueva orden
        await ordenService.create(ordenData);
      }
      
      // Recargar la lista de órdenes
      fetchOrdenes();
      
      // Resetear el formulario y cerrar el modal
      setOrdenForm({
        id: null, 
        date: new Date().toISOString().split('T')[0], 
        motorcycle_id: '', 
        services: [],
        diagnosis: '',
        mileage: 0,
        status: 'Pending',
        total: 0
      });
      setOrdenEditing(false);
      setShowOrdenModal(false);
      return true;
    } catch (err) {
      console.error('Error al guardar orden:', err);
      return false;
    }
  }, [ordenEditing, fetchOrdenes]);
  
  // Eliminar orden
  const deleteOrden = useCallback(async (id) => {
    try {
      await ordenService.delete(id);
      fetchOrdenes();
      return true;
    } catch (err) {
      console.error('Error al eliminar orden:', err);
      return false;
    }
  }, [fetchOrdenes]);
  
  // Editar orden
  const editOrden = useCallback((orden) => {
    setOrdenForm(orden);
    setOrdenEditing(true);
    setShowOrdenModal(true);
  }, []);
  
  // Abrir modal para nueva orden
  const openNewOrdenModal = useCallback(() => {
    setOrdenForm({
      id: null, 
      date: new Date().toISOString().split('T')[0], 
      motorcycle_id: '', 
      services: [],
      diagnosis: '',
      mileage: 0,
      status: 'Pending',
      total: 0
    });
    setOrdenEditing(false);
    setShowOrdenModal(true);
  }, []);
  
  // Calcular el total de ingresos
  const calcularIngresosTotales = useCallback(() => {
    return ordenes.reduce((sum, orden) => sum + (orden.total || 0), 0);
  }, [ordenes]);

  return {
    ordenes,
    ordenForm,
    ordenEditing,
    showOrdenModal,
    loading,
    error,
    fetchOrdenes,
    saveOrden,
    deleteOrden,
    editOrden,
    openNewOrdenModal,
    calcularIngresosTotales,
    setOrdenForm,
    setShowOrdenModal
  };
};

export default useOrden;