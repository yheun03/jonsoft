document.addEventListener('DOMContentLoaded', () => {
    const langFiles = {
        ko: './resources/i18n/ko.json',
        en: './resources/i18n/en.json',
        ja: './resources/i18n/ja.json',
        vi: './resources/i18n/vi.json',
    };

    const attrMap = {
        innerHTML: 'data-i18n',
        alt: 'data-i18n-alt',
        src: 'data-i18n-src',
        title: 'data-i18n-title',
        placeholder: 'data-i18n-placeholder',
    };

    const getNestedValue = (obj, path) =>
        path.split('.').reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);

    const updateText = (langData) => {
        Object.entries(attrMap).forEach(([attr, dataAttr]) => {
            document.querySelectorAll(`[${dataAttr}]`).forEach(el => {
                const key = el.getAttribute(dataAttr);
                const val = getNestedValue(langData, key);
                if (val !== null) {
                    if (attr === 'innerHTML') el.innerHTML = val;
                    else el.setAttribute(attr, val);
                }
            });
        });
    };

    const updateActiveButton = (lang) => {
        document.querySelectorAll('.i18n li').forEach(li => {
            const btn = li.querySelector('button');
            li.classList.toggle('active', btn?.getAttribute('data-lang') === lang);
        });
    };

    const setLanguage = (lang) => {
        const url = langFiles[lang];
        if (!url) return console.error(`❌ No language file for "${lang}"`);

        fetch(url)
            .then(res => res.json())
            .then(data => {
                document.documentElement.setAttribute('lang', lang);
                localStorage.setItem('lang', lang);
                updateText(data);
                updateActiveButton(lang);
            })
            .catch(err => console.error(`❌ Failed to load ${lang}.json`, err));
    };

    // 버튼 클릭 이벤트
    document.querySelectorAll('.i18n button').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // 초기 언어 적용
    const savedLang = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ko';
    setLanguage(savedLang);
});