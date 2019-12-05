import nodemailer from 'nodemailer';
import { resolve } from 'path';
import hbs from 'nodemailer-express-handlebars';
import exphbs from 'express-handlebars';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { auth, host, port } = mailConfig;

    this.transporter = nodemailer.createTransport({ host, port, auth });

    this.configureTemplate();
  }

  configureTemplate() {
    const viewPath = resolve(__dirname, '..', 'views', 'emails');

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  async sendMail(message) {
    await this.transporter.sendMail({ ...mailConfig.default, ...message });
  }
}

export default new Mail();
