const { parse } = require("url");
const {
  getAll,
  getOne,
  create,
  updateFull,
  updatePartial,
  remove,
} = require("../controllers/productosController");

function handleProductosRoutes(req, res) {
  const { pathname } = parse(req.url, true);
  const method = req.method;

  if (pathname === "/product" && method === "GET") return getAll(req, res);
  if (pathname === "/product" && method === "POST") return create(req, res);

  const match = pathname.match(/^\/product\/(\d+)$/);
  if (match) {
    req.params = req.params || {};
    req.params.id = Number(match[1]);

    if (method === "GET") return getOne(req, res);
    if (method === "PUT") return updateFull(req, res);
    if (method === "PATCH") return updatePartial(req, res);
    if (method === "DELETE") return remove(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Ruta no encontrada" }));
}

module.exports = { handleProductosRoutes };
