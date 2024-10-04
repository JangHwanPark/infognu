import mysql from 'mysql2/promise';

export async function connectToDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    return connection;
}

// 비동기 함수 내부에서 연결 시도
async function testConnection() {
    try {
        const connection = await connectToDatabase();
        console.log("데이터베이스 연결 성공:", connection.config.database);

        // 연결 종료 (옵션)
        await connection.end();
    } catch (error) {
        console.error("데이터베이스 연결 실패:", error);
    }
}

// 실행
testConnection();
