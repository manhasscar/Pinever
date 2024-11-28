// 쿠키에서 특정 이름의 값을 추출하는 헬퍼 함수
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const setCookie = (token, userData) => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    // authToken과 userId를 별도의 쿠키로 설정
    document.cookie = `authToken=${token}; expires=${date.toUTCString()}; path=/`;
    document.cookie = `userId=${userData.username}; expires=${date.toUTCString()}; path=/`;
    document.cookie = `userData=${JSON.stringify(userData)}; expires=${date.toUTCString()}; path=/`;
};

export { getCookie, setCookie };
