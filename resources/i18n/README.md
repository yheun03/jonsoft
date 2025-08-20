# 다국어 지원 (i18n) 가이드

이 문서는 JO&SOFT 웹사이트의 다국어 지원 시스템에 대한 가이드입니다.

## 📁 파일 구조

```
resources/i18n/
├── common.json          # 공통 번역 (네비게이션, 푸터 등)
├── index.json           # 메인 페이지 번역
├── about.json           # About 페이지 번역
├── business.json        # Business 페이지 번역
├── customer.json        # Customer 페이지 번역
├── contact.json         # Contact 페이지 번역
└── history.json         # 회사 연혁 번역
```

## 🌐 지원 언어

- **한국어 (ko)**: 기본 언어
- **영어 (en)**: 영어 번역
- **베트남어 (vi)**: 베트남어 번역

## 📝 JSON 구조

각 JSON 파일은 다음과 같은 구조를 가집니다:

```json
{
    "section": {
        "key": {
            "ko": "한국어 텍스트",
            "en": "English text",
            "vi": "Văn bản tiếng Việt"
        }
    }
}
```

### 중첩 구조 예시

```json
{
    "banner": {
        "title": {
            "ko": "제목",
            "en": "Title",
            "vi": "Tiêu đề"
        },
        "description": {
            "ko": "설명",
            "en": "Description",
            "vi": "Mô tả"
        }
    }
}
```

## 🏷️ HTML 사용법

### 기본 텍스트 번역

```html
<h1 data-i18n="banner.title">제목</h1>
<p data-i18n="banner.description">설명</p>
```

### 이미지 alt 텍스트 번역

```html
<img src="image.jpg" data-i18n-alt="image.alt" alt="이미지 설명">
```

### 이미지 src 번역

```html
<img data-i18n-src="image.src" src="default.jpg" alt="이미지">
```

### 제목 속성 번역

```html
<a href="#" data-i18n-title="link.title" title="링크 제목">링크</a>
```

### 플레이스홀더 번역

```html
<input type="text" data-i18n-placeholder="form.email" placeholder="이메일">
```

## 🔧 JavaScript API

### 언어 변경

```javascript
// 언어 변경
changeLanguage('en'); // 영어로 변경
changeLanguage('vi'); // 베트남어로 변경
changeLanguage('ko'); // 한국어로 변경
```

### 현재 언어 확인

```javascript
// 현재 언어 가져오기
const currentLang = localStorage.getItem('lang') || 'ko';
```

### 언어 설정

```javascript
// 언어 설정
localStorage.setItem('lang', 'en');
```

## 📋 파일별 상세 내용

### common.json
- 네비게이션 메뉴
- 푸터 정보
- 공통 버튼 텍스트
- 회사 정보

### index.json
- 메인 배너
- 소개 텍스트
- CTA 버튼

### about.json
- 회사 소개
- 핵심 역량
- 회사 연혁
- 수상 내역

### business.json
- 솔루션 소개
- 각 솔루션별 상세 설명
- 성공 사례

### customer.json
- 고객사 목록
- 파트너사 목록
- 고객 후기
- 성공 사례

### contact.json
- 연락처 정보
- 오시는 길
- 채용 정보
- 회사 철학

### history.json
- 연도별 회사 연혁
- 프로젝트 수주 내역
- 주요 성과

## 🌍 베트남어 번역 가이드

### 번역 원칙

1. **공식적 어조**: 비즈니스 환경에 적합한 존댓말 사용
2. **기술 용어**: IT/제조업 분야 전문 용어의 표준 번역 사용
3. **문화적 적합성**: 베트남 비즈니스 문화에 맞는 표현 적용

### 주요 번역 패턴

| 한국어 | 베트남어 | 설명 |
|--------|----------|------|
| 솔루션 | Giải pháp | 기술 솔루션 |
| 시스템 | Hệ thống | IT 시스템 |
| 구축 | Xây dựng | 시스템 구축 |
| 유지보수 | Bảo trì | 시스템 유지보수 |
| 컨설팅 | Tư vấn | 비즈니스 컨설팅 |
| 프로젝트 | Dự án | IT 프로젝트 |

### 기술 용어 번역

- **MES**: Hệ thống Thực thi Sản xuất
- **CRM**: Quản lý Quan hệ Khách hàng
- **SCM**: Quản lý Chuỗi cung ứng
- **APS**: Lập kế hoạch và Lập lịch trình Nâng cao
- **FEMS**: Hệ thống Quản lý Năng lượng Nhà máy

## 🔄 업데이트 프로세스

1. **새 콘텐츠 추가**: HTML에 `data-i18n` 속성 추가
2. **JSON 파일 업데이트**: 해당 언어별 번역 추가
3. **테스트**: 각 언어별로 콘텐츠 확인
4. **배포**: 변경사항 적용

## 🐛 문제 해결

### 번역이 표시되지 않는 경우

1. `data-i18n` 속성이 올바른지 확인
2. JSON 파일에 해당 키가 있는지 확인
3. JavaScript 콘솔에서 오류 확인

### 언어 변경이 안 되는 경우

1. `localStorage` 설정 확인
2. JavaScript 파일 로드 확인
3. 브라우저 캐시 삭제

## 📞 지원

번역 관련 문의사항이 있으시면 개발팀에 연락해 주세요. 