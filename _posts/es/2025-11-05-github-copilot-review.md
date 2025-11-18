---
title: "Cómo desarrollo con IA en noviembre de 2025"
date: 2025-11-05 10:00:00 +0100
tags:
  [
    IA,
    GitHub-Copilot,
    productividad,
    herramientas-desarrollo,
    programación,
    experiencia-desarrollador,
  ]
description: "Mi experiencia real usando GitHub Copilot por 10€/mes mientras otros gastan más de 100€. Qué funciona, qué limita y por qué sigo escribiendo código."
image: "/assets/img/github-copilot-experience.jpg"
lang: es
lang_ref: github-copilot-2025
---

Abro debate técnico para programadores.

Pago **10€/mes por GitHub Copilot**. Tengo compañeros gastando **más de 100€ en Cursor y Claude Code**. Y aunque me preguntan si debería cambiar, sigo con mi setup.

No porque sea el mejor. No porque no pueda optimizar. Sino porque **necesito equilibrar productividad con control**, y de momento, este balance me funciona.

Te cuento cómo trabajo con Copilot, qué limitaciones tengo y por qué creo que el precio no lo es todo.

## Cómo uso GitHub Copilot (integrado en VSCode)

### Lo que me encanta

**1. Integración nativa**

- Puedo subrayar código y aplicar acciones súper fácil
- Cambio entre modo agente y chat normal según necesite cambios o solo entender algo
- Sin cambiar de herramientas, sin fricción
- Puedo añadir contexto de archivos fácilmente

**2. Adaptación a mi estilo**

- Aunque no tengo un README de estilos documentado, sigue bastante bien mi forma de programar
- Se adapta al contexto del proyecto abierto
- No tengo que explicarle mi arquitectura cada vez

**3. Enfoque mono-repositorio**

- Trabajo con unos 15 repos diferentes, pero los manejo individualmente
- Cuando toco varios repos, lo hago uno por uno
- <mark>Prefiero tener control sobre qué cambios se hacen en cada repositorio</mark>

### El problema inesperado: errores silenciosos

Sobre todo en el front, que es donde más código tengo y menos reviso línea a línea, estoy encontrando errores imprevistos.

No son errores obvios que rompen todo. Son esos cambios sutiles de la IA que pasan desapercibidos hasta que algo no funciona como esperabas.

**Esta es mi mayor preocupación actual**: delegar tanto que pierdo visibilidad de lo que realmente pasa en mi código.

## GitHub Copilot integrado en GitHub: más allá del IDE

No todo es escribir código. Copilot me salva en dos momentos clave:

### 1. Durante deploys

**Me ha salvado más de una vez.** Cuando hago deploy y hay un error, puedo preguntarle directamente en GitHub qué está fallando sin tener que cambiar de contexto.

### 2. En commits

Hace resúmenes automáticos de mis commits. Parece trivial, pero cuando necesito revisar qué cambié hace dos semanas, estos resúmenes son oro.

## La realidad: sigo programando

He escuchado a varios compañeros decir: **"He dejado de programar"**.

Yo no. Yo **sigo programando**.

Lo que casi no hago es **picar código como antes al 100%**, pero:

- ✅ Reviso el código generado
- ✅ Edito fallos de la IA
- ✅ Mejoro el código para que sea más comprensible
- ✅ Pienso dónde y cómo ubicar las cosas
- ✅ Añado mis prácticas y criterios

<mark>En un proyecto avanzado, no puedes NO programar.</mark> Quizás en un proyecto nuevo desde cero sí puedas delegar más, pero en uno con lógica compleja hay que adaptar, revisar y asegurarte de que no rompes nada.

## Mis limitaciones con GitHub Copilot

### El problema de los créditos

Pago 10€ y **a veces me quedo sin créditos** para usar los modelos más avanzados los últimos días del mes.

Lo noto. Los modelos básicos son notablemente más "tontos".

El siguiente plan es de **40€/mes**. Pagaría 30€ más, pero de momento, prefiero ahorrarlos mientras tenga cosas que lanzar.

### La limitación real: mi cerebro

Esto no es limitación de Copilot, pero **no soy capaz de desarrollar cosas en paralelo**.

Los agentes no tardan tanto como para yo poder dejar una tarea para revisar otra. Me peta la cabeza intentar trackear múltiples contextos.

Por esto, **no siento que pueda optimizar mucho más mi trabajo gracias a la IA**. ¿Cuánto podría mejorar? ¿5%?

Por eso no suelo dedicarle tiempo de momento mientras esté liado con el producto.

### El contexto: no soy solo desarrollador

Sé que hay personas con flujos de desarrollo con IA súper optimizados, pero mi realidad es diferente: **no paso todo el día pegado al código**.

Tengo que balancear entre:

- Soporte
- Hablar con clientes
- Pensar en negocio
- Estrategia de producto
- Decisiones técnicas

Sé que hay gente que no duerme y hace mil cosas, pero no es mi caso ni lo será. <mark>Para mí, programar es una forma de solventar X cosas, no es mi trabajo principal donde deba optimizar todo al máximo.</mark>

Si fuera desarrollador a tiempo completo, quizás invertiría más tiempo en perfeccionar mi flujo con IA. Pero como CPTO, el código es una herramienta entre muchas, no la única.

## ¿Por qué no uso otras herramientas?

### Claude Code (Cline)

**Para mi gusto, acceder desde consola es un pain.** No lo he probado en profundidad, pero es el feeling que me da de inicio.

Si ya tengo una integración fluida en VSCode, ¿por qué añadir fricción?

### Cursor

Intenté probarlo una vez. El problema: **cambiar de IDE y tener que clonar todos mis repos** me daba pereza.

Se me terminó la prueba gratis (que no duraba mucho) y nunca he vuelto a probarlo. La inercia es poderosa.

## Qué sé que podría optimizar

Si tuviera tiempo (spoiler: no lo tengo ahora mismo), esto es lo que haría:

1. **Documentar mejor cada repositorio** para que la IA lo comprenda mejor
2. **Crear un README de mi estilo de programación** que pueda referenciar
3. **Usar funciones multi-repositorio** para trabajar con varios proyectos simultáneamente

Pero la realidad es: **de momento prefiero no perder el foco mientras tengamos producto que lanzar**.

## Mi conclusión: no es solo el precio

¿Podría tener más features por 100€/mes? Probablemente.

¿Me haría 10x más productivo? Lo dudo.

Para mí, el equilibrio actual es:

- ✅ **Bajo coste** (10€/mes)
- ✅ **Integración sin fricción** (VSCode nativo)
- ✅ **Suficiente potencia** para mi flujo de trabajo
- ⚠️ **Control suficiente** para no perder visibilidad

<mark>No busco la herramienta perfecta. Busco la que me permite seguir construyendo sin añadir complejidad innecesaria.</mark>

## ¿Y tú?

Esto es todo lo que tengo que contar sobre cómo, **a día 5 de noviembre de 2025**, estoy utilizando GitHub Copilot.

¿Usas otras herramientas? ¿Has encontrado el equilibrio entre delegación y control? ¿Crees que estoy dejando productividad sobre la mesa?

Me encantaría saber tu experiencia. Especialmente si has probado Cursor o Claude Code y tienes feedback real de producción.

---

_Este post refleja mi experiencia personal. No estoy patrocinado por nadie (ojalá 😅). Solo quiero abrir debate real sobre herramientas que usamos día a día._
