function validateSignUp(validationService) {
  return [
    validationService.body('nombre').exists()
      .withMessage('La propiedad nombre es requerida'),

    validationService.body('apellido').exists()
      .withMessage('La propiedad apellido es requerida'),

    validationService.body('correoElectronico').isEmail()
      .withMessage('La propiedad correoElectronico debe ser un email válido'),

    validationService.body('contrasenia').isLength({ min: 6 })
      .withMessage('La propiedad contrasenia debe tener al menos 6 caracteres'),

    validationService.body('idUsuarioTipo').isEmpty()
      .withMessage('No se puede enviar la propiedad idUsuarioTipo')
  ];
}

function validateSignIn(validationService) {
  return [
    validationService.body('correoElectronico').exists()
      .withMessage('La propiedad correoElectronico es requerida para inciar sesión'),

    validationService.body('contrasenia').exists()
      .withMessage('La propiedad contrasenia es requerida para inciar sesión'),
  ];
}

export { validateSignUp, validateSignIn };
