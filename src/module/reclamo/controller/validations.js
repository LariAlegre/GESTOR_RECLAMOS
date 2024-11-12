function validateCreate(validationService) {
  return [
    validationService.body('asunto').exists()
      .withMessage('La propiedad asunto es requerida'),

    validationService.body('descripcion').exists()
      .withMessage('La propiedad descripcion es requerida'),

    validationService.body('idReclamoTipo').exists()
      .withMessage('La propiedad idReclamoTipo es requerida'),

    validationService.body('idReclamoEstado').isEmpty()
      .withMessage('No se puede enviar la propiedad idReclamoEstado')
  ];
}

export { validateCreate };