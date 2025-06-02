# cosimir-una-api

API REST básica construida con Node.js y MySQL, sin frameworks, para la gestión de productos.

---

## Características

- Listar todos los productos
- Obtener un producto por ID
- Eliminar un producto por ID

---

## Requisitos

- Node.js >= 14
- MySQL
- npm

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
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido (ajusta los valores según tu entorno):
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
     description TEXT,
     precio DECIMAL(10,2) NOT NULL
   );
   ```

---

## Uso

1. **Inicia el servidor:**
   ```sh
   npm start
   ```
   El servidor escuchará en `http://localhost:3000` (o el puerto que definas en `.env`).

2. **Prueba la API con Postman o similar:**

   - **Listar todos los productos**
     - `GET http://localhost:3000/product`
   - **Obtener un producto por ID**
     - `GET http://localhost:3000/product/1`
   - **Eliminar un producto por ID**
     - `DELETE http://localhost:3000/product/1`

---

## Estructura del proyecto

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

## Notas

- El puerto 3306 es solo para la base de datos MySQL. El servidor Node.js escucha en el puerto 3000 por defecto.
- No subas tu archivo `.env` a ningún repositorio público.
- Si necesitas agregar más funcionalidades (crear o actualizar productos), puedes extender los controladores y rutas fácilmente.

---

## Licencia

MIT
