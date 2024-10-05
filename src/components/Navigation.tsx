import React from 'react';
import Link from "next/link";

const Navigation = () => {
    return (
        <div className="my-5">
            <h3 className="text-center text-2xl my-5 font-bold">네비게이션 메뉴</h3>
            <div className="flex justify-between">
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