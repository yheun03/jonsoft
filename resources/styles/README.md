# SCSS 믹스인 & 함수 사용법 가이드

## 📋 목차
1. [믹스인 사용법](#믹스인-사용법)
2. [함수 사용법](#함수-사용법)
3. [실제 사용 예시](#실제-사용-예시)
4. [모범 사례](#모범-사례)

---

## 🎨 믹스인 사용법

### 📐 레이아웃 믹스인

#### `@include flex-center`
```scss
// 중앙 정렬 flexbox
.element {
  @include flex-center;
}
// 결과: display: flex; justify-content: center; align-items: center;
```

#### `@include grid-layout($columns, $gap)`
```scss
// 그리드 레이아웃
.container {
  @include grid-layout(3, 20px);
}
// 결과: display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
```

### 📝 타이포그래피 믹스인

#### `@include font-style($weight, $size, $line-height, $color)`
```scss
// 폰트 스타일
.title {
  @include font-style(600, 24px, normal, #000000);
}
// 결과: font: 600 24px/normal Pretendard; color: #000000;
```

#### `@include text-ellipsis($lines)`
```scss
// 텍스트 말줄임표
.text {
  @include text-ellipsis(2);
}
// 결과: display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
```

### 🖼️ 배경 믹스인

#### `@include bg-image($path, $size, $repeat, $position)`
```scss
// 배경 이미지
.banner {
  @include bg-image('images/banner/ask.png', cover, no-repeat, center);
}
// 결과: background: url(../images/banner/ask.png) center/cover no-repeat;
```

### ⚡ 애니메이션 믹스인

#### `@include transition($properties)`
```scss
// 전환 효과
.element {
  @include transition(opacity 0.2s ease);
}
// 결과: transition: opacity 0.2s ease;
```

### 📱 반응형 믹스인

#### `@include mobile`, `@include tablet`, `@include desktop`
```scss
// 반응형 스타일
.element {
  @include mobile {
    font-size: 14px;
  }
  @include tablet {
    font-size: 16px;
  }
  @include desktop {
    font-size: 18px;
  }
}
```

---

## 🔧 함수 사용법

### 🎨 색상 함수

#### `color-lighten($color, $amount)`
```scss
// 색상 밝기 조정
.button:hover {
  background-color: color-lighten(#1E6DFE, 10%);
}
```

#### `color-darken($color, $amount)`
```scss
// 색상 어둡게 조정
.button:active {
  background-color: color-darken(#1E6DFE, 10%);
}
```

### 📏 크기 함수

#### `rem($pixels)`
```scss
// px를 rem으로 변환
.text {
  font-size: rem(16px); // 결과: 1rem
}
```

#### `em($pixels)`
```scss
// px를 em으로 변환
.text {
  font-size: em(16px); // 결과: 1em
}
```

### 🛠️ 유틸리티 함수

#### `palette($name)`
```scss
// 색상 팔레트에서 색상 가져오기
.primary {
  color: palette('primary'); // 결과: #1E6DFE
}
```

---

## 💡 실제 사용 예시

### 카드 컴포넌트
```scss
.card {
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
  @include transition(all 0.2s ease);
  
  .title {
    @include font-style(600, 24px, normal, #000000);
  }
  
  .description {
    @include font-style(400, 16px, 150%, #666666);
    @include text-ellipsis(2);
  }
  
  &:hover {
    transform: translateY(-2px);
  }
}
```

### 반응형 그리드
```scss
.grid {
  @include grid-layout(3, 20px);
  
  @include mobile {
    @include grid-layout(1, 10px);
  }
  
  @include tablet {
    @include grid-layout(2, 15px);
  }
}
```

### 배경 이미지
```scss
.banner {
  @include bg-image('images/banner/hero.png', cover, no-repeat, center);
  height: 500px;
}
```

### 폰트 스타일
```scss
.title {
  @include font-style(600, 32px, normal, #000000);
}

.subtitle {
  @include font-style(400, 18px, 150%, #666666);
}
```

---

## ✅ 모범 사례

### 1. 일관성 유지
```scss
// ✅ 좋은 예
.title {
  @include font-style(600, 24px, normal, #000000);
}

// ❌ 나쁜 예
.title {
  font: 600 24px/normal Pretendard;
  color: #000000;
}
```

### 2. 재사용성 고려
```scss
// ✅ 좋은 예
.container {
  @include grid-layout(3, 20px);
  @include transition(all 0.2s ease);
}

// ❌ 나쁜 예
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  transition: all 0.2s ease;
}
```

### 3. 반응형 디자인
```scss
// ✅ 좋은 예
.container {
  @include grid-layout(3, 20px);
  
  @include mobile {
    @include grid-layout(1, 10px);
  }
}
```

### 4. 색상 시스템 활용
```scss
// ✅ 좋은 예
.button {
  background-color: palette('primary');
  color: #ffffff;
  
  &:hover {
    background-color: color-lighten(palette('primary'), 10%);
  }
}
```

---

## 📚 추가 리소스

- [Sass 공식 문서](https://sass-lang.com/documentation)
- [CSS Grid 가이드](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## 🔄 업데이트 내역

- **v1.0.0**: 초기 믹스인 및 함수 정의
- **v1.1.0**: 자주 사용하는 믹스인과 함수만 정리
- **v1.2.0**: 페이지별 스타일 분리 및 중복 제거
- **v1.3.0**: clamp 함수 제거 (CSS 내장 함수와 충돌) 