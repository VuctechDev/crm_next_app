import source from "@/public/locales/en/common.json" assert { type: "json" };

type Translations = typeof source;

export const translate = (key: keyof Translations) => source[key] ?? key;
