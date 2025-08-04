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
    
    // 연혁 버튼 키보드 네비게이션
    $('.history .history-year ul li .btn').on('keydown', function(e) {
        var currentBtn = $(this);
        var currentLi = currentBtn.closest('li');
        var allButtons = $('.history .history-year ul li .btn');
        var currentIndex = allButtons.index(currentBtn);
        
        switch(e.keyCode) {
            case 37: // 왼쪽 화살표
                e.preventDefault();
                if (currentIndex > 0) {
                    allButtons.eq(currentIndex - 1).focus();
                }
                break;
            case 39: // 오른쪽 화살표
                e.preventDefault();
                if (currentIndex < allButtons.length - 1) {
                    allButtons.eq(currentIndex + 1).focus();
                }
                break;
            case 38: // 위쪽 화살표
                e.preventDefault();
                if (currentIndex > 0) {
                    allButtons.eq(currentIndex - 1).focus();
                }
                break;
            case 40: // 아래쪽 화살표
                e.preventDefault();
                if (currentIndex < allButtons.length - 1) {
                    allButtons.eq(currentIndex + 1).focus();
                }
                break;
            case 13: // Enter 키
                e.preventDefault();
                currentBtn.click();
                break;
            case 32: // Space 키
                e.preventDefault();
                currentBtn.click();
                break;
        }
    });
    

    
    // 연혁 연도 버튼 클릭 시 focus 유지
    $('.history .history-year ul li .btn').on('click', function() {
        $(this).focus();
    });
    


    // ===== HISTORY 클래스 기능 =====
    // history-year 버튼 클릭 시 active 클래스 관리 및 스크롤
    $('.history .history-year ul li .btn').on('click', function() {
        // 모든 history-year li에서 active 클래스 제거
        $('.history .history-year ul li').removeClass('active');
        // 클릭한 버튼의 부모 li에 active 클래스 추가
        $(this).closest('li').addClass('active');
        
        // 실제 키보드 focus 주기
        $(this).focus();
        
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
        
        // 스크롤 중에도 실시간 체크 (트랙패드/터치패드 대응)
        checkHistoryActive();
        
        // 스크롤이 끝난 후 200ms 후에 다시 체크 (자동 스크롤 실행)
        historyScrollTimer = setTimeout(function() {
            isHistoryScrolling = false;
            checkHistoryActive();
        }, 200);
    });
    
    // history 스크롤 감지 함수
    function checkHistoryActive() {
        // 트랙패드/터치패드 대응을 위해 실시간 체크
        
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var viewportCenter = scrollTop + (windowHeight / 2); // 뷰포트 중앙점
        
        var closestElement = null;
        var minDistance = Infinity;
        
        // 각 history-content > li와의 거리 계산
        $('.history .history-content > li').each(function(index) {
            var elementTop = $(this).offset().top;
            var elementHeight = $(this).outerHeight();
            var elementCenter = elementTop + (elementHeight / 2);
            
            // 뷰포트 중앙과 요소 중앙 사이의 거리
            var distance = Math.abs(viewportCenter - elementCenter);
            
            // 가장 가까운 요소 찾기 (트랙패드/터치패드 대응)
            if (distance < minDistance) {
                minDistance = distance;
                closestElement = {
                    element: $(this),
                    index: index
                };
            }
        });
        
        // 가장 가까운 요소에 active 클래스 적용
        if (closestElement) {
            // 모든 history-year li에서 active 클래스 제거
            $('.history .history-year ul li').removeClass('active');
            // 해당 인덱스의 history-year li에 active 클래스 추가
            $('.history .history-year ul li').eq(closestElement.index).addClass('active');
        }
    }
    
    // 페이지 로드 시 초기 active 상태 설정
    $(window).on('load', function() {
        setTimeout(function() {
            checkHistoryActive();
        }, 100);
    });

    // ===== 모달 기능 =====
    // 모달 이벤트 핸들러는 아래 slick 슬라이더 방지 코드에서 처리됨

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

    // ===== Slick 슬라이더에서 모달 열림 방지 =====
    var isSlickDragging = false;
    var dragStartX = 0;
    var dragDistance = 0;
    
    $(document).on('init.slick', '.slick-slider', function() {
        var $slider = $(this);
        
        // 드래그 시작 감지
        $slider.on('mousedown touchstart', function(e) {
            dragStartX = e.type === 'mousedown' ? e.clientX : e.originalEvent.touches[0].clientX;
            dragDistance = 0;
        });
        
        // 드래그 중 거리 계산
        $slider.on('mousemove touchmove', function(e) {
            if (dragStartX > 0) {
                var currentX = e.type === 'mousemove' ? e.clientX : e.originalEvent.touches[0].clientX;
                dragDistance = Math.abs(currentX - dragStartX);
            }
        });
        
        // 드래그 종료 시 해당 위치의 슬라이드로 이동
        $slider.on('mouseup touchend', function(e) {
            if (dragDistance > 30) {
                var endX = e.type === 'mouseup' ? e.clientX : e.originalEvent.changedTouches[0].clientX;
                var currentSlide = $slider.slick('slickCurrentSlide');
                var totalSlides = $slider.slick('getSlick').slideCount;
                
                // 슬라이드 너비를 고려한 계산
                var slideWidth = $slider.find('.slick-slide').first().outerWidth();
                var slidesToMove = Math.floor(dragDistance / (slideWidth * 0.8));
                
                // 드래그 방향에 따라 목표 슬라이드 계산
                var targetSlide = currentSlide;
                if (endX < dragStartX) {
                    // 왼쪽으로 드래그 - 다음 슬라이드들로
                    targetSlide = Math.min(currentSlide + slidesToMove, totalSlides - 1);
                } else {
                    // 오른쪽으로 드래그 - 이전 슬라이드들로
                    targetSlide = Math.max(currentSlide - slidesToMove, 0);
                }
                
                // 계산된 슬라이드로 직접 이동
                $slider.slick('slickGoTo', targetSlide);
            }
            
            dragStartX = 0;
            dragDistance = 0;
        });
        
        $slider.on('beforeChange.slick swipe', function() {
            isSlickDragging = true;
            $slider.find('[data-modal-target]').addClass('slick-dragging');
        });
        
        $slider.on('afterChange.slick', function() {
            setTimeout(function() {
                isSlickDragging = false;
                $slider.find('[data-modal-target]').removeClass('slick-dragging');
            }, 300);
        });
    });
    
    $(document).off('click', '[data-modal-target]').on('click', '[data-modal-target]', function(e) {
        var $this = $(this);
        var $slider = $this.closest('.slick-slider');
        
        if ($slider.length && (isSlickDragging || $slider.hasClass('dragging') || $this.hasClass('slick-dragging'))) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        var modalTarget = $this.data('modal-target');
        var modalType = $this.data('modal-type') || 'solution';
        var targetModal = $('.modal .content-' + modalType + '[data-modal-id="' + modalTarget + '"]');
        
        if (targetModal.length) {
            $('.modal').removeClass('active');
            targetModal.closest('.modal').addClass('active');
            $('body').addClass('modal-open');
        }
    });
    
}); 