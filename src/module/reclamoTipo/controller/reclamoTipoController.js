export default class ReclamoTipoController {
  constructor(reclamoTipoService, authRequest) {
    this.reclamoTipoService = reclamoTipoService;
    this.authRequest = authRequest;
    this.ROUTE_BASE = "/reclamo-tipo";
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
      const reclamoTipos = await this.reclamoTipoService.getAll();
      res.status(200);
      res.send({ data: reclamoTipos });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al obtener los tipos de reclamo" });
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

      const reclamoTipo = await this.reclamoTipoService.getOneById(id);

      if (!reclamoTipo) {
        res.status(404);
        res.send({ message: "Tipo de reclamo no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: reclamoTipo });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al obtener el tipo de reclamo" });
    }
  }

  async create(req, res) {
    try {
      const reclamoTipo = await this.reclamoTipoService.create(req.body);
      res.status(201);
      res.send({ data: reclamoTipo });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al crear el tipo de reclamo" });
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

      const reclamoTipo = await this.reclamoTipoService.update(id, req.body);

      if (!reclamoTipo) {
        res.status(404);
        res.send({ message: "Tipo de reclamo no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: reclamoTipo });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al actualizar el tipo de reclamo" });
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

      const reclamoTipo = await this.reclamoTipoService.delete(id);

      if (!reclamoTipo) {
        res.status(404);
        res.send({ message: "Tipo de reclamo no encontrado" });
        return;
      }

      res.status(200);
      res.send({ message: "Tipo de reclamo eliminado exitosamente" });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al eliminar el tipo de reclamo" });
    }
  }
}