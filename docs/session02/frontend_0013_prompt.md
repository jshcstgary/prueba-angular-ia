### User Input

Modifica la vista para que:
- Cuando la prioridad sea High muestre "ALTA", Medium muestre "MEDIA" y Low muestre "BAJA"
- Cuando el estado sea OPEN muestre "ABIERTO", iN_PROGRESS muesntre "EN PROGRESO", RESOLVED muestre "RESUELTO" y REJECTED muestre "RECHAZADO"

*Edited relevant file*

*Edited relevant file*

### Planner Response

He actualizado la vista de tickets para mostrar las etiquetas en español:

### Cambios realizados:

1.  **Traducción de Prioridades**:
    *   `High` -> **ALTA**
    *   `Medium` -> **MEDIA**
    *   `Low` -> **BAJA**
2.  **Traducción de Estados**:
    *   `OPEN` -> **ABIERTO**
    *   `IN_PROGRESS` -> **EN PROGRESO**
    *   `RESOLVED` -> **RESUELTO**
    *   `REJECTED` -> **RECHAZADO**
3.  **Mejoras Visuales**:
    *   Se ha añadido el estilo visual para el estado **RECHAZADO** (etiqueta en color rojo suave).
    *   Se ha mantenido la coherencia de colores para el resto de estados y prioridades.

Los cambios se han implementado mediante un mapeo en el controlador del componente, manteniendo el código del template limpio y fácil de mantener.
