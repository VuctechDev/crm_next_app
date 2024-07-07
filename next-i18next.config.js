module.exports = {
  i18n: {
    locales: ["sr", "en", "de"],
    defaultLocale: "en",
    localeDetection: false,
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/public/locales",
  ns: ["common"],
};
