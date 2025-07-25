document.addEventListener('DOMContentLoaded', function () {
    // 언어 json 경로 설정
    const langFiles = {
        ko: './resources/i18n/ko.json',
        en: './resources/i18n/en.json',
        vi: './resources/i18n/vi.json',
    };

    // 기본 언어
    let currentLang = 'ko';

    // 텍스트 변경 함수
    function updateText(langData) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (langData[key]) {
                el.innerHTML = langData[key];
            } else {
                console.warn(`Missing i18n key: "${key}" in ${currentLang}.json`);
                // fallback: 기존 텍스트 유지 or key로 표시 (선택사항)
                // el.innerHTML = key;
            }
        });
    }

    // 언어 변경 함수
    function setLanguage(lang) {
        if (!langFiles[lang]) {
            console.error(`Language file for "${lang}" not found.`);
            return;
        }

        fetch(langFiles[lang])
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load ${lang} JSON`);
                return res.json();
            })
            .then(data => {
                currentLang = lang;
                document.documentElement.setAttribute('lang', lang); // <html lang="xx"> 설정
                updateText(data);
            })
            .catch(err => {
                console.error(`Error loading language file:`, err);
            });
    }

    // 버튼 이벤트 바인딩 + active 클래스 처리
    document.querySelectorAll('.i18n button').forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            setLanguage(selectedLang);

            // .active 관리
            document.querySelectorAll('.i18n li').forEach(li => li.classList.remove('active'));
            btn.parentElement.classList.add('active');
        });
    });

    // 초기 언어 세팅
    setLanguage(currentLang);
});