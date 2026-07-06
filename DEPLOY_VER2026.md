# ver.2026 배포 가이드 (후이즈 호스팅 + FileZilla)

이 프로젝트는 현재 `app.baseURL = /ver.2026/` 기준으로 동작하도록 설정되어 있습니다.
// ⚠️ main 브런치에 머지되기 전까지는 app.baseURL을 /ver.2026/로 세팅하여 개발 및 배포합니다.
// (배포 후 main 병합 시 app.baseURL 값을 반드시 기본값('/')로 변경 필요)

## 1) 로컬에서 정적 산출물 만들기

```bash
npm run generate:ver2026
```

생성 결과물은 `.output/public` 입니다.

## 2) FileZilla 접속

- **프로토콜**: _SFTP_ 권장
- **호스트**: `후이즈 관리자 화면의 호스트 IP 정보 사용`
- **포트**: `22`
- **아이디/비밀번호**: 후이즈 관리자 화면의 FTP 계정 정보 사용

## 3) 서버 업로드 경로

기존 사이트 `index.html`이 있는 웹 루트(예: `public_html` 또는 `www`) 아래에
`ver.2026` 폴더를 만들고 배포합니다.

예시:

```text
웹루트/
  ├─ index.html      (기존 운영본)
  └─ ver.2026/
      ├─ index.html
      ├─ _nuxt/
      ├─ assets/
      ├─ robots.txt
      └─ sitemap.xml
```

중요: `.output/public` **폴더 자체를 올리지 말고 내부 파일/폴더를** `ver.2026`에 올려야 합니다.

## 4) 접속 확인

- 메인: `https://도메인/ver.2026/`
- 로봇: `https://도메인/ver.2026/robots.txt`
- 사이트맵: `https://도메인/ver.2026/sitemap.xml`

## 5) 자주 하는 실수

- `app.baseURL` 없이 서브폴더 배포 → CSS/JS 404
- `.output/public` 통째 업로드 → `ver.2026/public/index.html`가 되어 경로 꼬임
- 이전 캐시 때문에 화면 깨짐 → 브라우저 강력 새로고침(Ctrl+F5)
