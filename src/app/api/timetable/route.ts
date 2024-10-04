import {NextResponse} from 'next/server';
import {connectToDatabase} from '@/config/database'; // DB 연결 파일을 가져옴

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);

    const dept = searchParams.get('d') ?? '';
    const year = searchParams.get('y') ?? '2024';
    const semester = searchParams.get('s') ?? '1';

    if (!dept) {
        return NextResponse.json({error: '학과 코드가 누락되었습니다.', status: 400});
    }

    try {
        // DB에서 시간표 데이터를 조회
        const timetableData = await fetchTimetableData(dept, year, semester);
        return NextResponse.json(timetableData);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: '데이터베이스 조회 중 오류가 발생했습니다.', status: 500});
    }
}

async function fetchTimetableData(dept: string, year: string, semester: string) {
    try {/*
        const query = `
            SELECT tt.year,
                   tt.semester,
                   tt.dept,
                   tt.grade,
                   tt.class,
                   l.time,
                   l.week,
                   l.name,
                   l.prof,
                   l.room,
                   l.desc
            FROM Timetable tt
                     JOIN Lecture l ON tt.id = l.timetableId
            WHERE tt.dept = ?
              AND tt.year = ?
              AND tt.semester = ?
        `;*/

        const query = `
         select * from 안산_강의시간표`

        const [rows] = await connectToDatabase.query(query, [dept, year, semester]);
        console.log("데이터: " + rows)

        // 시간표 데이터 가공
        const timetable = {
            year: year,
            semester: semester,
            dept: dept,
            lectures: rows
        };

        return timetable;
    } catch (error) {
        throw new Error(`데이터 조회 중 오류가 발생했습니다: ${error.message}`);
    }
}
