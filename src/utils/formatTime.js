import {
  format,
  subHours,
  formatDistance,
  formatDistanceToNow,
  getDay,
} from "date-fns";
import viLocale from "date-fns/locale/vi";
// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fDateOriginal(date) {
  return format(new Date(date), "dd/MM/yyyy");
}

export function fDateTime(date) {
  return format(new Date(date), "dd/MM HH:mm");
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
  const oneDay = 86400000;
  const result = subHours(new Date(date), 7);
  if (new Date().getTime() - Math.floor(new Date(result).getTime()) > oneDay) {
    return fDateTime(date);
  }

  return formatDistanceToNow(new Date(result), {
    addSuffix: true,
    locale: viLocale,
  });
}
export function fGetDay(date) {
  const day = getDay(new Date(date));
  if (day === 0) {
    return "Chủ Nhật";
  }
  if (day === 1) {
    return "Thứ Hai";
  }
  if (day === 2) {
    return "Thứ Ba";
  }
  if (day === 3) {
    return "Thứ Tư";
  }
  if (day === 4) {
    return "Thứ Năm";
  }
  if (day === 5) {
    return "Thứ Sáu";
  }
  if (day === 6) {
    return "Thứ Bảy";
  }
}

export function fTime(date) {
  return format(new Date(date), "HH:mm");
}

function difference(date1, date2) {
  const date1utc = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );
  const date2utc = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );
  const day = 1000 * 60 * 60 * 24;
  return (date1utc - date2utc) / day;
}

export function fDateSubtract(date) {
  const getDateInVariable = new Date(date);
  const getDateCurrent = new Date();
  return difference(getDateInVariable, getDateCurrent);
}
