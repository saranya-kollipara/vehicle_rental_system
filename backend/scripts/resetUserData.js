import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const resetData = async () => {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const dbName = process.env.DB_NAME || 'vehicle_rental';

  try {
    console.log(`🔌 Connecting to MySQL server at ${host}...`);
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database: dbName,
      multipleStatements: true
    });

    console.log('🧹 Purging payments, feedback, and bookings...');
    await connection.query('DELETE FROM payments;');
    await connection.query('DELETE FROM feedback;');
    await connection.query('DELETE FROM bookings;');

    console.log('👤 Purging non-demo users (keeping user@demo.com and admin@demo.com)...');
    await connection.query(`DELETE FROM users WHERE email NOT IN ('user@demo.com', 'admin@demo.com');`);

    // Ensure Demo Customer and System Admin exist in users table
    const [rows] = await connection.query(`SELECT email FROM users;`);
    console.log(`✅ Current users in database:`, rows.map(r => r.email));

    const [vehicles] = await connection.query(`SELECT COUNT(*) as count FROM vehicles;`);
    console.log(`🚗 Total vehicles present in catalog: ${vehicles[0].count}`);

    await connection.end();
    console.log('✨ Database cleanup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during data cleanup:', error.message);
    process.exit(1);
  }
};

resetData();
