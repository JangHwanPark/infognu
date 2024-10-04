import { connectToDatabase } from '@/lib/database';
import { ResultSetHeader } from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { m: mode } = req.query;
    const { json } = req.body;

    const data = JSON.parse(json || '{}');
    const curr = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const connection = await connectToDatabase();

    try {
        if (mode === 'c') {
            return await createSubject(data, curr, res, connection);
        } else if (mode === 'u') {
            return await updateSubject(data, res, connection);
        } else if (mode === 'd') {
            return await deleteSubject(data, res, connection);
        } else {
            return res.status(400).json({ error: 1, message: 'Invalid mode' });
        }
    } catch (error: unknown) {
        handleError(error, res);
    } finally {
        await connection.end();
    }
}

async function createSubject(data: any, curr: string, res: NextApiResponse, connection: any) {
    const { 과목명, ...otherData } = data;
    const query = 'INSERT INTO 안산_과목기본정보 SET ?';

    // 타입 인자를 제거하고, as 키워드로 타입을 명시적으로 캐스팅
    const [result] = await connection.query(query, { ...otherData, curr }) as [ResultSetHeader];
    return res.status(200).json({
        error: 0,
        message: `${과목명} 과목을 추가하였습니다.`,
        id: result.insertId,
    });
}

async function updateSubject(data: any, res: NextApiResponse, connection: any) {
    const { 과목번호, 과목명, ...otherData } = data;
    const query = 'UPDATE 안산_과목기본정보 SET ? WHERE 과목번호 = ?';

    // 타입 인자를 제거하고, as 키워드로 타입을 명시적으로 캐스팅
    const [result] = await connection.query(query, [otherData, 과목번호]) as [ResultSetHeader];
    if (result.affectedRows > 0) {
        return res.status(200).json({
            error: 0,
            message: `${과목명} 과목을 수정하였습니다.`,
        });
    }
    return res.status(400).json({
        error: 1,
        message: `${과목명} 과목을 수정할 수 없습니다.`,
    });
}

async function deleteSubject(data: any, res: NextApiResponse, connection: any) {
    const { 과목번호, 과목명 } = data;
    const query = 'DELETE FROM 안산_과목기본정보 WHERE 과목번호 = ?';

    // 타입 인자를 제거하고, as 키워드로 타입을 명시적으로 캐스팅
    const [result] = await connection.query(query, [과목번호]) as [ResultSetHeader];
    if (result.affectedRows > 0) {
        return res.status(200).json({
            error: 0,
            message: `${과목명} 과목을 삭제하였습니다.`,
            id: 과목번호,
        });
    }
    return res.status(400).json({
        error: 1,
        message: `${과목명} 과목을 삭제할 수 없습니다.`,
    });
}

function handleError(error: unknown, res: NextApiResponse) {
    if (error instanceof Error) {
        return res.status(500).json({ error: 1, message: error.message });
    }
    return res.status(500).json({ error: 1, message: 'Unknown error occurred' });
}
