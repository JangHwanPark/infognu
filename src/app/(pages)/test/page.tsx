'use client'
import { useState, useEffect } from "react";

// 서버 컴포넌트로 데이터 패칭
const getLectureData = async () => {
    const res = await fetch("http://localhost:3000/data/time.json");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};

export default function TimetablePage() {
    const [baseData, setBaseData] = useState(null);
    const [weekDisplayTag, setWeekDisplayTag] = useState([0, 1, 1, 1, 1, 1, 0]);
    const [roomData, setRoomData] = useState([]);
    const [maxTime, setMaxTime] = useState(9);

    useEffect(() => {
        // 데이터 로드
        getLectureData()
            .then((data) => {
                setBaseData(data);
                setRoomData(data.rooms || []);
                setMaxTime(Math.max(maxTime, Number(data.timeMeta.maxTime)));
                initializeTable(data);
            })
            .catch((error) => {
                console.error("Error fetching lecture data:", error);
            });
    }, []);

    const initializeTable = (data) => {
        if (data && data.timeMeta) {
            // 데이터 초기화 및 렌더링 로직 추가
        }
    };

    const handleWeekToggle = (weekIdx) => {
        const updatedWeekTag = [...weekDisplayTag];
        updatedWeekTag[weekIdx] = !weekDisplayTag[weekIdx];
        setWeekDisplayTag(updatedWeekTag);
    };

    const saveTimeTable = () => {
        // 시간표 저장 로직
    };

    if (!baseData) {
        return <div>Loading...</div>;
    }

    return (
        <div id="content">
            <h1 className="deletezone" title="Drag and drop subjects here to delete.">
                시간표 작성 도구
            </h1>
            <div id="table-header">
                <div id="week-toggle">
                    {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={`check${day}`}
                                value={index}
                                checked={weekDisplayTag[index] === 1}
                                onChange={() => handleWeekToggle(index)}
                            />
                            <label htmlFor={`check${day}`}>{day}</label>
                        </div>
                    ))}
                </div>
                <div>
                    <select name="weeks" id="weeks">
                        {[...Array(15).keys()].map((week) => (
                            <option key={week} value={week}>
                                {week === 0 ? "일괄적용" : `${week} 주차`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div id="time-table">
                {/* 시간표 테이블 렌더링 */}
                {Array.from({ length: maxTime }, (_, time) => (
                    <TimeRow key={time} time={time} baseData={baseData} roomData={roomData} />
                ))}
            </div>

            <div id="buttons">
                <button onClick={() => initializeTable(baseData)}>모두삭제</button>
                <button onClick={() => window.location.reload()}>되돌리기</button>
                <button onClick={saveTimeTable}>저장</button>
            </div>

            <LectureList baseData={baseData} />
        </div>
    );
}

// 시간표 테이블 행 렌더링 컴포넌트
const TimeRow = ({ time, baseData, roomData }) => {
    return (
        <tr className={`TR${time}`}>
            <th>{time + 1} 교시</th>
            {baseData.depts.map((dept) =>
                dept.grade.map((grade) =>
                    grade.classes.map((className) => (
                        <td key={className} className="dropzone">
                            <select>
                                <option value="강의실">강의실</option>
                                {roomData.map((room, index) => (
                                    <option key={index} value={room}>
                                        {room}
                                    </option>
                                ))}
                            </select>
                        </td>
                    ))
                )
            )}
        </tr>
    );
};

// 강의 목록 컴포넌트
const LectureList = ({ baseData }) => {
    return (
        <div id="lect-area">
            {baseData.depts.map((dept) => (
                <div key={dept.deptCode}>
                    <h2>{dept.deptName}</h2>
                    <div>
                        {dept.grade.map((grade) =>
                            grade.lects.map((lect) => (
                                <div key={lect.code} className="lect">
                                    {lect.title} [{lect.profName}]
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
