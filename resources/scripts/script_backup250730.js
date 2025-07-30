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

    async function draw(lang) {
        // lang이 undefined면 기본값 보정
        if (!lang) lang = document.documentElement.lang || 'ko';
        try {
            const data = await fetch(historyJsonUrl).then(res => res.json());
            renderHistory(lang, data);
        } catch (e) {
            timelineUl.innerHTML = '<li>연혁 데이터를 불러올 수 없습니다.</li>';
        }
    }

    // 다국어 변경시마다 항상 draw(lang)로 호출!
    if (window.addLangChangeListener) {
        window.addLangChangeListener(draw);
    }
    draw(window.getCurrentLang ? window.getCurrentLang() : (document.documentElement.lang || 'ko'));
});


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
            // 여기서 반드시 lang을 전달!
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