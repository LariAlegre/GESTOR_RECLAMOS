import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import OficinaController from "./controller/oficinaController.js";
import OficinaRepository from "./repository/oficinaRepository.js";
import OficinaService from "./service/oficinaService.js";

export default function oficinaModule(app) {
  const authRequest = authMiddleware;
  const oficinaRepository = new OficinaRepository(databaseConnection);
  const oficinaService = new OficinaService(oficinaRepository);
  const oficinaController = new OficinaController(oficinaService, authRequest);
  oficinaController.configRoutes(app);
}