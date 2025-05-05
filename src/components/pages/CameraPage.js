import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Corregir la ruta de importación (asegurarse de que coincida con la estructura real de carpetas)
import { detectarIngredientes, fileToBase64, captureImageFromCamera } from '../../services/detectarIngredientes';

const CameraPage = () => {
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [captureMode, setCaptureMode] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  // Iniciar la cámara
  useEffect(() => {
    if (captureMode) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error al acceder a la cámara:', err);
          setError('No se pudo acceder a la cámara. Por favor, permite el acceso o sube una imagen.');
          setCaptureMode(false);
        }
      };
      
      startCamera();
      
      // Limpiar cuando el componente se desmonte
      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    }
  }, [captureMode]);
  
  // Capturar la imagen
  const captureImage = async () => {
    if (videoRef.current) {
      try {
        const dataUrl = await captureImageFromCamera(videoRef.current);
        setImageData(dataUrl);
        
        // Detener la cámara
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        
        // Analizar la imagen
        analyzeImage(dataUrl);
      } catch (err) {
        console.error('Error al capturar imagen:', err);
        setError('Hubo un error al capturar la imagen. Por favor, inténtalo de nuevo.');
      }
    }
  };
  
  // Manejar la carga de una imagen desde el dispositivo
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Data = await fileToBase64(file);
        setImageData(base64Data);
        analyzeImage(base64Data);
      } catch (err) {
        console.error('Error al procesar el archivo:', err);
        setError('Hubo un error al procesar la imagen. Por favor, inténtalo de nuevo.');
      }
    }
  };
  
  // Analizar la imagen con Clarifai
  const analyzeImage = async (imageDataUrl) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Detectar ingredientes usando Clarifai
      const ingredientesDetectados = await detectarIngredientes(imageDataUrl);
      
      if (ingredientesDetectados.length === 0) {
        setError('No se pudieron detectar ingredientes en la imagen. Inténtalo con otra foto o añade los ingredientes manualmente.');
        setIsLoading(false);
        return;
      }
      
      console.log('Ingredientes detectados:', ingredientesDetectados);
      
      // Extraer solo los nombres de los ingredientes
      const ingredientes = ingredientesDetectados.map(item => item.nombre);
      
      // Guardar en localStorage y navegar a la página de ingredientes
      localStorage.setItem('detectedIngredients', JSON.stringify(ingredientes));
      localStorage.setItem('capturedImage', imageDataUrl);
      localStorage.setItem('ingredientesConConfianza', JSON.stringify(ingredientesDetectados));
      
      setIsLoading(false);
      navigate('/ingredients');
      
    } catch (err) {
      console.error('Error al analizar la imagen:', err);
      setError('Hubo un problema al analizar la imagen. Por favor, inténtalo de nuevo.');
      setIsLoading(false);
    }
  };
  
  // Cambiar entre modo cámara y subida de archivo
  const toggleCaptureMode = () => {
    setCaptureMode(!captureMode);
    setError(null);
    
    // Si cambiamos a modo subida, detener la cámara
    if (captureMode && videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };
  
  return (
    <div className="container">
      <h2 className="text-center mb-3">Captura tus ingredientes</h2>
      
      {error && (
        <div className="card" style={{ backgroundColor: '#ffdddd', color: '#ff0000', marginBottom: '20px' }}>
          <p>{error}</p>
        </div>
      )}
      
      <div className="camera-container">
        {captureMode ? (
          <>
            {!imageData && (
              <video 
                ref={videoRef} 
                className="video-preview" 
                autoPlay 
                playsInline 
              />
            )}
            
            {imageData && (
              <img 
                src={imageData} 
                alt="Imagen capturada" 
                className="image-preview"
              />
            )}
            
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </>
        ) : (
          <>
            {imageData ? (
              <img 
                src={imageData} 
                alt="Imagen subida" 
                className="image-preview"
              />
            ) : (
              <div 
                className="card" 
                style={{ 
                  height: '300px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  border: '2px dashed #ccc'
                }}
              >
                <p>Por favor, sube una imagen o cambia a modo cámara</p>
              </div>
            )}
            
            <input 
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
      
      <div className="camera-controls">
        {captureMode ? (
          !imageData ? (
            <button 
              className="btn btn-primary" 
              onClick={captureImage}
            >
              Tomar foto
            </button>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={() => setImageData(null)}
            >
              Tomar otra
            </button>
          )
        ) : (
          <button 
            className="btn btn-primary" 
            onClick={() => fileInputRef.current.click()}
          >
            Subir imagen
          </button>
        )}
        
        <button 
          className="btn btn-secondary" 
          onClick={toggleCaptureMode}
        >
          {captureMode ? 'Modo subida' : 'Modo cámara'}
        </button>
      </div>
      
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p className="mt-2">Analizando imagen con IA...</p>
        </div>
      )}
    </div>
  );
};

export default CameraPage;