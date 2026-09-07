# 정적 사이트 배포 가이드

배포 명령에 따라 사이트 주소와 기본 경로가 자동으로 설정됩니다.

## 포트폴리오 GitHub Pages

```bash
npm run deploy
```

위 명령은 다음 작업을 순서대로 실행합니다.

1. 기존 `gh-pages` 로컬 캐시 정리
2. `/jonsoft/` 경로 기준으로 Nuxt 정적 사이트 생성
3. `.output/public` 산출물을 원격 `gh-pages` 브랜치에 게시

최초 배포 시 GitHub 저장소의 **Settings → Pages**에서 배포 소스를
`gh-pages` 브랜치의 `/ (root)`로 지정합니다.

배포 주소: `https://yheun03.github.io/jonsoft/`

## 후이즈 SFTP

```bash
npm run build
```

`https://jonsoft.co.kr/` 루트 경로 기준의 정적 사이트가 `.output/public`에 생성됩니다.
SFTP 업로드 시 `.output/public` 폴더 자체가 아닌 폴더 안의 파일과 디렉터리를 웹 루트에 업로드합니다.

두 명령 모두 해당 배포 주소에 맞는 `robots.txt`, `sitemap.xml`, `llms.txt`를 자동으로 생성합니다.
