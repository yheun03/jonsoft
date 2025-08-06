// 다국어 지원을 위한 스크립트
$(function() {
    // 다국어 데이터 객체와 현재 언어 변수 선언
    let i18nData = {}, currentLang = 'ko';

    /**
     * 언어를 변경하고, HTML lang 속성 및 언어 버튼 active 처리, 다국어 텍스트 갱신
     * @param {string} lang - 변경할 언어 코드 (예: 'ko', 'en', 'ja', 'vi')
     */
    const setLang = lang => {
        currentLang = lang; // 현재 언어 변경
        $('html').attr('lang', lang); // <html> 태그의 lang 속성 변경
        // 언어 버튼 active 클래스 처리
        $('.i18n li').removeClass('active')
            .filter((_, li) => $(li).find('.btn').data('lang') === lang)
            .addClass('active');
        updateI18n(); // 다국어 텍스트 갱신
    };

    /**
     * 지정한 JSON 파일에서 다국어 데이터를 비동기로 불러옴
     * @param {string} f - 파일명(확장자 제외)
     * @returns {Promise<Object>} - 불러온 다국어 데이터 객체
     */
    const loadI18nData = async f => {
        try {
            // fetch로 JSON 파일을 불러와 파싱
            return await (await fetch(`./resources/i18n/${f}.json`)).json();
        } catch (e) {
            // 에러 발생 시 콘솔에 출력하고 빈 객체 반환
            console.error(`i18n load fail: ${f}`, e);
            return {};
        }
    };

    /**
     * 객체에서 경로(path)로 값을 추출하는 함수
     * @param {Object} obj - 대상 객체
     * @param {string} path - 'a.b.c' 형태의 경로 문자열
     * @returns {*} - 추출된 값
     */
    const getVal = (obj, path) => path.split('.').reduce((o, k) => o && o[k], obj);

         /**
      * 현재 페이지의 모든 data-i18n 요소를 찾아 다국어 텍스트로 갱신
      */
     const updateI18n = () => {
         // data-i18n 텍스트 업데이트
         $('[data-i18n]').each(function() {
             // data-i18n 속성에서 파일명과 키 추출
             const [f, ...k] = $(this).attr('data-i18n').split('.');
             const key = k.join('.');
             
             // 배열 인덱스 처리 (예: "philosophy.talent.content.0")
             const keyParts = key.split('.');
             const lastPart = keyParts[keyParts.length - 1];
             const isArrayIndex = !isNaN(parseInt(lastPart));
             
             if (isArrayIndex) {
                 // 배열 인덱스가 있는 경우
                 const arrayKey = keyParts.slice(0, -1).join('.');
                 const index = parseInt(lastPart);
                 const v = getVal(i18nData[f], arrayKey);
                 
                 if (v && typeof v === 'object' && v[currentLang] && Array.isArray(v[currentLang])) {
                     if (v[currentLang][index] !== undefined) {
                         $(this).html(v[currentLang][index]);
                     }
                 }
             } else {
                 // 일반적인 경우
                 const v = getVal(i18nData[f], key);
                 if (!v) return; // 값이 없으면 패스
 
                 // 다국어 객체일 경우(언어별 값이 있는 경우)
                 if (typeof v === 'object' && v[currentLang]) {
                     // 배열이면 <li>로 변환, 아니면 그대로 출력
                     Array.isArray(v[currentLang])
                         ? $(this).html(v[currentLang].map(i => `<li>${i}</li>`).join(''))
                         : $(this).html(v[currentLang]);
                 } else if (typeof v === 'string') {
                     // 단일 문자열이면 그대로 출력
                     $(this).html(v);
                 }
             }
         });
         
         // data-common 텍스트 업데이트 (common.json 파일 사용)
         $('[data-common]').each(function() {
             const key = $(this).attr('data-common');
             
             // 배열 인덱스 처리 (예: "philosophy.talent.content.0")
             const keyParts = key.split('.');
             const lastPart = keyParts[keyParts.length - 1];
             const isArrayIndex = !isNaN(parseInt(lastPart));
             
             if (isArrayIndex) {
                 // 배열 인덱스가 있는 경우
                 const arrayKey = keyParts.slice(0, -1).join('.');
                 const index = parseInt(lastPart);
                 const v = getVal(i18nData['common'], arrayKey);
                 
                 if (v && typeof v === 'object' && v[currentLang] && Array.isArray(v[currentLang])) {
                     if (v[currentLang][index] !== undefined) {
                         $(this).html(v[currentLang][index]);
                     }
                 }
             } else {
                 // 일반적인 경우
                 const v = getVal(i18nData['common'], key);
                 if (!v) return;
 
                 if (typeof v === 'object' && v[currentLang]) {
                     Array.isArray(v[currentLang])
                         ? $(this).html(v[currentLang].map(i => `<li>${i}</li>`).join(''))
                         : $(this).html(v[currentLang]);
                 } else if (typeof v === 'string') {
                     $(this).html(v);
                 }
             }
         });
         
         // data-i18n-src 이미지 src 업데이트
         $('[data-i18n-src]').each(function() {
             const [f, ...k] = $(this).attr('data-i18n-src').split('.');
             const v = getVal(i18nData[f], k.join('.'));
             if (v && typeof v === 'object' && v[currentLang]) {
                 $(this).attr('src', v[currentLang]);
             }
         });
         
         // data-i18n-alt 이미지 alt 업데이트
         $('[data-i18n-alt]').each(function() {
             const [f, ...k] = $(this).attr('data-i18n-alt').split('.');
             const v = getVal(i18nData[f], k.join('.'));
             if (v && typeof v === 'object' && v[currentLang]) {
                 $(this).attr('alt', v[currentLang]);
             }
         });
     };

    /**
     * 현재 페이지에서 필요한 다국어 JSON 파일을 모두 불러와 i18nData에 저장
     */
    const loadPageI18nData = async () => {
        // data-i18n 속성에서 파일명만 추출하여 중복 제거
        const files = [...new Set(
            $('[data-i18n]').map((_, el) => $(el).attr('data-i18n').split('.')[0]).get()
        )];
        // 각 파일을 비동기로 불러와 i18nData에 저장
        for (const f of files) {
            if (!i18nData[f]) i18nData[f] = await loadI18nData(f);
        }
        updateI18n(); // 데이터 로드 후 텍스트 갱신
    };

    // 언어 선택 버튼 클릭 시 언어 변경 및 localStorage에 저장
    $('.i18n .btn').on('click', function() {
        const lang = $(this).data('lang');
        setLang(lang);
        localStorage.setItem('selectedLang', lang);
    });

    // 페이지 로드 시: localStorage, <html> lang, 기본값 순으로 언어 설정 후 다국어 데이터 로드
    (async () => {
        setLang(localStorage.getItem('selectedLang') || $('html').attr('lang') || 'ko');
        await loadPageI18nData();
    })();
});

