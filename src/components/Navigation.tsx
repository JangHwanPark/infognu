import React from 'react';
import Link from "next/link";

const Navigation = () => {
    return (
        <div>
            <h3>네비게이션 메뉴</h3>
            <Link href="/auth/admin">관리자 로그인</Link>
            <Link href="/timetable">시간표</Link>
            <Link href="/timetable/make">시간표 설정</Link>
        </div>
    );
};

export default Navigation;