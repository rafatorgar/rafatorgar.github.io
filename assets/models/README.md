# Modelos 3D

Esta carpeta contiene archivos STL para visualizar en el blog.

## Cómo añadir modelos 3D

1. **Sube tu archivo STL** a esta carpeta (`assets/models/`)
2. **Registra el modelo** en `_data/stl_models.yml`:

```yaml
- name: "Mi Pieza"
  file: "/assets/models/mi-pieza.stl"
  description: "Descripción del modelo"
```

3. El modelo aparecerá automáticamente en el selector de la página de servicios

## Opciones del visualizador

Para personalizar el visor en cualquier página:

```markdown
{% include stl_viewer.html
   height="500"
   color="#ff6b6b"
   autoRotate="true"
   showGrid="false"
%}
```

### Parámetros:

- `height` (opcional): Altura en píxeles (por defecto: 400)
- `color` (opcional): Color del modelo en hexadecimal (por defecto: #00a8ff)
- `autoRotate` (opcional): Rotación automática (por defecto: false)
- `showGrid` (opcional): Mostrar rejilla (por defecto: true)

## Controles del visor:

- **Clic izquierdo + arrastrar**: Rotar el modelo
- **Clic derecho + arrastrar**: Mover la cámara
- **Scroll del ratón**: Hacer zoom
- **Selector dropdown**: Cambiar entre modelos (si hay múltiples)
