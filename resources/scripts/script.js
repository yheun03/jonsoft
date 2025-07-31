// =============================================================================
// 스크립트 파일
// =============================================================================

// =============================================================================
// Sticky 상태 감지
// =============================================================================

/**
 * sticky 요소의 상태를 감지하는 함수
 * @param {HTMLElement} element - 감지할 sticky 요소
 */
function detectStickyState(element) {
    const rect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);
    const top = parseInt(computedStyle.top);
    
    // sticky가 활성화된 상태인지 확인
    const isSticky = rect.top <= top;
    
    if (isSticky) {
        element.classList.add('sticky-active');
        console.log('Sticky 활성화됨:', element.textContent);
    } else {
        element.classList.remove('sticky-active');
    }
}

// 페이지 로드 후 sticky 감지 시작
document.addEventListener('DOMContentLoaded', function() {
    const stickyElements = document.querySelectorAll('.history2-timeline strong');
    
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', function() {
        stickyElements.forEach(element => {
            detectStickyState(element);
        });
    });
    
    // 초기 상태 확인
    stickyElements.forEach(element => {
        detectStickyState(element);
    });
});
