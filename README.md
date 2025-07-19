# Página de Contacto - Escuela N° 637 "Domingo Cullen"
![replica-1](/home/pol/Desktop/replica-de-cursor-ai-1-vsc/public/replica-cursor-ai-1-vsc.png)


Una página web moderna y responsiva para el formulario de contacto de la Escuela N° 637 "Domingo Cullen" ubicada en Avellaneda 3211, Santa Fe.

## Características

- ✨ Diseño moderno y responsivo
- 📝 Formulario de contacto completo con validaciones
- 🗺️ Mapa embebido de Google Maps
- 💾 Almacenamiento de datos en archivo JSON
- 🔒 Validaciones del lado del cliente y servidor
- 📱 Compatible con dispositivos móviles
- 🎨 Interfaz de usuario atractiva con animaciones

## Tecnologías Utilizadas

### Frontend
- HTML5
- CSS3 (con Flexbox y Grid)
- JavaScript (ES6+)
- Font Awesome (iconos)
- Google Fonts (Roboto)

### Backend
- Node.js
- Express.js
- CORS
- Body Parser

## Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   git clone <url-del-repositorio>
   cd escuela-cullen-contacto
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor**
   ```bash
   # Modo desarrollo (con nodemon)
   npm run dev
   
   # Modo producción
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## Estructura del Proyecto

```
escuela-cullen-contacto/
├── public/
│   ├── index.html          # Página principal
│   ├── styles.css          # Estilos CSS
│   └── script.js           # JavaScript del frontend
├── server.js               # Servidor Node.js
├── package.json            # Configuración del proyecto
├── contactos.json          # Archivo de datos (se crea automáticamente)
└── README.md               # Este archivo
```

## Funcionalidades

### Formulario de Contacto
- **Nombre completo**: Validación de longitud mínima
- **Correo electrónico**: Validación de formato de email
- **Teléfono**: Validación de formato de teléfono
- **Motivo**: Selección entre "Inscripción" o "Consulta General"
- **Mensaje**: Validación de longitud mínima

### Validaciones
- Validación en tiempo real en el frontend
- Validación del lado del servidor
- Mensajes de error descriptivos
- Indicadores visuales de validación

### Almacenamiento de Datos
- Los datos se guardan en `contactos.json`
- Cada contacto incluye:
  - ID único (timestamp)
  - Datos del formulario
  - Fecha y hora de envío

## API Endpoints

### POST /api/contacto
Envía un nuevo mensaje de contacto.

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "correo": "juan@ejemplo.com",
  "telefono": "+54 342 123-4567",
  "motivo": "inscripcion",
  "mensaje": "Quisiera información sobre la inscripción..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente. Nos pondremos en contacto pronto."
}
```

### GET /api/contactos
Obtiene todos los contactos almacenados (para administración).

## Personalización

### Cambiar Información de la Escuela
Edita el archivo `public/index.html` para modificar:
- Nombre de la escuela
- Dirección
- Teléfono
- Email
- Horarios de atención

### Cambiar Mapa de Google Maps
1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca la dirección: "Avellaneda 3211, Santa Fe"
3. Haz clic en "Compartir" → "Insertar mapa"
4. Copia el código del iframe
5. Reemplaza el iframe en `public/index.html`

### Modificar Estilos
Edita `public/styles.css` para personalizar:
- Colores
- Fuentes
- Espaciado
- Animaciones

## Despliegue

### Opciones de Despliegue
- **Heroku**: Conecta tu repositorio de GitHub
- **Vercel**: Despliega directamente desde GitHub
- **Netlify**: Para el frontend (necesitarás un backend separado)
- **VPS**: Para control total del servidor

### Variables de Entorno
```bash
PORT=3000  # Puerto del servidor (opcional, por defecto 3000)
```

## Desarrollo

### Scripts Disponibles
```bash
npm start    # Ejecutar en modo producción
npm run dev  # Ejecutar en modo desarrollo con nodemon
```

### Estructura de Datos
Los contactos se almacenan en `contactos.json` con esta estructura:
```json
[
  {
    "id": 1703123456789,
    "nombre": "Juan Pérez",
    "correo": "juan@ejemplo.com",
    "telefono": "+54 342 123-4567",
    "motivo": "inscripcion",
    "mensaje": "Quisiera información sobre la inscripción...",
    "fecha": "2023-12-21T10:30:45.123Z"
  }
]
```

## Seguridad

- Validación de datos en frontend y backend
- Sanitización de entrada de datos
- Headers de seguridad básicos
- Manejo de errores robusto

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Autor

**Pablo Monsalvo**
- Desarrollador Full Stack
- Especializado en aplicaciones web modernas
- Contacto: [Tu email]

![replica-1](/home/pol/Desktop/replica-de-cursor-ai-1-vsc/public/replica-cursor-2.png)
---

© 2024 Escuela N° 637 "Domingo Cullen". Todos los derechos reservados.# replica-cursor-ai-1-vsc
