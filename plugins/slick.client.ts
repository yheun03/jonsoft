import { nextTick } from 'vue';

type SlickOptions = Record<string, boolean | number>;

declare global {
    interface Window {
        jQuery?: any;
        $?: any;
    }
}

const sliders: Record<string, { selector: string; options: SlickOptions }> = {
    '/about': {
        selector: '.list-awards',
        options: {
            slidesToShow: 3,
            centerMode: true,
            infinite: true,
            arrows: false,
            dots: true,
            speed: 300,
            autoplay: false,
            variableWidth: true,
            swipe: true,
            draggable: true,
            focusOnSelect: true,
            touchThreshold: 20,
            swipeThreshold: 20,
        },
    },
    '/business': {
        selector: '.list-solution',
        options: {
            slidesToShow: 7,
            centerMode: true,
            infinite: true,
            arrows: false,
            dots: true,
            speed: 300,
            autoplay: false,
            variableWidth: true,
            swipe: true,
            draggable: true,
            focusOnSelect: true,
            touchThreshold: 10,
            swipeThreshold: 10,
            slidesToScroll: 1,
            swipeToSlide: true,
            edgeFriction: 0.1,
        },
    },
};

let slickReady: Promise<void> | null = null;

const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
        const loaded = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
        if (loaded) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
    });

const loadSlick = () => {
    if (!slickReady) {
        const baseURL = useRuntimeConfig().app.baseURL;
        slickReady = loadScript(`${baseURL}resources/scripts/jquery-3.7.1.min.js`).then(() =>
            loadScript(`${baseURL}resources/library/slick/slick.min.js`),
        );
    }

    return slickReady;
};

const initSlick = async (path: string) => {
    await nextTick();
    await loadSlick();
    await nextTick();
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const $ = window.jQuery || window.$;
    if (!$?.fn?.slick) return;

    const slider = sliders[path];
    if (!slider) return;

    $(slider.selector).each((_: number, element: HTMLElement) => {
        const $slider = $(element);
        if ($slider.hasClass('slick-initialized')) {
            $slider.slick('setPosition');
            return;
        }
        $slider.slick(slider.options);
    });
};

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();
    const initCurrentSlick = () => initSlick(router.currentRoute.value.path);

    nuxtApp.hook('app:mounted', initCurrentSlick);
    nuxtApp.hook('page:finish', initCurrentSlick);
});
