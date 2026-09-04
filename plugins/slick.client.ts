import { nextTick } from 'vue';

type SlickOptions = Record<string, boolean | number>;
type SlickCommand = 'setPosition';

interface SlickCollection {
    each(callback: (index: number, element: HTMLElement) => void): void;
    hasClass(className: string): boolean;
    slick(options: SlickOptions | SlickCommand): SlickCollection;
}

interface JQueryStatic {
    (target: string | HTMLElement): SlickCollection;
    fn?: {
        slick?: unknown;
    };
}

declare global {
    interface Window {
        jQuery?: JQueryStatic;
        $?: JQueryStatic;
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
            if (loaded.dataset.loaded === 'true') {
                resolve();
                return;
            }

            loaded.addEventListener('load', () => resolve(), { once: true });
            loaded.addEventListener(
                'error',
                () => {
                    loaded.remove();
                    reject(new Error(`Failed to load ${src}`));
                },
                { once: true },
            );
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            script.dataset.loaded = 'true';
            resolve();
        };
        script.onerror = () => {
            script.remove();
            reject(new Error(`Failed to load ${src}`));
        };
        document.head.appendChild(script);
    });

const loadSlick = () => {
    if (!slickReady) {
        const baseURL = useRuntimeConfig().app.baseURL;
        slickReady = loadScript(`${baseURL}assets/scripts/jquery-3.7.1.min.js`).then(() => loadScript(`${baseURL}assets/library/slick/slick.min.js`));
        slickReady.catch(() => {
            slickReady = null;
        });
    }

    return slickReady;
};

const initSlick = async (path: string) => {
    const slider = sliders[path];
    if (!slider) return;

    await nextTick();
    if (!document.querySelector(slider.selector)) return;

    await loadSlick();
    await nextTick();
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const $ = window.jQuery || window.$;
    if (!$?.fn?.slick) return;

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
    const initCurrentSlick = () => initSlick(router.currentRoute.value.path).catch(() => undefined);

    nuxtApp.hook('page:finish', initCurrentSlick);
});
