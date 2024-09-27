import '@/app/mktimetable.css';

const Page = async () => {
    // 서버사이드에서 JSON 데이터 받아오기 (Next.js 13.0 이상)
    const res = await fetch('http://localhost:3000/data/weeks.json');

    // Next.js 13+ App Router에서는 외부 데이터를 서버 컴포넌트에서 직접 패칭 가능
    const data = await res.json();
    const weeks = data.weeks;

    return (
        <>
            <div id="content">
                <h1 className="deletezone" title="시간표 상에 배정된 과목을 이 영역에 끌어 놓으면 삭제할 수 있습니다.">시간표 작성 도구</h1>
                <div id="table-header">
                    <div id="week-toggle" title="시간표 상에 배정된 과목을 유지한 채로 요일을 감추거나 나타낼 수 있습니다.">
                        <input type="checkbox" id="checkSun" value="0"/><label htmlFor="checkSun">일</label>
                        <input type="checkbox" id="checkMon" value="1" checked/><label htmlFor="checkMon">월</label>
                        <input type="checkbox" id="checkTue" value="2" checked/><label htmlFor="checkTue">화</label>
                        <input type="checkbox" id="checkWed" value="3" checked/><label htmlFor="checkWed">수</label>
                        <input type="checkbox" id="checkThu" value="4" checked/><label htmlFor="checkThu">목</label>
                        <input type="checkbox" id="checkFri" value="5" checked/><label htmlFor="checkFri">금</label>
                        <input type="checkbox" id="checkSat" value="6"/><label htmlFor="checkSat">토</label>
                    </div>
                    <div>
                        <select name="weeks" id="weeks">
                            <option value="0">일괄적용</option>
                            {weeks.map((week) => (
                                <option key={week.week} value={week.week}>
                                    {week.week} 주차 ({week.start_date} ~ {week.end_date})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div id="time-table"></div>
                <div id="buttons">
                    <button id="init" title="시간표 상에 배정된 모든 강의를 삭제합니다.">모두삭제</button>
                    <button id="reset" title="시간표를 마지막 저장된 상태로 되돌립니다.">되돌리기</button>
                    <button id="save" title="현재 구성된 시간표 내용을 저장합니다.">저장</button>
                </div>
                <div id="lect-area"></div>
            </div>
            <footer>
                <div id="modal">
                    <div id="save-password">
                        <div>시간표를 저장하려면 설정된 비밀번호를 입력하세요.</div>
                        <div>
                            <input type="password" id="passwd" />
                            <input type="text" id="null-field" style={{ width: 0, height: 0, margin: 0, padding: 0, border: 0 }} />
                            <button id="save-cancel">취소</button>
                            <button id="save-confirm">저장</button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Page;
