import mysql from 'mysql2/promise';

export async function connectToDatabase() {
    console.log("Attempting to connect to the database..."); // 확인 로그 추가

    try {
        const connection = await mysql.createConnection({
            host: process.env.NEXT_DB_HOST,
            user: process.env.NEXT_DB_USER,
            password: process.env.NEXT_DB_PASS,
            database: process.env.NEXT_DB_NAME,
        });

        // 성공적으로 연결되었을 때의 로그
        console.log("DB_HOST: " + (process.env.NEXT_DB_HOST));
        console.log("DB_USER: " + (process.env.NEXT_DB_USER));
        console.log("DB_PASSWORD: " + (process.env.NEXT_DB_PASS));
        console.log("DB_NAME: " + (process.env.NEXT_DB_NAME));
        console.log("Connected to the database successfully");
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;  // 오류 발생 시 던지기
    }
}
