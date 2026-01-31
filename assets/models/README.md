# Modelos 3D

Esta carpeta contiene archivos STL para visualizar en el blog.

## Cómo añadir un modelo 3D a un post

1. Sube tu archivo STL a esta carpeta (`assets/models/`)
2. En tu post de Markdown, añade:

```markdown
{% include stl_viewer.html file="/assets/models/tu-modelo.stl" %}
```

## Opciones disponibles

```markdown
{% include stl_viewer.html 
   file="/assets/models/tu-modelo.stl"
   height="500"
   color="#ff6b6b"
   autoRotate="true"
   showGrid="false" 
%}
```

### Parámetros:

- `file` (requerido): Ruta al archivo STL
- `height` (opcional): Altura en píxeles (por defecto: 400)
- `color` (opcional): Color del modelo en hexadecimal (por defecto: #00a8ff)
- `autoRotate` (opcional): Rotación automática (por defecto: false)
- `showGrid` (opcional): Mostrar rejilla (por defecto: true)

## Controles del visor:

- **Clic izquierdo + arrastrar**: Rotar el modelo
- **Clic derecho + arrastrar**: Mover la cámara
- **Scroll del ratón**: Hacer zoom
