import {NextResponse} from 'next/server';
import {connectToDatabase} from '@/lib/database'; // 데이터베이스 연결 함수 경로

export async function GET(request: Request) {
    console.log("API route has been hit");

    let connection;
    try {
        // 데이터베이스에 연결
        connection = await connectToDatabase();

        // SQL 쿼리 실행
        const [rows, fields] = await connection.execute(`
            SELECT * FROM 안산_강의시간표
        `);
        console.log(`SQL 쿼리 실행\n ${rows}`)
        console.log(`메타데이터\n ${fields}`)

        // 데이터를 JSON으로 반환
        return NextResponse.json({
            data: rows,
            message: 'Successfully fetched timetable data',
            status: 200
        });
    } catch (error) {
        // 에러 처리
        console.error('Error fetching timetable data:', error);
        return NextResponse.json({
            error: 'Failed to fetch timetable data',
            message: error.message,
            status: 500
        });
    } finally {
        // 연결 종료
        if (connection) {
            await connection.end();
        }
    }
}
