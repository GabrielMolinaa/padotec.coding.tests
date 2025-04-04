const express = require("express");
const router = express.Router();
const dispositivoController = require("../controllers/dispositivoController");

// Rotas POST
router.post("/registrar", dispositivoController.registrarDispositivo);

// Rotas GET
router.get("/listar", dispositivoController.listarDispositivos);
router.get("/listar/:deviceId", dispositivoController.listarDispositivoPorId);

module.exports = router;
