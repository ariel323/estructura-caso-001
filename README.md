# cosimir-una-api

API RESTful desarrollada en Node.js puro para la gestión de productos en una base de datos MySQL.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso de la API](#uso-de-la-api)
- [Ejemplos de Peticiones](#ejemplos-de-peticiones)
- [Notas](#notas)
- [Licencia](#licencia)

---

## Descripción

Este proyecto implementa una API RESTful para la gestión de productos, permitiendo operaciones CRUD (crear, leer, actualizar, eliminar). Está construido sin frameworks adicionales, utilizando únicamente módulos nativos de Node.js y el paquete `mysql2` para la conexión a la base de datos.

---

## Tecnologías

- Node.js
- MySQL
- npm
- [mysql2](https://www.npmjs.com/package/mysql2)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## Instalación

1. **Clona el repositorio:**

   ```sh
   git clone https://github.com/tu_usuario/cosimir-una-api.git
   cd cosimir-una-api
   ```

2. **Instala las dependencias:**

   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=tienda
   PORT=3000
   ```

4. **Crea la base de datos y la tabla:**

   ```sql
   CREATE DATABASE tienda;
   USE tienda;

   CREATE TABLE product (
     id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     description TEXT
   );
   ```

---

## Estructura del Proyecto

```
cosimir-una-api/
│
├── config/
│   └── db.js
├── controllers/
│   └── productosController.js
├── routes/
│   └── productosRoutes.js
├── utils/
│   └── response.js
├── server.js
├── package.json
├── .env
└── README.md
```

---

## Uso de la API

1. **Inicia el servidor:**

   ```sh
   npm start
   ```

   El servidor escuchará en `http://localhost:3000` (o el puerto definido en `.env`).

2. **Realiza peticiones HTTP** usando Postman, Insomnia o cualquier cliente HTTP.

---

## Ejemplos de Peticiones

### Obtener todos los productos

- **GET** `/product`
- **Respuesta:**
  ```json
  [
    {
      "id": 1,
      "name": "Producto 1",
      "description": "Descripción"
    }
  ]
  ```

### Obtener un producto por ID

- **GET** `/product/1`

### Crear un producto

- **POST** `/product`
- **Body (JSON):**
  ```json
  {
    "name": "Nuevo producto",
    "description": "Descripción opcional"
  }
  ```

### Actualizar un producto (PUT)

- **PUT** `/product/1`
- **Body (JSON):**
  ```json
  {
    "name": "Producto actualizado",
    "description": "Nueva descripción"
  }
  ```

### Actualización parcial (PATCH)

- **PATCH** `/product/1`
- **Body (JSON):**
  ```json
  {
    "description": "Solo actualiza la descripción"
  }
  ```

### Eliminar un producto

- **DELETE** `/product/1`

---

## Notas

- El puerto `3306` es solo para la base de datos MySQL. El servidor Node.js escucha en el puerto `3000` por defecto.
- No subas tu archivo `.env` a ningún repositorio público.
- Puedes extender la API agregando nuevas rutas y controladores según tus necesidades.

---

## Licencia

MIT
