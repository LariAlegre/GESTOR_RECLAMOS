import bcrypt from 'bcrypt';

export default class UsuarioController {
  constructor(usuarioRepository, authRequest) {
    this.usuarioRepository = usuarioRepository;
    this.authRequest = authRequest;
    this.ROUTE_BASE = "/usuario";
  }

  configRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(this.ROUTE_BASE, this.authRequest(["Administrador"]), this.getAll.bind(this));
    app.get(`${ROUTE}/:id`, this.authRequest(["Administrador"]), this.getOneById.bind(this));
    app.post(ROUTE, this.authRequest(["Administrador"]), this.create.bind(this));
    app.patch(`${ROUTE}/:id`, this.authRequest(["Administrador", "Cliente"]), this.update.bind(this));
    app.delete(`${ROUTE}/:id`, this.authRequest(["Administrador"]), this.delete.bind(this));
    app.post(`${ROUTE}/cliente`, this.createCliente.bind(this));  // Ruta para que los clientes creen usuarios
    app.get(`${ROUTE}/estadisticas/oficinas`, this.authRequest(["Administrador"]), this.getUsersCountByOffice.bind(this)); // Nueva ruta para estadísticas
  }

  async getAll(req, res) {
    try {
      const usuario = await this.usuarioRepository.getAll();
      res.status(200).send({ data: usuario });
    } catch (error) {
      res.status(500).send({ message: "Error al obtener los usuarios", error: error.message });
    }
  }

  async getOneById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send({ message: "Debe indicar un id" });
      }

      const usuario = await this.usuarioRepository.getOneById(id);

      if (!usuario) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }

      res.status(200).send({ data: usuario });
    } catch (error) {
      res.status(500).send({ message: "Error al obtener el usuario", error: error.message });
    }
  }

  async create(req, res) {
    try {
      req.body.contrasenia = await bcrypt.hash(req.body.contrasenia, 10);
      const usuario = await this.usuarioRepository.create(req.body);
      res.status(201).send({ data: usuario });
    } catch (error) {
      res.status(500).send({ message: "Error al crear el usuario", error: error.message });
    }
  }

  async createCliente(req, res) {
    try {
      // Forzar el rol de cliente
      req.body.idUsuarioTipo = 3;  // Asume que '3' es el rol de cliente
      req.body.contrasenia = await bcrypt.hash(req.body.contrasenia, 10);
      const usuario = await this.usuarioRepository.create(req.body);
      res.status(201).send({ data: usuario });
    } catch (error) {
      res.status(500).send({ message: "Error al crear el usuario como cliente", error: error.message });
    }
  }

  async getUsersCountByOffice(req, res) {
    try {
      const stats = await this.usuarioRepository.getUsersCountByOffice();
      res.status(200).send({ data: stats });
    } catch (error) {
      console.error("Error al obtener las estadísticas:", error);  // Agregar mensaje de error detallado
      res.status(500).send({ message: "Error al obtener las estadísticas", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send({ message: "Debe indicar un id" });
      }

      const { idUsuario, usuarioRol } = req.user;
      const { idUsuarioTipo } = req.body;

      if (idUsuarioTipo && usuarioRol !== "Administrador") {
        return res.status(403).send({ message: "No tienes permiso para cambiar el rol del usuario" });
      }

      if (Number(idUsuario) !== Number(id) && usuarioRol !== "Administrador") {
        return res.status(403).send({ message: "No tienes permiso para actualizar este usuario" });
      }

      const usuario = await this.usuarioRepository.update(id, req.body);

      if (!usuario) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }

      res.status(200).send({ data: usuario });
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar el usuario", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send({ message: "Debe indicar un id" });
      }

      const usuario = await this.usuarioRepository.delete(id);

      if (!usuario) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }

      res.status(200).send({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      res.status(500).send({ message: "Error al eliminar el usuario", error: error.message });
    }
  }
}
