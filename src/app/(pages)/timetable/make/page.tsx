import '@/app/mktimetable.css';
import ButtonSave from "@/components/ButtonSave";

import ButtonDelete from "@/components/ButtonDelete";
import InputCheckbox from "@/components/inputCheckbox";
import React from "react";
import ButtonReturn from "@/components/ButtonReturn";
import ModalSaveTimeTable from "@/components/ModalSaveTimeTable";
import SelectWeeks from "@/components/SelectWeeks";

const Page = async () => {
    // 서버사이드에서 JSON 데이터 받아오기 (Next.js 13.0 이상)
    const res = await fetch('http://localhost:3000/data/weeks.json');

    // Next.js 13+ App Router에서는 외부 데이터를 서버 컴포넌트에서 직접 패칭 가능
    const data = await res.json();
    const weeks = data.weeks;

    const weekData = {
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

    return (
        <>
            <div id="content">
                <h1 className="deletezone" title="시간표 상에 배정된 과목을 이 영역에 끌어 놓으면 삭제할 수 있습니다.">
                    시간표 작성 도구
                </h1>
                <div id="table-header">
                    {/* Input Check Box */}
                    <div id="week-toggle" title="시간표 상에 배정된 과목을 유지한 채로 요일을 감추거나 나타낼 수 있습니다.">
                        <InputCheckbox weekData={weekData}/>
                    </div>

                    {/* Select Box */}
                    <div>
                        <SelectWeeks weeks={weeks}/>
                    </div>
                </div>
                <div id="time-table"></div>

                {/* 버튼 */}
                <div id="buttons">
                    <ButtonDelete/>
                    <ButtonReturn/>
                    <ButtonSave/>
                </div>

                <div id="lect-area"></div>
            </div>
            <footer>
                <ModalSaveTimeTable/>
            </footer>
        </>
    );
};

export default Page;
