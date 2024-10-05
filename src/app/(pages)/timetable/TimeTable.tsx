'use client';
import React, {useState} from 'react';

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


const TimeTable = () => {
    // useState에 타입 명시
    const [timetableData, setTimetableData] = useState<Timetable[]>([]);
    const [hydrated, setHydrated] = useState(false);

    return (
        <>
            {timetableData.map((timetable, index) => (
                <div key={index}>
                    <h1>
                        {timetable.year}학년도 {timetable.semester}학기 {timetable.dept} {timetable.grade}학년 {timetable.class}반
                        강의시간표
                    </h1>
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
                                {[1, 2, 3, 4, 5].map((day) => (
                                    <td key={day}>{lect.week === day ? lect.name : ''}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    );
};

export default TimeTable;