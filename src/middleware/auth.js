import pkg from "jsonwebtoken";
const { verify } = pkg;

function authMiddleware(requiredRoles) {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Acceso denegado. Debe iniciar sesión." });
    }

    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token no válido." });
      }

      const userRole = decoded.usuarioRol;

      if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: "No tienes permiso para acceder a esta ruta." });
      }

      req.user = decoded;
      next();
    });
  };
}

export default authMiddleware;
