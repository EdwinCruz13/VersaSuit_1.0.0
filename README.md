# VersaSuit_1.0.0
Bienvenido al repositorio de la aplicación de facturación e inventario desarrollado 
en Postgres, Express, React, Nodejs, ademas de usar Prisma ORM.
<br>
Puedes Ver el sitio <a href="#">🔗 aqui</a>

<details open="">
  <summary><h2>✨Acerca del proyecto</h2></summary>
  <br>
<p dir="auto">
    <b>PERN</b> es un stack en el que se usa JavaScript tanto en el cliente como en el servidor, es decir, Full Stack JavaScript. Básicamente, la pila PERN es un conjunto de marcos/tecnologías utilizados para el desarrollo web de aplicaciones que consta de PostgreSQL, ExpressJS, React JS y Node JS como sus componentes.
    <br><br>
    <b>PostgreSQL</b>
    <br>
    Es un sistema de gestión de bases de datos relacionales de objetos (ORDBMS) de código abierto 
    que admite consultas SQL (relacional) y JSON (no relacional). 
    Es compatible con ACID y está basado en tablas, con restricciones, activadores y roles completos. Estas características son las que permiten la creación de relaciones entre datos. Esto, a su vez, genera beneficios como extensibilidad, escalabilidad, confiabilidad, rendimiento y solidez.
    <br><br>
    <b>Express</b>
    <br>
    Express es una infraestructura de aplicaciones web Node.js mínima y flexible que proporciona un 
    conjunto sólido de características para las aplicaciones web y móviles.
    <br><br>
    <b>React</b>
    <br>
    React como muchos saben es una librería creada y mantenida por Facebook, esta te permite desarrollar el Frontend de tu aplicación de una manera limpia, organizada y permitirá que la interacción entre usuarios y la aplicación sea mucho mas efectiva.
    <br><br>
    <b>NodeJS</b>
    <br>
    Node.js es un entorno de tiempo de ejecución de JavaScript de back-end, se ejecuta en el motor de JavaScript V8 y ejecuta el código de JavaScript fuera de un navegador web.
</p>
<br><br>
<b>Módulo de Inventario</b>
<img src="https://github.com/EdwinCruz13/VersaSuit_1.0.0/blob/main/resources/VersaSuit02_Inventario.drawio.png?raw=true" />
</details>


<details open="">
  <summary><h2>🚀 Estructura del proyecto</h2></summary>
<p dir="auto"> 
<b>Frontend</b>
<br>
La aplicación fue creado en <b>react.js</b>, la estructura del proyecto consiste:
Carpetas "public" que contiene archivos que será usado como la visualización principal.
Carpetas "src" que contiene archivos .jsx en referencia a virtual DOM de react.
Archivo "package.json" de como esta configurado el proyecto.

Dentro de src encontraremos

- [x] 📁 La carpeta <b>api</b> contiene archivos de solicitudes de webservice en nodejs.
  <br>
- [x] 📁 La carpeta <b>components</b> jsx con funcionalidad a nivel de componente.
  <br>
- [x] 📁 La carpeta <b>context</b> contiene archivos de contexto que nos permite compartir valores y funcionalidades a través del árbol de componentes sin necesidad de usar props.
  <br>
- [x] 📁 La carpeta <b>images</b> contiene imagenes usada en el proyecto.
  <br>
- [x] 📁 La carpeta <b>pages</b> que contiene archivos jsx como interfaz y redireccionamiento.
  <br>
- [x] 🗎  El archivo <b>app.js</b> es el componente padre donde se desplegará los contextos de react y páginas.
  <br>
- [x] 🗎  El archivo <b>app.css</b> archivo css para modulos principales.
  <br>
- [x] 🗎  El archivo <b>index.js</b> es el archivo maestro.
  <br><br>

<b>Backend</b>
<br>
Además, la aplicación fue creado como API REST en <b>Nodejs</b>, la estructura del proyecto consiste:
En una carpetas "src" que contiene todas las funcionalidades del proyecto de API Rest.
El patrón de diseño es en <b>MVC</b> que permite implementar interfaces de usuario, datos y lógica de control. 
Enfatiza una separación entre la lógica de negocios y su visualización en formato <b>JSON</b>.
Archivo "package.json" de como esta configurado el proyecto.  

Dentro de src encontraremos

- [x] 📁 La carpeta <b>Config</b> contiene archivos de funcionalidades de bases de datos en <b>Mongo</b> y alertas.
  <br>
- [x] 📁 La carpeta <b>Middleware</b>contiene archivos de carga previas como lógica de intercambio.
  <br>
- [x] 📁 La carpeta <b>Models</b> contiene archivos de modelo de bases de datos usando el ORM <b>mongoose</b>.
  <br>
- [x] 📁 La carpeta <b>Controllers</b> contiene archivos de lógica de negocio, ademas de funcionar de intermediario entre la vista y model en el patron <b>MVC</b>.
  <br>
- [x] 📁 La carpeta <b>Routes</b> contiene archivos de routeadores que recibe la solicitud por parte del cliente, este módulo sera la vista en el patrón <b>MVC</b>.
  <br>
- [x] 🗎  El archivo <b>app.js</b> es el componente padre donde se inicializará las configuraciones de enlaces en el servidor web <b>ExpressJS</b>.
  <br>
- [x] 🗎  El archivo <b>index.js</b> es el archivo maestro que ejecutará el servidor web <b>ExpressJS</b>.
  <br><br>
</p>
</details>


<details open="">
  <summary><h2>💡 Mi Diseño</h2></summary>
<p dir="auto"> 
  Ver el proyecto <a href="#">🔗 aqui</a>
  <br>
  <img src="https://github.com/EdwinCruz13/VersaSuit_1.0.0/blob/main/othersFile/images/my_design.drawio.png?raw=true" />    
</p>
</details>


<details open="">
  <summary><h2>💡 Resultado</h2></summary>
<p dir="auto"> 
  Ver el proyecto <a href="#">🔗 aquí</a>
  <br>
     
</p>
</details>


<details open="">
  <summary><h2>✨Give some feedbacks</h2></summary>
<p dir="auto">
  This repository is one of some season of courses I am doing, feel as your home reading it, we will learn together, it is ok if you have any question, and do not forget giving me some feedback.
  </br>
  <ul>
    <li><a href="https://github.com/EdwinCruz13/LandingPage/">Landing Page</a></li>
    <li><a href="https://github.com/EdwinCruz13/Ucamp-Crud">CRUD - Lista de tareas usando localstoraged y JS</a></li>
    <li><a href="https://github.com/EdwinCruz13/Ucamp-Dashboard/">Dashboard - Consumiendo una API REST</a></li>
    <li><a href="https://github.com/EdwinCruz13/Ucamp-Restaurant">Sistema de Restaurante - Con React</a></li>
    <li><a href="https://github.com/EdwinCruz13/Ucamp-Ecommerce">Comercio electrónico - Web Full Stack</a></li>
    <li><a href="https://github.com/EdwinCruz13/MERN">MERN</a></li>
    <li><a href="#">Mongo</a></li>
    <li><a href="#">Express</a></li>
    <li><a href="#">React</a></li>
    <li><a href="https://github.com/EdwinCruz13/NodeJS-Lesson">NodeJS</a></li>
  </ul>

</p>
</details>


