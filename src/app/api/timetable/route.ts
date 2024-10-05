import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database'; // DB 연결 파일을 가져옴

export async function POST(request: Request) {
    const body = await request.json();

    const dept = body.dept ?? 'CSE';
    const year = body.year ?? '2024';
    const semester = body.semester ?? '1';

    if (!dept) {
        return NextResponse.json({
            error: '학과 코드가 누락되었습니다.', status: 400 });
    }

    try {
        // DB에서 시간표 데이터를 조회
        const timetableData = await fetchTimetableData(dept, year, semester);
        return NextResponse.json(timetableData);
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: '데이터베이스 조회 중 오류가 발생했습니다.',
            status: 500
        });
    }
}

async function fetchTimetableData(dept: string, year: string, semester: string) {
    let connection;
    try {
        connection = await connectToDatabase();

        const query = `
            SELECT * 
            FROM 안산_강의시간표 
            WHERE dept = ? AND year = ? AND semester = ?
        `;

        const [rows] = await connection.execute(query, [dept, year, semester]);
        console.log("데이터: ", rows);

        const timetable = {
            year: year,
            semester: semester,
            dept: dept,
            lectures: rows
        };

        return timetable;
    } catch (error) {
        throw new Error(`데이터 조회 중 오류가 발생했습니다: ${error.message}`);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
