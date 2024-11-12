export default class EmailService {
  constructor(service, pathService, templateService) {
    this.service = service;
    this.pathService = pathService;
    this.templateService = templateService;
  }

  async send({ from, to, subject, html, template, context }) {
    const transporter = await this.service.createTransport({
      service: 'Gmail',
      auth: {
        user: from,
        pass: process.env.EMAIL_APP_PASS
      }
    });

    transporter.use('compile', this.templateService({
      viewEngine: {
        extName: '.hbs',
        partialsDir: this.pathService.resolve('./src/module/email/template/'),
        defaultLayout: false,
      },
      viewPath: this.pathService.resolve('./src/module/email/template/'),
      extName: '.hbs',
    }));

    const mailOptions = {
      from,
      to,
      subject,
      html,
      template,
      context
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  }
}