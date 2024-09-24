'use client';
import {useEffect, useState} from 'react';

// 타임테이블 데이터의 타입 정의
interface Lecture {
    time: number;
    week: number;
    name: string;
    prof: string;
    room: string;
    desc: string;
}

interface Timetable {
    year: string;
    semester: string;
    dept: string;
    grade: string;
    class: string;
    lect: Lecture[];
}

export default function Timetable() {
    // useState에 타입 명시
    const [timetableData, setTimetableData] = useState<Timetable[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/timetable?d=dept_code&y=2023&s=1');
                if (!res.ok) {
                    throw new Error('데이터를 가져올 수 없습니다.');
                }
                const data = await res.json();
                setTimetableData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {timetableData.map((timetable, index) => (
                <div key={index}>
                    <h1>{timetable.year}학년도 {timetable.semester}학기 {timetable.dept} {timetable.grade}학년 {timetable.class}반
                        강의시간표</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>교시</th>
                            <th>월</th>
                            <th>화</th>
                            <th>수</th>
                            <th>목</th>
                            <th>금</th>
                        </tr>
                        </thead>
                        <tbody>
                        {timetable.lect.map((lect, idx) => (
                            <tr key={idx}>
                                <td>{lect.time}</td>
                                <td>{lect.week === 1 ? lect.name : ''}</td>
                                <td>{lect.week === 2 ? lect.name : ''}</td>
                                <td>{lect.week === 3 ? lect.name : ''}</td>
                                <td>{lect.week === 4 ? lect.name : ''}</td>
                                <td>{lect.week === 5 ? lect.name : ''}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
