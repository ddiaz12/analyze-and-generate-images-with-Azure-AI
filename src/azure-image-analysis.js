// Importa la biblioteca axios para realizar solicitudes HTTP
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Función para analizar una imagen utilizando Azure AI Vision
export async function analyzeImage(imageUrl) {
  // Definir la clave y el punto final del servicio de Computer Vision
  const apiKey = process.env.AZURE_API_KEY;
  const endpoint = process.env.AZURE_ENDPOINT;  

  // Configuración de encabezados para la solicitud HTTP
  const headers = {
    'Ocp-Apim-Subscription-Key': apiKey,
    'Content-Type': 'application/json',
  };

  // Cuerpo de la solicitud en formato JSON
  const body = {
    url: imageUrl,
  };

  try {
    // Realizar la solicitud POST a la API de Computer Vision
    const response = await axios.post(`${endpoint}/vision/v3.2/analyze?visualFeatures=Categories,Description,Objects`, body, { headers });
  
    // Analizar la respuesta JSON
    const analysis = response.data;
    return analysis;
  } catch (error) {
    console.error('Error al analizar la imagen:', error);
  
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor.');
    } else {
      console.error('Error al realizar la solicitud:', error.message);
    }
  
    throw error;
  }
  
}
