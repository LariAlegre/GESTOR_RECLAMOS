-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-08-2024 a las 03:43:20
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reclamos`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `totales_reclamos_estados` (OUT `descripcion` CHAR, OUT `cantidad` INT)   SELECT re.descripcion, count(r.idReclamo) as cantidad FROM `reclamos` as r
INNER JOIN `reclamos_estado` AS re ON re.idReclamoEstado = r.idReclamoEstado
GROUP by re.descripcion$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficinas`
--

CREATE TABLE `oficinas` (
  `idOficina` int(11) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `idReclamoTipo` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `oficinas`
--

INSERT INTO `oficinas` (`idOficina`, `nombre`, `idReclamoTipo`, `activo`) VALUES
(1, 'Dpto. de Taller y Servicio Técnico', 1, 1),
(2, 'Dpto. de Garantías', 4, 1),
(3, 'Dpto. de Repuestos y Partes', 6, 1),
(4, 'Dpto. de Facturación', 9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos`
--

CREATE TABLE `reclamos` (
  `idReclamo` int(11) NOT NULL,
  `asunto` varchar(256) NOT NULL,
  `descripcion` varchar(256) DEFAULT NULL,
  `fechaCreado` datetime NOT NULL,
  `fechaFinalizado` datetime DEFAULT NULL,
  `fechaCancelado` datetime DEFAULT NULL,
  `idReclamoEstado` int(11) NOT NULL,
  `idReclamoTipo` int(11) NOT NULL,
  `idUsuarioCreador` int(11) NOT NULL,
  `idUsuarioFinalizador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamos`
--

INSERT INTO `reclamos` (`idReclamo`, `asunto`, `descripcion`, `fechaCreado`, `fechaFinalizado`, `fechaCancelado`, `idReclamoEstado`, `idReclamoTipo`, `idUsuarioCreador`, `idUsuarioFinalizador`) VALUES
(5, 'ruido en motor', NULL, '2024-08-19 06:00:00', NULL, NULL, 1, 1, 9, NULL),
(6, 'rotura de  motor ', NULL, '2024-08-19 07:00:00', NULL, NULL, 4, 1, 8, NULL),
(7, 'no frena', NULL, '2024-08-15 07:15:00', NULL, NULL, 1, 2, 8, NULL),
(8, 'ruidos extraños', NULL, '2024-08-15 08:00:00', NULL, NULL, 1, 3, 7, NULL),
(9, 'cristales rayados', NULL, '2024-08-15 09:30:00', NULL, NULL, 1, 4, 7, NULL),
(10, 'matafuego vencido', NULL, '2024-08-15 09:00:00', NULL, NULL, 2, 4, 7, NULL),
(11, 'suspensión lado izq fallada', NULL, '2024-08-15 15:00:00', NULL, NULL, 2, 3, 8, NULL),
(15, 'falla tren delantero', 'empece a notar ruidos molesto', '2024-08-28 19:26:12', NULL, NULL, 1, 1, 9, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos_estado`
--

CREATE TABLE `reclamos_estado` (
  `idReclamoEstado` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamos_estado`
--

INSERT INTO `reclamos_estado` (`idReclamoEstado`, `descripcion`, `activo`) VALUES
(1, 'Creado', 1),
(2, 'En Proceso', 1),
(3, 'Cancelado', 1),
(4, 'Finalizado', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos_tipo`
--

CREATE TABLE `reclamos_tipo` (
  `idReclamoTipo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamos_tipo`
--

INSERT INTO `reclamos_tipo` (`idReclamoTipo`, `descripcion`, `activo`) VALUES
(1, 'Falla de motor', 1),
(2, 'Falla de frenos', 1),
(3, 'Falla de suspensión', 1),
(4, 'Aprobación de cobertura', 1),
(5, 'Verificación de términos', 1),
(6, 'Reemplazo de piezas', 1),
(7, 'Reinstalación correcta', 0),
(9, 'Reembolso', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `apellido` varchar(256) NOT NULL,
  `correoElectronico` varchar(256) NOT NULL,
  `contrasenia` varchar(256) NOT NULL,
  `idUsuarioTipo` int(11) NOT NULL,
  `imagen` varchar(256) DEFAULT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `apellido`, `correoElectronico`, `contrasenia`, `idUsuarioTipo`, `imagen`, `activo`) VALUES
(1, 'Agustin', 'Sanchez', 'agus@gmail.com', '$2b$10$7HtSXlZz6PA3Ls.prypvu.XxHze2K4wkyVEBGio2zOA7WC4HHtDDa', 1, NULL, 1),
(2, 'Lara', 'Alegre', 'lara@gmail.com', '$2b$10$rZeI4w236ysneDwwhEFL8uRRQ2fGpOFTR3Ah0U3u2bNuxpEar7vp6', 1, NULL, 1),
(3, 'Lucas', 'Ruiz', 'lucas@gmail.com', '$2b$10$8nFCGXQMjjOoJ2QGXCDpA.MeRWYzHiPQRbDFuoMZtVqY1.D6KR.NG', 2, NULL, 1),
(4, 'Julian', 'Annoni', 'julian@gmail.com', '$2b$10$Dy04i3WU1T.eg/EHBPfjE./aaaX.xpL5qJYEQq.a.uCUxaXansqNq', 2, NULL, 1),
(5, 'Giovanni', 'Percara', 'gio@gmail.com', '$2b$10$rQf8ptHHdAxrvdKBfbdLN.K80G6l2tvR6tITEVM/foCfiDOm7TmPm', 3, NULL, 1),
(6, 'Daniela', 'Sanchez', 'daniela@gmail.com', '$2b$10$ThoYGvlZJI/jGmhocCr3a.zS0nAevlmiKtbTLavz69N5Q/O6fqLX6', 3, NULL, 1),
(7, 'Cristian', 'Faure', 'cristian.faure@uner.edu.ar', '$2b$10$ThoYGvlZJI/jGmhocCr3a.zS0nAevlmiKtbTLavz69N5Q/O6fqLX6', 3, NULL, 1),
(8, 'Ignacio', 'Novello', 'ignacio.novello@uner.edu.ar', '$2b$10$ekbE.gKz9gdercHiRVAN4uv7ZtuY/BDhePBTux3EczyV05iB3RXHy', 3, NULL, 1),
(9, 'Pipo', 'Gorosito', 'pipo@gmail.com', '$2b$10$qfCGIE4ClfGj6iuRgo8eFeU8igAOnSeQR09u1aTdF.KiIESkDOT16', 3, NULL, 1),
(10, 'Cliente', '1', 'test1@gmail.com', '$2b$10$UNCfoUEg4bbTpkocfd0lo.lviV//wfwYYtwjbAb8puKNxXvFDUQt6', 3, NULL, 1),
(11, 'Cliente', '2', 'test2@gmail.com', '$2b$10$vLEuzrlyxG6dF9.8vGO.cOmdj31LS4xu1L3oEpY2wMV6BU5B7vpCq', 3, NULL, 1),
(12, 'Empleado', '1', 'test3@gmail.com', '$2b$10$0b4zj0TeQ3mCe2.y9rE7BOkFiszpT8M4fMQinwq/GKDv6bVawFhqC', 2, NULL, 1),
(13, 'Empleado', '2', 'test4@gmail.com', '$2b$10$rNrJNlwTX5JDeRH6gATL7edw217ED0IRRo5wzk4mLXoCqcbQONrd.', 2, NULL, 1),
(14, 'Administrador', '1', 'test5@gmail.com', '$2b$10$8Wz.3RPwVhRRzjXnypvRNud4SObYxlWETDFHpf2z2L0AH7f1s3RNW', 1, NULL, 1),
(15, 'Administrador', '2', 'test6@gmail.com', '$2b$10$fJo2A74wKWJoP9XWbaE7OO1bMKq4S2moIhrtbnZ0hBA1wg5bV0oPu', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_oficinas`
--

CREATE TABLE `usuarios_oficinas` (
  `idUsuarioOficina` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idOficina` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios_oficinas`
--

INSERT INTO `usuarios_oficinas` (`idUsuarioOficina`, `idUsuario`, `idOficina`, `activo`) VALUES
(1, 3, 1, 1),
(2, 4, 2, 1),
(3, 8, 3, 1),
(4, 9, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_tipo`
--

CREATE TABLE `usuarios_tipo` (
  `idUsuarioTipo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios_tipo`
--

INSERT INTO `usuarios_tipo` (`idUsuarioTipo`, `descripcion`, `activo`) VALUES
(1, 'Administrador', 1),
(2, 'Empleado', 1),
(3, 'Cliente', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  ADD PRIMARY KEY (`idOficina`),
  ADD UNIQUE KEY `idOficina` (`idOficina`),
  ADD KEY `oficinas_fk2` (`idReclamoTipo`);

--
-- Indices de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD PRIMARY KEY (`idReclamo`),
  ADD UNIQUE KEY `idReclamo` (`idReclamo`),
  ADD KEY `reclamos_fk6` (`idReclamoEstado`),
  ADD KEY `reclamos_fk7` (`idReclamoTipo`),
  ADD KEY `reclamos_fk8` (`idUsuarioCreador`),
  ADD KEY `reclamos_fk9` (`idUsuarioFinalizador`);

--
-- Indices de la tabla `reclamos_estado`
--
ALTER TABLE `reclamos_estado`
  ADD PRIMARY KEY (`idReclamoEstado`),
  ADD UNIQUE KEY `idReclamoEstado` (`idReclamoEstado`);

--
-- Indices de la tabla `reclamos_tipo`
--
ALTER TABLE `reclamos_tipo`
  ADD PRIMARY KEY (`idReclamoTipo`),
  ADD UNIQUE KEY `idReclamoTipo` (`idReclamoTipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `idUsuario` (`idUsuario`),
  ADD UNIQUE KEY `correoElectronico` (`correoElectronico`),
  ADD KEY `usuarios_fk5` (`idUsuarioTipo`);

--
-- Indices de la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  ADD PRIMARY KEY (`idUsuarioOficina`),
  ADD UNIQUE KEY `idUsuarioOficina` (`idUsuarioOficina`),
  ADD KEY `usuariosOficinas_fk1` (`idUsuario`),
  ADD KEY `usuariosOficinas_fk2` (`idOficina`);

--
-- Indices de la tabla `usuarios_tipo`
--
ALTER TABLE `usuarios_tipo`
  ADD PRIMARY KEY (`idUsuarioTipo`),
  ADD UNIQUE KEY `idUsuarioTipo` (`idUsuarioTipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  MODIFY `idOficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  MODIFY `idReclamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `reclamos_estado`
--
ALTER TABLE `reclamos_estado`
  MODIFY `idReclamoEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `reclamos_tipo`
--
ALTER TABLE `reclamos_tipo`
  MODIFY `idReclamoTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  MODIFY `idUsuarioOficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios_tipo`
--
ALTER TABLE `usuarios_tipo`
  MODIFY `idUsuarioTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `oficinas`
--
ALTER TABLE `oficinas`
  ADD CONSTRAINT `oficinas_fk2` FOREIGN KEY (`idReclamoTipo`) REFERENCES `reclamos_tipo` (`idReclamoTipo`);

--
-- Filtros para la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD CONSTRAINT `reclamos_fk6` FOREIGN KEY (`idReclamoEstado`) REFERENCES `reclamos_estado` (`idReclamoEstado`),
  ADD CONSTRAINT `reclamos_fk7` FOREIGN KEY (`idReclamoTipo`) REFERENCES `reclamos_tipo` (`idReclamoTipo`),
  ADD CONSTRAINT `reclamos_fk8` FOREIGN KEY (`idUsuarioCreador`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `reclamos_fk9` FOREIGN KEY (`idUsuarioFinalizador`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_fk5` FOREIGN KEY (`idUsuarioTipo`) REFERENCES `usuarios_tipo` (`idUsuarioTipo`);

--
-- Filtros para la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  ADD CONSTRAINT `usuariosOficinas_fk1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `usuariosOficinas_fk2` FOREIGN KEY (`idOficina`) REFERENCES `oficinas` (`idOficina`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
