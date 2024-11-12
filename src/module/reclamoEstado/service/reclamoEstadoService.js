export default class ReclamoEstadoService {
  constructor(reclamoEstadoRepository) {
    this.reclamoEstadoRepository = reclamoEstadoRepository;
  }

  async getAll() {
    return await this.reclamoEstadoRepository.getAll();
  }

  async getOneById(id) {
    return await this.reclamoEstadoRepository.getOneById(id);
  }

  async create(reclamoEstado) {
    return await this.reclamoEstadoRepository.create(reclamoEstado);
  }

  async update(id, changes) {
    return await this.reclamoEstadoRepository.update(id, changes);
  }

  async delete(id) {
    return await this.reclamoEstadoRepository.delete(id);
  }
}