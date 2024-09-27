import { NextRequest, NextResponse } from 'next/server';
import {connectToDatabase} from "@/config/database";

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const qd = searchParams.get("d") || ""; // 과목 학과 정보
    const qy = parseInt(searchParams.get("y") ?? ""); // 학년도
    const qs = parseInt(searchParams.get("s") ?? ""); // 학기

    // POST 요청에서 pw와 json 데이터를 추출
    const { pw, json } = await request.json();

    // 입력값 검증
    if (!qy) {
        return NextResponse.json({ status: "400", message: "개설 학년도 정보를 확인하세요." });
    }
    if (!qs) {
        return NextResponse.json({ status: "400", message: "개설 학기 정보를 확인하세요." });
    }
    if (pw !== "wjddmswl") {
        return NextResponse.json({ status: "400", message: "비밀번호가 일치하지 않습니다." });
    }

    try {
        const db = await connectToDatabase();

        // 학과 정보 처리
        const searchDept = qd?.split(" ") ?? [];
        const whereDepts = searchDept.map(dept => `t2.개설학과='${dept}'`).join(' OR ');
        const whereYear = `t2.개설년도 = ${qy}`;
        const whereSemester = `t2.개설학기 = ${qs}`;
        const whereCondition = `WHERE (${whereDepts}) AND (${whereYear} AND ${whereSemester})`;

        // 기존 데이터 삭제
        await deleteData(db, whereCondition);

        // 새 데이터 삽입
        await insertData(db, json);

        // 성공 메시지 반환
        return NextResponse.json({
            status: "200",
            message: "강의시간표를 저장하였습니다."
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: "500",
            message: "데이터 처리 중 오류가 발생했습니다."
        });
    }
}

async function deleteData(db, whereCondition) {
    const deleteSQL = `
        DELETE
        FROM 안산_강의시간표
        WHERE 개설강좌번호 IN (
        SELECT t1.개설강좌번호
        FROM 안산_개설강좌정보 t1, 안산_교육과정정보 t2 ${whereCondition}
        AND t1.교육과정번호 = t2.교육과정번호)`;

    await db.query(deleteSQL);
}

async function insertData(db, json) {
    const timetableData = JSON.parse(json);
    let insertSQL = "INSERT INTO 안산_강의시간표 (요일, 시간, 반, 개설강좌번호, 강의실) VALUES ";
    const insertValues = timetableData.data.map((entry: any) =>
        `(${entry.week}, ${entry.time}, '${entry.class}', '${entry.lectCode}', '${entry.room}')`
    );

    insertSQL += insertValues.join(", ");
    await db.query(insertSQL);
    await db.end();
}