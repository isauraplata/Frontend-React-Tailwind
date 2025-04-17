import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

function ClienteModal({ cliente, isEditing, onSave, onClose }) {
  // Esquema de validación con Yup
  const ClienteSchema = Yup.object().shape({
    first_name: Yup.string()
      .required('El nombre es requerido'),
    last_name: Yup.string()
      .required('El apellido es requerido'),
    email: Yup.string()
      .email('El email no es válido')
      .required('El email es requerido'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'El teléfono debe tener exactamente 10 dígitos')
      .required('El teléfono es requerido'),
    address: Yup.string()
  });

  // Valores iniciales
  const initialValues = {
    id: cliente?.id || null,
    first_name: cliente?.first_name || '',
    last_name: cliente?.last_name || '',
    email: cliente?.email || '',
    phone: cliente?.phone || '',
    address: cliente?.address || ''
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (values, { setSubmitting }) => {
    onSave(values);
    setSubmitting(false);
    toast.success(isEditing ? 'Cliente actualizado correctamente' : 'Cliente creado correctamente');
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
        </h2>
        
        <Formik
          initialValues={initialValues}
          validationSchema={ClienteSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, setFieldValue, values }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                  Nombre
                </label>
                <Field
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Nombre del cliente"
                  className={`w-full px-3 py-2 border rounded-lg ${errors.first_name && touched.first_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                <ErrorMessage name="first_name" component="p" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                  Apellido
                </label>
                <Field
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Apellido del cliente"
                  className={`w-full px-3 py-2 border rounded-lg ${errors.last_name && touched.last_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                <ErrorMessage name="last_name" component="p" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email del cliente"
                  className={`w-full px-3 py-2 border rounded-lg ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Teléfono
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Teléfono del cliente"
                  inputMode="numeric"
                  className={`w-full px-3 py-2 border rounded-lg ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={(e) => {
                    // Filtrar solo dígitos
                    const numericValue = e.target.value.replace(/\D/g, '');
                    setFieldValue('phone', numericValue);
                  }}
                />
                <ErrorMessage name="phone" component="p" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Dirección
                </label>
                <Field
                  as="textarea"
                  id="address"
                  name="address"
                  placeholder="Dirección del cliente"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ClienteModal;