import React from 'react';
import Link from "next/link";

const Navigation = () => {
    return (
        <div className="m-10">
            <div className="flex justify-between font-bold">
                <Link href="/">메인페이지</Link>
                <Link href="/auth/admin">관리자 로그인</Link>
                <Link href="/timetable">시간표</Link>
                <Link href="/timetable/make">시간표 설정</Link>
                <Link href="/test">테스트 페이지</Link>
            </div>
        </div>
    );
};

export default Navigation;