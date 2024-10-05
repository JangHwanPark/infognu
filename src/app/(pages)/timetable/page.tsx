
import {useEffect, useState} from 'react';
import TimeTable from "@/app/(pages)/timetable/TimeTable";


export default function Timetable() {
    const data = fetch('/api/timetable');


    return (
        <div>
            <TimeTable/>
        </div>
    );
}
