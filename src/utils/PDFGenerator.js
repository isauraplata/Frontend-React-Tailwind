import { jsPDF } from 'jspdf';

export const generarOrdenPDF = (orden, moto, cliente) => {
  try {
    console.log("Iniciando generación de PDF...");
    const doc = new jsPDF();
    
    console.log("jsPDF instanciado correctamente");
    
    // Configura el documento
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('ORDEN DE SERVICIO', 105, 15, { align: 'center' });
    
    // Información básica
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Orden #: ${orden.id}`, 20, 25);
    const fechaCreacion = orden.creation_date ? new Date(orden.creation_date).toLocaleDateString() : 'N/A';
    doc.text(`Fecha: ${fechaCreacion}`, 20, 30);
    
    // Estado
    let estadoTexto = orden.status === 'Pending' ? 'Pendiente' :
                      orden.status === 'In Progress' ? 'En Progreso' :
                      orden.status === 'Completed' ? 'Completada' : orden.status;
    doc.text(`Estado: ${estadoTexto}`, 20, 35);
    
    // Datos de cliente
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Información del Cliente', 20, 45);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    if (cliente) {
      doc.text(`Nombre: ${cliente.first_name} ${cliente.last_name}`, 20, 50);
      doc.text(`Teléfono: ${cliente.phone || 'No disponible'}`, 20, 55);
      doc.text(`Email: ${cliente.email || 'No disponible'}`, 20, 60);
    } else {
      doc.text('Cliente no encontrado', 20, 50);
    }
    
    // Datos de moto
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Información de la Motocicleta', 20, 70);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    if (moto) {
      doc.text(`Marca/Modelo: ${moto.brand} ${moto.model}`, 20, 75);
      doc.text(`Año: ${moto.year || 'No disponible'}`, 20, 80);
      doc.text(`Placa: ${moto.license_plate || 'No disponible'}`, 20, 85);
      doc.text(`Color: ${moto.color || 'No disponible'}`, 20, 90);
    } else {
      doc.text('Motocicleta no encontrada', 20, 75);
    }
    
    // Diagnóstico
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Diagnóstico', 20, 100);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${orden.diagnosis || 'No se proporcionó diagnóstico'}`, 20, 105);
    doc.text(`Kilometraje: ${orden.mileage || 'No disponible'} km`, 20, 110);
    
    // Servicios
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Servicios Realizados', 20, 120);
    
    // Crear una tabla básica sin depender de autoTable
    if (orden.services && orden.services.length > 0) {
      // Establecer posición inicial
      let yPos = 125;
      const xService = 20;
      const xPrice = 150;
      
      // Encabezados de la tabla
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Servicio', xService, yPos);
      doc.text('Precio', xPrice, yPos);
      
      // Línea divisoria horizontal
      yPos += 2;
      doc.setDrawColor(200, 200, 200);
      doc.line(xService, yPos, xPrice + 30, yPos);
      yPos += 5;
      
      // Filas de servicios
      doc.setFont('helvetica', 'normal');
      orden.services.forEach(servicio => {
        doc.text(servicio.name || 'Sin nombre', xService, yPos);
        doc.text(`$${servicio.price ? servicio.price.toLocaleString() : '0'}`, xPrice, yPos);
        yPos += 6;
      });
      
      // Línea divisoria horizontal
      doc.line(xService, yPos, xPrice + 30, yPos);
      yPos += 8;
      
      // Añadir totales
      doc.text('Subtotal:', 120, yPos);
      doc.text(`$${orden.subtotal ? orden.subtotal.toLocaleString() : '0'}`, xPrice, yPos);
      yPos += 6;
      
      doc.text('IVA (16%):', 120, yPos);
      doc.text(`$${orden.tax ? orden.tax.toLocaleString() : '0'}`, xPrice, yPos);
      yPos += 6;
      
      doc.setFont('helvetica', 'bold');
      doc.text('Total:', 120, yPos);
      doc.text(`$${orden.total ? orden.total.toLocaleString() : '0'}`, xPrice, yPos);
      
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('No hay servicios registrados', 20, 125);
    }
    
    // Pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
      doc.text('© Sistema de Gestión de Taller de Motocicletas', 105, 295, { align: 'center' });
    }
    
    // Guardar PDF
    doc.save(`Orden_Servicio_${orden.id}.pdf`);
    console.log("PDF generado y guardado exitosamente");
    
    return true;
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    alert('Error al generar el PDF: ' + error.message);
    return false;
  }
};