export default class ReclamoService {
  constructor(reclamoRepository, usuarioService, emailService) {
    this.reclamoRepository = reclamoRepository;
    this.usuarioService = usuarioService;
    this.emailService = emailService;
  }

  async getAllPorPagina() {
   const reclamos= await this.reclamoRepository.getAll();
   /* paso1: crear un array*/
   /* paso2: ordenar por fecha*/
   /* paso3: ya ordenado, hacer un bucle*/
   /* paso4: en este bucle, se agrega un contador (configurado con base/limite 5)*/
   /* paso5: verificar si es multiplo de 5, para que se pase al siguiente array*/
   /* paso6: una vez que se complete los 5, van a la posicion 0 del array principal*/
   /* paso7: cada 5 reclamos/recorridos aumenta el contador de paginas*/
   /* paso8: devolver resultado final */
  }

  async getAll() {
    return await this.reclamoRepository.getAll();
  }

  async getOneById(id) {
    return await this.reclamoRepository.getOneById(id);
  }

  async getReportData() {
    return await this.reclamoRepository.getReportData();
  }

  async create(reclamo) {
    if (!reclamo.idReclamoEstado) {
      reclamo.idReclamoEstado = 1;
    }

    return await this.reclamoRepository.create(reclamo);
  }

  async update(id, changes) {
    if (!changes) {
      changes = { idReclamoEstado: 3 };

      const reclamo = await this.getOneById(id);

      const idUsuarioCreador = reclamo.idUsuarioCreador;
      const usuarioCreador = await this.usuarioService.getOneById(idUsuarioCreador);
      const emailTo = usuarioCreador.correoElectronico;

      await this.emailService.send({
        from: process.env.EMAIL_FROM,
        to: emailTo,
        subject: "Cambio en el estado de su reclamo",
        template: "reclamoEstado",
        context: {
          nombre: usuarioCreador.nombre,
          apellido: usuarioCreador.apellido,
          idReclamo: id,
          estado: "Cancelado",
        }
      });
    }

    return await this.reclamoRepository.update(id, changes);
  }
}