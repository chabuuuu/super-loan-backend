import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import helmet from 'helmet';
import { route } from '@/routes/main';
import { GlobalConfig } from '@/utils/config/global-config.util';
import cors from 'cors';
import morgan from 'morgan';
import { endRequestPipelineMiddleware } from '@/middleware/end-request-pipeline.middleware';
import { globalErrorHanlder } from '@/middleware/error-handle.middleware';
import { AppDataSourceSingleton } from '@/database/db.datasource';
import chalk from 'chalk';
import responseFormater from 'response-formater';
import i18n from 'i18n';
import path from 'path';
import { multilangMiddleware } from '@/middleware/multilang.middleware';

/**
 * Express app
 */
const app = express();

/**
 * Middlewares
 */
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(morgan(GlobalConfig.morgan.format || 'dev'));
app.use(cors(GlobalConfig.cors));
if (GlobalConfig.helmet.enable) {
  app.use(helmet());
}
app.use(responseFormater);

i18n.configure({
  locales: ['en', 'vi'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  objectNotation: true
});

app.use(multilangMiddleware);

/**
 * Routes
 */
route(app);

/**
 * Global error handler
 */
app.use(globalErrorHanlder);
/**
 * End request pipeline handler
 */
app.use(endRequestPipelineMiddleware);

/**
 * Server
 */
AppDataSourceSingleton.getInstance()
  .initialize()
  .then(async () => {
    console.log(chalk.green('Database connected'));
    const port = GlobalConfig.server.port || 3000;
    app.listen(port, () => {
      console.log(chalk.green(`Server is running on http://localhost:${port} in ${GlobalConfig.enviroment} mode`));
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
