export default class ReclamoEstadoController {
  constructor(reclamoEstadoService, authRequest) {
    this.reclamoEstadoService = reclamoEstadoService;
    this.authRequest = authRequest;
    this.ROUTE_BASE = "/reclamo-estado";
  }

  configRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(this.ROUTE_BASE, this.authRequest(["Administrador"]), this.getAll.bind(this));
    app.get(`${ROUTE}/:id`, this.authRequest(["Administrador"]), this.getOneById.bind(this));
    app.post(ROUTE, this.authRequest(["Administrador"]), this.create.bind(this));
    app.patch(`${ROUTE}/:id`, this.authRequest(["Administrador"]), this.update.bind(this));
    app.delete(`${ROUTE}/:id`, this.authRequest(["Administrador"]), this.delete.bind(this));
  }

  async getAll(req, res) {
    try {
      const reclamoEstados = await this.reclamoEstadoService.getAll();
      res.status(200);
      res.send({ data: reclamoEstados });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al obtener los estados de reclamo" });
    }
  }

  async getOneById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "Debe indicar un id" });
        return;
      }

      const reclamoEstado = await this.reclamoEstadoService.getOneById(id);

      if (!reclamoEstado) {
        res.status(404);
        res.send({ message: "Estado de reclamo no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: reclamoEstado });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al obtener el estado de reclamo" });
    }
  }

  async create(req, res) {
    try {
      const reclamoEstado = await this.reclamoEstadoService.create(req.body);
      res.status(201);
      res.send({ data: reclamoEstado });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al crear el estado de reclamo" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "Debe indicar un id" });
        return;
      }

      const reclamoEstado = await this.reclamoEstadoService.update(id, req.body);

      if (!reclamoEstado) {
        res.status(404);
        res.send({ message: "Estado de reclamo no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: reclamoEstado });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al actualizar el estado de reclamo" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "Debe indicar un id" });
        return;
      }

      const reclamoEstado = await this.reclamoEstadoService.delete(id);

      if (!reclamoEstado) {
        res.status(404);
        res.send({ message: "Estado de reclamo no encontrado" });
        return;
      }

      res.status(200);
      res.send({ message: "Estado de reclamo eliminado exitosamente" });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al eliminar el estado de reclamo" });
    }
  }
}