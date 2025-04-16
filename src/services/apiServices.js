import axios from "axios";

// API base URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Servicios para clientes
export const clienteService = {
  getAll: async () => {
    const res = await axios.get(`${API_BASE_URL}/customers/`);
    return res.data;
  },
  
  getById: async (id) => {
    const res = await axios.get(`${API_BASE_URL}/customers/${id}/`);
    return res.data;
  },
  
  create: async (data) => {
    const res = await axios.post(`${API_BASE_URL}/customers/`, data);
    return res.data;
  },
  
  update: async (id, data) => {
    const res = await axios.put(`${API_BASE_URL}/customers/${id}/`, data);
    return res.data;
  },
  
  delete: async (id) => {
    await axios.delete(`${API_BASE_URL}/customers/${id}/`);
    return true;
  }
};

// Servicios para motocicletas
export const motoService = {
  getAll: async () => {
    const res = await axios.get(`${API_BASE_URL}/motorcycles/`);
    return res.data;
  },
  
  getById: async (id) => {
    const res = await axios.get(`${API_BASE_URL}/motorcycles/${id}/`);
    return res.data;
  },
  
  create: async (data) => {
    const res = await axios.post(`${API_BASE_URL}/motorcycles/`, data);
    return res.data;
  },
  
  update: async (id, data) => {
    const res = await axios.put(`${API_BASE_URL}/motorcycles/${id}/`, data);
    return res.data;
  },
  
  delete: async (id) => {
    await axios.delete(`${API_BASE_URL}/motorcycles/${id}/`);
    return true;
  }
};

// Servicios para órdenes
export const ordenService = {
  getAll: async () => {
    const res = await axios.get(`${API_BASE_URL}/service-orders/`);
    return res.data;
  },
  
  getById: async (id) => {
    const res = await axios.get(`${API_BASE_URL}/service-orders/${id}/`);
    return res.data;
  },
  
  create: async (data) => {
    const res = await axios.post(`${API_BASE_URL}/service-orders/`, data);
    return res.data;
  },
  
  update: async (id, data) => {
    const res = await axios.put(`${API_BASE_URL}/service-orders/${id}/`, data);
    return res.data;
  },
  
  delete: async (id) => {
    await axios.delete(`${API_BASE_URL}/service-orders/${id}/`);
    return true;
  }
};