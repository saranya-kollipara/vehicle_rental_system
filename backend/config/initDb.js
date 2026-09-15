import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initializeDatabase = async () => {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const dbName = process.env.DB_NAME || 'vehicle_rental';

  try {
    console.log(`🔌 Connecting to MySQL server at ${host}...`);
    // Connect without selecting database first to ensure database creation
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      multipleStatements: true
    });

    console.log(`📦 Ensuring database '${dbName}' exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);

    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      console.log('📜 Executing database schema and seed data...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await connection.query(schemaSql);
      console.log('✅ MySQL Database and tables initialized successfully!');
    } else {
      console.warn('⚠️ schema.sql not found at', schemaPath);
    }

    await connection.end();
    return true;
  } catch (error) {
    console.error('❌ Error during database initialization:', error.message);
    console.warn('💡 Tip: Make sure your MySQL server is running and credentials in backend/.env are correct.');
    return false;
  }
};

// If run directly via node
if (process.argv[1] && process.argv[1].endsWith('initDb.js')) {
  initializeDatabase().then(() => process.exit(0));
}
