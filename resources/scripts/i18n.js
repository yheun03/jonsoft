// 다국어 지원을 위한 스크립트
$(function() {
    const setLang = lang => {
        $('html').attr('lang', lang);
        $('.i18n li').removeClass('active')
            .filter((_, li) => $(li).find('.btn').data('lang') === lang)
            .addClass('active');
    };
    $('.i18n .btn').on('click', function() {
        const lang = $(this).data('lang');
        setLang(lang);
        localStorage.setItem('selectedLang', lang);
    });
    setLang(localStorage.getItem('selectedLang') || $('html').attr('lang') || 'ko');
});