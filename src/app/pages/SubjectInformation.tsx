import React from 'react';

const SubjectInformation = () => {
    return (
        <>
            <div id="container">
                <header>
                    <h1>과목정보관리</h1>
                    <h2>과목정보</h2>
                    <div id="input-form">
                        <div className="one-line-area clearfix">
                            <div><input type="text" id="form-no" name="" placeholder="과목번호" readOnly
                                        title="과목번호는 편집할 수 없습니다."/>
                            </div>
                            <div><input type="text" id="form-title" name="" placeholder="과목명"/></div>
                            <div><select name="" id="form-category">
                                <option value="1">교양필수</option>
                                <option value="2">교양선택</option>
                                <option value="3">전공필수</option>
                                <option value="4">전공</option>
                            </select></div>
                            <div><input type="number" id="form-credit" name="" placeholder="학점"/></div>
                            <div><input type="number" id="form-theory" name="" placeholder="이론시수"/></div>
                            <div><input type="number" id="form-training" name="" placeholder="실습시수"/></div>
                            <div><input type="text" id="form-department" name="" placeholder="과목등록학과" readOnly
                                        title="과목등록학과는 편집할 수 없습니다."/></div>
                        </div>
                        <div id="form-summary-div"><textarea name="" id="form-summary" placeholder="과목개요"></textarea>
                        </div>
                        <div id="form-button-div">
                            <button id="action-button">추가</button>
                            <button id="clear-button">클리어</button>
                        </div>
                    </div>
                </header>
                <div id="subject-list">
                    <h2>등록과목</h2>
                    <div id="subject-table">
                        <div className="list-header clearfix">
                            <div className="subject-no">과목번호</div>
                            <div className="subject-title">과목명</div>
                            <div className="subject-category">과목구분</div>
                            <div className="subject-credit">학점</div>
                            <div className="subject-theory">이론</div>
                            <div className="subject-training">실습</div>
                            <div className="subject-department">과목등록학과</div>
                            <div className="subject-summary">과목개요</div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div id="modal">
                    <div id="save-password">
                        <div>시간표를 저장하려면 설정된 비밀번호를 입력하세요.</div>
                        <div>
                            <input type="password" id="passwd"/>
                            <input type="text" id="null-field"
                                   style="width: 0; height: 0; margin: 0; padding: 0; border: 0"/>
                            <button id="save-cancel">취소</button>
                            <button id="save-confirm">저장</button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default SubjectInformation;