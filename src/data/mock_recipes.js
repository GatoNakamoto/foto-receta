const mockRecipes = [
  {
    id: 1,
    title: "Ensalada mediterránea",
    image: "https://via.placeholder.com/300x200?text=Ensalada+Mediterránea",
    ingredients: [
      "tomate", 
      "pepino", 
      "cebolla", 
      "aceitunas", 
      "queso feta", 
      "aceite de oliva",
      "orégano"
    ],
    time: "15 min",
    difficulty: "Fácil",
    instructions: [
      "Lavar y cortar los tomates y pepinos en cubos.",
      "Cortar la cebolla en rodajas finas.",
      "Mezclar todos los vegetales en un bol grande.",
      "Añadir las aceitunas y desmenuzar el queso feta por encima.",
      "Aliñar con aceite de oliva y espolvorear orégano al gusto."
    ],
    description: "Una refrescante ensalada mediterránea, perfecta para días calurosos."
  },
  {
    id: 2,
    title: "Pasta al pesto",
    image: "https://via.placeholder.com/300x200?text=Pasta+al+Pesto",
    ingredients: [
      "pasta", 
      "albahaca", 
      "ajo", 
      "piñones", 
      "queso parmesano", 
      "aceite de oliva"
    ],
    time: "20 min",
    difficulty: "Fácil",
    instructions: [
      "Cocer la pasta según las instrucciones del paquete.",
      "Mientras tanto, preparar el pesto triturando la albahaca, el ajo, los piñones y el queso parmesano.",
      "Añadir aceite de oliva poco a poco hasta conseguir la consistencia deseada.",
      "Escurrir la pasta y mezclar con el pesto.",
      "Servir con un poco más de queso parmesano rallado por encima."
    ],
    description: "Una deliciosa pasta italiana con salsa pesto casera."
  },
  {
    id: 3,
    title: "Tortilla de patatas",
    image: "https://via.placeholder.com/300x200?text=Tortilla+de+Patatas",
    ingredients: [
      "patatas", 
      "huevos", 
      "cebolla", 
      "aceite de oliva", 
      "sal"
    ],
    time: "40 min",
    difficulty: "Media",
    instructions: [
      "Pelar y cortar las patatas en rodajas finas.",
      "Cortar la cebolla en juliana.",
      "Freír las patatas y la cebolla a fuego medio-bajo hasta que estén tiernas.",
      "Batir los huevos en un bol grande y añadir las patatas y cebolla escurridas.",
      "Calentar un poco de aceite en una sartén y verter la mezcla.",
      "Cocinar a fuego medio-bajo hasta que esté cuajada por abajo.",
      "Dar la vuelta con ayuda de un plato y cocinar por el otro lado.",
      "Servir caliente o a temperatura ambiente."
    ],
    description: "La clásica tortilla española, perfecto plato para cualquier ocasión."
  },
  {
    id: 4,
    title: "Curry de garbanzos",
    image: "https://via.placeholder.com/300x200?text=Curry+de+Garbanzos",
    ingredients: [
      "garbanzos", 
      "cebolla", 
      "ajo", 
      "tomate", 
      "especias curry", 
      "leche de coco",
      "cilantro"
    ],
    time: "30 min",
    difficulty: "Media",
    instructions: [
      "Picar la cebolla y el ajo finamente y sofreírlos en una sartén.",
      "Añadir el tomate cortado en dados y cocinar hasta que se ablande.",
      "Incorporar las especias de curry y cocinar por un minuto para que suelten su aroma.",
      "Añadir los garbanzos cocidos y la leche de coco.",
      "Dejar cocinar a fuego lento durante 15 minutos.",
      "Ajustar de sal y decorar con cilantro fresco picado."
    ],
    description: "Un curry vegetariano reconfortante y lleno de sabor."
  },
  {
    id: 5,
    title: "Hamburguesas caseras",
    image: "https://via.placeholder.com/300x200?text=Hamburguesas+Caseras",
    ingredients: [
      "carne picada", 
      "cebolla", 
      "ajo", 
      "huevo", 
      "pan rallado", 
      "mostaza",
      "pan de hamburguesa",
      "lechuga",
      "tomate",
      "queso"
    ],
    time: "35 min",
    difficulty: "Media",
    instructions: [
      "Mezclar la carne picada con cebolla y ajo finamente picados, huevo, pan rallado y mostaza.",
      "Formar las hamburguesas con las manos y dejar reposar en la nevera 15 minutos.",
      "Cocinar las hamburguesas en una sartén o parrilla hasta el punto deseado.",
      "Tostar ligeramente el pan de hamburguesa.",
      "Montar las hamburguesas con lechuga, tomate y queso.",
      "Servir calientes con patatas fritas o ensalada."
    ],
    description: "Deliciosas hamburguesas caseras, mucho más sabrosas que las compradas."
  },
  {
    id: 6,
    title: "Risotto de champiñones",
    image: "https://via.placeholder.com/300x200?text=Risotto+de+Champiñones",
    ingredients: [
      "arroz arborio", 
      "champiñones", 
      "cebolla", 
      "ajo", 
      "vino blanco", 
      "caldo de verduras",
      "queso parmesano",
      "mantequilla"
    ],
    time: "45 min",
    difficulty: "Media",
    instructions: [
      "Sofreír la cebolla y el ajo picados en un poco de mantequilla.",
      "Añadir los champiñones laminados y cocinar hasta que suelten el agua.",
      "Incorporar el arroz y remover durante un minuto para que se impregne bien.",
      "Añadir el vino blanco y dejar que se evapore.",
      "Ir añadiendo el caldo caliente poco a poco, removiendo constantemente.",
      "Cuando el arroz esté al dente, retirar del fuego y añadir mantequilla y queso parmesano.",
      "Remover bien y dejar reposar tapado durante 2 minutos antes de servir."
    ],
    description: "Un cremoso risotto italiano con champiñones y parmesano."
  },
  {
    id: 7,
    title: "Pisto manchego",
    image: "https://via.placeholder.com/300x200?text=Pisto+Manchego",
    ingredients: [
      "calabacín", 
      "berenjena", 
      "pimiento rojo", 
      "pimiento verde", 
      "tomate", 
      "cebolla",
      "ajo",
      "aceite de oliva"
    ],
    time: "50 min",
    difficulty: "Fácil",
    instructions: [
      "Cortar todas las verduras en dados pequeños.",
      "En una cazuela grande, sofreír la cebolla y el ajo en aceite de oliva.",
      "Añadir los pimientos y cocinar 5 minutos más.",
      "Incorporar la berenjena y el calabacín, cocinar a fuego medio durante 10 minutos.",
      "Por último, añadir el tomate y cocinar a fuego lento hasta que todas las verduras estén tiernas.",
      "Sazonar con sal y servir caliente o a temperatura ambiente."
    ],
    description: "Un sabroso plato tradicional español a base de verduras."
  },
  {
    id: 8,
    title: "Pollo al limón",
    image: "https://via.placeholder.com/300x200?text=Pollo+al+Limón",
    ingredients: [
      "pechugas de pollo", 
      "limón", 
      "ajo", 
      "romero", 
      "aceite de oliva", 
      "caldo de pollo"
    ],
    time: "30 min",
    difficulty: "Fácil",
    instructions: [
      "Salpimentar las pechugas de pollo.",
      "Calentar aceite en una sartén y dorar el pollo por ambos lados.",
      "Añadir el ajo picado y el romero.",
      "Incorporar el zumo de limón y el caldo de pollo.",
      "Cocinar a fuego lento hasta que el pollo esté hecho y la salsa se haya reducido ligeramente.",
      "Servir caliente con rodajas de limón por encima."
    ],
    description: "Un plato de pollo fresco y aromático, perfecto para una cena ligera."
  },
  {
    id: 9,
    title: "Gazpacho andaluz",
    image: "https://via.placeholder.com/300x200?text=Gazpacho+Andaluz",
    ingredients: [
      "tomate", 
      "pepino", 
      "pimiento verde", 
      "ajo", 
      "pan", 
      "aceite de oliva",
      "vinagre"
    ],
    time: "15 min + refrigeración",
    difficulty: "Fácil",
    instructions: [
      "Lavar y cortar todas las verduras en trozos.",
      "Remojar el pan en agua durante unos minutos y escurrir.",
      "Triturar todos los ingredientes en una batidora junto con el aceite y el vinagre.",
      "Ajustar de sal y refrigerar durante al menos 2 horas.",
      "Servir muy frío con guarnición de verduras picadas en dados pequeños."
    ],
    description: "Una refrescante sopa fría típica de Andalucía, perfecta para el verano."
  },
  {
    id: 10,
    title: "Arroz con leche",
    image: "https://via.placeholder.com/300x200?text=Arroz+con+Leche",
    ingredients: [
      "arroz", 
      "leche", 
      "azúcar", 
      "canela en rama", 
      "limón", 
      "canela en polvo"
    ],
    time: "40 min",
    difficulty: "Fácil",
    instructions: [
      "Poner la leche a calentar con la canela en rama y la cáscara de limón.",
      "Cuando empiece a hervir, añadir el arroz previamente lavado.",
      "Cocinar a fuego lento durante 30 minutos, removiendo frecuentemente.",
      "Añadir el azúcar y cocinar 5 minutos más.",
      "Retirar la canela y la cáscara de limón.",
      "Verter en recipientes individuales y espolvorear con canela en polvo.",
      "Dejar enfriar antes de servir."
    ],
    description: "Un delicioso postre tradicional, cremoso y con un toque de canela."
  }
];

export default mockRecipes;