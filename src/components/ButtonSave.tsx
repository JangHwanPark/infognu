'use client';
import React, {useState} from 'react';

const ButtonSave = () => {
    const [timetableData, setTimetableData] = useState(false);

    const handleSave = () => {
        // 추가 기능 처리 로직
        console.log(timetableData);
        setTimetableData(!timetableData)
    }

    return <button
        id="save"
        title="현재 구성된 시간표 내용을 저장합니다."
        onClick={handleSave}
    >저장
    </button>
};

export default ButtonSave;