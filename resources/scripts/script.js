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