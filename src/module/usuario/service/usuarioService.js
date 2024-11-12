export default class UsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async getAll() {
    return await this.usuarioRepository.getAll();
  }

  async getOneById(id) {
    return await this.usuarioRepository.getOneById(id);
  }

  async getOneByEmail(email) {
    return await this.usuarioRepository.getOneByEmail(email);
  }

  async create(usuario) {
    if (!usuario.idUsuarioTipo) {
      usuario.idUsuarioTipo = 3;
    }

    return await this.usuarioRepository.create(usuario);
  }

  async update(id, changes) {
    return await this.usuarioRepository.update(id, changes);
  }

  async delete(id) {
    return await this.usuarioRepository.delete(id);
  }
}