# FotoReceta

Una aplicación web React que permite a los usuarios tomar o subir fotos de alimentos, detectar automáticamente ingredientes usando Google Cloud Vision API, y mostrar recetas sugeridas basadas en estos ingredientes.

## Eslogan
**"Toma una foto. Cocina lo que ves."**

## Características

- Toma fotos con la cámara del dispositivo o sube imágenes desde la galería
- Detección automática de ingredientes mediante Google Cloud Vision API
- Edición de ingredientes detectados
- Búsqueda y filtrado de recetas basadas en los ingredientes disponibles
- Visualización detallada de recetas
- Sistema de valoración (1-5 estrellas)
- Guardado de recetas favoritas
- Diseño responsive y moderno

## Tecnologías utilizadas

- React 18
- React Router DOM
- Google Cloud Vision API
- HTML5 Canvas y MediaDevices API para la captura de fotos
- LocalStorage para persistencia de datos

## Requisitos previos

- Node.js y npm instalados
- Una clave de API de Google Cloud Vision

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/fotorreceta.git
   cd fotorreceta
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con tu clave de API:
   ```
   REACT_APP_VISION_API_KEY=TU_CLAVE_API_AQUÍ
   ```

4. Inicia la aplicación en modo desarrollo:
   ```bash
   npm start
   ```

La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto

```
FotoReceta/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── index.js
│   ├── App.js
│   ├── data/
│   │   └── mock_recipes.js
│   ├── styles/
│   │   └── global.css
│   └── components/
│       ├── layout/
│       │   ├── Header.js
│       │   └── Footer.js
│       └── pages/
│           ├── LandingPage.js
│           ├── CameraPage.js
│           ├── IngredientsPage.js
│           ├── RecipesPage.js
│           ├── RecipeDetailPage.js
│           ├── FavoritesPage.js
│           └── NotFoundPage.js
```

## Despliegue

Para crear una versión de producción:

```bash
npm run build
```

Esto generará una carpeta `build` con los archivos optimizados listos para ser desplegados.

La aplicación puede ser fácilmente desplegada en:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## Flujo de uso

1. El usuario abre la aplicación y ve la Landing Page con el eslogan y un botón "Probar ahora"
2. Al hacer clic, va a la pantalla de cámara donde puede tomar una foto o subir una imagen
3. La imagen se procesa con Google Vision API para detectar ingredientes
4. El usuario puede editar los ingredientes detectados (eliminar o añadir)
5. Se buscan y muestran recetas que coinciden con los ingredientes disponibles
6. El usuario puede ver los detalles de cada receta, valorarla y guardarla como favorita
7. En cualquier momento puede acceder a sus recetas favoritas

## Notas importantes

- Esta aplicación es un MVP (Producto Mínimo Viable) para validación de concepto
- No requiere login ni backend
- Utiliza datos mock para las recetas, pero la detección de ingredientes es real
- La clave de API de Google Cloud Vision debe tener habilitada la funcionalidad "Vision API"
- Se requiere acceso a la cámara para la captura de imágenes

## Limitaciones actuales

- Número limitado de recetas en el catálogo
- Detección de ingredientes limitada a los que Google Vision API puede identificar
- La coincidencia entre ingredientes detectados y recetas es aproximada

---

Desarrollado con ❤️ y hambre.