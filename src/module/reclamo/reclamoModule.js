import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import EmailService from "../email/emailService.js";
import InformeService from "../informe/informeService.js";
import UsuarioRepository from "../usuario/repository/usuarioRepository.js";
import UsuarioService from "../usuario/service/usuarioService.js";
import ReclamoController from "./controller/reclamoController.js";
import ReclamoRepository from "./repository/reclamoRepository.js";
import ReclamoService from "./service/reclamoService.js";
import nodeMailerHandlebars from 'nodemailer-express-handlebars';
import expressValidator from "express-validator"
import handlebars from "handlebars";
import nodeMailer from 'nodemailer';
import puppeteer from "puppeteer";
import path from 'path';
import fs from 'fs';

export default function reclamoModule(app) {
  const templateService = nodeMailerHandlebars;
  const validationService = expressValidator;
  const htmlCompilerService = handlebars;
  const authRequest = authMiddleware;
  const browserService = puppeteer;
  const fileSystemService = fs;
  const pathService = path;

  const usuarioRepository = new UsuarioRepository(databaseConnection);
  const usuarioService = new UsuarioService(usuarioRepository);
  const emailService = new EmailService(nodeMailer, pathService, templateService);
  const informeService = new InformeService(browserService, htmlCompilerService, pathService, fileSystemService);

  const reclamoRepository = new ReclamoRepository(databaseConnection);
  const reclamoService = new ReclamoService(reclamoRepository, usuarioService, emailService);
  const reclamoController = new ReclamoController(reclamoService, authRequest, validationService, informeService);

  reclamoController.configRoutes(app);
}