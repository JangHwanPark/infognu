import React from 'react';

const ModalTimeTableSave = () => {
    return (
        <div id="modal">
            <div id="save-password">
                <div>시간표를 저장하려면 설정된 비밀번호를 입력하세요.</div>
                <div>
                    <input type="password" id="passwd"/>
                    <input type="text" id="null-field" style={{width: 0, height: 0, margin: 0, padding: 0, border: 0}}/>
                    <button id="save-cancel">취소</button>
                    <button id="save-confirm">저장</button>
                </div>
            </div>
        </div>
    );
};

export default ModalTimeTableSave;