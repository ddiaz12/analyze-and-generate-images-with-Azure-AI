// App.js

import React, { useState } from 'react';
import './App.css';
import { analyzeImage } from './azure-image-analysis'; // Importa la función analyzeImage

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState('');

  const handleImageAnalysis = async () => {
    setLoading(true);

    try {
      const result = await analyzeImage(imageUrl);
      setAnalysisResult(result);

      // Obtén la URL de la imagen procesada si está disponible en la respuesta
      const processedUrl = result?.metadata?.processedImageUrl;
      if (processedUrl) {
        setProcessedImageUrl(processedUrl);
      }
    } catch (error) {
      // Manejar errores aquí
    }

    setLoading(false);
  };

  const DisplayResults = () => {
    if (loading) {
      return <p>Procesando la imagen...</p>;
    }
  
    if (analysisResult) {
      // Si hay resultados de análisis, mostrar la información
      return (
        <div>
          <p>Imagen procesada:</p>
          {processedImageUrl && <img src={processedImageUrl} alt="Processed Image" />}
          <p>Descripción: {analysisResult.description.captions[0].text}</p>
          <p>Etiquetas: {analysisResult.description.tags.join(', ')}</p>
          <p>Confianza: {analysisResult.description.captions[0].confidence}</p>
        </div>
      );
    }
  
    if (processedImageUrl) {
      // Si hay una URL de imagen procesada, mostrar la información
      return (
        <div>
          <p>Imagen procesada:</p>
          <img src={processedImageUrl} alt="Processed Image" />
          <p>No hay información de análisis disponible.</p>
        </div>
      );
    }
  
    // Si no hay resultados ni URL de imagen procesada, mostrar un mensaje de error
    return (
      <div>
        <p>No se ha podido procesar la imagen</p>
      </div>
    );
  };
  

  return (
    <div className="container">
      <h1>Image Analysis and Generation App</h1>
      <label>Image URL:</label>
      <input
        className="input-field"
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button className="action-button" onClick={handleImageAnalysis}>
        Analyze Image
      </button>
      <DisplayResults />
    </div>
  );
}

export default App;
