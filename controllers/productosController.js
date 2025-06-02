const connection = require("../config/db");
const { sendJson } = require("../utils/response");

function parseBody(req, callback) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    try {
      const parsed = JSON.parse(body);
      callback(null, parsed);
    } catch (err) {
      callback(err);
    }
  });
}

function getAll(req, res) {
  connection.query("SELECT * FROM product", (err, results) => {
    if (err) return sendJson(res, 500, { error: "Error en la base de datos" });
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

function create(req, res) {
  parseBody(req, (err, body) => {
    if (err) return sendJson(res, 400, { error: "JSON inválido" });
    const { name, description } = body;
    if (!name) return sendJson(res, 400, { error: "Datos inválidos" });

    connection.query(
      "INSERT INTO product (name, description) VALUES (?, ?)",
      [name, description || null],
      (err, result) => {
        if (err) return sendJson(res, 500, { error: "Error al insertar" });
        sendJson(res, 201, {
          data: { id: result.insertId, name, description },
        });
      }
    );
  });
}

function updateFull(req, res) {
  const id = req.params.id;
  parseBody(req, (err, body) => {
    if (err) return sendJson(res, 400, { error: "JSON inválido" });
    const { name, description } = body;
    if (!name) return sendJson(res, 400, { error: "Datos inválidos" });

    connection.query(
      "UPDATE product SET name = ?, description = ? WHERE id = ?",
      [name, description || null, id],
      (err, result) => {
        if (err) return sendJson(res, 500, { error: "Error al actualizar" });
        if (result.affectedRows === 0)
          return sendJson(res, 404, { error: "Producto no encontrado" });

        sendJson(res, 200, { data: { id, name, description } });
      }
    );
  });
}

function updatePartial(req, res) {
  const id = req.params.id;
  parseBody(req, (err, body) => {
    if (err) return sendJson(res, 400, { error: "JSON inválido" });

    const fields = [];
    const values = [];

    if (body.name !== undefined) {
      fields.push("name = ?");
      values.push(body.name);
    }
    if (body.description !== undefined) {
      fields.push("description = ?");
      values.push(body.description);
    }

    if (fields.length === 0) {
      return sendJson(res, 400, {
        error: "No hay campos válidos para actualizar",
      });
    }

    values.push(id);

    const sql = `UPDATE product SET ${fields.join(", ")} WHERE id = ?`;
    connection.query(sql, values, (err, result) => {
      if (err)
        return sendJson(res, 500, {
          error: "Error al actualizar parcialmente",
        });
      if (result.affectedRows === 0)
        return sendJson(res, 404, { error: "Producto no encontrado" });

      connection.query(
        "SELECT * FROM product WHERE id = ?",
        [id],
        (err, results) => {
          if (err)
            return sendJson(res, 500, { error: "Error al recuperar datos" });
          sendJson(res, 200, { data: results[0] });
        }
      );
    });
  });
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
  create,
  updateFull,
  updatePartial,
  remove,
};
