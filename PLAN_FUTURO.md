# Plan de Implementación Futura - Noctámbulo Estudios

## Estado Actual del Proyecto (Enero 2025)

### ✅ Completado
- Sitio web funcional con 5 páginas (index, galería, nosotros, agendar, gracias)
- Dominio: noctambuloestudios.com
- Hosting: GitHub Pages con HTTPS
- Sistema de reservas: Cal.com
- Formulario de contacto: Formsubmit
- Analytics: Google Analytics (G-DYNF05MX5F)
- SEO: Meta tags, sitemap.xml, robots.txt, Google Search Console
- Open Graph tags para redes sociales

---

## Fase 1: Corto Plazo (1-2 semanas)

### 1.1 Google Business Profile
**Prioridad:** Alta
**Tiempo estimado:** 30 minutos
**Impacto:** Aparecer en Google Maps y búsquedas locales

**Pasos:**
1. Ir a https://business.google.com
2. Crear perfil con:
   - Nombre: Noctámbulo Estudios
   - Categoría: Escuela de música / Estudio de grabación
   - Dirección en Tlaxcala
   - Horarios de operación
   - Fotos del estudio
   - Link a noctambuloestudios.com
3. Verificar el negocio (por correo o teléfono)

### 1.2 Optimización de Imágenes
**Prioridad:** Media
**Tiempo estimado:** 1 hora
**Impacto:** Carga más rápida del sitio

**Archivos a optimizar:**
- `assets/img/gallery/` - todas las imágenes
- `assets/img/logos/` - logos PNG
- Meta: reducir cada imagen a <300KB

**Herramienta:** https://squoosh.app
- Fotos: MozJPEG, calidad 75-80%
- Logos: OxiPNG (mantiene transparencia)

### 1.3 Foto del Tercer Profesor
**Prioridad:** Baja
**Archivo:** `assets/img/gallery/profesores/piano.jpg`
**Modificar:** `nosotros.html` líneas 172-182

```html
<!-- Cambiar el SVG placeholder por: -->
<img src="assets/img/gallery/profesores/piano.jpg" alt="Profesor de Piano">
```

---

## Fase 2: Mediano Plazo (1-2 meses)

### 2.1 Revisar Analytics
**Cuándo:** 2-4 semanas después del lanzamiento

**Métricas a revisar:**
- Visitantes únicos por semana
- Páginas más visitadas
- Fuentes de tráfico (Google, Instagram, directo)
- Tiempo promedio en el sitio
- Tasa de rebote

**Acciones según resultados:**
- Si poco tráfico → más SEO, publicar en redes
- Si mucho rebote → mejorar contenido/velocidad
- Si pocas conversiones → revisar CTAs y formularios

### 2.2 Sección de Testimonios
**Prioridad:** Media
**Archivo a modificar:** `index.html`
**Ubicación sugerida:** Después de la sección "Nuestros Servicios"

**Estructura propuesta:**
```html
<section class="testimonials" id="testimonios">
    <div class="container">
        <h2 class="section-title">Lo que dicen nuestros alumnos</h2>
        <div class="testimonials-grid">
            <div class="testimonial-card">
                <p class="testimonial-text">"Texto del testimonio..."</p>
                <p class="testimonial-author">- Nombre, Instrumento</p>
            </div>
            <!-- Más testimonios -->
        </div>
    </div>
</section>
```

**CSS necesario:** Agregar estilos en `css/styles.css`

### 2.3 Página de Precios (Opcional)
**Archivo nuevo:** `precios.html`
**Consideración:** Solo si decides hacer públicos los precios

**Estructura:**
- Tabla de precios por servicio
- Paquetes/promociones
- CTA a página de agendar

---

## Fase 3: Largo Plazo (3-6 meses)

### 3.1 Blog de Música
**Impacto SEO:** Alto
**Complejidad:** Media

**Estructura:**
```
/blog/
  index.html (lista de posts)
  /posts/
    como-elegir-tu-primera-guitarra.html
    5-ejercicios-para-mejorar-en-bateria.html
    ...
```

**Ideas de contenido:**
- Guías para principiantes
- Tips de práctica
- Reseñas de equipo
- Noticias del estudio

**SEO beneficios:**
- Más páginas indexadas
- Keywords long-tail
- Contenido actualizado

### 3.2 Galería de Videos
**Plataforma recomendada:** YouTube (embeds)
**Archivo a modificar:** `galeria.html` o nueva sección

**Tipos de contenido:**
- Sesiones de grabación
- Covers de alumnos
- Tours del estudio
- Tutoriales cortos

### 3.3 Sistema de Pagos en Línea
**Opciones:**
1. **Stripe** - Profesional, comisión ~3%
2. **PayPal** - Conocido, fácil de implementar
3. **Mercado Pago** - Popular en México

**Consideraciones:**
- Requiere más desarrollo
- Aspectos legales/fiscales
- Mejor implementar cuando haya volumen

---

## Mantenimiento Continuo

### Mensual
- [ ] Revisar Analytics
- [ ] Actualizar fotos de la galería
- [ ] Responder reseñas en Google Business

### Trimestral
- [ ] Actualizar contenido/textos si hay cambios
- [ ] Revisar que todos los links funcionen
- [ ] Verificar que formularios y Cal.com sigan activos

### Anual
- [ ] Renovar dominio en Cloudflare (~$10)
- [ ] Revisar y actualizar meta tags si es necesario
- [ ] Considerar rediseño si el sitio se ve anticuado

---

## Comandos Útiles para Actualizaciones

```bash
# Subir cambios al sitio
cd C:\Users\jacob\noctambulo_estudios_page
git add -A
git commit -m "Descripción del cambio"
git push

# El sitio se actualiza automáticamente en 1-2 minutos
```

---

## Recursos y Accesos

| Servicio | URL | Cuenta |
|----------|-----|--------|
| GitHub | github.com/JacoboMolina/noctambulo-estudios | JacoboMolina |
| Cloudflare | dash.cloudflare.com | (tu email) |
| Google Analytics | analytics.google.com | (tu email) |
| Search Console | search.google.com/search-console | (tu email) |
| Cal.com | cal.com | (tu email) |
| Formsubmit | formsubmit.co | noctambulo.estudios@gmail.com |
