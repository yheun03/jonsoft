export default defineNuxtPlugin(() => {
    useLocaleStore().hydrateLangFromStorage();
});
