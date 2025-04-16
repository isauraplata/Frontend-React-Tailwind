import { useState, useCallback } from 'react';
import { motoService } from '../services/apiServices';

const useMoto = () => {
  const [motocicletas, setMotocicletas] = useState([]);
  const [motoForm, setMotoForm] = useState({ 
    id: null, 
    brand: '', 
    model: '', 
    year: new Date().getFullYear(), 
    license_plate: '', 
    color: '',
    chassis_number: '',
    customer_id: '' 
  });
  const [motoEditing, setMotoEditing] = useState(false);
  const [showMotoModal, setShowMotoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar motocicletas
  const fetchMotocicletas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await motoService.getAll();
      setMotocicletas(data);
      setError(null);
    } catch (err) {
      console.error('Error al obtener motocicletas:', err);
      setError('Error al cargar las motocicletas');
    } finally {
      setLoading(false);
    }
  }, []);

  // Guardar motocicleta (crear o actualizar)
  const saveMoto = useCallback(async (formData) => {
    try {
      if (motoEditing) {
        // Actualizar motocicleta existente
        await motoService.update(formData.id, formData);
      } else {
        // Crear nueva motocicleta
        await motoService.create(formData);
      }
      
      // Recargar la lista de motocicletas
      fetchMotocicletas();
      
      // Resetear el formulario y cerrar el modal
      setMotoForm({ 
        id: null, 
        brand: '', 
        model: '', 
        year: new Date().getFullYear(), 
        license_plate: '', 
        color: '', 
        chassis_number: '',
        customer_id: '' 
      });
      setMotoEditing(false);
      setShowMotoModal(false);
      return true;
    } catch (err) {
      console.error('Error al guardar motocicleta:', err);
      return false;
    }
  }, [motoEditing, fetchMotocicletas]);
  
  // Eliminar motocicleta
  const deleteMoto = useCallback(async (id) => {
    try {
      await motoService.delete(id);
      fetchMotocicletas();
      return true;
    } catch (err) {
      console.error('Error al eliminar motocicleta:', err);
      return false;
    }
  }, [fetchMotocicletas]);
  
  // Editar motocicleta
  const editMoto = useCallback((moto) => {
    setMotoForm(moto);
    setMotoEditing(true);
    setShowMotoModal(true);
  }, []);
  
  // Abrir modal para nueva motocicleta
  const openNewMotoModal = useCallback(() => {
    setMotoForm({ 
      id: null, 
      brand: '', 
      model: '', 
      year: new Date().getFullYear(), 
      license_plate: '', 
      color: '', 
      chassis_number: '',
      customer_id: '' 
    });
    setMotoEditing(false);
    setShowMotoModal(true);
  }, []);
  
  // Función para encontrar una moto por su ID
  const getMotoById = useCallback((id) => {
    return motocicletas.find(m => m.id === parseInt(id)) || { brand: 'Desconocida', model: 'Desconocido' };
  }, [motocicletas]);

  return {
    motocicletas,
    motoForm,
    motoEditing,
    showMotoModal,
    loading,
    error,
    fetchMotocicletas,
    saveMoto,
    deleteMoto,
    editMoto,
    openNewMotoModal,
    getMotoById,
    setMotoForm,
    setShowMotoModal
  };
};

export default useMoto;