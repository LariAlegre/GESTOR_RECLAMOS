export default class OficinaController {
  constructor(oficinaService, authRequest) {
    this.oficinaService = oficinaService;
    this.authRequest = authRequest;
    this.ROUTE_BASE = "/oficina";
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
      const oficina = await this.oficinaService.getAll();
      res.status(200);
      res.send({ data: oficina });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al obtener las oficinas" });
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

      const oficina = await this.oficinaService.getOneById(id);

      if (!oficina) {
        res.status(404);
        res.send({ message: "Oficina no encontrada" });
        return;
      }

      res.status(200);
      res.send({ data: oficina });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al obtener la oficina" });
    }
  }

  async create(req, res) {
    try {
      const oficina = await this.oficinaService.create(req.body);
      res.status(201);
      res.send({ data: oficina });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al crear la oficina" });
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

      const oficina = await this.oficinaService.update(id, req.body);

      if (!oficina) {
        res.status(404);
        res.send({ message: "Oficina no encontrada" });
        return;
      }

      res.status(200);
      res.send({ data: oficina });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al actualizar la oficina" });
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

      const oficina = await this.oficinaService.delete(id);

      if (!oficina) {
        res.status(404);
        res.send({ message: "Oficina no encontrada" });
        return;
      }

      res.status(200);
      res.send({ message: "Oficina eliminada exitosamente" });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al eliminar la oficina" });
    }
  }
}