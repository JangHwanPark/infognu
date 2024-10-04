'use client';
import React, {useState} from 'react';

const SubjectsInformation = () => {
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
        console.log('추가기능 처리 로직' + form);
    };

    return (
        <form id="input-form">
            <div className="one-line-area clearfix">
                <div><input type="text" id="form-no" placeholder="과목번호" readOnly title="과목번호는 편집할 수 없습니다."/></div>
                <div><input type="text" id="form-title" placeholder="과목명" value={form.title}
                            onChange={handleInputChange}/></div>
                <div>
                    <select id="form-category" value={form.category} onChange={handleInputChange}>
                        <option value="1">교양필수</option>
                        <option value="2">교양선택</option>
                        <option value="3">전공필수</option>
                        <option value="4">전공</option>
                    </select>
                </div>
                <div><input type="number" id="form-credit" placeholder="학점" value={form.credit}
                            onChange={handleInputChange}/></div>
                <div><input type="number" id="form-theory" placeholder="이론시수" value={form.theory}
                            onChange={handleInputChange}/></div>
                <div><input type="number" id="form-training" placeholder="실습시수" value={form.training}
                            onChange={handleInputChange}/></div>
                <div>
                    <input type="text" id="form-department" placeholder="과목등록학과" readOnly title="과목등록학과는 편집할 수 없습니다."/>
                </div>
            </div>
            <div id="form-summary-div">
                <textarea id="form-summary" placeholder="과목개요" value={form.summary}
                          onChange={handleInputChange}></textarea>
            </div>
            <div id="form-button-div">
                <button id="action-button" onClick={handleSubmit}>추가</button>
                <button id="clear-button" onClick={clearForm}>클리어</button>
            </div>
        </form>
    );
};

export default SubjectsInformation;