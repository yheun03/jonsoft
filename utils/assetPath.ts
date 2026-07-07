import {withBase} from 'ufo';

export function assetPath(path: string) {
    const baseURL = useRuntimeConfig().app.baseURL || '/';
    let normalized = path;
    if (path.startsWith('./')) normalized = `/${path.slice(2)}`;
    else if (!path.startsWith('/')) normalized = `/${path}`;

    return withBase(normalized, baseURL);
}
