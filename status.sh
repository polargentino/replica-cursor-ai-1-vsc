#!/bin/bash

# Script para mostrar el estado del servidor
# Desarrollado por Pablo Monsalvo

echo "🏫 ========================================="
echo "🏫 Estado del Servidor - Escuela N° 637"
echo "🏫 ========================================="
echo "📍 Avellaneda 3211, Santa Fe"
echo "👨‍💻 Desarrollado por: Pablo Monsalvo"
echo ""

# Verificar si el servidor está ejecutándose
if [ -f "server.pid" ]; then
    PID=$(cat server.pid)
    
    if ps -p $PID > /dev/null; then
        echo "✅ Servidor ejecutándose"
        echo "📊 PID: $PID"
        echo "🌐 URL: http://localhost:3000"
        echo "⏰ Iniciado: $(ps -o lstart= -p $PID)"
        
        # Verificar si responde
        if curl -s http://localhost:3000 > /dev/null; then
            echo "🟢 Servidor respondiendo correctamente"
        else
            echo "🔴 Servidor no responde"
        fi
    else
        echo "❌ Servidor no está ejecutándose"
        rm server.pid
    fi
else
    echo "❌ No se encontró archivo PID"
    
    # Buscar procesos de Node.js
    PIDS=$(pgrep -f "node server.js")
    if [ -n "$PIDS" ]; then
        echo "⚠️ Encontrados procesos de Node.js: $PIDS"
    else
        echo "ℹ️ No hay procesos del servidor ejecutándose"
    fi
fi

echo ""
echo "📊 Información del Sistema:"
echo "   Node.js: $(node --version 2>/dev/null || echo 'No instalado')"
echo "   npm: $(npm --version 2>/dev/null || echo 'No instalado')"
echo ""

# Mostrar últimos contactos
if [ -f "contactos.json" ]; then
    CONTACT_COUNT=$(jq length contactos.json 2>/dev/null || echo "0")
    echo "📝 Contactos recibidos: $CONTACT_COUNT"
    
    if [ "$CONTACT_COUNT" -gt 0 ]; then
        echo "📋 Últimos 3 contactos:"
        jq -r '.[-3:] | .[] | "   • \(.nombre) - \(.motivo) (\(.fecha[0:10]))"' contactos.json 2>/dev/null || echo "   No se pueden leer los contactos"
    fi
else
    echo "📝 No hay contactos registrados"
fi

echo ""
echo "📋 Comandos disponibles:"
echo "   ./start-background.sh - Iniciar servidor"
echo "   ./stop.sh            - Detener servidor"
echo "   ./status.sh          - Ver este estado"
echo "   tail -f server.log   - Ver logs en tiempo real"
echo ""
echo "🌐 Accede a: http://localhost:3000" 