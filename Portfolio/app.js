  document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Toggle del menú móvil
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('show');
    });

    // Reparar menú al redimensionar
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        navLinks.classList.remove('show');
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contacto form');
    const successMsg = document.getElementById('form-success');

    const fields = {
      nombre: form.nombre,
      apellidos: form.apellidos,
      correo: form.correo,
      mensaje: form.message
    };

    function validateField(fieldName) {
      const input = fields[fieldName];
      const value = input.value.trim();

      const prevError = input.nextElementSibling;
      if (prevError && prevError.classList.contains('error-message')) {
        prevError.remove();
      }

      let errorMsg = '';

      if (fieldName === 'nombre' || fieldName === 'apellidos') {
        if (value === '') {
          errorMsg = fieldName === 'nombre' ? 'El nombre es obligatorio' : 'Los apellidos son obligatorios';
        } else if (/\d/.test(value)) {
          errorMsg = fieldName === 'nombre' ? 'El nombre no puede contener números' : 'Los apellidos no pueden contener números';
        }
      } else if (fieldName === 'correo') {
        if (!validateEmail(value)) {
          errorMsg = 'Introduce un correo válido';
        }
      } else if (fieldName === 'mensaje') {
        if (value.length > 0 && value.length < 10) {
          errorMsg = 'El mensaje debe tener al menos 10 caracteres';
        }
      }

      if (errorMsg) {
        showError(input, errorMsg);
        return false;
      }
      return true;
    }

    function showError(inputElement, message) {
      const error = document.createElement('div');
      error.className = 'error-message';
      error.textContent = message;
      inputElement.insertAdjacentElement('afterend', error);
    }

    function validateEmail(email) {
      return /^\S+@\S+\.\S+$/.test(email);
    }

    Object.keys(fields).forEach(fieldName => {
      const input = fields[fieldName];
      input.addEventListener('input', () => {
        validateField(fieldName);
        successMsg.style.display = 'none';
      });
      input.addEventListener('blur', () => {
        validateField(fieldName);
      });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      successMsg.style.display = 'none';

      let allValid = true;
      for (const fieldName in fields) {
        if (!validateField(fieldName)) {
          allValid = false;
        }
      }

      if (allValid) {
        successMsg.style.display = 'block';
        // Aquí podrías hacer un envío AJAX en lugar de submit tradicional:
        // Por ahora vamos a simular un envío y resetear formulario

        setTimeout(() => {
          form.reset();
          successMsg.style.display = 'none';
        }, 3000);
      }
    });
  });