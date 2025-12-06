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

En Voicit, los usuarios pueden generar informes de sus entrevistas usando **plantillas de informe**. Estas plantillas permiten añadir secciones que extraen información específica: experiencia laboral, rango salarial, skills técnicas, etc.

Entre estas secciones, algunas son sencillas y otras complejas. La **evaluación de competencias por incidentes críticos** es de las complejas.

Los usuarios pueden seleccionar competencias de nuestro **diccionario de competencias**, que incluye tanto competencias definidas por Voicit como personalizadas que los equipos pueden crear y compartir. Cada competencia tiene:

- Nombre
- Definición o descripción
- Niveles de evaluación (Ej: Básico, Intermedio, Avanzado, Experto)

El resultado para cada competencia incluye:

- **Nivel detectado** con su definición
- **Justificación del nivel** analizando los patrones y limitaciones detectadas en los incidentes críticos
- **Incidentes críticos** usados para determinar el nivel
- **Recomendaciones** sobre qué profundizar

<mark>El reto era: ¿cómo extraer evidencia conductual de una conversación y mapearla a niveles de competencia de forma fiable y útil para combinarlo con los resultados de tests formales?</mark>

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

### Fase 2: Evaluación del nivel de la competencia

**Objetivo:** Determinar el nivel alcanzado en una competencia específica basándose en los incidentes críticos extraídos en la Fase 1, integrando tanto evidencias positivas como negativas.

**Fundamento metodológico:** Basado en modelos **BEI (Behavioral Event Interview)** y la **Técnica del Incidente Crítico (Flanagan, 1954)**.

El nivel de competencia se deduce de:

1. **Consistencia** de comportamientos observados en distintas situaciones
2. **Complejidad** de contextos donde se manifiestan los comportamientos
3. **Grado de autonomía e impacto** demostrado
4. **Capacidad de aprendizaje** o transferencia a nuevos escenarios

El sistema analiza todos los incidentes críticos (positivos y negativos) y los contrasta con las definiciones de nivel del diccionario de competencias.

**Estructura de salida:**

| Campo                                                     | Rol                                    | Observaciones                                                                                                                                          |
| --------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **level_label**                                           | Identificador del nivel asignado       | Nombre de los niveles existentes en la competencia dentro del diccionario.                                                                             |
| **level_definition**                                      | Descripción del nivel asignado         | Definición del nivel existente en la competencia dentero del diccionario.                                                                              |
| **confidence_score**                                      | Grado de confianza (1–10)              | 1 = muy baja confianza (poca/débil evidencia), 10 = máxima confianza (múltiples incidentes sólidos y consistentes).                                    |
| **critical_gaps**                                         | Lista de deficiencias críticas         | Identifica áreas sin evidencia o con evidencia insuficiente (ej: _"Falta de resultados medibles"_, _"No se observaron comportamientos de liderazgo"_). |
| **critical_incidents_justification**                      | Vínculo entre incidentes y nivel       | Lista describiendo cómo cada incidente crítico contribuye (o limita) el nivel asignado.                                                                |
| **critical_incidents_justification[].incident_id**        | Identificador único del incidente      | ID de la Fase 1, mantiene la trazabilidad.                                                                                                             |
| **critical_incidents_justification[].content**            | Descripción del incidente y relevancia | Resumen interpretativo describiendo qué comportamiento o hecho fue relevante.                                                                          |
| **critical_incidents_justification[].relevance_to_level** | Interpretación del impacto en el nivel | Explica cómo el incidente refuerza o limita la competencia respecto al nivel seleccionado.                                                             |

**Criterios clave:**

- Los **incidentes positivos fuertes** refuerzan niveles altos si muestran comportamientos observables con impacto o autonomía
- Los **incidentes negativos fuertes** pueden limitar el nivel máximo posible si afectan aspectos esenciales (ética, liderazgo, resultados)
- Si los incidentes son **insuficientes, ambiguos o rutinarios**, se asigna un nivel inferior y se documenta el **gap de evidencia**
- El `confidence_score` refleja el grado de certeza del modelo (1–10) basándose en cantidad, coherencia e intensidad de incidentes disponibles

<mark>El resultado de esta fase no es narrativo, sino estructurado y explicativo.</mark> Define el nivel alcanzado, los motivos y áreas sin evidencia suficiente. Esto se convierte en la base para la Fase 3.

### Fase 3: Generación del resumen de la competencia

**Objetivo:** Transformar la evaluación estructurada de la Fase 2 en un **resumen narrativo interpretativo** que:

