'use client';

import React, { useState, useEffect } from 'react';

// 컴포넌트에서 사용하는 상수 및 데이터 예시
const tCode = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15'];
const room = ['강의실1', '강의실2', '온라인'];
const weekStart = 0;
const weekEnd = 6;
const weekClass = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const weekDisplayTag = [0, 1, 1, 1, 1, 1, 0];

// React 컴포넌트
const TimeTableRow = ({ baseData, time }: { baseData: any; time: number }) => {
    const [selectedRoom, setSelectedRoom] = useState<{ [key: string]: string }>({});

    // 강의실 변경 이벤트 핸들러
    const handleRoomChange = (idNo: string, value: string) => {
        setSelectedRoom((prev) => ({
            ...prev,
            [idNo]: value
        }));
    };

    return (
        <table>
            <tbody>
                <tr className={`TR${tCode[time]}`}>
                <th
                    style={{minWidth: '60px', borderRight: '1px solid #aaa'}}
                    className="deletezone"
                    title="시간표 상에 배정된 과목을 이 영역에 끌어 놓으면 삭제할 수 있습니다."
                >
                    {time + 1}교시
                </th>
                {Array.from({length: weekEnd - weekStart + 1}).map((_, w) => (
                    baseData.depts.map((dept: any, dIndex: number) =>
                        dept.grade.map((grade: any, gIndex: number) =>
                            grade.classes.map((className: string, cIndex: number) => {
                                const idNo = `${w}${dept.deptCode}${grade.year}${className}${tCode[time]}`;
                                const tdStyle: React.CSSProperties = {
                                    color: '#bbb',
                                    borderRight:
                                        dIndex === baseData.depts.length - 1 &&
                                        gIndex === dept.grade.length - 1 &&
                                        cIndex === grade.classes.length - 1
                                            ? '1px solid #aaa'
                                            : '1px dotted #ccc',
                                    display: weekDisplayTag[w] === 0 ? 'none' : undefined,
                                };

                                return (
                                    <td key={idNo} id={`C${idNo}`} style={tdStyle}
                                        className={`T${w}${tCode[time]} ${dept.deptCode} dept${dIndex + 1} ${weekClass[w]}`}>
                                        <div className="dropzone" title="화면 하단의 과목 중 배정을 원하는 과목을 선택하여 이 영역에 끌어 놓으세요."/>
                                        <select
                                            className="room"
                                            id={`R${idNo}`}
                                            title="강의실이 배정되지 않은 경우 '강의실' 또는 '온라인'을 선택한 후 진행하세요."
                                            value={selectedRoom[idNo] || '강의실'}
                                            onChange={(e) => handleRoomChange(idNo, e.target.value)}
                                        >
                                            <option value="강의실">강의실</option>
                                            {room.map((r) => (
                                                <option key={r} value={r}>
                                                    {r}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                );
                            })
                        )
                    )
                ))}
            </tr>
            </tbody>
        </table>
    );
};

export default TimeTableRow;
