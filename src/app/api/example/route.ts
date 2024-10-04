import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database'; // 데이터베이스 연결 함수 경로

export async function GET(request: Request) {
    let connection;

    try {
        // 데이터베이스에 연결
        connection = await connectToDatabase();

        // SQL 쿼리 실행
        const [rows] = await connection.execute(`
            SELECT * FROM 안산_강의시간표
        `);

        // 데이터를 JSON으로 반환
        return NextResponse.json(rows);
    } catch (error) {
        // 에러 처리
        console.error('Error fetching timetable data:', error);
        return NextResponse.json({ error: 'Failed to fetch timetable data' }, { status: 500 });
    } finally {
        // 연결 종료
        if (connection) {
            await connection.end();
        }
    }
}