- Presente claramente los hechos que sustentan la evaluación del nivel
- Sintetice **patrones conductuales**, **consistencia** y **transferibilidad** de la competencia
- Destaque los **gaps críticos** identificados

Este resumen está diseñado para que el **consultor de selección o reclutador** se apoye en él junto con su juicio profesional y el test formal de competencias, para obtener una conclusión clara.

**Estructura del resumen:**

**Nivel asignado y definición**

- Indica nivel final junto con su descripción

**Justificación del nivel: patrones y limitaciones**

- Explica comportamientos recurrentes, cómo se relacionan y qué nivel de complejidad o autonomía implican
- Limitaciones encontradas, relacionándolas con el nivel de competencia asignado

**Evidencias de soporte**

- Resume comportamientos, contextos y resultados observados en los incidentes críticos más representativos
- Qué hizo (comportamiento)
- En qué contexto y tarea
- Qué resultado obtuvo
- Qué aprendizaje o desarrollo mostró
- Ofrece las referencias de tiempo para encontrarlo en la conversación

**Aspectos a profundizar**

- Análisis de aspectos que necesitan explorarse más para mejorar la evaluación de la competencia

## Cómo lo utilizan realmente los equipos de selección

Una parte importante de este análisis de competencias por incidentes críticos es **cómo lo usan los equipos de selección**.

Voicit les ofrece **orientación sobre el nivel de competencia** y **evidencias sobre su experiencia profesional** que pueden usar para:

- Contrastar con sus propias conclusiones
- Comparar con resultados de tests de competencias
- Complementar resultados de tests con incidentes críticos detectados

Esto permite una **evaluación final de competencia más completa y objetiva**.

<mark>No se trata de reemplazar el juicio humano, sino de dar a los consultores evidencia estructurada y trazable para tomar mejores decisiones.</mark>

## El aprendizaje sorprendente: los modelos de razonamiento no siempre son mejores

Uno de los hallazgos más interesantes durante el desarrollo: **los LLMs de razonamiento no son necesarios para este tipo de análisis**.

No mejoran los resultados y añaden un delay de tiempo muy alto.

Para análisis conductual estructurado con frameworks claros (como el modelo SAR y diccionarios de competencias), los LLMs tradicionales con buen prompting superan a los modelos de razonamiento tanto en calidad como en velocidad.

Esto fue contraintuitivo pero consistente en todas nuestras pruebas.

## FAQs

{% include faq.html 
   question="¿La definición del mismo nivel de competencia puede variar entre candidatos?"
   answer="No. La definición del nivel se mantiene fija, según el diccionario de competencias.

Lo que sí varía es la justificación: se adapta a los incidentes críticos y evidencias observadas en cada entrevista, que son únicos para cada candidato."
%}

{% include faq.html 
   question="¿Qué información se genera para una competencia?"
   answer="Las competencias se analizan basándose en incidentes críticos mencionados en la conversación. De estos incidentes críticos extraemos:

- Nivel detectado y definición
- Justificación del nivel detectado basada en incidentes críticos
- Lista de evidencias
- Recomendaciones sobre qué puntos profundizar para mejorar la evaluación de la competencia"
%}

## Resumen de implementación

La sección de evaluación de competencia por incidentes críticos extrae **incidentes críticos** que incluyen: impacto, intensidad, razón de intensidad, situación, tarea, comportamiento, resultado, aprendizaje y referencias temporales.

Con estos datos se **evalúa el nivel de competencia** basándose en el diccionario de competencias. La evaluación genera:

- Nivel y definición de la competencia
- Confianza de la evaluación
- Limitaciones críticas
- Justificación del nivel según incidentes críticos

Finalmente, se crea un **resumen para el consultor**, mostrando el nivel asignado y su definición, justificación, incidentes críticos analizados y **recomendaciones para profundizar** basadas en limitaciones detectadas.

## Por qué importa esto

Construir este sistema nos enseñó que **la IA no reemplaza la experiencia, la estructura**.

La metodología (BEI, Técnica del Incidente Crítico) existía mucho antes de los LLMs. Lo que la IA permite es:

1. **Escala** - Analizar horas de conversación en minutos
2. **Consistencia** - Aplicar el mismo framework uniformemente
3. **Trazabilidad** - Vincular cada conclusión a evidencia específica
4. **Aumento** - Dar a los consultores herramientas para tomar mejores decisiones más rápido

La magia no está en la IA. Está en combinar metodología sólida con la capacidad de la IA para procesar y estructurar información a escala.

---

_Esta es otra píldora de cómo he construido producto en [Voicit](https://voicit.com). Si estás trabajando en desafíos similares con IA y análisis estructurado, me encantaría conocer tu enfoque._
