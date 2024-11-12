export default class ReclamoTipoRepository {
  constructor(database) {
    this.database = database;
  }

  async getAll() {
    try {
      const sqlQuery = "SELECT * FROM reclamos_tipo WHERE activo = 1";
      const [result] = await this.database.query(sqlQuery);
      return result;
    } catch (error) {
      console.error("Error en la consulta de tipos de reclamos: ", error);
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const sqlQuery = "SELECT * FROM reclamos_tipo WHERE idReclamoTipo = ? AND activo = 1";
      const [rows] = await this.database.query(sqlQuery, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error en la consulta del tipo de reclamo: ", error);
      throw error;
    }
  }

  async create(reclamoTipo) {
    try {
      const sqlQuery = "INSERT INTO reclamos_tipo SET ?";
      const [result] = await this.database.query(sqlQuery, [reclamoTipo]);
      const reclamoTipoCreado = await this.getOneById(result.insertId);
      return reclamoTipoCreado;
    } catch (error) {
      console.error("Error en la creación del tipo de reclamo: ", error);
      throw error;
    }
  }

  async update(id, changes) {
    try {
      const sqlQuery = "UPDATE reclamos_tipo SET ? WHERE idReclamoTipo = ?";
      await this.database.query(sqlQuery, [changes, id]);
      const reclamoTipo = await this.getOneById(id);
      return reclamoTipo;
    } catch (error) {
      console.error("Error en la actualización del tipo de reclamo: ", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const reclamoTipo = await this.getOneById(id);

      if (!reclamoTipo) {
        return false;
      }

      const sqlQuery = "UPDATE reclamos_tipo SET activo = 0 WHERE idReclamoTipo = ?";
      const [result] = await this.database.query(sqlQuery, [id]);
      return result.affectedRows === 1;
    } catch (error) {
      console.error("Error en la eliminación lógica del tipo de reclamo: ", error);
      throw error;
    }
  }
}