import mysql from 'mysql2/promise';

export async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log("DB_HOST: " + process.env.DB_HOST)
        console.log("DB_USER: " + process.env.DB_USER)
        console.log("DB_PASSWORD: " + process.env.DB_PASSWORD)
        console.log("DB_NAME: " + process.env.DB_NAME)
        console.log("Connected to the database successfully");
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;  // 오류 발생 시 던지기
    }
}
