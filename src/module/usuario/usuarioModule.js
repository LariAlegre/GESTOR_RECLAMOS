import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import UsuarioController from "./controller/usuarioController.js";
import UsuarioRepository from "./repository/usuarioRepository.js";

export default function usuarioModule(app) {
  const authRequest = authMiddleware;
  const usuarioRepository = new UsuarioRepository(databaseConnection);
  const usuarioController = new UsuarioController(usuarioRepository, authRequest);

  usuarioController.configRoutes(app);
}
