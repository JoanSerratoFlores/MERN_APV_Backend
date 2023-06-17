import express from "express";
const router = express.Router();
import {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  eliminarPaciente,
  actualizarPaciente
} from "../controllers/pacienteControllers.js";
import checkAuth from "../middleware/authMiddleware.js";

router.route("/")
    .post(checkAuth,agregarPaciente)    
    .get(checkAuth,obtenerPacientes);

router.
    route("/:id")
    .get(checkAuth,obtenerPaciente)
    .put(checkAuth,actualizarPaciente)
    .delete(checkAuth,eliminarPaciente); 

export default router;
