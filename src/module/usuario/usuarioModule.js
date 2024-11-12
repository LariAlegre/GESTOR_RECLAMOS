import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import UsuarioController from "./controller/usuarioController.js";
import UsuarioRepository from "./repository/usuarioRepository.js";
import UsuarioService from "./service/usuarioService.js";

export default function usuarioModule(app) {
  const authRequest = authMiddleware;
  const usuarioRepository = new UsuarioRepository(databaseConnection);
  const usuarioService = new UsuarioService(usuarioRepository);
  const usuarioController = new UsuarioController(usuarioService, authRequest);
  usuarioController.configRoutes(app);
}