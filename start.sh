#!/bin/bash

# Script para iniciar automáticamente el servidor de la Escuela Cullen
# Desarrollado por Pablo Monsalvo

echo "🚀 Iniciando servidor de la Escuela N° 637 'Domingo Cullen'..."
echo "📍 Ubicación: Avellaneda 3211, Santa Fe"
echo "👨‍💻 Desarrollado por: Pablo Monsalvo"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "Por favor, instala Node.js desde https://nodejs.org/"
    exit 1
fi

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Iniciar el servidor
echo "🌐 Iniciando servidor en http://localhost:3000"
echo "📝 Formulario de contacto disponible"
echo "🗺️ Mapa de Google Maps incluido"
echo ""
echo "Para detener el servidor, presiona Ctrl+C"
echo ""

# Ejecutar el servidor
node server.js 