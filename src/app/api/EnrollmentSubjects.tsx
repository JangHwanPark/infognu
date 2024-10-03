import React from 'react';

const EnrollmentSubjects = () => {
    return (
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
                    <div className="subject-departmentName">과목등록학과</div>
                    <div className="subject-summary">과목개요</div>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentSubjects;