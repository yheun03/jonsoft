document.addEventListener('DOMContentLoaded', function () {
    const langFiles = {
        ko: './resources/i18n/ko.json',
        en: './resources/i18n/en.json',
        vi: './resources/i18n/vi.json',
    };

    // 저장된 언어 가져오기 (없으면 기본값 ko)
    let currentLang = localStorage.getItem('selectedLang') || 'ko';

    // 유틸: 중첩 키 값 추출 (예: "index.banner.title")
    function getNestedValue(obj, path) {
        return path.split('.').reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);
    }

    // 텍스트 및 속성 변경
    function updateText(langData) {
        document.querySelectorAll('[data-i18n], [data-i18n-alt], [data-i18n-src], [data-i18n-title], [data-i18n-placeholder]').forEach(el => {
            if (el.hasAttribute('data-i18n')) {
                const key = el.getAttribute('data-i18n');
                const value = getNestedValue(langData, key);
                if (value !== null) el.innerHTML = value;
                else console.warn(`⚠ Missing i18n key: "${key}"`);
            }

            ['alt', 'src', 'title', 'placeholder'].forEach(attr => {
                const dataAttr = `data-i18n-${attr}`;
                if (el.hasAttribute(dataAttr)) {
                    const key = el.getAttribute(dataAttr);
                    const value = getNestedValue(langData, key);
                    if (value !== null) el.setAttribute(attr, value);
                    else console.warn(`⚠ Missing i18n key: "${key}"`);
                }
            });
        });
    }

    // 언어 변경
    function setLanguage(lang) {
        if (!langFiles[lang]) {
            console.error(`❌ Language file for "${lang}" not found.`);
            return;
        }

        fetch(langFiles[lang])
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load ${lang}.json`);
                return res.json();
            })
            .then(data => {
                currentLang = lang;
                document.documentElement.setAttribute('lang', lang);
                updateText(data);
                localStorage.setItem('selectedLang', lang); // ✅ 저장

                // 버튼 active 처리
                document.querySelectorAll('.i18n li').forEach(li => li.classList.remove('active'));
                const activeLi = document.querySelector(`.i18n button[data-lang="${lang}"]`)?.parentElement;
                if (activeLi) {
                    activeLi.classList.add('active');
                    localStorage.setItem('activeLangLiIndex', [...activeLi.parentElement.children].indexOf(activeLi)); // ✅ 인덱스 저장
                }
            })
            .catch(err => {
                console.error(`❌ Error loading language file:`, err);
            });
    }

    // 언어 변경 버튼 클릭 처리
    document.querySelectorAll('.i18n button').forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });

    // 페이지 로드 시 저장된 active li 복원
    function restoreActiveLi() {
        const savedIndex = localStorage.getItem('activeLangLiIndex');
        if (savedIndex !== null) {
            document.querySelectorAll('.i18n li').forEach(li => li.classList.remove('active'));
            const liList = document.querySelectorAll('.i18n li');
            if (liList[savedIndex]) liList[savedIndex].classList.add('active');
        }
    }

    // 초기화
    restoreActiveLi();
    setLanguage(currentLang);
});