import React from 'react';

// 강의 목록 컴포넌트
const LectureList = ({ baseData }) => {
    return (
        <div id="lect-area">
            {baseData.depts.map((dept) => (
                <div key={dept.deptCode}>
                    <h2>{dept.deptName}</h2>
                    <div>
                        {dept.grade.map((grade) =>
                            grade.lects.map((lect) => (
                                <div key={lect.code} className="lect">
                                    {lect.title} [{lect.profName}]
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LectureList;