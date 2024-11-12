export default class ReclamoTipoService {
  constructor(reclamoTipoRepository) {
    this.reclamoTipoRepository = reclamoTipoRepository;
  }

  async getAll() {
    return await this.reclamoTipoRepository.getAll();
  }

  async getOneById(id) {
    return await this.reclamoTipoRepository.getOneById(id);
  }

  async create(reclamoTipo) {
    return await this.reclamoTipoRepository.create(reclamoTipo);
  }

  async update(id, changes) {
    return await this.reclamoTipoRepository.update(id, changes);
  }

  async delete(id) {
    return await this.reclamoTipoRepository.delete(id);
  }
}