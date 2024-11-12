export default class ReclamoEstadoRepository {
  constructor(database) {
    this.database = database;
  }

  async getAll() {
    try {
      const sqlQuery = "SELECT * FROM reclamos_estado WHERE activo = 1";
      const [result] = await this.database.query(sqlQuery);
      return result;
    } catch (error) {
      console.error("Error en la consulta de estados de reclamos: ", error);
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const sqlQuery = "SELECT * FROM reclamos_estado WHERE idReclamoEstado = ? AND activo = 1";
      const [rows] = await this.database.query(sqlQuery, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error en la consulta del estado de reclamo: ", error);
      throw error;
    }
  }

  async create(reclamoEstado) {
    try {
      const sqlQuery = "INSERT INTO reclamos_estado SET ?";
      const [result] = await this.database.query(sqlQuery, [reclamoEstado]);
      const reclamoEstadoCreado = await this.getOneById(result.insertId);
      return reclamoEstadoCreado;
    } catch (error) {
      console.error("Error en la creación del estado de reclamo: ", error);
      throw error;
    }
  }

  async update(id, changes) {
    try {
      const sqlQuery = "UPDATE reclamos_estado SET ? WHERE idReclamoEstado = ?";
      await this.database.query(sqlQuery, [changes, id]);
      const reclamoEstado = await this.getOneById(id);
      return reclamoEstado;
    } catch (error) {
      console.error("Error en la actualización del estado de reclamo: ", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const reclamoEstado = await this.getOneById(id);

      if (!reclamoEstado) {
        return false;
      }

      const sqlQuery = "UPDATE reclamos_estado SET activo = 0 WHERE idReclamoEstado = ?";
      const [result] = await this.database.query(sqlQuery, [id]);
      return result.affectedRows === 1;
    } catch (error) {
      console.error("Error en la eliminación lógica del estado de reclamo: ", error);
      throw error;
    }
  }
}