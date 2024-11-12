import { fileURLToPath } from 'url';
import { dirname } from 'path';

export default class InformeService {
  constructor(browserService, htmlCompilerService, pathService, fileSystemService) {
    this.browserService = browserService;
    this.htmlCompilerService = htmlCompilerService;
    this.pathService = pathService;
    this.fileSystemService = fileSystemService;
  }

  async generatePDF(data) {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      const filePath = await this.pathService.join(__dirname, './template/informe.html');
      const htmlTemplate = await this.fileSystemService.promises.readFile(filePath, 'utf-8');

      const compiledTemplate = this.htmlCompilerService.compile(htmlTemplate);
      const renderedHtml = compiledTemplate(data);

      const browser = await this.browserService.launch({ headless: true });
      const page = await browser.newPage();

      await page.setContent(renderedHtml, { waitUntil: 'load' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '10px', bottom: '10px' },
      });

      await browser.close();

      return pdfBuffer;
    } catch (error) {
      console.log("Error al generar el PDF: ", error);
    }
  }
}