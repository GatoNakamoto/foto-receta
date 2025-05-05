// test-clarifai.js

// Script para probar la API de Clarifai para detección de ingredientes
// Puedes ejecutarlo con Node.js para verificar que funciona correctamente

// Importaciones necesarias
const fs = require('fs');
const fetch = require('node-fetch'); // Necesitas instalar: npm install node-fetch

// Configuración de la API de Clarifai
const USER_ID = 'fotoreceta';
const APP_ID = 'foto_receta';
const API_KEY = '439349bc92b24932ac284b252b5b1f0c';
const MODEL_ID = 'food-item-recognition';

/**
 * Detecta ingredientes en una imagen usando la API de Clarifai
 * @param {string} imagePath - Ruta al archivo de imagen local
 */
async function testImageDetection(imagePath) {
  try {
    // Leer la imagen y convertirla a base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    console.log(`Imagen cargada desde: ${imagePath}`);
    console.log('Enviando solicitud a Clarifai...');
    
    // Preparar los datos para la petición
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "base64": base64Image
            }
          }
        }
      ]
    });

    // Configuración de la petición
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + API_KEY
      },
      body: raw
    };

    // Realizar la petición a la API de Clarifai
    const response = await fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, 
      requestOptions
    );
    
    const result = await response.json();
    
    // Verificar si hay errores en la respuesta
    if (result.status && result.status.code !== 10000) {
      throw new Error(`API Error: ${result.status.description}`);
    }

    // Si no hay conceptos, retornar error
    if (!result.outputs || 
        !result.outputs[0] || 
        !result.outputs[0].data || 
        !result.outputs[0].data.concepts) {
      console.log('No se encontraron conceptos en la respuesta.');
      return;
    }

    // Mostrar los ingredientes detectados
    console.log('\nINGREDIENTES DETECTADOS:');
    console.log('========================');
    
    const ingredientes = result.outputs[0].data.concepts;
    
    // Mostrar tabla con los resultados
    console.log('Nombre\t\t\t\tConfianza');
    console.log('---------------------------------------');
    
    ingredientes.forEach(ingrediente => {
      // Formatear para una mejor visualización
      const nombre = ingrediente.name.padEnd(30);
      const confianza = (ingrediente.value * 100).toFixed(2) + '%';
      
      console.log(`${nombre}${confianza}`);
    });
    
    // Mostrar los ingredientes con mejor confianza
    console.log('\nINGREDIENTES MÁS PROBABLES (>60%):');
    console.log('================================');
    
    const ingredientesConfiables = ingredientes
      .filter(i => i.value > 0.6)
      .map(i => i.name);
      
    console.log(ingredientesConfiables.join(', '));
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Si se proporciona una ruta de imagen como argumento, usarla
// De lo contrario, usar una ruta predeterminada
const imagePath = process.argv[2] || './test-image.jpg';

// Ejecutar la prueba
testImageDetection(imagePath);

console.log('\nUso: node testClarifai.js [ruta-de-imagen]');
console.log('Si no se proporciona una ruta, se buscará en ./test-image.jpg');