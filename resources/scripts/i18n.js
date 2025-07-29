// === i18n.js ===
document.addEventListener('DOMContentLoaded', () => {
    // 언어/페이지 자동 추출
    const lang = localStorage.getItem('lang') || document.documentElement.lang || 'ko';
    const page = location.pathname.match(/\/([a-zA-Z0-9_-]+)\.html$/)?.[1] || 'main';
    const langFiles = {
        common: './resources/i18n/common.json',
        page: `./resources/i18n/${page}.json`,
    };
    const attrMap = {
        innerHTML: 'data-i18n',
        alt: 'data-i18n-alt',
        src: 'data-i18n-src',
        title: 'data-i18n-title',
        placeholder: 'data-i18n-placeholder',
    };
    const getNestedValue = (obj, path) =>
        path.split('.').reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);

    // {ko: "...", en: "..."} -> 현재언어값, 없으면 ko, 그래도 없으면 아무 값
    function pickLang(obj, lang) {
        if (obj && typeof obj === 'object' && (obj.ko || obj.en || obj.vi || obj.ja)) {
            return obj[lang] ?? obj['ko'] ?? Object.values(obj)[0];
        }
        if (obj && typeof obj === 'object') {
            if (Array.isArray(obj)) return obj.map(item => pickLang(item, lang));
            let result = {};
            for (let k in obj) result[k] = pickLang(obj[k], lang);
            return result;
        }
        return obj;
    }
    function deepMerge(base, override) {
        const result = {...base};
        for (const key in override) {
            if (
                typeof base[key] === 'object' &&
                typeof override[key] === 'object' &&
                !Array.isArray(base[key]) &&
                !Array.isArray(override[key])
            ) {
                result[key] = deepMerge(base[key], override[key]);
            } else {
                result[key] = override[key];
            }
        }
        return result;
    }
    function updateI18n(langData) {
        Object.entries(attrMap).forEach(([attr, dataAttr]) => {
            document.querySelectorAll(`[${dataAttr}]`).forEach(el => {
                const key = el.getAttribute(dataAttr);
                const val = getNestedValue(langData, key);
                if (val !== undefined) {
                    if (attr === 'innerHTML') el.innerHTML = val;
                    else el.setAttribute(attr, val);
                }
            });
        });
    }
    function updateActiveButton(lang) {
        document.querySelectorAll('.i18n li').forEach(li => {
            const btn = li.querySelector('button');
            li.classList.toggle('active', btn?.getAttribute('data-lang') === lang);
        });
    }
    const langChangeListeners = [];
    window.addLangChangeListener = fn => langChangeListeners.push(fn);
    async function setLanguage(lang) {
        try {
            const [common, pageData] = await Promise.all([
                fetch(langFiles.common).then(r => r.json()),
                fetch(langFiles.page).then(r => r.json()).catch(() => ({})),
            ]);
            const base = pickLang(common, lang);
            const page = pickLang(pageData, lang);
            const merged = deepMerge(base, page);
            document.documentElement.setAttribute('lang', lang);
            localStorage.setItem('lang', lang);
            updateI18n(merged);
            updateActiveButton(lang);
            langChangeListeners.forEach(fn => fn(lang));
        } catch (e) {
            console.error('i18n lang load failed:', e);
        }
    }
    document.querySelectorAll('.i18n button').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    setLanguage(lang);
    window.setLanguage = setLanguage;
    window.getCurrentLang = () => document.documentElement.lang || 'ko';
});


// // === i18n.js: 페이지 내에서 공통 + 개별 json 병합 방식 ===

// document.addEventListener('DOMContentLoaded', () => {
//     // 언어 & 페이지 파일명 자동 추출
//     const lang = localStorage.getItem('lang') || document.documentElement.lang || 'ko';
//     const page = location.pathname.match(/\/([a-zA-Z0-9_-]+)\.html$/)?.[1] || 'main';
//     const langFiles = {
//         common: './resources/i18n/common.json',
//         page: `./resources/i18n/${page}.json`,
//     };

//     // 속성 매핑: data-i18n-alt 등
//     const attrMap = {
//         innerHTML: 'data-i18n',
//         alt: 'data-i18n-alt',
//         src: 'data-i18n-src',
//         title: 'data-i18n-title',
//         placeholder: 'data-i18n-placeholder',
//     };

//     // 중첩 객체 접근: 'foo.bar.baz'
//     const getNestedValue = (obj, path) =>
//         path.split('.').reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);

//     // 언어객체에서 현재 언어값 추출: {ko: "...", en: "..."} → "en" (없으면 ko, 그래도 없으면 그냥 값)
//     function pickLang(obj, lang) {
//         if (obj && typeof obj === 'object' && (obj.ko || obj.en || obj.vi || obj.ja)) {
//             return obj[lang] ?? obj['ko'] ?? Object.values(obj)[0];
//         }
//         if (obj && typeof obj === 'object') {
//             // 내부 전체 재귀적 변환
//             if (Array.isArray(obj)) return obj.map(item => pickLang(item, lang));
//             let result = {};
//             for (let k in obj) result[k] = pickLang(obj[k], lang);
//             return result;
//         }
//         return obj;
//     }

//     // 병합: 페이지별 json이 common.json을 override
//     function deepMerge(base, override) {
//         const result = {...base};
//         for (const key in override) {
//             if (
//                 typeof base[key] === 'object' &&
//                 typeof override[key] === 'object' &&
//                 !Array.isArray(base[key]) &&
//                 !Array.isArray(override[key])
//             ) {
//                 result[key] = deepMerge(base[key], override[key]);
//             } else {
//                 result[key] = override[key];
//             }
//         }
//         return result;
//     }

//     // i18n 적용
//     function updateI18n(langData) {
//         Object.entries(attrMap).forEach(([attr, dataAttr]) => {
//             document.querySelectorAll(`[${dataAttr}]`).forEach(el => {
//                 const key = el.getAttribute(dataAttr);
//                 const val = getNestedValue(langData, key);
//                 if (val !== undefined) {
//                     if (attr === 'innerHTML') el.innerHTML = val;
//                     else el.setAttribute(attr, val);
//                 }
//             });
//         });
//     }

//     // 버튼 활성화
//     function updateActiveButton(lang) {
//         document.querySelectorAll('.i18n li').forEach(li => {
//             const btn = li.querySelector('button');
//             li.classList.toggle('active', btn?.getAttribute('data-lang') === lang);
//         });
//     }

//     // 병합 후 적용
//     async function setLanguage(lang) {
//         try {
//             // 1. fetch common/page json
//             const [common, pageData] = await Promise.all([
//                 fetch(langFiles.common).then(r => r.json()),
//                 fetch(langFiles.page).then(r => r.json()).catch(() => ({})),
//             ]);
//             // 2. 언어값만 추출
//             const base = pickLang(common, lang);
//             const page = pickLang(pageData, lang);
//             // 3. 병합(override)
//             const merged = deepMerge(base, page);
//             // 4. 적용
//             document.documentElement.setAttribute('lang', lang);
//             localStorage.setItem('lang', lang);
//             updateI18n(merged);
//             updateActiveButton(lang);
//         } catch (e) {
//             console.error('i18n lang load failed:', e);
//         }
//     }

//     // 버튼 이벤트
//     document.querySelectorAll('.i18n button').forEach(btn => {
//         btn.addEventListener('click', () => {
//             const lang = btn.getAttribute('data-lang');
//             setLanguage(lang);
//         });
//     });

//     // 최초 진입
//     setLanguage(lang);
// });