/**
 * 사용법:
 * 
 * 1. HTML에서 data-i18n 속성 사용:
 *    <h2 data-i18n="index.banner.main.title">기본 텍스트</h2>
 *    <p data-i18n="index.banner.main.dscpt">기본 설명</p>
 * 
 * 2. JSON 파일 구조 (resources/i18n/index.json):
 *    {
 *      "banner": {
 *        "main": {
 *          "title": "YOUR<br/>BEST<br/>BUSINESS<br/>PARTNER",
 *          "dscpt": {
 *            "ko": "우리가 만든 소프트웨어와 서비스가<br/>고객 비즈니스 성장에 기여합니다.",
 *            "en": "The software and services we created contribute<br/>to the growth of customer business.",
 *            "ja": "私たちが作ったソフトウェアとサービスが<br/>お客様のビジネス成長に貢献します。",
 *            "vi": "Phần mềm và dịch vụ chúng tôi tạo ra đóng góp<br/>cho sự phát triển kinh doanh của khách hàng."
 *          }
 *        }
 *      }
 *    }
 * 
 * 3. 네이밍 규칙:
 *    - data-i18n="[json파일명].객체1.객체2.객체n"
 *    - 예: data-i18n="index.banner.main.title"
 *    - 예: data-i18n="about.company.dscpt"
 * 
 * 4. 다국어 지원:
 *    - 단일 언어: 값이 문자열인 경우 모든 언어에서 동일하게 표시
 *    - 다국어: 값이 객체인 경우 현재 언어에 맞는 텍스트 표시
 * 
 * 5. 공통 데이터:
 *    - common.json 파일에 공통으로 사용되는 텍스트 저장
 *    - data-i18n="common.company.name" 형태로 사용
 */