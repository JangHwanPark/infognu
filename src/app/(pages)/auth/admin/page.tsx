import React from 'react';

const Page = () => {
    return (
        <div className="login-container">
            <h2>관리자 로그인</h2>
            <form action="adminLogin.php" method="post">
                <label htmlFor="아이디">아이디:</label>
                <input type="text" id="아이디" name="아이디" required/>
                <label htmlFor="암호">암호:</label>
                <input type="password" id="암호" name="암호" required/>
                <input type="submit" value="로그인"/>
            </form>
            <div className="form-footer">
                <p>계정이 없으신가요? <a href="#">회원가입</a></p>
            </div>
        </div>
    );
};

export default Page;