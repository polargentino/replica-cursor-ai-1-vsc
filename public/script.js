document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageDiv = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');

    // Función para mostrar mensajes
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para validar teléfono
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone);
    }

    // Función para limpiar el formulario
    function clearForm() {
        contactForm.reset();
        // Remover clases de validación
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('error');
        });
    }

    // Función para validar el formulario
    function validateForm(formData) {
        const errors = [];

        // Validar nombre
        if (!formData.nombre.trim()) {
            errors.push('El nombre es obligatorio');
        } else if (formData.nombre.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }

        // Validar email
        if (!formData.correo.trim()) {
            errors.push('El correo electrónico es obligatorio');
        } else if (!isValidEmail(formData.correo)) {
            errors.push('El correo electrónico no es válido');
        }

        // Validar teléfono
        if (!formData.telefono.trim()) {
            errors.push('El teléfono es obligatorio');
        } else if (!isValidPhone(formData.telefono)) {
            errors.push('El teléfono no es válido');
        }

        // Validar motivo
        if (!formData.motivo) {
            errors.push('Debe seleccionar un motivo de contacto');
        }

        // Validar mensaje
        if (!formData.mensaje.trim()) {
            errors.push('El mensaje es obligatorio');
        } else if (formData.mensaje.trim().length < 10) {
            errors.push('El mensaje debe tener al menos 10 caracteres');
        }

        return errors;
    }

    // Función para enviar el formulario
    async function submitForm(formData) {
        try {
            const response = await fetch('/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showMessage(result.message, 'success');
                clearForm();
            } else {
                showMessage(result.message || 'Error al enviar el mensaje', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error de conexión. Por favor, intente nuevamente.', 'error');
        }
    }

    // Event listener para el envío del formulario
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            motivo: document.getElementById('motivo').value,
            mensaje: document.getElementById('mensaje').value
        };

        // Validar formulario
        const errors = validateForm(formData);

        if (errors.length > 0) {
            showMessage(errors.join('. '), 'error');
            return;
        }

        // Mostrar estado de carga
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        // Enviar formulario
        await submitForm(formData);

        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
    });

    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const fieldName = this.name;
            const value = this.value.trim();
            let isValid = true;
            let errorMessage = '';

            switch (fieldName) {
                case 'nombre':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'El nombre es obligatorio';
                    } else if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'El nombre debe tener al menos 2 caracteres';
                    }
                    break;
                
                case 'correo':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'El correo electrónico es obligatorio';
                    } else if (!isValidEmail(value)) {
                        isValid = false;
                        errorMessage = 'El correo electrónico no es válido';
                    }
                    break;
                
                case 'telefono':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'El teléfono es obligatorio';
                    } else if (!isValidPhone(value)) {
                        isValid = false;
                        errorMessage = 'El teléfono no es válido';
                    }
                    break;
                
                case 'motivo':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'Debe seleccionar un motivo de contacto';
                    }
                    break;
                
                case 'mensaje':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'El mensaje es obligatorio';
                    } else if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                    }
                    break;
            }

            // Aplicar estilos de validación
            if (!isValid) {
                this.classList.add('error');
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            } else {
                this.classList.remove('error');
                this.style.borderColor = '#27ae60';
                this.style.boxShadow = '0 0 0 3px rgba(39, 174, 96, 0.1)';
            }
        });

        input.addEventListener('input', function() {
            // Remover estilos de error cuando el usuario comienza a escribir
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                this.style.borderColor = '#e0e0e0';
                this.style.boxShadow = 'none';
            }
        });
    });

    // Efecto de scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animación de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.info-card, .contact-form, .map-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    console.log('Página de contacto cargada correctamente');
    console.log('Desarrollado por Pablo Monsalvo');
});