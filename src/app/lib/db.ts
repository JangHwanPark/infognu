import mysql from 'mysql2/promise';

// MySQL 데이터베이스 연결을 설정합니다.
export async function getConnection() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,    // 환경 변수로 설정
        user: process.env.DB_USER,    // 환경 변수로 설정
        password: process.env.DB_PASS,// 환경 변수로 설정
        database: process.env.DB_NAME // 환경 변수로 설정
    });
    return connection;
}
