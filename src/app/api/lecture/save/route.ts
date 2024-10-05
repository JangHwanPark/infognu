import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';

// 강의 정보를 저장하는 API 핸들러
export async function POST(request: Request) {
    let connection: any;

    try {
        const body = await request.json();
        const { dept, year, pw, data } = body;

        // 필수 값 검증
        if (!year || !pw || !data) {
            return NextResponse.json({ status: '-1', message: '필수 값이 누락되었습니다.' }, { status: 400 });
        }

        // 비밀번호 검증
        if (pw !== 'wjddmswl') {
            return NextResponse.json({ status: '-1', message: '비밀번호가 일치하지 않습니다.' }, { status: 403 });
        }

        // 데이터베이스 연결
        const pool = await connectToDatabase();
        connection = await pool.getConnection(); // 풀에서 연결 가져오기

        // 트랜잭션 시작
        await connection.beginTransaction();

        // 강의 정보 업데이트 또는 삽입
        for (const lecture of data.lect) {
            const {
                교육과정번호,
                과목번호,
                개설학과,
                개설년도,
                개설학년,
                개설학기,
                강의개요,
            } = lecture;

            // 과목번호를 정수로 변환
            const 과목번호Int = parseInt(과목번호);

            if (isNaN(과목번호Int)) {
                return NextResponse.json({ status: '-1', message: '잘못된 과목번호 값입니다.' }, { status: 400 });
            }

            if (!교육과정번호) {
                // 강의 신규 삽입
                await connection.execute(
                    `INSERT INTO 안산_교육과정정보 (과목번호, 개설학과, 개설년도, 개설학년, 개설학기, 강의개요) VALUES (?, ?, ?, ?, ?, ?)`,
                    [과목번호Int, 개설학과, 개설년도, 개설학년, 개설학기, 강의개요]
                );
            } else {
                // 강의 업데이트
                await connection.execute(
                    `UPDATE 안산_교육과정정보 SET 과목번호 = ?, 개설학과 = ?, 개설년도 = ?, 개설학년 = ?, 개설학기 = ?, 강의개요 = ? WHERE 교육과정번호 = ?`,
                    [과목번호Int, 개설학과, 개설년도, 개설학년, 개설학기, 강의개요, 교육과정번호]
                );
            }
        }

        // 삭제된 강의 처리
        for (const deletedId of data.deleted) {
            await connection.execute(`DELETE FROM 안산_교육과정정보 WHERE 교육과정번호 = ?`, [deletedId]);
        }

        // 트랜잭션 커밋
        await connection.commit();

        return NextResponse.json({ status: '1', message: '교육과정 정보를 저장하였습니다.' });
    } catch (error) {
        console.error(error);
        // 트랜잭션 롤백
        if (connection) {
            await connection.rollback();
        }
        return NextResponse.json({ status: '-1', message: '데이터 처리 중 오류가 발생했습니다.' }, { status: 500 });
    } finally {
        if (connection) {
            connection.release(); // 연결을 풀로 반환
        }
    }
}
