import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // Todo y, s date 함수로 변경
    const dept: string = searchParams.get('d') ?? '';
    const year: string = searchParams.get('y') ?? '2024';
    const semester: string = searchParams.get('s') ?? '1';

    if (!dept) {
        return NextResponse.json({ error: '학과 코드가 누락되었습니다.' }, { status: 400 });
    }

    // DB 연동 또는 데이터 가져오기 로직
    const timetableData = await fetchTimetableData(dept, year, semester);

    return NextResponse.json(timetableData);
}

async function fetchTimetableData(dept: string, year: string, semester: string) {
    // 실제로는 DB 또는 API를 통해 데이터를 가져오는 로직을 구현해야 함
    // 더미 데이터 반환 예시
    return [
        {
            year: year,
            semester: semester,
            dept: dept,
            grade: "3",
            class: "A",
            lect: [
                { time: 1, week: 1, name: "수학", prof: "김교수", room: "101", desc: "기초 수학 수업" },
                { time: 2, week: 3, name: "영어", prof: "이교수", room: "202", desc: "기초 영어 수업" }
            ]
        }
    ];
}
