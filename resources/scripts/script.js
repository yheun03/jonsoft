$(document).ready(function() {
    // 헤더의 open-menu 버튼 클릭 이벤트
    $('.btn.open-menu').on('click', function() {
        $('header').toggleClass('open');
    });
        
    // ESC 키로 메뉴 닫기
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) { // ESC 키
            $('header').removeClass('open');
        }
    });
}); 