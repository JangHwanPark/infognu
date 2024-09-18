import React from 'react';
import Link from "next/link";

const AuthManager = () => {
    return (
        <div className="login-container">
            <h2>관리자 로그인</h2>
            <form action="?m=au&a=i" method="post">
                <label form="아이디">아이디:</label>
                <input type="text" id="id" name="id" required/>
                <label form="암호">암호:</label>
                <input type="password" id="password" name="password" required/>
                <input type="submit" value="로그인"/>
            </form>
            <div className="form-footer">
                <p>계정이 없으신가요?
                    <Link href="#">회원가입</Link>
                </p>
            </div>
        </div>
    );
};

export default AuthManager;