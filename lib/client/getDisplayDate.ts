const getFromUTC = (time: string): string => {
    // const d = time ? new Date(time) : new Date();
    // return d.getTime() - new Date().getTimezoneOffset() * 60 * 1000;
    return time;
  };
  
  export const formatNumber = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  };
  
  export const getDisplayDateTime = (time?: string) => {
    const d = time ? new Date(getFromUTC(time)) : new Date();
    const date = formatNumber(d.getDate());
    const month = formatNumber(d.getMonth() + 1);
    const year = formatNumber(d.getFullYear());
    const hours = formatNumber(d.getHours());
    const minutes = formatNumber(d.getMinutes());
    const seconds = formatNumber(d.getSeconds());
  
    return `${date}.${month}.${year}, ${hours}:${minutes}`;
  };
  
  export const getDisplayTime = (time?: string) => {
    const d = time ? new Date(getFromUTC(time)) : new Date();
    const hours = formatNumber(d.getHours());
    const minutes = formatNumber(d.getMinutes());
    const seconds = formatNumber(d.getSeconds());
  
    return `${hours}:${minutes}:${seconds}`;
  };
  
  export const getChartLabel = (time?: string, interval: string = "day") => {
    const d = time ? new Date(getFromUTC(time)) : new Date();
    const hours = formatNumber(d.getHours());
    const minutes = formatNumber(d.getMinutes());
    const date = formatNumber(d.getDate());
    const month = formatNumber(d.getMonth() + 1);
    if (interval === "hour") {
      return `${hours}:${minutes}h`;
    } else if (interval === "day") {
      return `${hours}h`;
    } else if (interval === "week") {
      return `${date}.${month}, ${hours}h`;
    }
  
    return `${date}.${month}.`;
  };
  