import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const locales = ['ko', 'vi', 'en'];
const dictionaries = Object.fromEntries(
    locales.map((locale) => [locale, JSON.parse(readFileSync(resolve(`i18n/dictionary/${locale}.json`), 'utf8'))]),
);

function collectEntries(value, key = '', entries = new Map()) {
    if (Array.isArray(value)) {
        entries.set(key, value);
        return entries;
    }

    if (value && typeof value === 'object') {
        Object.entries(value).forEach(([childKey, childValue]) => {
            collectEntries(childValue, key ? `${key}.${childKey}` : childKey, entries);
        });
        return entries;
    }

    entries.set(key, value);
    return entries;
}

const entriesByLocale = Object.fromEntries(locales.map((locale) => [locale, collectEntries(dictionaries[locale])]));
const referenceKeys = new Set(entriesByLocale.ko.keys());
const errors = [];

locales.forEach((locale) => {
    const entries = entriesByLocale[locale];
    const missingKeys = [...referenceKeys].filter((key) => !entries.has(key));
    const extraKeys = [...entries.keys()].filter((key) => !referenceKeys.has(key));

    missingKeys.forEach((key) => errors.push(`[${locale}] 번역 키 누락: ${key}`));
    extraKeys.forEach((key) => errors.push(`[${locale}] 기준 사전에 없는 키: ${key}`));

    entries.forEach((value, key) => {
        if (typeof value !== 'string' || !value.startsWith('./assets/')) return;
        if (!existsSync(resolve(value.slice(2)))) errors.push(`[${locale}] 에셋 파일 누락 (${key}): ${value}`);
    });
});

if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
} else {
    console.log(`i18n 검사 완료: ${locales.join(', ')} 번역 키와 에셋 경로가 모두 유효합니다.`);
}
