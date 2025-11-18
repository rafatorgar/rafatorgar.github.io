---
title: "Cómo construimos un sistema de IA para evaluar competencias a partir de conversaciones"
date: 2025-11-18 10:00:00 +0100
tags:
  [
    IA,
    desarrollo-producto,
    voicit,
    arquitectura-técnica,
    entrevista-conductual,
    evaluación-competencias,
  ]
description: "La historia técnica detrás de construir un sistema de IA que extrae incidentes críticos de entrevistas y evalúa competencias. Metodología, retos y por qué los modelos de razonamiento no siempre son la respuesta."
image: "/assets/img/competency-evaluation.jpg"
lang: es
lang_ref: ai-competency-evaluation-2025
---

En [Voicit](https://voicit.com) generamos informes de entrevistas para procesos de selección. Una de nuestras funcionalidades más complejas es la **evaluación de competencias por incidentes críticos**: un sistema que analiza conversaciones y determina el nivel de competencia de un candidato en base a evidencias conductuales.

Esta es la historia técnica de cómo lo construimos, la metodología detrás y lo que aprendimos por el camino.

## Contexto: Qué problema resolvemos

En Voicit, los usuarios pueden generar informes de entrevista usando **plantillas de informe**. Estas plantillas permiten añadir secciones que extraen información específica: experiencia laboral, rango salarial, skills técnicas, etc.

Entre estas secciones, algunas son sencillas y otras complejas. La **evaluación de competencias por incidentes críticos** es de las complejas.

Los usuarios pueden seleccionar competencias de nuestro **diccionario de competencias**, que incluye tanto competencias definidas por Voicit como personalizadas que los equipos pueden crear y compartir. Cada competencia tiene:

- Nombre
- Descripción
- Niveles de evaluación (Ej: Básico, Intermedio, Avanzado, Experto)

El resultado para cada competencia incluye:

- **Nivel detectado** con su definición
- **Incidentes críticos** usados para determinar el nivel
- **Gaps críticos** o puntos negativos detectados
- **Recomendaciones** sobre qué profundizar

<mark>El reto era: ¿cómo extraer evidencia conductual de una conversación y mapearla a niveles de competencia de forma fiable?</mark>

## La arquitectura en tres fases

Dividimos el problema en tres fases, cada una con una responsabilidad clara.

### Fase 1: Extracción y clasificación de incidentes críticos

**Objetivo:** Identificar fragmentos de conversación que demuestren la presencia (o ausencia) de una competencia específica.

El sistema de IA analiza:

- La transcripción de la entrevista
- El nombre de la competencia
- La definición de la competencia (del diccionario del usuario)

**Insight clave:** No toda evidencia es un incidente crítico, pero todo incidente crítico sí es evidencia.

Esta distinción es clave al trabajar con IA, que tiende a interpretar cualquier evidencia como incidente crítico válido. Necesitábamos **evidencia conductual sólida**: relatos completos de comportamiento.

Cada incidente crítico sigue el modelo **SAR** (Situación-Acción-Resultado) y se clasifica en un objeto JSON:

| Campo                 | Rol                               | Observaciones                                            |
| --------------------- | --------------------------------- | -------------------------------------------------------- |
| **impact**            | Valoración global del episodio    | "positivo" / "negativo" – refleja eficacia conductual    |
| **intensity**         | Nivel de fuerza del incidente     | "débil" / "moderada" / "fuerte"                          |
| **intensity_reason**  | Justificación de la intensidad    | Permite auditar y automatizar ponderaciones              |
| **context.situation** | Contexto o entorno                | Indispensable (define el escenario)                      |
| **context.task**      | Responsabilidad u objetivo        | Indispensable (define el rol de la persona)              |
| **behavior**          | Acción(es) específica(s)          | Opcional si el candidato no detalla conductas claras     |
| **result**            | Consecuencia o impacto observable | Opcional, pero valioso para calibrar la eficacia         |
| **learning**          | Reflexión o aprendizaje derivado  | Opcional, muestra madurez o autoconciencia               |
| **timeKeys**          | Localización temporal             | Muy útil para auditar o revisar extractos de audio/video |

Esta clasificación asegura que los incidentes críticos tengan parámetros de calidad suficientes para servir en la evaluación posterior de nivel. Por eso, de momento **no hay una fase intermedia** para evaluar la calidad de los incidentes extraídos: la propia estructura fuerza la calidad.
...existing code...
