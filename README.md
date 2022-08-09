
# Frontend Bsale

Se desarrolló una tienda virtual bajo una arquitectura cliente-servidor. Debido a esto, las funciones para cada capa quedan claramente establecidas.

Por un lado, en el lado del cliente se desplegarán los productos y se podrán realizar operaciones como búsqueda, ordenar de forma ascendente o decreciente según el precio del producto.

Por otro lado, en la capa de servidor se realizan tareas tales como la conexión a la base de datos y la ejecución de consultas.

Las tecnologías empleadas para el desarrollo del ejercicio son Vanilla JavaScript, HTML y SCSS para el apartado del frontend. El backend del mismo proyecto se desarrolló en TypeScript usando Express.js como framework para el servidor bajo Node.JS.

Repositorio Frontend: https://github.com/markorodriguez/bsale-frontend  
Repositorio Backend: https://github.com/markorodriguez/bsale-backend

Despliegue Backend: https://bsale-markorod.herokuapp.com/  
Despliegue Frontend: https://bsalefrontend.netlify.app/  


## Instalación y ejecución

Clonar el proyecto

```bash
  git clone https://github.com/markorodriguez/bsale-frontend
```

Acceder al directorio

```bash
  cd bsale-frontend
```

Instalar dependencias

```bash
  npm install
```

Activar node-sass

```bash
  npm run sass
```


## Interfaces

La vista principal muestra todos los productos obtenidos de la base de datos. Asimismo también muestra la barra de categorías que permite filtrar los productos según este criterio.

![alt text](https://i.postimg.cc/yxSNYD5c/Screenshot-2022-08-09-at-11-41-02-Desaf-o-Bsale.png)

Al filtrar por categoría se resalta la opción seleccionada y solo se muestran los productos que corresponden a la categoría deseada.
![alt text](https://i.postimg.cc/tJY78Spq/Screenshot-2022-08-09-at-11-45-22-Desaf-o-Bsale.png)

![alt text](https://i.postimg.cc/VNq7b4yk/Screenshot-2022-08-09-at-14-31-35-Desaf-o-Bsale.png)

También se implementó un buscador que permitirá buscar productos de forma más fácil y rápida; sin embargo, si no se encuentran productos se le notificará al usuario mediante una alerta.

![alt text](https://i.postimg.cc/x1KGsC6s/Screenshot-2022-08-09-at-14-33-47-Desaf-o-Bsale.png)

![alt text](https://i.postimg.cc/MG63k4rJ/Captura-de-pantalla-2022-08-09-143624.png)