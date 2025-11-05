// Export service for handling different file format exports

/**
 * Export data to CSV format
 */
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, filename);
};

/**
 * Export data to JSON format
 */
export const exportToJSON = (data, filename = 'export.json') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  downloadFile(blob, filename);
};

/**
 * Export data to Excel format
 */
export const exportToExcel = (data, filename = 'export.xlsx') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const htmlTable = `
    <table>
      <thead>
        <tr>${headers.map(h => `<th>${formatHeader(h)}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${data.map(row => `
          <tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>
        `).join('')}
      </tbody>
    </table>
  `;

  const blob = new Blob([htmlTable], { 
    type: 'application/vnd.ms-excel' 
  });
  downloadFile(blob, filename);
};

/**
 * Export data to PDF format (opens print dialog)
 */
export const exportToPDF = (data, filename = 'export.pdf', title = 'Export Report') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          padding: 20px; 
          color: #333;
        }
        h1 { 
          color: #1f2937; 
          margin-bottom: 20px; 
          font-size: 24px;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 20px; 
        }
        th, td { 
          border: 1px solid #e5e7eb; 
          padding: 12px; 
          text-align: left; 
          font-size: 14px;
        }
        th { 
          background-color: #f3f4f6; 
          font-weight: 600; 
          color: #374151;
        }
        tr:nth-child(even) { 
          background-color: #f9fafb; 
        }
        .meta { 
          color: #6b7280; 
          font-size: 12px; 
          margin-bottom: 10px; 
        }
        @media print {
          body { padding: 10px; }
          h1 { font-size: 20px; }
          th, td { padding: 8px; font-size: 12px; }
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="meta">Generated on: ${new Date().toLocaleString()}</div>
      <div class="meta">Total Records: ${data.length}</div>
      <table>
        <thead>
          <tr>${headers.map(h => `<th>${formatHeader(h)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>${headers.map(h => `<td>${row[h] !== null && row[h] !== undefined ? row[h] : ''}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
};

/**
 * Prepare data for export with selected fields
 */
export const prepareExportData = (data, selectedFields = null) => {
  if (!selectedFields || selectedFields.length === 0) {
    return data;
  }

  return data.map(item => {
    const filtered = {};
    selectedFields.forEach(field => {
      if (item.hasOwnProperty(field)) {
        filtered[field] = item[field];
      }
    });
    return filtered;
  });
};

/**
 * Helper function to download file
 */
const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Helper function to format header names
 */
const formatHeader = (header) => {
  return header
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

/**
 * Generate filename with timestamp
 */
export const generateFilename = (prefix = 'export', extension = 'csv') => {
  const timestamp = new Date().toISOString().split('T')[0];
  return `${prefix}_${timestamp}.${extension}`;
};
