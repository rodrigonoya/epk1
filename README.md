# Rodrigo Noya — portfolio

Portfolio estático para GitHub Pages, reconstruido desde la presentación PDF.

## Incluye

- Navegación horizontal a pantalla completa.
- Flechas del teclado, rueda del mouse y gestos táctiles.
- Índice desplegable.
- Contador de páginas/obras.
- Barra de progreso.
- Cursor personalizado en desktop.
- Modal de YouTube para los videos.
- Diseño responsive.
- Sin servidor ni backend.

## GitHub Pages

Subir todos los archivos al repositorio, manteniendo `index.html` en la raíz.

Luego:

Settings → Pages → Build and deployment → Deploy from a branch → `main` → `/ (root)` → Save.

## Dominio propio

En GitHub Pages se puede configurar un dominio propio desde:

Settings → Pages → Custom domain.

Para el dominio raíz (`ejemplo.com`) se configuran los registros A de GitHub Pages en el proveedor DNS. Para `www.ejemplo.com`, se configura un CNAME hacia `USUARIO.github.io`.

Después de la propagación DNS, GitHub puede emitir automáticamente el certificado HTTPS.
