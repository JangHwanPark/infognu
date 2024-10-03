'use client';

import { useState } from 'react';
import './subject.css';
import Navigation from "@/components/Navigation";
import TimeTableRow from "@/components/TimeTableRow";
import EnrollmentSubjects from "@/app/api/EnrollmentSubjects";

export default function SubjectManagement() {
  const [form, setForm] = useState({
    no: '',
    title: '',
    category: '1',
    credit: '',
    theory: '',
    training: '',
    department: '1',
    summary: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id.split('form-')[1]]: value }));
  };

  const clearForm = () => {
    setForm({
      no: '',
      title: '',
      category: '1',
      credit: '',
      theory: '',
      training: '',
      department: '1',
      summary: ''
    });
  };

  const handleSubmit = () => {
    // 추가 기능 처리 로직
    console.log(form);
  };

  const someBaseData =
      {
        "depts": [
          {
            "deptCode": "CSE",
            "deptName": "Computer Science",
            "grade": [
              {
                "year": 1,
                "classes": ["A", "B"]
              },
              {
                "year": 2,
                "classes": ["A", "B", "C"]
              }
            ]
          },
          {
            "deptCode": "EEE",
            "deptName": "Electrical Engineering",
            "grade": [
              {
                "year": 1,
                "classes": ["A"]
              },
              {
                "year": 3,
                "classes": ["A", "B"]
              }
            ]
          }
        ],
        "timeMeta": {
          "maxTime": 9
        },
        "rooms": ["강의실1", "강의실2", "강의실3"]
      }
  ;

  return (
      <div id="container">
        <Navigation/>
        <header>
          <h1>과목정보관리</h1>
          <h2>과목정보</h2>
          <div id="input-form">
            <div className="one-line-area clearfix">
              <div><input type="text" id="form-no" placeholder="과목번호" readOnly title="과목번호는 편집할 수 없습니다." /></div>
              <div><input type="text" id="form-title" placeholder="과목명" value={form.title} onChange={handleInputChange} /></div>
              <div>
                <select id="form-category" value={form.category} onChange={handleInputChange}>
                  <option value="1">교양필수</option>
                  <option value="2">교양선택</option>
                  <option value="3">전공필수</option>
                  <option value="4">전공</option>
                </select>
              </div>
              <div><input type="number" id="form-credit" placeholder="학점" value={form.credit} onChange={handleInputChange} /></div>
              <div><input type="number" id="form-theory" placeholder="이론시수" value={form.theory} onChange={handleInputChange} /></div>
              <div><input type="number" id="form-training" placeholder="실습시수" value={form.training} onChange={handleInputChange} /></div>
              <div>
                <input type="text" id="form-department" placeholder="과목등록학과" readOnly title="과목등록학과는 편집할 수 없습니다." />
              </div>
            </div>
            <div id="form-summary-div">
              <textarea id="form-summary" placeholder="과목개요" value={form.summary} onChange={handleInputChange}></textarea>
            </div>
            <div id="form-button-div">
              <button id="action-button" onClick={handleSubmit}>추가</button>
              <button id="clear-button" onClick={clearForm}>클리어</button>
            </div>
          </div>
        </header>

        <EnrollmentSubjects/>
        <TimeTableRow baseData={someBaseData} time={0} />

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
      </div>
  );
}
