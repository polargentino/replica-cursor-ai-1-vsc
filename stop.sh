#!/bin/bash

# Script para detener el servidor
# Desarrollado por Pablo Monsalvo

echo "🛑 Deteniendo servidor de la Escuela Cullen..."

# Verificar si existe el archivo PID
if [ -f "server.pid" ]; then
    PID=$(cat server.pid)
    
    # Verificar si el proceso está ejecutándose
    if ps -p $PID > /dev/null; then
        echo "📊 Deteniendo proceso PID: $PID"
        kill $PID
        rm server.pid
        echo "✅ Servidor detenido correctamente"
    else
        echo "⚠️ El proceso ya no está ejecutándose"
        rm server.pid
    fi
else
    echo "⚠️ No se encontró archivo PID. Buscando proceso de Node.js..."
    
    # Buscar y detener procesos de Node.js relacionados con server.js
    PIDS=$(pgrep -f "node server.js")
    
    if [ -n "$PIDS" ]; then
        echo "📊 Deteniendo procesos: $PIDS"
        kill $PIDS
        echo "✅ Servidor detenido correctamente"
    else
        echo "ℹ️ No se encontraron procesos del servidor ejecutándose"
    fi
fi

echo "👋 ¡Hasta luego!" 