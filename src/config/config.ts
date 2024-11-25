import { Environments } from './environments';

type ConfigType = {
  apiUrl: string;
  debug?: boolean;
  environment: Environments;
};

const developmentEnvironment: ConfigType = {
  apiUrl: 'https://api-dev.justbelekker.com',
  debug: true,
  environment: Environments.DEVELOPMENT,
};

const productionEnvironment: ConfigType = {
  apiUrl: 'https://api-prod.justbelekker.com',
  environment: Environments.PRODUCTION,
};

const testEnvironment: ConfigType = {
  apiUrl: 'https://api-test.justbelekker.com',
  environment: Environments.TEST,
};

const stageEnvironment: ConfigType = {
  apiUrl: 'https://api-stage.justbelekker.com',
  environment: Environments.STAGING,
};

const config = {
  [Environments.DEVELOPMENT]: developmentEnvironment,
  [Environments.PRODUCTION]: productionEnvironment,
  [Environments.TEST]: testEnvironment,
  [Environments.STAGING]: stageEnvironment,
};

const CLIENT_ENV = import.meta.env.MODE as Environments;

export default config[CLIENT_ENV];
