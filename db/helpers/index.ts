export const parseHTTPS = (website: string) => {
  if (website) {
    if (!website?.startsWith("https://")) {
      if (website?.startsWith("http://")) {
        return website.replace("http://", "https://");
      }
      return `https://${website}`;
    }
    return website;
  }
  return "";
};
