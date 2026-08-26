import AOS from 'aos';

export default defineNuxtPlugin((nuxtApp) => {
    let initialized = false;

    const run = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        requestAnimationFrame(() => {
            if (!initialized) {
                AOS.init({
                    duration: 700,
                    easing: 'ease-out-cubic',
                    once: true,
                    offset: 80,
                });
                initialized = true;
                return;
            }

            AOS.refreshHard();
        });
    };

    nuxtApp.hook('page:finish', run);
});
