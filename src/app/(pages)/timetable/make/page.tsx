import React from "react";
import ButtonSave from "@/components/ButtonSave";
import ButtonDelete from "@/components/ButtonDelete";
import InputCheckbox from "@/components/inputCheckbox";
import ButtonReturn from "@/components/ButtonReturn";
import ModalSaveTimeTable from "@/components/ModalSaveTimeTable";
import SelectWeeks from "@/components/SelectWeeks";
import TimeRowTable from "@/app/(pages)/timetable/TimeRowTable";

const weekDataObj = {
    days: [
        { id: "checkSun", label: "일", value: 0, checked: false },
        { id: "checkMon", label: "월", value: 1, checked: true },
        { id: "checkTue", label: "화", value: 2, checked: true },
        { id: "checkWed", label: "수", value: 3, checked: true },
        { id: "checkThu", label: "목", value: 4, checked: true },
        { id: "checkFri", label: "금", value: 5, checked: true },
        { id: "checkSat", label: "토", value: 6, checked: false }
    ]
};

const Page = async () => {
    // 서버사이드에서 JSON 데이터 받아오기 (Next.js 13.0 이상)
    const res = await fetch('http://localhost:3000/data/weeks.json');
    const timeTableRes = await fetch("http://localhost:3000/data/time.json");

    if (!res.ok || !timeTableRes.ok) {
        throw new Error('Failed to fetch data');
    }

    // JSON 데이터 파싱
    // Next.js 13+ App Router에서는 외부 데이터를 서버 컴포넌트에서 직접 패칭 가능
    const weekData = await res.json();
    const timeTableData = await timeTableRes.json();
    console.log(weekData)

    return (
        <div className="mx-52">
            <div id="content">
                <h1
                    className="text-center text-2xl font-bold"
                    title="시간표 상에 배정된 과목을 이 영역에 끌어 놓으면 삭제할 수 있습니다.">
                    시간표 작성 도구
                </h1>
                <div id="table-header">
                    {/* Input Check Box */}
                    <div
                        id="week-toggle"
                        className="flex justify-center space-x-4 mt-4 mb-8"
                        title="시간표 상에 배정된 과목을 유지한 채로 요일을 감추거나 나타낼 수 있습니다.">
                        <InputCheckbox weekData={weekDataObj}/>
                    </div>

                    {/* Select Box */}
                    <div className="text-center">
                        <SelectWeeks weeks={weekData.weeks}/>
                    </div>
                </div>

                {/* 시간표 */}
                <div id="time-table">
                    <TimeRowTable
                        timeTableBaseData={timeTableData}
                        roomData={timeTableData[0]?.lect.map(lect => lect.room)}
                    />
                </div>

                {/* 버튼 */}
                <div className="w-1/2 mx-auto">
                    <div id="buttons" className="flex justify-between">
                        <ButtonDelete/>
                        <ButtonReturn/>
                        <ButtonSave/>
                    </div>
                </div>

                <div id="lect-area"></div>
            </div>
            {/*<footer>
                <ModalSaveTimeTable/>
            </footer>*/}
        </div>
    );
};

export default Page;
