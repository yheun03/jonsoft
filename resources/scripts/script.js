document.addEventListener('DOMContentLoaded', () => {
    const historyJsonUrl = './resources/i18n/history.json';
    const timelineUl = document.querySelector('.history-timeline');
    if (!timelineUl) return;

    function pickLang(val, lang) {
        if (Array.isArray(val)) return val.map(v => pickLang(v, lang));
        if (val && typeof val === 'object') {
            if (val.ko || val.en || val.vi || val.ja) {
                return val[lang] ?? val['ko'] ?? Object.values(val)[0] ?? '';
            }
            return Object.values(val).flatMap(v => pickLang(v, lang));
        }
        return val;
    }

    function normalizeHistory(data, lang) {
        const result = {};
        const history = data.history;
        Object.keys(history).forEach(year => {
            Object.keys(history[year]).forEach(month => {
                let monthData = history[year][month];
                // 일자까지 있으면 평탄화
                if (
                    typeof monthData === 'object' && !Array.isArray(monthData)
                    && Object.keys(monthData).every(d => /^\d{2}$/.test(d))
                ) {
                    Object.keys(monthData).forEach(day => {
                        const txts = pickLang(monthData[day], lang);
                        if (!result[year]) result[year] = {};
                        if (!result[year][month]) result[year][month] = [];
                        (Array.isArray(txts) ? txts : [txts]).filter(Boolean).forEach(txt => {
                            result[year][month].push(txt);
                        });
                    });
                } else {
                    // 월 단위
                    const txts = pickLang(monthData, lang);
                    if (!result[year]) result[year] = {};
                    if (!result[year][month]) result[year][month] = [];
                    (Array.isArray(txts) ? txts : [txts]).filter(Boolean).forEach(txt => {
                        result[year][month].push(txt);
                    });
                }
            });
        });
        return result;
    }

    function renderHistory(lang, data) {
        const normalized = normalizeHistory(data, lang);
        const years = Object.keys(normalized).sort((a, b) => b - a);
        let html = '';
        years.forEach(year => {
            html += `<li><strong>${year}</strong><ul>`;
            const months = Object.keys(normalized[year]).sort((a, b) => b - a);
            months.forEach(month => {
                const items = normalized[year][month];
                if (!items.length) return;
                html += `<li class="month">
                    <span class="month-label">${year}.${month.padStart(2, '0')}</span>
                    <ul>
                        ${items.map(txt => `<li class="item">${txt}</li>`).join('')}
                    </ul>
                </li>`;
            });
            html += `</ul></li>`;
        });
        timelineUl.innerHTML = html;
    }

    let historyDataCache = null;
    // **draw는 매번 언어(lang) 넘겨서 실행 가능해야 함**
    async function draw(lang) {
        // lang: ko, en 등
        if (historyDataCache) {
            renderHistory(lang, historyDataCache);
        } else {
            try {
                const data = await fetch(historyJsonUrl).then(res => res.json());
                historyDataCache = data;
                renderHistory(lang, data);
            } catch (e) {
                timelineUl.innerHTML = '<li>연혁 데이터를 불러올 수 없습니다.</li>';
            }
        }
    }

    // ✅ i18n.js와 완벽 연동! (이게 핵심!)
    if (window.addLangChangeListener) {
        window.addLangChangeListener(draw);
    }

    // 최초 로딩 시, 언어 동기화해서 출력
    draw(window.getCurrentLang ? window.getCurrentLang() : (document.documentElement.lang || 'ko'));
});


// document.addEventListener('DOMContentLoaded', () => {
//     const langFiles = {
//         ko: './resources/i18n/ko.json',
//         en: './resources/i18n/en.json',
//         ja: './resources/i18n/ja.json',
//         vi: './resources/i18n/vi.json',
//     };

//     const attrMap = {
//         innerHTML: 'data-i18n',
//         alt: 'data-i18n-alt',
//         src: 'data-i18n-src',
//         title: 'data-i18n-title',
//         placeholder: 'data-i18n-placeholder',
//     };

//     const getNestedValue = (obj, path) =>
//         path.split('.').reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);

//     const updateText = (langData) => {
//         Object.entries(attrMap).forEach(([attr, dataAttr]) => {
//             document.querySelectorAll(`[${dataAttr}]`).forEach(el => {
//                 const key = el.getAttribute(dataAttr);
//                 const val = getNestedValue(langData, key);
//                 if (val !== null) {
//                     if (attr === 'innerHTML') el.innerHTML = val;
//                     else el.setAttribute(attr, val);
//                 }
//             });
//         });
//     };

//     const updateActiveButton = (lang) => {
//         document.querySelectorAll('.i18n li').forEach(li => {
//             const btn = li.querySelector('button');
//             li.classList.toggle('active', btn?.getAttribute('data-lang') === lang);
//         });
//     };

//     const setLanguage = (lang) => {
//         const url = langFiles[lang];
//         if (!url) return console.error(`❌ No language file for "${lang}"`);

//         fetch(url)
//             .then(res => res.json())
//             .then(data => {
//                 document.documentElement.setAttribute('lang', lang);
//                 localStorage.setItem('lang', lang);
//                 updateText(data);
//                 updateActiveButton(lang);
//             })
//             .catch(err => console.error(`❌ Failed to load ${lang}.json`, err));
//     };

//     // 버튼 클릭 이벤트
//     document.querySelectorAll('.i18n button').forEach(btn => {
//         btn.addEventListener('click', () => {
//             const lang = btn.getAttribute('data-lang');
//             setLanguage(lang);
//         });
//     });

//     // 초기 언어 적용
//     const savedLang = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ko';
//     setLanguage(savedLang);
// });
