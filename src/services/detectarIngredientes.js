// Módulo para detectar ingredientes usando la API de Clarifai

/**
 * Detecta ingredientes en una imagen usando la API de Clarifai
 * @param {string} imageData - Imagen en formato base64 o URL
 * @param {boolean} isBase64 - Indica si la imagen está en formato base64
 * @returns {Promise} - Promise que resuelve a un array de ingredientes con su confianza
 */
const detectarIngredientes = async (imageData, isBase64 = true) => {
  // Configuración de la API de Clarifai
  const USER_ID = 'fotoreceta';
  const APP_ID = 'foto_receta';
  const API_KEY = '439349bc92b24932ac284b252b5b1f0c';
  
  // Cambiado a un ID de modelo verificado para alimentos
  const MODEL_ID = 'food-item-v1-recognition';

  try {
    // Para depuración
    console.log('Iniciando detección de ingredientes');
    
    // Si es base64, limpiamos el encabezado si existe
    let processedImageData = imageData;
    if (isBase64 && imageData.startsWith('data:image')) {
      processedImageData = imageData.split(',')[1];
      console.log('Imagen procesada: Base64 con encabezado removido');
    }

    // Preparar los datos para la petición
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": isBase64 ? {
              "base64": processedImageData
            } : {
              "url": imageData
            }
          }
        }
      ]
    });

    // Para depuración - ver lo que se está enviando (sin mostrar toda la imagen)
    console.log('Enviando solicitud a Clarifai:');
    console.log('- Usuario:', USER_ID);
    console.log('- App:', APP_ID);
    console.log('- Modelo:', MODEL_ID);
    console.log('- Tipo:', isBase64 ? 'base64' : 'url');

    // Configuración de la petición
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + API_KEY
      },
      body: raw
    };

    // Realizar la petición a la API de Clarifai a través del proxy
    // CAMBIO IMPORTANTE: Usamos el proxy para evitar problemas de CORS
    console.log('Enviando petición al proxy:', `https://clarifaiproxy.onrender.com/v2/models/${MODEL_ID}/outputs`);
    const response = await fetch(
      `https://clarifaiproxy.onrender.com/v2/models/${MODEL_ID}/outputs`, 
      requestOptions
    );
    
    const result = await response.json();
    
    // Depuración - ver estructura de respuesta
    console.log('Respuesta de Clarifai:', result);
    
    // Verificar si hay errores en la respuesta
    if (result.status && result.status.code !== 10000) {
      throw new Error(`API Error: ${result.status.description || JSON.stringify(result.status)}`);
    }

    // Si no hay conceptos, retornar array vacío
    if (!result.outputs || 
        !result.outputs[0] || 
        !result.outputs[0].data || 
        !result.outputs[0].data.concepts) {
      console.log('No se encontraron conceptos en la respuesta');
      return [];
    }

    // Procesar los ingredientes detectados
    const ingredientes = result.outputs[0].data.concepts.map(concept => ({
      nombre: concept.name,
      confianza: concept.value
    }));

    console.log('Ingredientes detectados:', ingredientes);

    // Filtrar solo los ingredientes con confianza mayor a 0.6
    const ingredientesFiltrados = ingredientes.filter(ingrediente => ingrediente.confianza > 0.6);
    console.log('Ingredientes filtrados:', ingredientesFiltrados);
    
    return ingredientesFiltrados;
    
  } catch (error) {
    console.error('Error al detectar ingredientes:', error);
    // Añadir alerta para ver el error exacto en desarrollo
    alert('Error técnico en Clarifai: ' + error.message);
    throw error;
  }
};

/**
 * Convierte una imagen de File a base64
 * @param {File} file - Archivo de imagen
 * @returns {Promise} - Promise que resuelve a la imagen en formato base64
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Captura una imagen de la cámara y la convierte a base64
 * @param {HTMLVideoElement} videoElement - Elemento de video
 * @returns {Promise} - Promise que resuelve a la imagen en formato base64
 */
const captureImageFromCamera = (videoElement) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      
      const context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      const dataUrl = canvas.toDataURL('image/jpeg');
      resolve(dataUrl);
    } catch (error) {
      reject(error);
    }
  });
};

export { detectarIngredientes, fileToBase64, captureImageFromCamera };