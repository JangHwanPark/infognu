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
    // 더미데이터 추가
    const [timetableData, setTimetableData] = useState<Timetable[]>([{
        year: "2024",
        semester: "1",
        dept: "컴퓨터공학과",
        grade: "3",
        class: "A",
        lect: [
            {
                time: 1,
                week: 1, // 월요일
                name: "자료구조",
                prof: "김교수",
                room: "101호",
                desc: "자료구조 개념 학습"
            },
            {
                time: 2,
                week: 2, // 화요일
                name: "운영체제",
                prof: "박교수",
                room: "202호",
                desc: "운영체제의 원리"
            },
            {
                time: 3,
                week: 3, // 수요일
                name: "알고리즘",
                prof: "이교수",
                room: "303호",
                desc: "알고리즘 설계 및 분석"
            },
            {
                time: 4,
                week: 4, // 목요일
                name: "네트워크",
                prof: "최교수",
                room: "404호",
                desc: "네트워크 기초"
            },
            {
                time: 5,
                week: 5, // 금요일
                name: "데이터베이스",
                prof: "정교수",
                room: "505호",
                desc: "데이터베이스 설계"
            }
        ]
    }]);

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