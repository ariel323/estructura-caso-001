const { parse } = require("url");
const {
  getAll,
  getOne,
  create,
  updateFull,
  updatePartial,
  remove,
} = require("../controllers/productosController");
const connection = require("../config/db");

function handleProductosRoutes(req, res) {
  const { pathname } = parse(req.url, true);
  const method = req.method;

  // HEAD y OPTIONS para /product
  if (pathname === "/product") {
    if (method === "HEAD") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end();
      return;
    }
    if (method === "OPTIONS") {
      res.writeHead(204, {
        Allow: "GET,POST,HEAD,OPTIONS",
        "Content-Length": 0,
      });
      res.end();
      return;
    }
    if (method === "GET") return getAll(req, res);
    if (method === "POST") return create(req, res);
  }

  // HEAD y OPTIONS para /product/:id
  const match = pathname.match(/^\/product\/(\d+)$/);
  if (match) {
    req.params = req.params || {};
    req.params.id = Number(match[1]);

    // Validación de id numérico
    if (isNaN(req.params.id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "ID inválido" }));
      return;
    }

    if (method === "HEAD") {
      // Consulta solo para saber si existe el producto
      connection.query(
        "SELECT id FROM product WHERE id = ?",
        [req.params.id],
        (err, results) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
          } else if (results.length === 0) {
            res.writeHead(404, { "Content-Type": "application/json" });
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
          }
          res.end();
        }
      );
      return;
    }
    if (method === "OPTIONS") {
      res.writeHead(204, {
        Allow: "GET,PUT,PATCH,DELETE,HEAD,OPTIONS",
        "Content-Length": 0,
      });
      res.end();
      return;
    }
    if (method === "GET") return getOne(req, res);
    if (method === "PUT") return updateFull(req, res);
    if (method === "PATCH") return updatePartial(req, res);
    if (method === "DELETE") return remove(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Ruta no encontrada" }));
}

module.exports = { handleProductosRoutes };
