
import {useEffect, useState} from 'react';
import TimeTable from "@/app/(pages)/timetable/TimeTable";


export default function Timetable() {
    const baseUrl = typeof window === 'undefined'
        ? 'http://localhost:3000'  // 서버 측에서는 절대 경로 필요
        : '';  // 클라이언트 측에서는 상대 경로 사용
    const data = fetch(`${baseUrl}/api/timetable`);
    console.log(data)

    return (
        <div>
            <TimeTable/>
        </div>
    );
}
