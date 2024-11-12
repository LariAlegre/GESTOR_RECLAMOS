export default class AuthService {
  constructor(jwtService, hashService, userService) {
    this.jwtService = jwtService;
    this.hashService = hashService;
    this.userService = userService;
  }

  async signUp(userData) {
    const existingUser = await this.userService.getOneByEmail(userData.email);

    if (existingUser) {
      throw new Error("El correo ya ha sido registrado")
    };

    userData.contrasenia = await this.hashService.hash(userData.contrasenia, 10);
    return await this.userService.create(userData);
  };

  async signIn(email, password) {
    const user = await this.userService.getOneByEmail(email);
    const signInError = new Error("El usuario o la contraseña es incorrecta");

    if (!user) {
      throw signInError;
    };

    const isPasswordValid = await this.hashService.compare(password, user.contrasenia);

    if (!isPasswordValid) {
      throw signInError;
    };

    const { idUsuario, rol } = user;

    const token = this.jwtService.sign(
      { idUsuario, usuarioRol:rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  };
};