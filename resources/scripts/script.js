document.addEventListener('DOMContentLoaded', function () {
    // 언어 json 경로 설정
    const langFiles = {
        ko: './resources/i18n/ko.json',
        en: './resources/i18n/en.json',
        vi: './resources/i18n/vi.json',
    };

    // 기본 언어
    let currentLang = 'ko';

    // 중첩된 키에서 값 꺼내기: 예) "index.banner-ask.title"
    function getNestedValue(obj, path) {
        return path.split('.').reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);
    }

    // 텍스트 변경 함수
    function updateText(langData) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = getNestedValue(langData, key);

            if (value !== null) {
                el.innerHTML = value;
            } else {
                console.warn(`⚠ Missing i18n key: "${key}" in ${currentLang}.json`);
                // el.innerHTML = key; // fallback 표시 옵션
            }
        });
    }

    // 언어 변경 함수
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
            })
            .catch(err => {
                console.error(`❌ Error loading language file:`, err);
            });
    }

    // 버튼 이벤트 바인딩 + active 클래스 처리
    document.querySelectorAll('.i18n button').forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            setLanguage(selectedLang);

            // .active 처리
            document.querySelectorAll('.i18n li').forEach(li => li.classList.remove('active'));
            btn.parentElement.classList.add('active');
        });
    });

    // 초기 언어 세팅
    setLanguage(currentLang);
});