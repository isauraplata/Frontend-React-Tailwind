import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

function OrdenModal({ orden, motocicletas, getClienteById, isEditing, onSave, onClose }) {
  // Estado para mantener la información del cliente
  const [clienteInfo, setClienteInfo] = useState(null);
  const [precioError, setPrecioError] = useState('');
  
  // Esquema de validación con Yup
  const OrdenSchema = Yup.object().shape({
    date: Yup.date().required('La fecha es requerida'),
    motorcycle_id: Yup.number().required('La motocicleta es requerida'),
    diagnosis: Yup.string().required('El diagnóstico es requerido'),
    mileage: Yup.number()
      .min(1, 'El kilometraje debe ser mayor que 0')
      .required('El kilometraje es requerido'),
    status: Yup.string().required('El estado es requerido'),
    services: Yup.array()
      .min(1, 'Debe agregar al menos un servicio')
      .of(
        Yup.object().shape({
          name: Yup.string().required('El nombre del servicio es requerido'),
          price: Yup.number()
            .min(0.01, 'El precio debe ser mayor que 0')
            .required('El precio es requerido')
        })
      )
  });

  // Valores iniciales
  const initialValues = {
    id: orden?.id || null,
    date: orden?.date || new Date().toISOString().split('T')[0],
    motorcycle_id: orden?.motorcycle_id || '',
    services: orden?.services || [],
    diagnosis: orden?.diagnosis || '',
    mileage: orden?.mileage || 0,
    status: orden?.status || 'Pending',
    total: orden?.total || 0
  };

  // Status options
  const statusOptions = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Editar Orden de Servicio' : 'Nueva Orden de Servicio'}
        </h2>
        
        <Formik
          initialValues={initialValues}
          validationSchema={OrdenSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Asegurarse de que motorcycle_id y mileage sean números
            const formattedValues = {
              ...values,
              motorcycle_id: parseInt(values.motorcycle_id),
              mileage: parseInt(values.mileage),
              // Calcular el total final
              total: values.services.reduce((sum, service) => sum + parseFloat(service.price), 0)
            };
            
            onSave(formattedValues);
            setSubmitting(false);

            toast.success(isEditing 
              ? 'Orden de servicio actualizada correctamente' 
              : 'Orden de servicio creada correctamente');
          }}
        >
          {({ values, errors, touched, setFieldValue }) => {
            // Efecto para actualizar la información del cliente cuando cambia la motocicleta
            useEffect(() => {
              if (values.motorcycle_id) {
                const moto = motocicletas.find(m => m.id === parseInt(values.motorcycle_id));
                if (moto) {
                  const cliente = getClienteById(moto.customer_id);
                  setClienteInfo(cliente);
                } else {
                  setClienteInfo(null);
                }
              } else {
                setClienteInfo(null);
              }
            }, [values.motorcycle_id]);

            // Calcular el total cuando cambian los servicios
            useEffect(() => {
              const total = values.services.reduce((sum, service) => sum + parseFloat(service.price || 0), 0);
              setFieldValue('total', total);
            }, [values.services]);

            return (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                      Fecha
                    </label>
                    <Field
                      type="date"
                      id="date"
                      name="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <ErrorMessage name="date" component="p" className="text-red-500 text-xs mt-1" />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                      Estado
                    </label>
                    <Field
                      as="select"
                      id="status"
                      name="status"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="status" component="p" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="motorcycle_id">
                    Motocicleta
                  </label>
                  <Field
                    as="select"
                    id="motorcycle_id"
                    name="motorcycle_id"
                    className={`w-full px-3 py-2 border rounded-lg ${errors.motorcycle_id && touched.motorcycle_id ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Seleccione una motocicleta</option>
                    {motocicletas.map(moto => (
                      <option key={moto.id} value={moto.id}>
                        {moto.brand} {moto.model} - {moto.license_plate}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="motorcycle_id" component="p" className="text-red-500 text-xs mt-1" />
                </div>
                
                {clienteInfo && (
                  <div className="p-4 mb-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Información del Cliente:</h4>
                    <p>{clienteInfo.first_name} {clienteInfo.last_name}</p>
                    <p>{clienteInfo.phone}</p>
                    <p>{clienteInfo.email}</p>
                    <p>{clienteInfo.address}</p>
                  </div>
                )}
                  
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mileage">
                    Kilometraje
                  </label>
                  <Field
                    type="number"
                    id="mileage"
                    name="mileage"
                    className={`w-full px-3 py-2 border rounded-lg ${errors.mileage && touched.mileage ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Kilometraje actual"
                    min="0"
                  />
                  <ErrorMessage name="mileage" component="p" className="text-red-500 text-xs mt-1" />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnosis">
                    Diagnóstico
                  </label>
                  <Field
                    as="textarea"
                    id="diagnosis"
                    name="diagnosis"
                    className={`w-full px-3 py-2 border rounded-lg ${errors.diagnosis && touched.diagnosis ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Diagnóstico detallado"
                    rows="3"
                  />
                  <ErrorMessage name="diagnosis" component="p" className="text-red-500 text-xs mt-1" />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Servicios
                  </label>
                  
                  <FieldArray name="services">
                    {({ push, remove }) => (
                      <>
                        <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                            <div className="md:col-span-2">
                              <input
                                type="text"
                                id="newServiceName"
                                placeholder="Nombre del servicio"
                                className="w-full px-3 py-2 border rounded-lg border-gray-300"
                                value={values.newServiceName || ''}
                                onChange={e => {
                                  setFieldValue('newServiceName', e.target.value);
                                  setPrecioError('');
                                }}
                              />
                            </div>
                            
                            <div>
                              <input
                                type="number"
                                id="newServicePrice"
                                placeholder="Precio"
                                className={`w-full px-3 py-2 border rounded-lg ${precioError ? 'border-red-500' : 'border-gray-300'}`}
                                min="0.01"
                                step="0.01"
                                value={values.newServicePrice || ''}
                                onChange={e => {
                                  setFieldValue('newServicePrice', e.target.value);
                                  setPrecioError('');
                                }}
                              />
                              {precioError && (
                                <p className="text-red-500 text-xs mt-1">{precioError}</p>
                              )}
                            </div>
                            
                            <div className="flex items-end">
                              <button
                                type="button"
                                onClick={() => {
                                  // Verificar que el precio sea mayor que 0
                                  const precio = parseFloat(values.newServicePrice);
                                  if (!values.newServiceName) {
                                    setPrecioError('');
                                    return;
                                  }
                                  
                                  if (!values.newServicePrice || precio <= 0) {
                                    setPrecioError('El precio debe ser mayor que 0');
                                    return;
                                  }
                                  
                                  push({
                                    name: values.newServiceName,
                                    price: precio
                                  });
                                  setFieldValue('newServiceName', '');
                                  setFieldValue('newServicePrice', '');
                                  setPrecioError('');
                                }}
                                className="bg-[#c2410c] hover:bg-[#9a3412] text-white py-2 px-4 rounded"
                              >
                                Agregar
                              </button>
                            </div>  
                          </div>
                        </div>
                        
                        {values.services.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                              <thead>
                                <tr>
                                  <th className="py-2 px-4 border-b text-left">Servicio</th>
                                  <th className="py-2 px-4 border-b text-left">Precio</th>
                                  <th className="py-2 px-4 border-b text-left">Acción</th>
                                </tr>
                              </thead>
                              <tbody>
                                {values.services.map((service, index) => (
                                  <tr key={index}>
                                    <td className="py-2 px-4 border-b">{service.name}</td>
                                    <td className="py-2 px-4 border-b">${parseFloat(service.price).toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b">
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        Eliminar
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                                <tr className="bg-gray-50 font-bold">
                                  <td className="py-2 px-4 border-b">Total</td>
                                  <td className="py-2 px-4 border-b" colSpan="2">
                                    ${values.total.toFixed(2)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">No hay servicios agregados</p>
                          </div>
                        )}
                        
                        <ErrorMessage name="services" component="p" className="text-red-500 text-xs mt-1" />
                      </>
                    )}
                  </FieldArray>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-bold py-2 px-4 rounded"
                  >
                    {isEditing ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default OrdenModal;