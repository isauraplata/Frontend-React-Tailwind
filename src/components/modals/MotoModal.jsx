import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function MotoModal({ moto, clientes, isEditing, onSave, onClose }) {
  // Esquema de validación con Yup
  const MotoSchema = Yup.object().shape({
    brand: Yup.string()
      .required('La marca es requerida'),
    model: Yup.string()
      .required('El modelo es requerido'),
    year: Yup.number()
      .required('El año es requerido'),
    license_plate: Yup.string()
      .required('La placa es requerida'),
    color: Yup.string()
      .required('El color es requerido'),
    customer_id: Yup.number()
      .required('El cliente es requerido')
  });

  // Valores iniciales
  const initialValues = {
    id: moto?.id || null,
    brand: moto?.brand || '',
    model: moto?.model || '',
    year: moto?.year || new Date().getFullYear(),
    license_plate: moto?.license_plate || '',
    color: moto?.color || '',
    customer_id: moto?.customer_id || ''
  };

  // Generar opciones de años
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Editar Motocicleta' : 'Nueva Motocicleta'}
        </h2>
        
        <Formik
          initialValues={initialValues}
          validationSchema={MotoSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Convertir customer_id y year a números enteros
            const formattedValues = {
              ...values,
              year: parseInt(values.year),
              customer_id: parseInt(values.customer_id)
            };
            
            onSave(formattedValues);
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                  Marca
                </label>
                <Field
                  type="text"
                  id="brand"
                  name="brand"
                  placeholder="Marca de la motocicleta"
                  className={`w-full px-3 py-2 border rounded-lg ${errors.brand && touched.brand ? 'border-red-500' : 'border-gray-300'}`}
                />
                <ErrorMessage name="brand" component="p" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
                  Modelo
                </label>
                <Field
                  type="text"
                  id="model"
                  name="model"
                  placeholder="Modelo de la motocicleta"
                  className={`w-full px-3 py-2 border rounded-lg ${errors.model && touched.model ? 'border-red-500' : 'border-gray-300'}`}
                />
                <ErrorMessage name="model" component="p" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                  Año
                </label>
                <Field
                  as="select"
                  id="year"
                  name="year"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </Field>
                <ErrorMessage name="year" component="p" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="license_plate">
                  Placa
                </label>
                <Field
                  type="text"
                  id="license_plate"
                  name="license_plate"
                  placeholder="Placa de la motocicleta"
                  className={`w-full px-3 py-2 border rounded-lg ${errors.license_plate && touched.license_plate ? 'border-red-500' : 'border-gray-300'}`}
                />
                <ErrorMessage name="license_plate" component="p" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                  Color
                </label>
                <Field
                  type="text"
                  id="color"
                  name="color"
                  placeholder="Color de la motocicleta"
                  className={`w-full px-3 py-2 border rounded-lg ${errors.color && touched.color ? 'border-red-500' : 'border-gray-300'}`}
                />
                <ErrorMessage name="color" component="p" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer_id">
                  Cliente
                </label>
                <Field
                  as="select"
                  id="customer_id"
                  name="customer_id"
                  className={`w-full px-3 py-2 border rounded-lg ${errors.customer_id && touched.customer_id ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.first_name} {cliente.last_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="customer_id" component="p" className="text-red-500 text-xs mt-1" />
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
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
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

export default MotoModal;