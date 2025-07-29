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