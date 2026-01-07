import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: 5432,
  username: process.env.DB_USERNAME || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_DATABASE || 'your_database',
  entities: ['dist/src/Infrastructure/Persistence/Models/*.model{.ts,.js}'],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  synchronize: false,
});
