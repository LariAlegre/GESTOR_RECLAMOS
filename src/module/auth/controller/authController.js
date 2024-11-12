import { validateSignIn, validateSignUp } from "./validations.js";

export default class AuthController {
  constructor(authService, validationService) {
    this.authService = authService;
    this.validationService = validationService;
    this.ROUTE_BASE = "/auth";
  }

  configRoutes(app) {
    app.post(`${this.ROUTE_BASE}/sign-up`, validateSignUp(this.validationService), this.signUp.bind(this));
    app.post(`${this.ROUTE_BASE}/sign-in`, validateSignIn(this.validationService), this.signIn.bind(this));
  }

  async signUp(req, res) {
    const errors = await this.validationService.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await this.authService.signUp(req.body);
      res.status(201);
      res.send({ message: "Usuario registrado correctamente!", data: user });
    } catch (error) {
      console.error(error);
      res.status(400);
      res.send({ message: "Error al registrar el usuario" });
    }
  };

  async signIn(req, res) {
    const errors = await this.validationService.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { correoElectronico, contrasenia } = req.body;
      const { token } = await this.authService.signIn(correoElectronico, contrasenia);
      res.status(200);
      res.send({ message: "Inicio de sesión exitoso!", data: token });
    } catch (error) {
      console.error(error);
      res.status(400);
      res.send({ message: "Error al iniciar sesión" });
    }
  };
}