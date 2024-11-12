import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import ReclamoEstadoController from "./controller/reclamoEstadoController.js";
import ReclamoEstadoRepository from "./repository/reclamoEstadoRepository.js";
import ReclamoEstadoService from "./service/reclamoEstadoService.js";

export default function reclamoEstadoModule(app) {
  const authRequest = authMiddleware;
  const reclamoEstadoRepository = new ReclamoEstadoRepository(databaseConnection);
  const reclamoEstadoService = new ReclamoEstadoService(reclamoEstadoRepository);
  const reclamoEstadoController = new ReclamoEstadoController(reclamoEstadoService, authRequest);
  reclamoEstadoController.configRoutes(app);
}