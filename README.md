# Prueba Técnica – Spot2

Este repositorio contiene la solución desarrollada para el reto técnico de **Spot2**, enfocada en la creación de un acortador de URLs.  
El proyecto prioriza un diseño limpio, eficiente y escalable, alineado con buenas prácticas de desarrollo moderno.

## Resumen Técnico

Se implementó un dashboard de gestión con el objetivo de mantener claridad visual y simplicidad en la administración de enlaces.

Aspectos relevantes de la solución:

- **Interfaz**  
  El frontend fue desarrollado con **React**, utilizando componentes de **shadcn/ui** para mantener consistencia visual y reutilización de componentes.

- **Eficiencia**  
  La lista de URLs se apoya en el sistema de **caché de Laravel**, reduciendo consultas repetitivas y mejorando los tiempos de respuesta del dashboard.


## Ejecución Local

La capa de frontend se ejecuta como una aplicación React independiente.

1. Instalación de dependencias:
   ```bash
   npm install
   ```

2. Ejecución del servidor de desarrollo:
   ```bash
   npm run dev
   ```