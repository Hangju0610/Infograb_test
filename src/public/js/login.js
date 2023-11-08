'use strict';

// DOM -> Document Object Model

const id = document.querySelector('#id'),
  password = document.querySelector('#password'),
  loginBtn = document.querySelector('#button');

loginBtn.addEventListener('click', login);

function login() {
  // id 가 비어있을 경우 경고창 표시
  if (!id.value) return alert('아이디를 입력해주십시오.');
  // 비밀번호가 일치하지 않는 경우 경고창 표시
  if (!password.value) return alert('비밀번호를 입력해주십시오.');

  const req = {
    email: id.value,
    password: password.value,
  };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        // 성공시 / 경로로 이동
        location.href = '/';
      } else {
        // 실패시 알람 띄우기
        if (res.err) return alert(res.err);
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error('로그인 중 에러 발생');
    });
}
