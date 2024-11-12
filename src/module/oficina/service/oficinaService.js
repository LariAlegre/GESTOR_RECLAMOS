export default class OficinaService {
  constructor(oficinaRepository) {
    this.oficinaRepository = oficinaRepository;
  }

  async getAll() {
    return await this.oficinaRepository.getAll();
  }

  async getOneById(id) {
    return await this.oficinaRepository.getOneById(id);
  }

  async create(oficina) {
    return await this.oficinaRepository.create(oficina);
  }

  async update(id, changes) {
    return await this.oficinaRepository.update(id, changes);
  }

  async delete(id) {
    return await this.oficinaRepository.delete(id);
  }
}