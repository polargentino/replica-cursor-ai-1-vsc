#!/bin/bash

# Script para ejecutar el servidor en segundo plano
# Desarrollado por Pablo Monsalvo

echo "🚀 Iniciando servidor en segundo plano..."
echo "📍 Escuela N° 637 'Domingo Cullen' - Avellaneda 3211, Santa Fe"
echo "👨‍💻 Desarrollado por: Pablo Monsalvo"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    exit 1
fi

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Crear archivo de log
LOG_FILE="server.log"

# Ejecutar el servidor en segundo plano
echo "🌐 Servidor iniciado en http://localhost:3000"
echo "📝 Los logs se guardan en: $LOG_FILE"
echo "🛑 Para detener: ./stop.sh"
echo ""

# Ejecutar en segundo plano y guardar logs
nohup node server.js > "$LOG_FILE" 2>&1 &

# Guardar el PID del proceso
echo $! > server.pid

echo "✅ Servidor ejecutándose en segundo plano"
echo "📊 PID: $(cat server.pid)"
echo "🌐 Accede a: http://localhost:3000" 