'use client';
import React from 'react';

const SelectWeeks = ({ weeks }) => {
    return (
        <select name="weeks" id="weeks">
            <option value="0">일괄적용</option>
            {weeks.map((week) => (
                <option key={week.week} value={week.week}>
                    {week.week} 주차 ({week.start_date} ~ {week.end_date})
                </option>
            ))}
        </select>
    );
};

export default SelectWeeks;