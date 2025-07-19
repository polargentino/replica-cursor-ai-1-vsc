const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index-1.html'));
});

// Ruta para manejar el envío del formulario
app.post('/api/contacto', (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            console.warn('⚠️ Solicitud vacía recibida en /api/contacto');
            return res.status(400).json({
                success: false,
                message: 'No se recibieron datos. Por favor, complete el formulario.'
            });
        }

        const { nombre, correo, telefono, motivo, mensaje } = req.body;

        // Validación básica
        if (!nombre || !correo || !telefono || !motivo || !mensaje) {
            return res.status(400).json({ 
                success: false, 
                message: 'Todos los campos son obligatorios' 
            });
        }

        // Crear objeto con los datos del formulario
        const contacto = {
            id: Date.now(),
            nombre,
            correo,
            telefono,
            motivo,
            mensaje,
            fecha: new Date().toISOString()
        };

        // Leer archivo existente o crear uno nuevo
        let contactos = [];
        const archivoContactos = 'contactos.json';
        
        if (fs.existsSync(archivoContactos)) {
            const datosExistentes = fs.readFileSync(archivoContactos, 'utf8');
            try {
                contactos = JSON.parse(datosExistentes);
            } catch (e) {
                console.error('Error al parsear contactos existentes. Se reiniciará el archivo.');
                contactos = [];
            }
        }

        // Agregar nuevo contacto
        contactos.push(contacto);

        // Guardar en archivo
        fs.writeFileSync(archivoContactos, JSON.stringify(contactos, null, 2));

        console.log('✅ Nuevo contacto recibido:', contacto);

        res.json({ 
            success: true, 
            message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.' 
        });

    } catch (error) {
        console.error('❌ Error al procesar el contacto:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor' 
        });
    }
});

// Ruta para obtener todos los contactos (para administración)
app.get('/api/contactos', (req, res) => {
    try {
        const archivoContactos = 'contactos.json';
        
        if (fs.existsSync(archivoContactos)) {
            const datos = fs.readFileSync(archivoContactos, 'utf8');
            const contactos = JSON.parse(datos);
            res.json({ success: true, contactos });
        } else {
            res.json({ success: true, contactos: [] });
        }
    } catch (error) {
        console.error('❌ Error al leer contactos:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al leer los contactos' 
        });
    }
});

app.listen(PORT, () => {
    const ahora = new Date();

    // Formato: YYYY-MM-DD HH:mm:ss
    const fechaYHora = ahora.toLocaleString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Argentina/Buenos_Aires'
    });

    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log('👨‍💻 Desarrollado por Pablo Monsalvo');
    console.log(`🕒 Inicio del servidor: ${fechaYHora}`);
});

