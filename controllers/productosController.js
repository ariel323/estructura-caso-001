const connection = require("../config/db");
const { sendJson } = require("../utils/response");

function getAll(req, res) {
  connection.query("SELECT * FROM product", (err, results) => {
    if (err) {
      sendJson(res, 500, { error: "Error en la base de datos" });
      return;
    }
    sendJson(res, 200, results);
  });
}

function getOne(req, res) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM product WHERE id = ?",
    [id],
    (err, results) => {
      if (err)
        return sendJson(res, 500, { error: "Error en la base de datos" });
      if (results.length === 0)
        return sendJson(res, 404, { error: "Producto no encontrado" });
      sendJson(res, 200, { data: results[0] });
    }
  );
}

function remove(req, res) {
  const id = req.params.id;
  connection.query("DELETE FROM product WHERE id = ?", [id], (err, result) => {
    if (err) return sendJson(res, 500, { error: "Error al eliminar producto" });
    if (result.affectedRows === 0)
      return sendJson(res, 404, { error: "Producto no encontrado" });

    sendJson(res, 200, { data: { mensaje: "Producto eliminado", id } });
  });
}

module.exports = {
  getAll,
  getOne,
  remove,
};
