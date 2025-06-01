const http = require("http");
const { handleProductosRoutes } = require("./routes/productosRoutes");

const server = http.createServer((req, res) => {
  handleProductosRoutes(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
