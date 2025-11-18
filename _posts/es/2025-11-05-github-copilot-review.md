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
...existing code...
