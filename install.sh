#!/bin/bash

# Script de instalación automática para la Escuela N° 637 "Domingo Cullen"
# Desarrollado por Pablo Monsalvo

echo "🏫 ========================================="
echo "🏫 Instalación Escuela N° 637 'Domingo Cullen'"
echo "🏫 ========================================="
echo "📍 Ubicación: Avellaneda 3211, Santa Fe"
echo "👨‍💻 Desarrollado por: Pablo Monsalvo"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "📦 Instalando Node.js..."
    
    # Detectar el sistema operativo
    if command -v apt &> /dev/null; then
        # Debian/Ubuntu
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif command -v yum &> /dev/null; then
        # CentOS/RHEL
        curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
        sudo yum install -y nodejs
    elif command -v pacman &> /dev/null; then
        # Arch Linux
        sudo pacman -S nodejs npm
    else
        echo "❌ No se pudo instalar Node.js automáticamente"
        echo "📥 Por favor, instala Node.js desde https://nodejs.org/"
        exit 1
    fi
fi

echo "✅ Node.js instalado: $(node --version)"
echo "✅ npm instalado: $(npm --version)"

# Instalar dependencias
echo ""
echo "📦 Instalando dependencias..."
npm install

# Hacer ejecutables los scripts
chmod +x start.sh start-background.sh stop.sh

echo ""
echo "🔧 Configurando inicio automático..."

# Crear enlace simbólico para systemd (si existe)
if command -v systemctl &> /dev/null; then
    echo "📋 Configurando servicio systemd..."
    
    # Copiar el archivo de servicio
    sudo cp escuela-cullen.service /etc/systemd/system/
    
    # Recargar systemd
    sudo systemctl daemon-reload
    
    # Habilitar el servicio para que inicie automáticamente
    sudo systemctl enable escuela-cullen.service
    
    echo "✅ Servicio habilitado para inicio automático"
    echo "🚀 Para iniciar ahora: sudo systemctl start escuela-cullen"
    echo "📊 Para ver estado: sudo systemctl status escuela-cullen"
    echo "🛑 Para detener: sudo systemctl stop escuela-cullen"
else
    echo "⚠️ systemd no está disponible, usando scripts manuales"
fi

echo ""
echo "🎉 ¡Instalación completada!"
echo ""
echo "📋 Comandos disponibles:"
echo "   ./start.sh           - Iniciar servidor (primer plano)"
echo "   ./start-background.sh - Iniciar servidor (segundo plano)"
echo "   ./stop.sh            - Detener servidor"
echo ""
echo "🌐 Una vez iniciado, accede a: http://localhost:3000"
echo ""
echo "📝 Los contactos se guardan en: contactos.json"
echo "📊 Los logs se guardan en: server.log"
echo ""
echo "👨‍💻 Desarrollado por Pablo Monsalvo"
echo "🏫 Escuela N° 637 'Domingo Cullen'"
echo "📍 Avellaneda 3211, Santa Fe" 