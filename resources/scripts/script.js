document.addEventListener('DOMContentLoaded', function () {
    function loadI18n(lang = 'ko') {
        fetch(`./resources/i18n/${lang}.json`)
            .then(res => res.json())
            .then(dict => {
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (dict[key]) {
                        el.innerHTML = dict[key];
                    }
                });
            })
            .catch(err => console.error('i18n load error:', err));
    }

    document.querySelectorAll('input[name="lang"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            loadI18n(e.target.value);
        });
    });

    const selected = document.querySelector('input[name="lang"]:checked');
    if (selected) loadI18n(selected.value);
});