// lib/hijri.js
// Civil/tabular Islamic calendar conversion (Richards' algorithm).
// Used to auto-calculate each year's Ramadan window without manually
// updating dates every year. This is the same kind of approximation
// most calendar apps use — actual moon-sighting confirmation can shift
// the real start date by a day in either direction depending on region.

function gregorianToJDN(y, m, d) {
  const a = Math.floor((14 - m) / 12);
  const y2 = y + 4800 - a;
  const m2 = m + 12 * a - 3;
  return d + Math.floor((153 * m2 + 2) / 5) + 365 * y2 + Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045;
}

function jdnToHijri(jdn) {
  const epoch = 1948440;
  let l = jdn - epoch + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  const j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) + Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l) / 709);
  const day = l - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { year, month, day };
}

function hijriToJDN(y, m, d) {
  return Math.floor((11 * y + 3) / 30) + 354 * y + 30 * m - Math.floor((m - 1) / 2) + d + 1948440 - 385;
}

function jdnToGregorian(jdn) {
  let l = jdn + 68569;
  const n = Math.floor((4 * l) / 146097);
  l = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor((4000 * (l + 1)) / 1461001);
  l = l - Math.floor((1461 * i) / 4) + 31;
  const j = Math.floor((80 * l) / 2447);
  const day = l - Math.floor((2447 * j) / 80);
  l = Math.floor(j / 11);
  const month = j + 2 - 12 * l;
  const year = 100 * (n - 49) + i + l;
  return { year, month, day };
}

function toDate(g) {
  return new Date(g.year, g.month - 1, g.day);
}

// Returns the Hijri year currently "in progress" or most relevant to `now`.
function currentHijriYear(now = new Date()) {
  const jdn = gregorianToJDN(now.getFullYear(), now.getMonth() + 1, now.getDate());
  return jdnToHijri(jdn).year;
}

// Finds the Ramadan window (start/end as JS Dates) for the Hijri year that
// overlaps the given Gregorian date. Checks a couple of nearby Hijri years
// since Ramadan can fall near a Gregorian year boundary.
function getRamadanWindow(now = new Date()) {
  const jdn = gregorianToJDN(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const baseHijriYear = jdnToHijri(jdn).year;
  for (const hy of [baseHijriYear - 1, baseHijriYear, baseHijriYear + 1]) {
    const startJDN = hijriToJDN(hy, 9, 1);
    const endJDN = hijriToJDN(hy, 9, 30); // inclusive end-of-month buffer
    const start = toDate(jdnToGregorian(startJDN));
    const end = toDate(jdnToGregorian(endJDN));
    end.setHours(23, 59, 59, 999);
    if (now >= new Date(start.getFullYear(), start.getMonth(), start.getDate() - 3) && now <= new Date(end.getFullYear(), end.getMonth(), end.getDate() + 3)) {
      return { hijriYear: hy, start, end };
    }
  }
  // Fallback: return the next upcoming Ramadan
  for (const hy of [baseHijriYear, baseHijriYear + 1]) {
    const startJDN = hijriToJDN(hy, 9, 1);
    const start = toDate(jdnToGregorian(startJDN));
    if (start > now) {
      const endJDN = hijriToJDN(hy, 9, 30);
      const end = toDate(jdnToGregorian(endJDN));
      return { hijriYear: hy, start, end };
    }
  }
  const startJDN = hijriToJDN(baseHijriYear + 1, 9, 1);
  const endJDN = hijriToJDN(baseHijriYear + 1, 9, 30);
  return { hijriYear: baseHijriYear + 1, start: toDate(jdnToGregorian(startJDN)), end: toDate(jdnToGregorian(endJDN)) };
}

export { getRamadanWindow, currentHijriYear, gregorianToJDN, jdnToHijri, hijriToJDN, jdnToGregorian };
