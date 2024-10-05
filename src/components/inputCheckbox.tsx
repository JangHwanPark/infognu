'use client';
import React, {useState} from 'react';

const InputCheckbox = ({weekData}) => {
    const [days, setDays] = useState(weekData);

    // onChange 핸들러: 체크박스 상태 변경 시 호출
    const handleChange = (index: number) => {
        const newDays = [...days];
        newDays[index].checked = !newDays[index].checked;
        setDays(newDays);
    };

    return (
        <>
            {weekData.days.map((day, index) => (
                <div key={day.id}>
                    <input
                        type="checkbox"
                        id={day.id}
                        value={day.value}
                        checked={day.checked}
                        onChange={() => handleChange(index)}
                    />
                    <label htmlFor={day.id}>{day.label}</label>
                </div>
            ))}
        </>
    );
};

export default InputCheckbox;