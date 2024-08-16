import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Spinner
 from './Spinner';
const ExcelReader = () => {
  const [excelData, setExcelData] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASEURL;

  const requiredFields = {
    'titulo': 'string',
    'categoria': 'string',
   // 'precioCosto': 'number',
  //  'p.costousd': 'number',
    'margen': 'number',
  //  'precioVenta': 'number',
    'proveedor': 'string',
 //   'stock': 'number',
  //  'codigo': 'string'
  };

  const validateExcelData = (data) => {
    for (let i = 0; i < data.length; i++) {
      for (let field in requiredFields) {
        if (!data[i].hasOwnProperty(field)) {
          return `Error en la fila ${i + 1}: el campo '${field}' es requerido.`;
        }
        const expectedType = requiredFields[field];
        const actualType = typeof data[i][field];
        if (actualType !== expectedType) {
          return `Error en la fila ${i + 1}: el campo '${field}' debe ser de tipo '${expectedType}', pero se recibió '${actualType}'.`;
        }
      }
    }
    return '';
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let json = XLSX.utils.sheet_to_json(worksheet);

      json = json.map(item => ({
        ...item,
        precioCosto: parseFloat(item.precioCosto).toFixed(2),
        precioCostoUsd: parseFloat(item.precioCostoUsd).toFixed(2),
        precioVenta: parseFloat(item.precioVenta).toFixed(2),
      }))

      const error = validateExcelData(json);
      if (error) {
        setValidationError(error);
        setExcelData([]);
      } else {
        setValidationError('');
        setExcelData(json);
      }

      //console.log(json);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    //console.log(excelData);
    if (excelData.length === 0) {
      alert("No hay datos válidos para enviar");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/cargaMasiva`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ excelData })
      });
      if (!response.ok) {
        throw new Error('Error en la carga masiva de datos');
      }
      const result = await response.json();
     // console.log(result);
      setLoading(false)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {loading && <Spinner />}
      <input 
        type='file'
        onChange={handleFileUpload} 
      />
      {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
      

      <button onClick={handleSubmit} disabled={excelData.length === 0}>
        Enviar Datos
      </button>
    </div>
  );
};

export default ExcelReader;
