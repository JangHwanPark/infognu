'use client';
import React, { useEffect, useState } from 'react';

interface Lecture {
    time: number;
    week: number;
    name: string;
    prof: string;
    room: string;
}

interface Timetable {
    year: string;
    semester: string;
    dept: string;
    grade: string;
    class: string;
    lect: Lecture[];
}

interface Props {
    timeTableBaseData: { timeTable: Timetable[] } | null; // 객체 구조에서 timeTable 배열 참조
    roomData: string[];
}

const TimeRowTable = ({ timeTableBaseData, roomData }: Props) => {
    const [maxTime, setMaxTime] = useState(9);
    const [baseData, setBaseData] = useState<Timetable[] | null>(null);

    useEffect(() => {
        if (timeTableBaseData && Array.isArray(timeTableBaseData.timeTable) && timeTableBaseData.timeTable.length > 0) {
            const firstLectures = timeTableBaseData.timeTable[0]?.lect;

            // lect가 존재하고 배열인 경우에만 reduce 실행
            if (firstLectures && Array.isArray(firstLectures)) {
                const maxLectTime = firstLectures.reduce((max, lecture) => Math.max(max, lecture.time), 0) || 9;
                setMaxTime(maxLectTime);
            } else {
                console.warn("lect array is missing or invalid");
            }

            setBaseData([...timeTableBaseData.timeTable]); // 불변성 유지
        } else {
            console.error("Invalid data format:", timeTableBaseData);
        }
    }, [timeTableBaseData]);

    console.log("baseData:", baseData);

    // 데이터가 아직 없을 때 로딩 처리
    if (!baseData || baseData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div id="time-table">
            {Array.from({ length: maxTime }, (_, time) => (
                <tr key={time} className={`TR${time}`}>
                    <th>{time + 1} 교시</th>
                    {baseData[0]?.lect?.map((lect, idx) => (
                        <td key={idx} className="dropzone">
                            <select>
                                <option value="강의실">강의실</option>
                                {roomData.map((room, index) => (
                                    <option key={index} value={room}>
                                        {room}
                                    </option>
                                ))}
                            </select>
                        </td>
                    ))}
                </tr>
            ))}
        </div>
    );
};

export default TimeRowTable;
