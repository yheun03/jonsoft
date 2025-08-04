$(document).ready(function() {
    // 헤더의 open-menu 버튼 이벤트
    $('.btn.open-menu').on('click', function() {
        $('header').toggleClass('open');
    });
        
    // ESC 키로 메뉴 닫기
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) { // ESC 키
            $('header').removeClass('open');
        }
    });

    // ===== HISTORY 클래스 기능 =====
    // history-year 버튼 클릭 시 active 클래스 관리 및 스크롤
    $('.history .history-year ul li .btn').on('click', function() {
        // 모든 history-year li에서 active 클래스 제거
        $('.history .history-year ul li').removeClass('active');
        // 클릭한 버튼의 부모 li에 active 클래스 추가
        $(this).closest('li').addClass('active');
        
        // 해당 연혁의 content로 스크롤
        var targetIndex = $(this).closest('li').index(); // 클릭한 버튼의 부모 li 인덱스
        var targetContent = $('.history .history-content > li').eq(targetIndex);
        
        if (targetContent.length) {
            // 뷰포트 기준 top 100 위치로 스크롤
            $('html, body').animate({
                scrollTop: targetContent.offset().top - 100
            }, 200);
        }
    });

    // 3. 스크롤 시 뷰포트 기준 top 100 위치의 content에 해당하는 year li에 active 클래스 적용
    var historyScrollTimer;
    var isHistoryScrolling = false;
    
    $(window).on('scroll', function() {
        isHistoryScrolling = true;
        
        // 이전 타이머 클리어
        clearTimeout(historyScrollTimer);
        
        // 스크롤이 끝난 후 100ms 후에 체크
        historyScrollTimer = setTimeout(function() {
            isHistoryScrolling = false;
            checkHistoryActive();
        }, 100);
    });
    
    // history 스크롤 감지 함수
    function checkHistoryActive() {
        if (isHistoryScrolling) return;
        
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var viewportBottom = scrollTop + windowHeight;
        
        var mostVisibleContent = null;
        var maxVisibleArea = 0;
        
        // 각 history-content > li의 노출 영역 계산
        $('.history .history-content > li').each(function(index) {
            var elementTop = $(this).offset().top;
            var elementHeight = $(this).outerHeight();
            var elementBottom = elementTop + elementHeight;
            
            // 뷰포트와 요소의 교차 영역 계산
            var visibleTop = Math.max(scrollTop, elementTop);
            var visibleBottom = Math.min(viewportBottom, elementBottom);
            var visibleHeight = Math.max(0, visibleBottom - visibleTop);
            
            // 가장 많이 노출되는 content 찾기
            if (visibleHeight > maxVisibleArea) {
                maxVisibleArea = visibleHeight;
                mostVisibleContent = {
                    element: $(this),
                    index: index
                };
            }
        });
        
        // 가장 많이 노출되는 content에 해당하는 year에 active 클래스 적용
        if (mostVisibleContent) {
            // 모든 history-year li에서 active 클래스 제거
            $('.history .history-year ul li').removeClass('active');
            // 해당 인덱스의 history-year li에 active 클래스 추가
            $('.history .history-year ul li').eq(mostVisibleContent.index).addClass('active');
        }
    }
    
    // 페이지 로드 시 초기 active 상태 설정
    $(window).on('load', function() {
        setTimeout(function() {
            checkHistoryActive();
        }, 100);
    });

    // ===== HISTORY2 클래스 기능 =====
    // 1. 스크롤 시 뷰포트에서 가장 많이 보이는 timeline li에 active 클래스 적용
    var history2ScrollTimer;
    var isHistory2Scrolling = false;
    
    $(window).on('scroll', function() {
        isHistory2Scrolling = true;
        
        // 이전 타이머 클리어
        clearTimeout(history2ScrollTimer);
        
        // 스크롤이 끝난 후 100ms 후에 체크
        history2ScrollTimer = setTimeout(function() {
            isHistory2Scrolling = false;
            checkHistory2Active();
        }, 100);
    });
    
    // history2 스크롤 감지 함수
    function checkHistory2Active() {
        if (isHistory2Scrolling) return;
        
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var viewportBottom = scrollTop + windowHeight;
        
        var mostVisibleLi = null;
        var maxVisibleArea = 0;
        
        // 각 history2-timeline li의 노출 영역 계산
        $('.history2-timeline li').each(function() {
            var elementTop = $(this).offset().top;
            var elementHeight = $(this).outerHeight();
            var elementBottom = elementTop + elementHeight;
            
            // 뷰포트와 요소의 교차 영역 계산
            var visibleTop = Math.max(scrollTop, elementTop);
            var visibleBottom = Math.min(viewportBottom, elementBottom);
            var visibleHeight = Math.max(0, visibleBottom - visibleTop);
            
            // 가장 많이 노출되는 li 찾기
            if (visibleHeight > maxVisibleArea) {
                maxVisibleArea = visibleHeight;
                mostVisibleLi = $(this);
            }
        });
        
        // 가장 많이 노출되는 li에 active 클래스 적용
        if (mostVisibleLi) {
            // 모든 li에서 active 클래스 제거
            $('.history2-timeline li').removeClass('active');
            // 가장 많이 노출되는 li에 active 클래스 추가
            mostVisibleLi.addClass('active');
        }
    }

    // 2. 버튼 클릭 시 해당 버튼의 직계 부모 li에 active 클래스 적용 및 스크롤
    $('.history2-timeline li .btn').on('click', function() {
        // 모든 li에서 active 클래스 제거
        $('.history2-timeline li').removeClass('active');
        // 클릭한 버튼의 직계 부모 li에 active 클래스 추가
        $(this).closest('li').addClass('active');
        
        // 해당 li가 뷰포트 기준 top 100 위치에 오도록 스크롤
        var targetLi = $(this).closest('li'); // 버튼의 직계 부모 li
        $('html, body').animate({
            scrollTop: targetLi.offset().top - 100
        }, 200);
    });

    // 페이지 로드 시 history2 초기 active 상태 설정
    $(window).on('load', function() {
        setTimeout(function() {
            checkHistory2Active();
        }, 100);
    });

    // ===== 모달 기능 =====
    // data-modal-target 속성을 가진 요소 클릭 시 모달 노출
    $('[data-modal-target]').on('click', function() {
        var modalTarget = $(this).data('modal-target');
        var modalType = $(this).data('modal-type') || 'solution'; // 기본값은 solution
        
        // 해당 타입의 모달 중에서 target과 일치하는 모달 찾기
        var targetModal = $('.modal .content-' + modalType + '[data-modal-id="' + modalTarget + '"]');
        
        if (targetModal.length) {
            // 모든 모달 숨기기
            $('.modal').removeClass('active');
            // 해당 모달 노출
            targetModal.closest('.modal').addClass('active');
            // body 스크롤 방지
            $('body').addClass('modal-open');
        }
    });

    // 모달 닫기 함수
    function closeModal() {
        $('.modal').removeClass('active');
        $('body').removeClass('modal-open');
    }

    // 닫기 버튼 클릭 시 모달 닫기
    $('.modal .btn.type-round').on('click', function(e) {
        e.preventDefault();
        closeModal();
    });

    // 모달 바깥 영역 클릭 시 모달 닫기
    $('.modal').on('click', function(e) {
        if ($(e.target).hasClass('modal')) {
            closeModal();
        }
    });

    // ESC 키로 모달 닫기
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27 && $('.modal').hasClass('active')) { // ESC 키
            closeModal();
        }
    });
}); 