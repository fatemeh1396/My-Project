'use strict';

const STORAGE_KEY = 'darsyar.focusmate.v2.data';
const THEME_KEY = 'darsyar.focusmate.v2.theme';
const DAY_NAMES = [
  { id: 'sat', label: 'شنبه', short: 'ش' },
  { id: 'sun', label: 'یکشنبه', short: 'ی' },
  { id: 'mon', label: 'دوشنبه', short: 'د' },
  { id: 'tue', label: 'سه‌شنبه', short: 'س' },
  { id: 'wed', label: 'چهارشنبه', short: 'چ' },
  { id: 'thu', label: 'پنجشنبه', short: 'پ' },
  { id: 'fri', label: 'جمعه', short: 'ج' }
];
const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ICONS = {
  dashboard: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.4"/><path d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17M7.5 13h.01M11.5 13h.01M15.5 13h.01M7.5 17h.01M11.5 17h.01"/>',
  tasks: '<rect x="4" y="3.5" width="16" height="17" rx="2.4"/><path d="m7.2 9.2 1.5 1.5 2.5-2.7M13.5 9.5h3.3M7.2 15.2l1.5 1.5 2.5-2.7M13.5 15.5h3.3"/>',
  exam: '<path d="M7 3.5h8l4 4v13H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z"/><path d="M15 3.8v4h4M8.5 12h7M8.5 16h5"/><path d="M3 7v12a2 2 0 0 0 2 2"/>',
  grades: '<path d="M4 19.5V13M10 19.5V8M16 19.5V4M22 19.5H2"/><path d="m3.5 9 5-3 5 2 7-5"/>',
  notes: '<path d="M5 3.5h10l4 4v13H5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z"/><path d="M15 3.8v4h4M7.5 12h7M7.5 16h7"/>',
  focus: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5.1"/><circle cx="12" cy="12" r="1.5"/><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2"/>',
  report: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/><path d="m3.5 7 5-2 5 4 7-5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1a1.7 1.7 0 1 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.3a1.7 1.7 0 1 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 1 1-2.4-2.4l.1-.1A1.7 1.7 0 0 0 4.2 12H4a1.7 1.7 0 1 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 1 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 1 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 1 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.3a1.7 1.7 0 1 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z" transform="translate(1 1) scale(.91)"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
  moon: '<path d="M20.5 14.2A8.8 8.8 0 0 1 9.8 3.5 8.8 8.8 0 1 0 20.5 14.2Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  check: '<path d="m5 12 4.2 4.2L19 6.5"/>',
  chevron: '<path d="m8 10 4 4 4-4"/>',
  'chevron-left': '<path d="m14 5-7 7 7 7"/>',
  'chevron-right': '<path d="m10 5 7 7-7 7"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  edit: '<path d="m14 5 5 5M4 20l4.4-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.4 16 4 20Z"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M5.5 7l1 14h11l1-14M9 7V4h6v3"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22V4.5Z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  hourglass: '<path d="M6 3h12M6 21h12M7 3c0 4 5 5 5 9s-5 5-5 9M17 3c0 4-5 5-5 9s5 5 5 9"/><path d="M9 6h6M9 18h6"/>',
  chart: '<path d="M4 19V5M4 19h17"/><path d="m7 15 4-5 3 2 5-7"/><circle cx="19" cy="5" r="1"/>',
  note: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 0 4 24V4.5Z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  bookOpen: '<path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v17H5.5A2.5 2.5 0 0 0 3 22V5.5ZM21 5.5A2.5 2.5 0 0 0 18.5 3H12v17h6.5A2.5 2.5 0 0 1 21 22V5.5Z"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  sparkle: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z"/>',
  flag: '<path d="M5 21V4M5 4c6-4 9 4 15 0v11c-6 4-9-4-15 0"/>',
  pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.6 1.7c-.9 1-2.1 1.3-2.1 3M12 17.5h.01"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m7.5 12.2 3 3 6-6.4"/>',
  filter: '<path d="M4 5h16M7 12h10M10 19h4"/>',
  coffee: '<path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8ZM17 10h1.5a2.5 2.5 0 0 1 0 5H17M7 3v2M12 3v2"/>',
  calendarClock: '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M7 2.5v4M17 2.5v4M3 9h18"/><circle cx="12" cy="15" r="3.2"/><path d="M12 13.3v2l1.2.8"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.4 2.5 4 2.5 4-2.5 4-2.5M9 9h.01M15 9h.01"/>',
  lightbulb: '<path d="M9 18h6M10 21h4M8.2 14.6A6.5 6.5 0 1 1 15.8 14.6c-.9.8-1.3 1.5-1.5 2.4h-4.6c-.2-.9-.6-1.6-1.5-2.4Z"/>',
  sunClock: '<circle cx="9" cy="12" r="4"/><path d="M9 2v2M9 20v2M2 12h2M14 12h2M4 5l1.5 1.5M12.5 17.5 14 19M17 4.5A7 7 0 0 1 20 10M17 14l2 2 3-3"/>',
  save: '<path d="M5 3h12l4 4v14H3V5a2 2 0 0 1 2-2Z"/><path d="M7 3v6h10V3M7 21v-8h10v8"/>',
  repeat: '<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/>',
  list: '<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  external: '<path d="M13 5h6v6M19 5l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/>',
  x: '<path d="M5 5l14 14M19 5 5 19"/>',
  plusCircle: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'
};

function icon(name, extraClass = '') {
  const paths = ICONS[name] || ICONS.sparkle;
  return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}
function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.getAttribute('data-icon');
    if (name) el.innerHTML = icon(name);
  });
}
function newId() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
function blankState() {
  return { version: 2, tasks: [], classes: [], exams: [], grades: [], notes: [], sessions: [], profile: { name: '', goalMinutes: 60 } };
}
function safeArray(value) { return Array.isArray(value) ? value.filter(v => v && typeof v === 'object') : []; }
function normaliseState(raw) {
  const base = blankState();
  if (!raw || typeof raw !== 'object') return base;
  base.tasks = safeArray(raw.tasks).map(x => ({ id: String(x.id || newId()), title: String(x.title || ''), subject: String(x.subject || ''), dueDate: isValidISODate(String(x.dueDate || '')) ? String(x.dueDate) : '', time: String(x.time || ''), priority: ['low','medium','high'].includes(x.priority) ? x.priority : 'medium', detail: String(x.detail || ''), done: Boolean(x.done), createdAt: Number(x.createdAt || Date.now()) })).filter(x => x.title.trim());
  base.classes = safeArray(raw.classes).map(x => ({ id: String(x.id || newId()), title: String(x.title || ''), day: DAY_NAMES.some(d => d.id === x.day) ? x.day : 'sat', startTime: String(x.startTime || ''), endTime: String(x.endTime || ''), teacher: String(x.teacher || ''), room: String(x.room || '') })).filter(x => x.title.trim());
  base.exams = safeArray(raw.exams).map(x => ({ id: String(x.id || newId()), title: String(x.title || ''), subject: String(x.subject || ''), date: isValidISODate(String(x.date || '')) ? String(x.date) : '', time: String(x.time || ''), chapter: String(x.chapter || ''), notes: String(x.notes || '') })).filter(x => x.title.trim());
  base.grades = safeArray(raw.grades).map(x => ({ id: String(x.id || newId()), subject: String(x.subject || ''), score: Number(x.score), category: String(x.category || 'آزمون'), date: isValidISODate(String(x.date || '')) ? String(x.date) : '', note: String(x.note || '') })).filter(x => x.subject.trim() && Number.isFinite(x.score) && x.score >= 0 && x.score <= 20);
  base.notes = safeArray(raw.notes).map(x => ({ id: String(x.id || newId()), title: String(x.title || ''), category: String(x.category || 'نکته مهم'), content: String(x.content || ''), createdAt: Number(x.createdAt || Date.now()), updatedAt: Number(x.updatedAt || x.createdAt || Date.now()) })).filter(x => x.title.trim() || x.content.trim());
  base.sessions = safeArray(raw.sessions).map(x => ({ id: String(x.id || newId()), date: isValidISODate(String(x.date || '')) ? String(x.date) : '', minutes: Math.max(1, Math.min(300, Number(x.minutes) || 25)), createdAt: Number(x.createdAt || Date.now()) })).filter(x => isValidISODate(x.date) && Number.isFinite(x.minutes));
  const p = raw.profile && typeof raw.profile === 'object' ? raw.profile : {};
  base.profile = { name: String(p.name || '').slice(0, 60), goalMinutes: Math.max(10, Math.min(600, Number(p.goalMinutes) || 60)), focusMinutes: Math.max(5, Math.min(180, Number(p.focusMinutes) || 25)) };
  return base;
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // Do not create or write a data record until the user adds/changes something.
    return raw ? normaliseState(JSON.parse(raw)) : blankState();
  } catch (err) {
    console.warn('Could not read saved Darsyar data.', err);
    return blankState();
  }
}
let state = loadState();
let currentRoute = 'dashboard';
let taskFilter = 'all';
let noteFilter = 'all';
let globalQuery = '';
let modalConfigType = null;
let modalEditingId = null;
let modalDefaults = {};
let toastTimer = null;
let timerInterval = null;
let modalCloseTimer = null;
let datePickerCloseTimer = null;
let datePickerTargetId = null;
let datePickerMonth = null;
let timer = { mode: 'focus', durations: { focus: state.profile.focusMinutes || 25, short: 5, long: 15 }, remaining: (state.profile.focusMinutes || 25) * 60, running: false, endAt: 0, finished: false };

function persistState(showMessage = false) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (showMessage) toast('تغییرات ذخیره شد.');
    return true;
  } catch (err) {
    console.error('Could not save Darsyar data.', err);
    toast('ذخیره‌سازی انجام نشد؛ فضای مرورگر را بررسی کن.', 'error');
    return false;
  }
}
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}
function toFa(value) { return String(value).replace(/[0-9]/g, d => PERSIAN_DIGITS[Number(d)]); }
function formatDecimal(value, digits = 2) { try { return new Intl.NumberFormat('fa-IR', { maximumFractionDigits: digits }).format(Number(value)); } catch { return toFa(Number(value).toFixed(digits)); } }
function localISODate(date = new Date()) {
  const y = date.getFullYear(); const m = String(date.getMonth() + 1).padStart(2, '0'); const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
function formatDate(value, options = {}) {
  if (!value) return 'بدون تاریخ';
  const date = value instanceof Date ? value : new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return 'تاریخ نامشخص';
  try { return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: options.month || 'short', day: options.day === false ? undefined : 'numeric', weekday: options.weekday || undefined }).format(date); }
  catch { return date.toLocaleDateString('fa-IR'); }
}
const PERSIAN_MONTHS = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const PERSIAN_WEEKDAY_SHORT = ['ش','ی','د','س','چ','پ','ج'];
const PERSIAN_CALENDAR_FORMATTER = new Intl.DateTimeFormat('en-US-u-ca-persian-nu-latn', {
  year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'
});
function isValidISODate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) return false;
  const test = new Date(Date.UTC(year, month - 1, day, 12));
  return test.getUTCFullYear() === year && test.getUTCMonth() === month - 1 && test.getUTCDate() === day;
}
function gregorianISOFromUTCDate(date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}-${String(date.getUTCDate()).padStart(2,'0')}`;
}
function persianPartsFromISO(iso) {
  if (!isValidISODate(iso)) return null;
  const [year, month, day] = iso.split('-').map(Number);
  const parts = PERSIAN_CALENDAR_FORMATTER.formatToParts(new Date(Date.UTC(year, month - 1, day, 12)));
  const value = type => Number(parts.find(part => part.type === type)?.value);
  const result = { year: value('year'), month: value('month'), day: value('day') };
  return Object.values(result).every(Number.isFinite) ? result : null;
}
const PERSIAN_YEAR_CACHE = new Map();
function buildPersianYearCache(pYear) {
  if (PERSIAN_YEAR_CACHE.has(pYear)) return PERSIAN_YEAR_CACHE.get(pYear);
  const dates = new Map();
  const gregorianYear = pYear + 621;
  const start = Date.UTC(gregorianYear, 2, 1, 12);
  // A Jalali year may end in the following Gregorian March, so scan the full possible interval.
  const end = Date.UTC(gregorianYear + 1, 3, 10, 12);
  for (let stamp = start; stamp <= end; stamp += 86400000) {
    const date = new Date(stamp);
    const parts = PERSIAN_CALENDAR_FORMATTER.formatToParts(date);
    const part = type => Number(parts.find(item => item.type === type)?.value);
    if (part('year') !== pYear) continue;
    dates.set(`${part('month')}-${part('day')}`, gregorianISOFromUTCDate(date));
  }
  PERSIAN_YEAR_CACHE.set(pYear, dates);
  return dates;
}
function isoFromPersianDate(pYear, pMonth, pDay) {
  if (!Number.isInteger(pYear) || pYear < 1 || pYear > 3000 || !Number.isInteger(pMonth) || pMonth < 1 || pMonth > 12 || !Number.isInteger(pDay) || pDay < 1 || pDay > 31) return '';
  return buildPersianYearCache(pYear).get(`${pMonth}-${pDay}`) || '';
}
function daysInPersianMonth(year, month) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) return 0;
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  const start = isoFromPersianDate(year, 12, 1);
  const next = isoFromPersianDate(year + 1, 1, 1);
  if (!start || !next) return 0;
  return Math.round((Date.parse(`${next}T12:00:00Z`) - Date.parse(`${start}T12:00:00Z`)) / 86400000);
}
function persianDateLabel(iso) {
  const parts = persianPartsFromISO(iso);
  return parts ? `${toFa(parts.day)} ${PERSIAN_MONTHS[parts.month-1]} ${toFa(parts.year)}` : '';
}
function dateFieldHtml(field, value, id, required, label, hint) {
  const validValue = isValidISODate(String(value || '')) ? String(value) : '';
  const readable = validValue ? persianDateLabel(validValue) : 'انتخاب تاریخ';
  return `<div class="field date-field ${field.full?'full':''}">${label}<input type="hidden" id="${id}" name="${field.name}" value="${escapeHtml(validValue)}" data-date-value data-date-required="${field.required?'true':'false'}"><button class="date-input-button${validValue?' has-date':''}" type="button" id="${id}-display" data-date-open="${id}" aria-haspopup="dialog" aria-controls="datePickerOverlay"><span class="date-input-label">${escapeHtml(readable)}</span><span class="date-input-icon">${icon('calendar')}</span></button>${hint?`<span class="hint">${escapeHtml(hint)}</span>`:''}</div>`;
}
function openDatePicker(targetId) {
  const target = document.getElementById(targetId);
  if (!target || !target.hasAttribute('data-date-value')) return;
  datePickerTargetId = targetId;
  const parts = persianPartsFromISO(target.value) || persianPartsFromISO(localISODate());
  datePickerMonth = { year: parts.year, month: parts.month };
  const overlay = document.getElementById('datePickerOverlay');
  if (datePickerCloseTimer) { clearTimeout(datePickerCloseTimer); datePickerCloseTimer = null; }
  overlay.hidden = false;
  overlay.classList.remove('is-closing');
  renderDatePicker();
  document.body.style.overflow = 'hidden';
  const today = overlay.querySelector('[data-action="date-today"]');
  if (today) today.focus({preventScroll:true});
}
function renderDatePicker() {
  if (!datePickerMonth) return;
  const {year, month} = datePickerMonth;
  const overlay = document.getElementById('datePickerOverlay');
  const title = overlay.querySelector('#datePickerTitle');
  const subtitle = overlay.querySelector('#datePickerSubtitle');
  const grid = overlay.querySelector('#datePickerGrid');
  if (!title || !grid) return;
  title.textContent = `${PERSIAN_MONTHS[month-1]} ${toFa(year)}`;
  subtitle.textContent = 'تقویم هجری شمسی';
  const first = isoFromPersianDate(year, month, 1);
  const count = daysInPersianMonth(year, month);
  if (!first || !count) { grid.innerHTML = '<p class="date-picker-error">نمایش این ماه ممکن نیست.</p>'; return; }
  const [gy, gm, gd] = first.split('-').map(Number);
  const weekdayIndex = (new Date(Date.UTC(gy, gm-1, gd, 12)).getUTCDay() + 1) % 7;
  const target = document.getElementById(datePickerTargetId);
  const selected = target && isValidISODate(target.value) ? target.value : '';
  const today = localISODate();
  const cells = [];
  for (let blank=0; blank<weekdayIndex; blank++) cells.push('<span class="date-day-spacer" aria-hidden="true"></span>');
  for (let day=1; day<=count; day++) {
    const iso = isoFromPersianDate(year, month, day);
    if (!iso) continue;
    const cls = ['date-day', iso===selected?'selected':'', iso===today?'today':''].filter(Boolean).join(' ');
    cells.push(`<button class="${cls}" type="button" data-action="date-select" data-date="${iso}" aria-label="${escapeHtml(persianDateLabel(iso))}" ${iso===selected?'aria-pressed="true"':''}>${toFa(day)}</button>`);
  }
  grid.innerHTML = cells.join('');
  overlay.querySelector('[data-action="date-prev"]').disabled = year <= 1300 && month === 1;
  overlay.querySelector('[data-action="date-next"]').disabled = year >= 1500 && month === 12;
}
function closeDatePicker() {
  const overlay = document.getElementById('datePickerOverlay');
  if (!overlay || overlay.hidden || overlay.classList.contains('is-closing')) return;
  overlay.classList.add('is-closing');
  datePickerCloseTimer = window.setTimeout(() => {
    overlay.hidden = true;
    overlay.classList.remove('is-closing');
    document.body.style.overflow = document.getElementById('modalOverlay')?.hidden ? '' : 'hidden';
    datePickerCloseTimer = null;
    const trigger = datePickerTargetId && document.getElementById(`${datePickerTargetId}-display`);
    if (trigger) trigger.focus({preventScroll:true});
  }, 160);
}
function commitPickedDate(iso) {
  const target = document.getElementById(datePickerTargetId);
  if (!target) { closeDatePicker(); return; }
  if (iso && !isValidISODate(iso)) { toast('این تاریخ معتبر نیست.','error'); return; }
  target.value = iso || '';
  const trigger = document.getElementById(`${datePickerTargetId}-display`);
  if (trigger) {
    trigger.classList.toggle('has-date', Boolean(iso));
    const label = trigger.querySelector('.date-input-label');
    if (label) label.textContent = iso ? persianDateLabel(iso) : 'انتخاب تاریخ';
  }
  const error = document.getElementById('modalError');
  if (error) error.textContent = '';
  closeDatePicker();
}
function formatDateTime(stamp) {
  try { return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(stamp)); }
  catch { return new Date(stamp).toLocaleString('fa-IR'); }
}
function timeGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return 'صبح بخیر';
  if (h >= 11 && h < 16) return 'ظهر بخیر';
  if (h >= 16 && h < 20) return 'عصر بخیر';
  return 'شب بخیر';
}
function dayKeyFromDate(date) {
  const map = ['sun','mon','tue','wed','thu','fri','sat'];
  return map[date.getDay()];
}
function daysBetween(dateString) {
  if (!dateString) return null;
  const target = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const now = new Date(); now.setHours(0,0,0,0);
  target.setHours(0,0,0,0);
  return Math.round((target.getTime() - now.getTime()) / 86400000);
}
function shortTime(value) { return value ? toFa(value) : ''; }
function priorityText(value) { return value === 'high' ? 'زیاد' : value === 'low' ? 'کم' : 'متوسط'; }
function priorityClass(value) { return value === 'high' ? 'priority-high' : value === 'low' ? 'priority-low' : 'priority-medium'; }
function sortDateTime(a, b, key = 'date') { return String(a[key] || '9999').localeCompare(String(b[key] || '9999')) || String(a.time || '').localeCompare(String(b.time || '')); }
function toast(message, type = 'success') {
  const region = document.getElementById('toastRegion');
  while (region.firstElementChild) region.firstElementChild.remove();
  const item = document.createElement('div'); item.className = `toast${type === 'error' ? ' error' : ''}`;
  item.innerHTML = `${icon(type === 'error' ? 'question' : 'checkCircle')}<span>${escapeHtml(message)}</span><span class="toast-spacer"></span><button type="button" aria-label="بستن پیام">×</button>`;
  item.querySelector('button').addEventListener('click', () => item.remove());
  region.appendChild(item);
  window.setTimeout(() => { item.style.opacity = '0'; item.style.transform = 'translateY(5px)'; window.setTimeout(() => item.remove(), 250); }, 3600);
}
function emptyState(title, text, iconName = 'sparkle', action = '', actionLabel = '') {
  const typeForRoute = ({tasks:'task',schedule:'class',exams:'exam',grades:'grade',notes:'note'})[currentRoute] || '';
  return `<div class="empty-state"><div class="empty-illustration">${icon(iconName)}</div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p>${action ? `<button class="button button-soft small-button" type="button" data-action="${escapeHtml(action)}" ${action==='add'&&typeForRoute?`data-type="${typeForRoute}"`:''}>${icon('plus')} ${escapeHtml(actionLabel || 'افزودن مورد')}</button>` : ''}</div>`;
}
function viewHeader(title, description, actionType = '', actionLabel = 'افزودن مورد') {
  return `<div class="view-header"><div><h2 class="view-title">${escapeHtml(title)}</h2><p class="view-description">${escapeHtml(description)}</p></div>${actionType ? `<div class="view-actions"><button class="button button-primary" type="button" data-action="add" data-type="${escapeHtml(actionType)}">${icon('plus')} ${escapeHtml(actionLabel)}</button></div>` : ''}</div>`;
}
function cardHeader(title, subtitle = '', action = '', actionLabel = 'مشاهده همه') {
  return `<div class="card-header"><div><h3 class="card-title">${escapeHtml(title)}</h3>${subtitle ? `<div class="card-subtitle">${escapeHtml(subtitle)}</div>` : ''}</div>${action ? `<button class="card-action" type="button" data-route="${escapeHtml(action)}">${escapeHtml(actionLabel)} ${icon('arrow')}</button>` : ''}</div>`;
}
function todayTasks() { const today = localISODate(); return state.tasks.filter(x => !x.done && x.dueDate === today).sort((a,b) => (a.time || '99:99').localeCompare(b.time || '99:99')); }
function pendingTasks() { return state.tasks.filter(x => !x.done); }
function upcomingExams() { return state.exams.filter(x => x.date && daysBetween(x.date) !== null && daysBetween(x.date) >= 0).sort((a,b) => sortDateTime(a,b,'date')); }
function allGradeAverage() { return state.grades.length ? state.grades.reduce((s,g) => s + g.score, 0) / state.grades.length : null; }
function gradeSubjects() {
  const map = new Map();
  state.grades.forEach(g => { const key = g.subject.trim(); if (!map.has(key)) map.set(key, []); map.get(key).push(g); });
  return [...map.entries()].map(([subject, values]) => ({ subject, values, average: values.reduce((s,x)=>s+x.score,0)/values.length, count: values.length })).sort((a,b)=>a.average-b.average);
}
function sessionsForDate(date) { return state.sessions.filter(s => s.date === date).reduce((sum,s)=>sum+s.minutes,0); }
function weekDates() {
  const today = new Date(); today.setHours(12,0,0,0);
  // In Iran the week begins on Saturday.
  const offset = (today.getDay() + 1) % 7;
  const saturday = new Date(today); saturday.setDate(today.getDate() - offset);
  return Array.from({length:7}, (_,i)=>{ const d=new Date(saturday);d.setDate(saturday.getDate()+i);return d; });
}
function westernDigits(value) {
  return String(value).replace(/[۰-۹]/g, d => String(PERSIAN_DIGITS.indexOf(d))).replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
}
function persianDateParts(date) {
  const parts = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(date);
  const out = {};
  parts.forEach(p => { if (p.type === 'year' || p.type === 'month' || p.type === 'day') out[p.type] = Number(westernDigits(p.value)); });
  return out;
}
function renderMiniCalendar() {
  const now = new Date(); now.setHours(12,0,0,0);
  const current = persianDateParts(now);
  let first = new Date(now);
  for (let offset = 0; offset < 35; offset++) {
    const candidate = new Date(now); candidate.setDate(now.getDate() - offset);
    const part = persianDateParts(candidate);
    if (part.year !== current.year || part.month !== current.month) break;
    first = candidate;
  }
  const dates = [];
  for (let i = 0; i < 35; i++) {
    const date = new Date(first); date.setDate(first.getDate() + i);
    const part = persianDateParts(date);
    if (part.year !== current.year || part.month !== current.month) break;
    dates.push({ date, day: part.day });
  }
  const offset = (first.getDay() + 1) % 7;
  const days = [];
  for (let i=0;i<offset;i++) days.push('<span aria-hidden="true"></span>');
  dates.forEach(({date,day}) => { const isToday = localISODate(date) === localISODate(); days.push(`<span class="date-number${isToday?' today':''}">${toFa(day)}</span>`); });
  while(days.length%7) days.push('<span aria-hidden="true"></span>');
  const week = ['ش','ی','د','س','چ','پ','ج'].map(x=>`<span>${x}</span>`).join('');
  return `<div class="hero-calendar"><div class="mini-cal-head"><span>تقویم این ماه</span><span class="mini-cal-month">${escapeHtml(formatDate(now,{day:false,month:'long'}))}</span></div><div class="mini-cal-days">${week}${days.join('')}</div></div>`;
}
function renderHeroArt() {
  return `<div class="hero-art" aria-hidden="true"><svg viewBox="0 0 360 110" preserveAspectRatio="xMinYMax slice"><path d="M0 105V68h22V45h18v34h18V56h22v49Z" fill="#e89c82"/><path d="M72 105V33h18V20h17v13h18v72M132 105V60h24V42h24v63M186 105V28h23v-8h16v8h17v77M246 105V53h18V35h19v18h22v52" fill="#d88e81"/><path d="M0 92q42-27 84-1t84 0 84 0 108 1v18H0Z" fill="#f0a38a"/><path d="M21 104V79h11v25m53 0V51h9v53m59 0V71h11v33m70 0V42h9v62m42 0V70h10v34" stroke="#f5bd9b" stroke-width="3" fill="none"/><circle cx="276" cy="22" r="13" fill="#fff0bf" opacity=".8"/><path d="M292 11c12 2 17 9 17 17-9 0-17-5-17-17Z" fill="#fff8d9" opacity=".85"/></svg></div>`;
}
function renderDashboard() {
  const name = state.profile.name.trim() ? `، ${escapeHtml(state.profile.name.trim())}` : '، دوست من';
  const completed = state.tasks.filter(t=>t.done).length;
  const total = state.tasks.length;
  const percentage = total ? Math.round(completed/total*100) : 0;
  const week = weekDates();
  const weekVals = week.map(d=>sessionsForDate(localISODate(d)));
  const maxMin = Math.max(30,...weekVals);
  const todaySessionMin = sessionsForDate(localISODate());
  const tTasks = todayTasks();
  const examList = upcomingExams().slice(0,3);
  const taskItems = tTasks.slice(0,4).map(t=>`<div class="today-task${t.done?' done':''}"><input class="task-check" type="checkbox" aria-label="علامت انجام شد: ${escapeHtml(t.title)}" data-action="toggle-task" data-id="${escapeHtml(t.id)}" ${t.done?'checked':''}><div class="today-task-copy"><div class="today-task-name">${escapeHtml(t.title)}</div><div class="today-task-meta"><span class="priority-dot ${priorityClass(t.priority)}"></span>${escapeHtml(t.subject || 'بدون درس مشخص')}</div></div><span class="task-time">${t.time ? escapeHtml(shortTime(t.time)) : 'امروز'}</span></div>`).join('');
  const bars = week.map((d,i)=>{const h=weekVals[i] ? Math.max(6,weekVals[i]/maxMin*76) : 4;const label = DAY_NAMES[i].short;return `<div class="bar-column"><div class="bar-track"><span class="bar-fill" style="height:${h}px" title="${escapeHtml(DAY_NAMES[i].label)}: ${toFa(weekVals[i])} دقیقه"></span></div><span class="bar-label">${label}</span></div>`;}).join('');
  return `<div class="dashboard-columns">
    <section class="dashboard-left">
      <div class="hero-card">
        <div class="hero-copy"><div class="hero-date">${icon('calendarClock')} ${escapeHtml(formatDate(new Date(),{weekday:'long',day:true,month:'long'}))}</div><h2>${timeGreeting()}${name}!</h2><p>امروز فرصت تازه‌ای برای یادگیریه. با یک کار کوچک شروع کن و قدم‌به‌قدم جلو برو.</p><button class="button" type="button" data-action="add" data-type="task">${icon('plus')} ثبت اولین تکلیف</button></div>
        ${renderMiniCalendar()}${renderHeroArt()}<div class="hero-decoration-label"><span></span> هر روز، یک قدم رو به جلو</div>
      </div>
      <div class="chart-grid">
        <section class="card chart-card">${cardHeader('زمان تمرکز در هفته','دقایق جلسه‌های کامل‌شده')}<div class="chart-body"><div class="bar-chart">${bars}</div></div><div class="chart-legend"><span class="legend-dot"></span>${toFa(weekVals.reduce((a,b)=>a+b,0))} دقیقه در این هفته</div></section>
        <section class="card chart-card completion-card">${cardHeader('پیشرفت تکالیف','وضعیت همه تکالیف')}<div class="ring-wrap"><svg class="ring-chart" viewBox="0 0 100 100" aria-label="درصد تکالیف انجام‌شده"><circle class="ring-track" cx="50" cy="50" r="40"></circle><circle class="ring-progress" cx="50" cy="50" r="40" style="stroke-dashoffset:${251.2-(251.2*percentage/100)}"></circle></svg><div class="ring-value">${toFa(percentage)}٪<small>تکمیل شده</small></div></div><div class="chart-legend"><span class="legend-dot"></span>${toFa(completed)} از ${toFa(total)} تکلیف انجام شده</div></section>
      </div>
      <section class="card quick-access-card">${cardHeader('دسترسی سریع','چیزهایی که هر روز لازم داری')}<div class="quick-access-grid"><button class="quick-access" data-route="schedule" type="button"><span class="quick-access-icon">${icon('calendar')}</span><span>برنامه هفتگی</span></button><button class="quick-access" data-route="grades" type="button"><span class="quick-access-icon">${icon('grades')}</span><span>ثبت نمره</span></button><button class="quick-access" data-route="notes" type="button"><span class="quick-access-icon">${icon('notes')}</span><span>دفترچه شخصی</span></button><button class="quick-access" data-route="reports" type="button"><span class="quick-access-icon">${icon('report')}</span><span>گزارش پیشرفت</span></button></div></section>
    </section>
    <section class="dashboard-right">
      <section class="card tasks-today-card">${cardHeader('کارهای امروز',`${toFa(tTasks.length)} کار برای امروز`,'tasks','همه تکالیف')}<div class="today-list">${taskItems || `<div class="empty-state compact"><div class="empty-illustration">${icon('checkCircle')}</div><strong>برای امروز کاری ثبت نشده</strong><p>وقتی تکلیف امروزت را اضافه کنی، اینجا نمایش داده می‌شود.</p><button class="text-button" type="button" data-action="add-today-task">+ افزودن کار امروز</button></div>`}</div>${tTasks.length>4?`<button class="text-button" type="button" data-route="tasks">مشاهده ${toFa(tTasks.length-4)} کار دیگر</button>`:''}</section>
      <section class="card timer-card">${cardHeader('تایمر پومودورو','زمان کوتاه، تمرکز بیشتر','focus','صفحه تمرکز')}<div class="timer-tabs"><button class="timer-tab ${timer.mode==='focus'?'active':''}" data-action="timer-mode" data-mode="focus" type="button">تمرکز</button><button class="timer-tab ${timer.mode==='short'?'active':''}" data-action="timer-mode" data-mode="short" type="button">استراحت کوتاه</button><button class="timer-tab ${timer.mode==='long'?'active':''}" data-action="timer-mode" data-mode="long" type="button">استراحت بلند</button></div><div class="timer-body"><div class="hourglass">${icon('hourglass')}</div><div class="timer-controls"><button class="timer-step" data-action="timer-adjust" data-step="-5" type="button" aria-label="پنج دقیقه کمتر">−</button><div class="timer-display" id="dashboardTimerDisplay">${formatTimer(timer.remaining)}</div><button class="timer-step" data-action="timer-adjust" data-step="5" type="button" aria-label="پنج دقیقه بیشتر">+</button></div><button class="timer-start" id="dashboardTimerStart" data-action="timer-start" type="button">${timer.running?'مکث':'شروع تمرکز'}</button><span class="timer-state" id="dashboardTimerState">${escapeHtml(timerStatusText())}</span></div></section>
      <section class="card exam-card">${cardHeader('امتحان‌های پیش رو','برای آمادگی بهتر','exams','تقویم امتحان')}<div>${examList.length ? examList.map(renderExamMini).join('') : `<div class="empty-state compact"><div class="empty-illustration">${icon('book')}</div><strong>امتحانی ثبت نشده</strong><p>تاریخ امتحان‌هایت را اینجا دنبال کن.</p><button class="text-button" type="button" data-action="add" data-type="exam">+ ثبت امتحان</button></div>`}</div></section>
    </section>
  </div>`;
}
function renderExamMini(exam) {
  const days = daysBetween(exam.date);
  const dateObj = exam.date ? new Date(`${exam.date}T12:00:00`) : null;
  return `<div class="exam-mini"><div class="exam-date-chip"><strong>${dateObj && !Number.isNaN(dateObj.getTime()) ? toFa(dateObj.getDate()) : '—'}</strong><span>${dateObj ? escapeHtml(formatDate(dateObj,{day:false,month:'short'})) : 'بدون تاریخ'}</span></div><div class="exam-mini-copy"><strong>${escapeHtml(exam.title)}</strong><span>${escapeHtml(exam.subject || 'درس مشخص نشده')}${exam.time ? ` · ${escapeHtml(shortTime(exam.time))}` : ''}</span></div><span class="exam-countdown">${days===0?'امروز':`تا ${toFa(days)} روز`}</span></div>`;
}
function formatTimer(seconds) { const s = Math.max(0, Math.floor(seconds)); return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; }
function timerStatusText() { if (timer.finished) return 'زمان تمام شد؛ آفرین!'; if (timer.running) return timer.mode==='focus'?'با آرامش روی کارت بمان':'کمی استراحت کن'; return timer.mode==='focus'?'آماده‌ای یک بازه تمرکز شروع کنی؟':'وقتی آماده‌ای، استراحت را آغاز کن'; }
function renderTaskCard(task, compact = false) {
  const due = task.dueDate ? formatDate(task.dueDate) : 'بدون مهلت';
  const isLate = task.dueDate && daysBetween(task.dueDate) < 0 && !task.done;
  return `<article class="data-row${task.done?' is-done':''}"><input class="task-check" type="checkbox" aria-label="${task.done?'بازگرداندن تکلیف':'تکمیل تکلیف'}: ${escapeHtml(task.title)}" data-action="toggle-task" data-id="${escapeHtml(task.id)}" ${task.done?'checked':''}><div class="row-leading">${icon('tasks')}</div><div class="row-main"><div class="data-row-title">${escapeHtml(task.title)}</div><div class="data-row-description"><span>${escapeHtml(task.subject || 'بدون درس مشخص')}</span><span>·</span><span>${escapeHtml(due)}${task.time?`، ${escapeHtml(shortTime(task.time))}`:''}</span>${task.detail?`<span>·</span><span>${escapeHtml(task.detail)}</span>`:''}</div></div><div class="row-side"><span class="badge ${isLate?'red':task.done?'green':task.priority==='high'?'orange':''}"><span class="priority-dot ${priorityClass(task.priority)}"></span>${task.done?'انجام‌شده':isLate?'عقب‌افتاده':`اولویت ${priorityText(task.priority)}`}</span><button class="row-icon-button" data-action="edit" data-type="task" data-id="${escapeHtml(task.id)}" type="button" title="ویرایش">${icon('edit')}</button><button class="row-icon-button danger" data-action="delete" data-type="task" data-id="${escapeHtml(task.id)}" type="button" title="حذف">${icon('trash')}</button></div></article>`;
}
function renderTasks() {
  const filters = [{id:'all',label:'همه'},{id:'pending',label:'در انتظار'},{id:'done',label:'انجام‌شده'}];
  let items = [...state.tasks].sort((a,b)=>Number(a.done)-Number(b.done) || (a.dueDate||'9999').localeCompare(b.dueDate||'9999') || b.createdAt-a.createdAt);
  if (taskFilter==='pending') items = items.filter(t=>!t.done);
  if (taskFilter==='done') items = items.filter(t=>t.done);
  const doneCount = state.tasks.filter(t=>t.done).length;
  return `${viewHeader('مدیریت تکالیف','کارهایت را ثبت کن، اولویت بده و بعد از انجام علامت بزن.','task','افزودن تکلیف')}<div class="stats-grid"><div class="card stat-card"><div class="stat-icon">${icon('list')}</div><div><div class="stat-value">${toFa(state.tasks.length)}</div><div class="stat-label">کل تکالیف</div></div></div><div class="card stat-card"><div class="stat-icon green">${icon('checkCircle')}</div><div><div class="stat-value">${toFa(doneCount)}</div><div class="stat-label">انجام شده</div></div></div><div class="card stat-card"><div class="stat-icon blue">${icon('clock')}</div><div><div class="stat-value">${toFa(state.tasks.filter(t=>!t.done && t.dueDate===localISODate()).length)}</div><div class="stat-label">موعد امروز</div></div></div><div class="card stat-card"><div class="stat-icon purple">${icon('flag')}</div><div><div class="stat-value">${toFa(state.tasks.filter(t=>!t.done&&t.priority==='high').length)}</div><div class="stat-label">اولویت بالا</div></div></div></div><section class="card"><div class="list-toolbar"><div class="filter-tabs">${filters.map(f=>`<button class="filter-tab ${taskFilter===f.id?'active':''}" data-action="task-filter" data-filter="${f.id}" type="button">${f.label}${f.id==='all'?` (${toFa(state.tasks.length)})`:''}</button>`).join('')}</div><span class="list-count">${toFa(items.length)} مورد</span></div><div class="data-list">${items.map(t=>renderTaskCard(t)).join('') || emptyState(taskFilter==='done'?'هنوز تکمیل‌شده‌ای وجود ندارد':taskFilter==='pending'?'همه‌چیز خالی است':'لیست تکالیف تو خالی است',taskFilter==='done'?'بعد از انجام یک تکلیف، آن را تیک بزن تا اینجا ببینی.':'اولین تکلیف را اضافه کن تا برنامه‌ریزی را شروع کنیم.','tasks','add','افزودن تکلیف')}</div></section>`;
}
function renderSchedule() {
  const grouped = new Map();
  state.classes.forEach(c => {const key = c.startTime || 'بدون ساعت'; if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(c);});
  const times = [...grouped.keys()].sort((a,b)=>a.localeCompare(b));
  const tableRows = times.map(time=>`<tr><td>${escapeHtml(time==='بدون ساعت'?'بدون ساعت':shortTime(time))}</td>${DAY_NAMES.map(day=>{const items=state.classes.filter(c=>c.day===day.id&&(c.startTime||'بدون ساعت')===time);return `<td>${items.length?items.map(c=>`<div class="schedule-cell"><strong>${escapeHtml(c.title)}</strong><span>${escapeHtml(c.startTime&&c.endTime?`${shortTime(c.startTime)} تا ${shortTime(c.endTime)}`:c.endTime?`تا ${shortTime(c.endTime)}`:'')}</span>${c.teacher?`<span>${escapeHtml(c.teacher)}</span>`:''}${c.room?`<span>${escapeHtml(c.room)}</span>`:''}<div class="schedule-cell-actions"><button type="button" data-action="edit" data-type="class" data-id="${escapeHtml(c.id)}" aria-label="ویرایش ${escapeHtml(c.title)}">${icon('edit')}</button><button type="button" data-action="delete" data-type="class" data-id="${escapeHtml(c.id)}" aria-label="حذف ${escapeHtml(c.title)}">${icon('trash')}</button></div></div>`).join(''):`<button class="schedule-add-cell" type="button" data-action="add-class-slot" data-day="${day.id}" data-time="${time==='بدون ساعت'?'':time}" title="افزودن کلاس در ${day.label}">${icon('plus')}</button>`}</td>`;}).join('')}</tr>`).join('');
  const table = `<div class="schedule-wrap"><table class="schedule-table"><thead><tr><th>ساعت</th>${DAY_NAMES.map(d=>`<th>${d.label}</th>`).join('')}</tr></thead><tbody>${tableRows || `<tr><td colspan="8" class="empty-table-cell">هنوز کلاسی در برنامه ثبت نشده است.</td></tr>`}</tbody></table></div>`;
  return `${viewHeader('برنامه هفتگی کلاس‌ها','برنامه کلاس‌ها را یک‌بار وارد کن تا همیشه در دسترس باشد.','class','افزودن کلاس')}<section class="card">${cardHeader('برنامه هفتگی','هفته از شنبه تا جمعه')} ${state.classes.length?table:emptyState('برنامه‌ات هنوز ساخته نشده','اولین کلاس را ثبت کن؛ روز، ساعت شروع و پایان را مشخص کن.','calendar','add','افزودن اولین کلاس') }<p class="schedule-hours-note">${icon('lightbulb')} می‌توانی چند کلاس در یک روز یا ساعت داشته باشی؛ برای ویرایش یا حذف از آیکون‌های هر کلاس استفاده کن.</p></section><div class="two-column-panels"><section class="card">${cardHeader('تعداد کلاس‌ها','تقسیم‌بندی هفته')}<div class="subject-average-list">${DAY_NAMES.map(d=>{const count=state.classes.filter(c=>c.day===d.id).length;return `<div class="subject-average"><span class="subject-average-name">${d.label}</span><div class="progress-track"><div class="progress-fill" style="width:${state.classes.length?count/Math.max(1,...DAY_NAMES.map(dd=>state.classes.filter(c=>c.day===dd.id).length))*100:0}%"></div></div><strong class="subject-average-score">${toFa(count)}</strong></div>`;}).join('')}</div></section><section class="card">${cardHeader('یادآوری برنامه','یک برنامه واقع‌بینانه بهتر است')}<div class="report-note">${state.classes.length?`در حال حاضر <strong>${toFa(state.classes.length)} کلاس</strong> در برنامه داری. هر زمان تغییر کرد، از همین صفحه آن را ویرایش کن.`:'هنوز کلاسی ثبت نکرده‌ای. افزودن کلاس‌ها کمک می‌کند زمان‌های آزاد هفته‌ات را راحت‌تر پیدا کنی.'}</div></section></div>`;
}
function renderExams() {
  const items = [...state.exams].sort((a,b)=>sortDateTime(a,b,'date'));
  const upcoming = upcomingExams();
  const list = items.map(e=>{
    const d=daysBetween(e.date);const past=d!==null&&d<0;const today=d===0;
    return `<article class="data-row"><div class="row-leading">${icon('exam')}</div><div class="row-main"><div class="data-row-title">${escapeHtml(e.title)}</div><div class="data-row-description"><span>${escapeHtml(e.subject||'درس مشخص نشده')}</span><span>·</span><span>${escapeHtml(formatDate(e.date))}</span>${e.time?`<span>·</span><span>${escapeHtml(shortTime(e.time))}</span>`:''}${e.chapter?`<span>·</span><span>${escapeHtml(e.chapter)}</span>`:''}</div></div><div class="row-side"><span class="badge ${past?'':today?'orange':'green'}">${!e.date?'بدون تاریخ':past?'گذشته':today?'امروز':`تا ${toFa(d)} روز`}</span><button class="row-icon-button" data-action="edit" data-type="exam" data-id="${escapeHtml(e.id)}" type="button" title="ویرایش">${icon('edit')}</button><button class="row-icon-button danger" data-action="delete" data-type="exam" data-id="${escapeHtml(e.id)}" type="button" title="حذف">${icon('trash')}</button></div></article>`;
  }).join('');
  return `${viewHeader('برنامه امتحان‌ها','تاریخ، درس و مباحث هر امتحان را ثبت کن تا غافلگیر نشوی.','exam','ثبت امتحان')}<div class="stats-grid"><div class="card stat-card"><div class="stat-icon">${icon('calendar')}</div><div><div class="stat-value">${toFa(state.exams.length)}</div><div class="stat-label">کل امتحان‌ها</div></div></div><div class="card stat-card"><div class="stat-icon green">${icon('clock')}</div><div><div class="stat-value">${toFa(upcoming.length)}</div><div class="stat-label">پیش رو</div></div></div><div class="card stat-card"><div class="stat-icon blue">${icon('sun')}</div><div><div class="stat-value">${toFa(upcoming.filter(x=>daysBetween(x.date)===0).length)}</div><div class="stat-label">امروز</div></div></div><div class="card stat-card"><div class="stat-icon purple">${icon('checkCircle')}</div><div><div class="stat-value">${toFa(state.exams.filter(x=>x.date&&daysBetween(x.date)<0).length)}</div><div class="stat-label">گذشته</div></div></div></div><section class="card">${cardHeader('فهرست امتحان‌ها','به ترتیب تاریخ')}<div class="data-list">${list||emptyState('هنوز امتحانی ثبت نکرده‌ای','با ثبت تاریخ هر امتحان، روزهای باقی‌مانده را در داشبورد می‌بینی.','exam','add','افزودن امتحان')}</div></section>`;
}
function renderGrades() {
  const average=allGradeAverage();const subjects=gradeSubjects();
  const list=[...state.grades].sort((a,b)=>sortDateTime(b,a,'date')).map(g=>`<article class="data-row"><div class="row-leading">${icon('grades')}</div><div class="row-main"><div class="data-row-title">${escapeHtml(g.subject)}</div><div class="data-row-description"><span>${escapeHtml(g.category)}</span><span>·</span><span>${escapeHtml(formatDate(g.date))}</span>${g.note?`<span>·</span><span>${escapeHtml(g.note)}</span>`:''}</div></div><div class="row-side"><span class="badge ${g.score>=16?'green':g.score<10?'red':'orange'}">${formatDecimal(g.score,2)} از ۲۰</span><button class="row-icon-button" data-action="edit" data-type="grade" data-id="${escapeHtml(g.id)}" type="button" title="ویرایش">${icon('edit')}</button><button class="row-icon-button danger" data-action="delete" data-type="grade" data-id="${escapeHtml(g.id)}" type="button" title="حذف">${icon('trash')}</button></div></article>`).join('');
  const subjectRows=subjects.map(s=>`<div class="subject-average"><span class="subject-average-name" title="${escapeHtml(s.subject)}">${escapeHtml(s.subject)}</span><div class="progress-track"><div class="progress-fill" style="width:${Math.max(0,Math.min(100,s.average/20*100))}%"></div></div><strong class="subject-average-score">${formatDecimal(s.average,1)}</strong></div>`).join('');
  return `${viewHeader('کارنامه و نمره‌ها','نمره‌ها را ثبت کن و میانگین و روند پیشرفتت را دنبال کن.','grade','ثبت نمره')}<div class="stats-grid"><div class="card stat-card"><div class="stat-icon green">${icon('grades')}</div><div><div class="stat-value">${average===null?'—':formatDecimal(average,2)}</div><div class="stat-label">میانگین کل از ۲۰</div></div></div><div class="card stat-card"><div class="stat-icon blue">${icon('book')}</div><div><div class="stat-value">${toFa(subjects.length)}</div><div class="stat-label">درس‌های نمره‌دار</div></div></div><div class="card stat-card"><div class="stat-icon purple">${icon('list')}</div><div><div class="stat-value">${toFa(state.grades.length)}</div><div class="stat-label">نمره‌های ثبت‌شده</div></div></div><div class="card stat-card"><div class="stat-icon">${icon('target')}</div><div><div class="stat-value">${toFa(subjects.filter(s=>s.average<12).length)}</div><div class="stat-label">نیازمند تمرین بیشتر</div></div></div></div><div class="two-column-panels"><section class="card">${cardHeader('میانگین هر درس','از ۲۰ نمره')}<div class="subject-average-list">${subjectRows||emptyState('هنوز نمره‌ای وجود ندارد','با اولین ثبت نمره، میانگین هر درس اینجا نمایش داده می‌شود.','grades')}</div></section><section class="card">${cardHeader('روند نمره‌ها','نمره‌های ثبت‌شده به ترتیب زمان')} ${renderGradeChart()}</section></div><section class="card" style="margin-top:14px">${cardHeader('دفتر نمره','همه نمره‌هایی که وارد کرده‌ای')}<div class="data-list">${list||emptyState('دفتر نمره خالی است','نمره‌های آزمون، امتحان یا تکلیف را ثبت کن تا میانگین‌ها به‌صورت خودکار حساب شوند.','grades','add','ثبت اولین نمره')}</div></section><div class="report-note" style="margin-top:14px"><strong>راهنما:</strong> میانگین از همه نمره‌های ثبت‌شده محاسبه می‌شود و وزن نمره‌ها فعلاً برابر است. درس‌هایی با میانگین کمتر از ۱۲ به‌عنوان نیازمند تمرین بیشتر نشان داده می‌شوند.</div>`;
}
function renderGradeChart() {
  if(!state.grades.length) return emptyState('نمودار هنوز داده‌ای ندارد','پس از ثبت چند نمره، روند آن‌ها در این قسمت رسم می‌شود.','chart');
  const arr=[...state.grades].sort((a,b)=>String(a.date||'').localeCompare(String(b.date||''))).slice(-8);
  const w=520,h=190,padL=30,padR=18,padT=16,padB=33,chartW=w-padL-padR,chartH=h-padT-padB;
  const points=arr.map((g,i)=>({x:padL+(arr.length===1?chartW/2:i/(arr.length-1)*chartW),y:padT+(20-g.score)/20*chartH,g}));
  const path=points.map((p,i)=>`${i?'L':'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const area=`${path} L ${points[points.length-1].x} ${padT+chartH} L ${points[0].x} ${padT+chartH} Z`;
  const lines=[0,5,10,15,20].map(v=>{const y=padT+(20-v)/20*chartH;return `<line class="chart-gridline" x1="${padL}" y1="${y}" x2="${w-padR}" y2="${y}"/><text x="${padL-7}" y="${y+3}" text-anchor="end">${toFa(v)}</text>`;}).join('');
  const dots=points.map(p=>`<circle class="chart-point" cx="${p.x}" cy="${p.y}" r="4"><title>${escapeHtml(p.g.subject)}: ${toFa(p.g.score)} از ۲۰</title></circle>`).join('');
  const labels=points.map((p,i)=>`<text x="${p.x}" y="${h-10}" text-anchor="middle">${escapeHtml(p.g.subject.length>6?p.g.subject.slice(0,6)+'…':p.g.subject)}</text>`).join('');
  return `<svg class="svg-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="نمودار روند نمره‌ها">${lines}<path class="chart-area" d="${area}"/><path class="chart-line" d="${path}"/>${dots}${labels}</svg>`;
}
function renderNotes() {
  const cats=[{id:'all',label:'همه'},{id:'خلاصه درس',label:'خلاصه درس'},{id:'نکته مهم',label:'نکته مهم'},{id:'پرسش از معلم',label:'پرسش از معلم'},{id:'شخصی',label:'شخصی'}];
  let items=[...state.notes].sort((a,b)=>b.updatedAt-a.updatedAt);
  if(noteFilter!=='all') items=items.filter(n=>n.category===noteFilter);
  const query=globalQuery.trim().toLocaleLowerCase('fa');
  if(query) items=items.filter(n=>`${n.title} ${n.content} ${n.category}`.toLocaleLowerCase('fa').includes(query));
  const colorMap={'خلاصه درس':'var(--blue)','نکته مهم':'var(--accent)','پرسش از معلم':'var(--purple)','شخصی':'var(--pink)'};
  const cards=items.map(n=>`<article class="note-card" style="--note-color:${colorMap[n.category]||'var(--accent)'}"><div class="note-top"><span class="note-category">${escapeHtml(n.category)}</span><div class="note-bottom-actions"><button class="row-icon-button" data-action="edit" data-type="note" data-id="${escapeHtml(n.id)}" type="button" aria-label="ویرایش یادداشت">${icon('edit')}</button><button class="row-icon-button danger" data-action="delete" data-type="note" data-id="${escapeHtml(n.id)}" type="button" aria-label="حذف یادداشت">${icon('trash')}</button></div></div><h3>${escapeHtml(n.title||'یادداشت بدون عنوان')}</h3><div class="note-content">${escapeHtml(n.content)}</div><div class="note-bottom"><span>${escapeHtml(formatDateTime(n.updatedAt))}</span><span>${toFa(n.content.length)} نویسه</span></div></article>`).join('');
  return `${viewHeader('دفترچه شخصی','خلاصه درس‌ها، نکته‌های مهم و سؤال‌هایی که می‌خواهی از معلم بپرسی.','note','یادداشت جدید')}<section class="card"><div class="list-toolbar"><div class="filter-tabs">${cats.map(c=>`<button class="filter-tab ${noteFilter===c.id?'active':''}" data-action="note-filter" data-filter="${escapeHtml(c.id)}" type="button">${escapeHtml(c.label)}</button>`).join('')}</div><span class="list-count">${toFa(items.length)} یادداشت</span></div>${cards?`<div class="notes-grid">${cards}</div>`:emptyState(globalQuery?'یادداشتی با این عبارت پیدا نشد':'دفترچه‌ات خالی است','یادداشت‌ها را در دسته‌بندی مناسب ذخیره کن تا بعداً راحت پیدایشان کنی.','notes','add','افزودن یادداشت')}</section>`;
}
function renderFocus() {
  const totalToday=sessionsForDate(localISODate());
  const doneSessions=state.sessions.filter(s=>s.date===localISODate()).length;
  const fraction=timer.durations[timer.mode] ? timer.remaining/(timer.durations[timer.mode]*60) : 0;
  const offset=540-(540*Math.max(0,Math.min(1,fraction)));
  const modes=[{id:'focus',label:'تمرکز',desc:'کار عمیق',minutes:timer.durations.focus},{id:'short',label:'استراحت کوتاه',desc:'نفسی تازه کن',minutes:timer.durations.short},{id:'long',label:'استراحت بلند',desc:'استراحت کامل‌تر',minutes:timer.durations.long}];
  const recent=[...state.sessions].sort((a,b)=>b.createdAt-a.createdAt).slice(0,5);
  return `${viewHeader('اتاق تمرکز','یک بازه کوتاه انتخاب کن، اعلان‌ها را کنار بگذار و روی یک کار بمان.')}<div class="focus-layout"><section class="card focus-main-card"><span class="focus-kicker">${timer.mode==='focus'?'زمان تمرکز':timer.mode==='short'?'استراحت کوتاه':'استراحت بلند'}</span><h2>${timer.mode==='focus'?'آروم و پیوسته پیش برو':timer.mode==='short'?'چند نفس عمیق بکش':'کمی از میز فاصله بگیر'}</h2><p>لازم نیست همه‌چیز را یک‌جا تمام کنی؛ فقط روی قدم بعدی تمرکز کن.</p><div class="big-timer-ring"><svg viewBox="0 0 200 200" aria-label="پیشرفت تایمر"><circle class="timer-ring-bg" cx="100" cy="100" r="86"></circle><circle class="timer-ring-fg" id="focusTimerRing" cx="100" cy="100" r="86" style="stroke-dasharray:540;stroke-dashoffset:${offset}"></circle></svg><div class="big-timer-content"><div class="big-timer-time" id="focusTimerDisplay">${formatTimer(timer.remaining)}</div><div class="big-timer-label" id="focusTimerStatus">${escapeHtml(timerStatusText())}</div></div></div><div class="focus-actions"><button class="button button-primary" id="focusTimerStart" data-action="timer-start" type="button">${icon(timer.running?'clock':'focus')} ${timer.running?'مکث تایمر':'شروع جلسه'}</button><button class="button button-ghost" data-action="timer-reset" type="button">${icon('repeat')} از نو</button></div></section><div class="focus-secondary"><section class="card">${cardHeader('انتخاب مدت زمان','مدت‌ها قابل تغییرند')}<div class="focus-preset-grid">${modes.map(m=>`<button class="focus-preset ${timer.mode===m.id?'active':''}" data-action="timer-mode" data-mode="${m.id}" type="button"><strong>${toFa(m.minutes)} دقیقه</strong><span>${m.label}</span></button>`).join('')}</div><div class="form-help">برای کم یا زیاد کردن زمان، از دکمه‌های + و − در داشبورد استفاده کن.</div></section><section class="card">${cardHeader('امروز چه‌قدر تمرکز کردی؟')}<div class="grade-summary"><div class="grade-big"><strong>${toFa(Math.floor(totalToday/60))}<small>س</small> ${toFa(totalToday%60)}<small>د</small></strong><span>زمان تمرکز امروز</span></div><div class="subject-average-list"><div class="subject-average"><span class="subject-average-name">جلسه کامل</span><div class="progress-track"><div class="progress-fill" style="width:${Math.min(100,doneSessions/Math.max(1,state.profile.goalMinutes/25)*100)}%"></div></div><strong class="subject-average-score">${toFa(doneSessions)}</strong></div><div class="subject-average"><span class="subject-average-name">هدف روزانه</span><div class="progress-track"><div class="progress-fill" style="width:${Math.min(100,totalToday/state.profile.goalMinutes*100)}%"></div></div><strong class="subject-average-score">${toFa(state.profile.goalMinutes)}د</strong></div></div></div></section><section class="card">${cardHeader('جلسه‌های اخیر','فقط زمان‌هایی که تایمر کامل شده')}<div>${recent.map(s=>`<div class="session-row"><strong>${escapeHtml(formatDate(s.date))}</strong><span>${toFa(s.minutes)} دقیقه تمرکز</span></div>`).join('')||`<div class="empty-inline"><span class="empty-icon">${icon('clock')}</span><span>هنوز جلسه تمرکزی کامل نشده است.</span></div>`}</div></section><div class="focus-tip">${icon('lightbulb')}<div><strong>یک پیشنهاد کوچک</strong><br>قبل از شروع تایمر، فقط یک کار مشخص انتخاب کن؛ وقتی زمان تمام شد چند دقیقه استراحت کن.</div></div></div></div>`;
}
function renderReports() {
  const done=state.tasks.filter(t=>t.done).length;const total=state.tasks.length;const avg=allGradeAverage();const minutes=state.sessions.reduce((s,x)=>s+x.minutes,0);const thisWeek=weekDates().reduce((s,d)=>s+sessionsForDate(localISODate(d)),0);const subjects=gradeSubjects();
  const weak=subjects.filter(s=>s.average<12).sort((a,b)=>a.average-b.average);
  const week=weekDates();const values=week.map(d=>sessionsForDate(localISODate(d)));const max=Math.max(30,...values);
  const bars=week.map((d,i)=>`<div class="bar-column"><div class="bar-track"><span class="bar-fill" style="height:${values[i]?Math.max(6,values[i]/max*76):4}px" title="${DAY_NAMES[i].label}: ${toFa(values[i])} دقیقه"></span></div><span class="bar-label">${DAY_NAMES[i].short}</span></div>`).join('');
  return `${viewHeader('گزارش پیشرفت','نگاهی روشن به کارهایی که انجام داده‌ای و مسیری که پیش رو داری.')}<div class="stats-grid"><div class="card stat-card"><div class="stat-icon green">${icon('checkCircle')}</div><div><div class="stat-value">${total?toFa(Math.round(done/total*100))+'٪':'—'}</div><div class="stat-label">درصد تکمیل تکالیف</div></div></div><div class="card stat-card"><div class="stat-icon blue">${icon('clock')}</div><div><div class="stat-value">${toFa(Math.floor(minutes/60))}س ${toFa(minutes%60)}د</div><div class="stat-label">کل زمان تمرکز</div></div></div><div class="card stat-card"><div class="stat-icon purple">${avg===null?'—':icon('grades')}</div><div><div class="stat-value">${avg===null?'—':toFa(avg.toFixed(2))}</div><div class="stat-label">میانگین نمره از ۲۰</div></div></div><div class="card stat-card"><div class="stat-icon">${icon('target')}</div><div><div class="stat-value">${toFa(state.sessions.length)}</div><div class="stat-label">جلسه‌های تمرکز</div></div></div></div><div class="two-column-panels"><section class="card">${cardHeader('زمان تمرکز این هفته',`${toFa(thisWeek)} دقیقه در هفت روز اخیر`)}<div class="chart-body" style="height:122px"><div class="bar-chart">${bars}</div></div><div class="chart-legend"><span class="legend-dot"></span>هر ستون، یک روز از هفته است</div></section><section class="card">${cardHeader('وضعیت تکالیف','براساس موارد ثبت‌شده')}<div class="ring-wrap" style="height:120px"><svg class="ring-chart" viewBox="0 0 100 100"><circle class="ring-track" cx="50" cy="50" r="40"></circle><circle class="ring-progress" cx="50" cy="50" r="40" style="stroke-dashoffset:${251.2-(251.2*(total?done/total*100:0)/100)}"></circle></svg><div class="ring-value">${total?toFa(Math.round(done/total*100))+'٪':'—'}<small>تکمیل شده</small></div></div><div class="report-note">${total?`از <strong>${toFa(total)} تکلیف</strong> ثبت‌شده، <strong>${toFa(done)} مورد</strong> را تمام کرده‌ای.`:'با ثبت تکالیف، نسبت کارهای انجام‌شده به کل تکالیف در اینجا نمایش داده می‌شود.'}</div></section></div><section class="card" style="margin-top:14px">${cardHeader('درس‌هایی که نیاز به توجه دارند','میانگین کمتر از ۱۲ از ۲۰')}<div>${weak.map(s=>`<div class="data-row"><div class="row-leading">${icon('book')}</div><div class="row-main"><div class="data-row-title">${escapeHtml(s.subject)}</div><div class="data-row-description">${toFa(s.count)} نمره ثبت شده</div></div><div class="row-side"><span class="badge red">میانگین ${formatDecimal(s.average,1)}</span><button class="button button-ghost small-button" data-route="grades" type="button">بررسی نمره‌ها</button></div></div>`).join('')||emptyState('فعلاً درس نیازمند تمرین مشخص نشده','با ثبت نمره‌ها، درس‌هایی که نیاز به تمرین بیشتری دارند اینجا مشخص می‌شوند.','grades')}</div></section><div class="report-note" style="margin-top:14px">${icon('shield')} گزارش‌ها فقط از داده‌هایی محاسبه می‌شوند که خودت وارد کرده‌ای؛ برای همین ممکن است در شروع همه نمودارها خالی یا صفر باشند.</div>`;
}
function renderSettings() {
  const name=escapeHtml(state.profile.name);
  return `${viewHeader('تنظیمات و حریم خصوصی','درس‌یار را مطابق شیوه مطالعه خودت تنظیم کن.')}<div class="settings-layout"><div><section class="card settings-section"><div class="settings-section-header"><div class="settings-section-icon">${icon('settings')}</div><div><h3>پروفایل دانش‌آموز</h3><p>نامی که در صفحه اصلی نمایش داده می‌شود.</p></div></div><form id="settingsProfileForm"><div class="field-grid"><div class="field full"><label for="profileName">نام نمایشی</label><input id="profileName" name="name" maxlength="60" value="${name}" placeholder="مثلاً آراد"></div><div class="field"><label for="goalMinutes">هدف مطالعه روزانه (دقیقه)</label><input id="goalMinutes" name="goalMinutes" type="number" min="10" max="600" step="5" value="${state.profile.goalMinutes}" required><span class="hint">از ۱۰ تا ۶۰۰ دقیقه</span></div><div class="field"><label for="focusDuration">مدت تایمر مطالعه پیش‌فرض</label><select id="focusDuration" name="focusDuration"><option value="15" ${timer.durations.focus===15?'selected':''}>۱۵ دقیقه</option><option value="25" ${timer.durations.focus===25?'selected':''}>۲۵ دقیقه</option><option value="30" ${timer.durations.focus===30?'selected':''}>۳۰ دقیقه</option><option value="45" ${timer.durations.focus===45?'selected':''}>۴۵ دقیقه</option><option value="50" ${timer.durations.focus===50?'selected':''}>۵۰ دقیقه</option></select></div></div><div style="margin-top:14px"><button class="button button-primary" type="submit">${icon('save')} ذخیره تنظیمات</button></div></form></section><section class="card settings-section"><div class="settings-section-header"><div class="settings-section-icon">${icon('sun')}</div><div><h3>ظاهر برنامه</h3><p>انتخاب پوسته روشن یا تاریک</p></div></div><div class="settings-theme-row"><div><strong>حالت تاریک</strong><span>برای مطالعه در نور کم</span></div><input class="switch" id="settingsThemeSwitch" type="checkbox" ${document.documentElement.dataset.theme==='dark'?'checked':''} aria-label="حالت تاریک"></div><div class="report-note">پوسته در مرورگر ذخیره می‌شود و مستقل از برنامه‌ها و اطلاعات درسی است.</div></section></div><div><section class="card settings-section"><div class="settings-section-header"><div class="settings-section-icon">${icon('shield')}</div><div><h3>پشتیبان‌گیری و بازیابی</h3><p>اطلاعاتت را منتقل یا نگهداری کن.</p></div></div><p class="form-help" style="margin:0 0 13px">یک فایل JSON از تکالیف، کلاس‌ها، امتحان‌ها، نمره‌ها، یادداشت‌ها و جلسه‌های تمرکز بساز؛ بعداً می‌توانی آن را در همین سایت بازیابی کنی.</p><div class="settings-actions"><button class="button button-primary" data-action="export" type="button">${icon('download')} دریافت پشتیبان</button><button class="button button-ghost" data-action="import" type="button">${icon('upload')} بازیابی پشتیبان</button></div><div class="form-help">موارد ثبت‌شده: ${toFa(state.tasks.length)} تکلیف، ${toFa(state.classes.length)} کلاس، ${toFa(state.exams.length)} امتحان، ${toFa(state.grades.length)} نمره، ${toFa(state.notes.length)} یادداشت.</div></section><section class="card settings-section"><div class="settings-section-header"><div class="settings-section-icon">${icon('shield')}</div><div><h3>حریم خصوصی</h3><p>اطلاعات در دستگاه خودت می‌ماند.</p></div></div><div class="report-note">درس‌یار اطلاعات درسی تو را به سرور نمی‌فرستد. داده‌ها در حافظه مرورگر همین دستگاه ذخیره می‌شوند؛ پاک‌کردن داده‌های مرورگر یا استفاده از دستگاه دیگر ممکن است آن‌ها را در دسترس نگذارد.</div></section><section class="card settings-section danger-zone"><div class="settings-section-header"><div class="settings-section-icon">${icon('trash')}</div><div><h3>حذف همه اطلاعات</h3><p>این کار قابل بازگردانی نیست مگر پشتیبان داشته باشی.</p></div></div><p class="form-help" style="margin:0 0 12px">با این کار همه تکالیف، برنامه کلاس‌ها، امتحان‌ها، نمره‌ها، یادداشت‌ها و تاریخچه تمرکز پاک می‌شود. پوسته روشن/تاریک تغییر نمی‌کند.</p><button class="button button-danger" data-action="clear-data" type="button">${icon('trash')} پاک کردن اطلاعات درس‌یار</button></section></div></div>`;
}
function renderCurrentView() {
  const content=document.getElementById('pageContent');
  const titles={dashboard:['نمای کلی','فضای شخصی تو'],schedule:['برنامه هفتگی','برنامه‌ریزی مدرسه'],tasks:['تکالیف','مدیریت کارهای درسی'],exams:['امتحان‌ها','آمادگی برای آزمون'],grades:['کارنامه','پیگیری پیشرفت تحصیلی'],notes:['دفترچه شخصی','یادداشت‌ها و خلاصه‌ها'],focus:['اتاق تمرکز','تمرکز آگاهانه'],reports:['گزارش پیشرفت','نگاهی به مسیر یادگیری'],settings:['تنظیمات','شخصی‌سازی درس‌یار']};
  const [title,eyebrow]=titles[currentRoute]||titles.dashboard;
  document.getElementById('pageTitle').textContent=title;document.getElementById('pageEyebrow').textContent=eyebrow;
  document.querySelectorAll('.nav-item[data-route]').forEach(b=>{const active=b.dataset.route===currentRoute;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  const views={dashboard:renderDashboard,schedule:renderSchedule,tasks:renderTasks,exams:renderExams,grades:renderGrades,notes:renderNotes,focus:renderFocus,reports:renderReports,settings:renderSettings};
  content.innerHTML=(views[currentRoute]||renderDashboard)();
  hydrateIcons(content);
  enhanceSelects(content);
  updateTimerDom();
  if(document.getElementById('settingsThemeSwitch')) document.getElementById('settingsThemeSwitch').addEventListener('change',e=>setTheme(e.target.checked?'dark':'light'));
  const profileForm=document.getElementById('settingsProfileForm');
  if(profileForm) profileForm.addEventListener('submit',saveProfileSettings);
}
function navigate(route) {
  if(!['dashboard','schedule','tasks','exams','grades','notes','focus','reports','settings'].includes(route)) return;
  currentRoute=route;
  document.getElementById('searchResults').hidden=true;
  renderCurrentView();
  if(window.innerWidth<=680) window.scrollTo({top:0,behavior:'smooth'});
}
function setTheme(theme) {
  document.documentElement.dataset.theme=theme;
  try { localStorage.setItem(THEME_KEY,theme); } catch {}
  const button=document.getElementById('themeToggle');
  if(button){button.innerHTML=icon(theme==='dark'?'sun':'moon');button.setAttribute('aria-label',theme==='dark'?'فعال‌کردن حالت روشن':'فعال‌کردن حالت تاریک');button.title=theme==='dark'?'حالت روشن':'حالت تاریک';}
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=theme==='dark'?'#202630':'#fff8f0';
  const sw=document.getElementById('settingsThemeSwitch');if(sw)sw.checked=theme==='dark';
}
function initTheme() {
  let theme='light';try{const v=localStorage.getItem(THEME_KEY);if(v==='dark'||v==='light')theme=v;}catch{}
  setTheme(theme);
}
function fieldHtml(field, value) {
  const id=`field-${field.name}`;const val=value ?? field.value ?? '';
  const required=field.required?'required':'';const placeholder=field.placeholder?` placeholder="${escapeHtml(field.placeholder)}"`:'';const label=`<label for="${id}">${escapeHtml(field.label)}${field.required?' <span aria-hidden="true" style="color:var(--accent-deep)">*</span>':''}</label>`;
  if(field.type==='date') return dateFieldHtml(field, val, id, required, label, field.hint || 'تقویم شمسی؛ روزها با توجه به طول هر ماه تنظیم می‌شوند.');
  if(field.type==='textarea') return `<div class="field ${field.full?'full':''}">${label}<textarea id="${id}" name="${field.name}" ${required}${placeholder} rows="${field.rows||4}" maxlength="${field.maxlength||3000}">${escapeHtml(val)}</textarea>${field.hint?`<span class="hint">${escapeHtml(field.hint)}</span>`:''}</div>`;
  if(field.type==='select') return `<div class="field ${field.full?'full':''}">${label}<select id="${id}" name="${field.name}" ${required}>${(field.options||[]).map(o=>`<option value="${escapeHtml(o.value)}" ${String(val)===String(o.value)?'selected':''}>${escapeHtml(o.label)}</option>`).join('')}</select>${field.hint?`<span class="hint">${escapeHtml(field.hint)}</span>`:''}</div>`;
  const attrs=[required,field.min!==undefined?`min="${field.min}"`:'',field.max!==undefined?`max="${field.max}"`:'',field.step!==undefined?`step="${field.step}"`:'',field.maxlength?`maxlength="${field.maxlength}"`:''].filter(Boolean).join(' ');
  return `<div class="field ${field.full?'full':''}">${label}<input id="${id}" name="${field.name}" type="${field.type||'text'}" value="${escapeHtml(val)}"${placeholder} ${attrs}>${field.hint?`<span class="hint">${escapeHtml(field.hint)}</span>`:''}</div>`;
}
const MODAL_CONFIGS = {
  task: { title:'تکلیف جدید', eyebrow:'مدیریت تکالیف', submit:'ذخیره تکلیف', fields:[
    {name:'title',label:'عنوان تکلیف',required:true,placeholder:'مثلاً حل تمرین صفحه ۲۵',full:true,maxlength:140},
    {name:'subject',label:'نام درس',placeholder:'مثلاً علوم'},
    {name:'dueDate',label:'تاریخ تحویل',type:'date'},
    {name:'time',label:'ساعت (اختیاری)',type:'time'},
    {name:'priority',label:'اولویت',type:'select',value:'medium',options:[{value:'low',label:'کم'},{value:'medium',label:'متوسط'},{value:'high',label:'زیاد'}]},
    {name:'detail',label:'توضیحات',type:'textarea',full:true,placeholder:'جزئیات یا وسایل موردنیاز...'}
  ]},
  class: { title:'کلاس جدید', eyebrow:'برنامه هفتگی', submit:'ذخیره کلاس', fields:[
    {name:'title',label:'نام درس / کلاس',required:true,placeholder:'مثلاً زبان انگلیسی',full:true,maxlength:100},
    {name:'day',label:'روز هفته',type:'select',value:'sat',options:DAY_NAMES.map(d=>({value:d.id,label:d.label}))},
    {name:'startTime',label:'ساعت شروع',type:'time'},
    {name:'endTime',label:'ساعت پایان',type:'time'},
    {name:'teacher',label:'نام معلم (اختیاری)',placeholder:'نام معلم'},
    {name:'room',label:'کلاس / مکان',placeholder:'مثلاً کلاس ۱۰۲'}
  ]},
  exam: { title:'ثبت امتحان', eyebrow:'برنامه امتحان‌ها', submit:'ذخیره امتحان', fields:[
    {name:'title',label:'عنوان امتحان',required:true,placeholder:'مثلاً امتحان فصل دوم',full:true,maxlength:120},
    {name:'subject',label:'درس',placeholder:'نام درس'},
    {name:'date',label:'تاریخ امتحان',type:'date',required:true},
    {name:'time',label:'ساعت امتحان',type:'time'},
    {name:'chapter',label:'مبحث / فصل',placeholder:'فصل‌های موردنظر',full:true},
    {name:'notes',label:'یادداشت آمادگی',type:'textarea',full:true,placeholder:'چه چیزهایی باید مرور شوند؟'}
  ]},
  grade: { title:'ثبت نمره', eyebrow:'کارنامه', submit:'ذخیره نمره', fields:[
    {name:'subject',label:'نام درس',required:true,placeholder:'مثلاً ریاضی',maxlength:100},
    {name:'score',label:'نمره از ۲۰',type:'number',required:true,min:0,max:20,step:0.25,placeholder:'مثلاً ۱۷٫۵'},
    {name:'category',label:'نوع ارزیابی',type:'select',value:'امتحان',options:[{value:'امتحان',label:'امتحان'},{value:'آزمون کلاسی',label:'آزمون کلاسی'},{value:'تکلیف',label:'تکلیف'},{value:'پروژه',label:'پروژه'},{value:'فعالیت کلاسی',label:'فعالیت کلاسی'}]},
    {name:'date',label:'تاریخ نمره',type:'date'},
    {name:'note',label:'توضیح (اختیاری)',type:'textarea',full:true,placeholder:'مثلاً نمره آزمون فصل سوم'}
  ]},
  note: { title:'یادداشت جدید', eyebrow:'دفترچه شخصی', submit:'ذخیره یادداشت', fields:[
    {name:'title',label:'عنوان یادداشت',required:true,placeholder:'عنوان کوتاه و قابل جست‌وجو',full:true,maxlength:140},
    {name:'category',label:'دسته‌بندی',type:'select',value:'نکته مهم',options:[{value:'خلاصه درس',label:'خلاصه درس'},{value:'نکته مهم',label:'نکته مهم'},{value:'پرسش از معلم',label:'پرسش از معلم'},{value:'شخصی',label:'شخصی'}]},
    {name:'content',label:'متن یادداشت',type:'textarea',required:true,full:true,rows:6,placeholder:'هر چیزی که می‌خواهی به خاطر بسپاری...'}
  ]}
};
function updateCustomSelect(wrapper) {
  const select = wrapper.querySelector('select');
  const trigger = wrapper.querySelector('[data-custom-select-toggle]');
  const label = wrapper.querySelector('.custom-select-value');
  if (!select || !trigger || !label) return;
  const selected = select.options[select.selectedIndex];
  label.textContent = selected ? selected.textContent : 'انتخاب کن';
  (wrapper._menu || wrapper.querySelector('.custom-select-menu'))?.querySelectorAll('[data-custom-select-option]').forEach(option => {
    const active = option.dataset.value === select.value;
    option.classList.toggle('selected', active);
    option.setAttribute('aria-selected', String(active));
  });
}
function positionCustomSelectMenu(wrapper) {
  const trigger = wrapper.querySelector('[data-custom-select-toggle]');
  const menu = wrapper._menu || wrapper.querySelector('.custom-select-menu');
  if (!trigger || !menu || menu.hidden) return;
  const rect = trigger.getBoundingClientRect();
  const margin = 12;
  const width = Math.min(rect.width, window.innerWidth - margin * 2);
  menu.style.width = `${Math.max(120,width)}px`;
  menu.style.left = `${Math.max(margin, Math.min(rect.left, window.innerWidth - width - margin))}px`;
  menu.style.right = 'auto';
  const maxHeight = Math.min(240, window.innerHeight - margin * 2);
  menu.style.maxHeight = `${maxHeight}px`;
  menu.style.top = `${rect.bottom + 6 + maxHeight > window.innerHeight - margin ? Math.max(margin, rect.top - Math.min(menu.scrollHeight || maxHeight,maxHeight) - 6) : rect.bottom + 6}px`;
}
function closeCustomSelect(wrapper, returnFocus = false) {
  if (!wrapper) return;
  const trigger = wrapper.querySelector('[data-custom-select-toggle]');
  const menu = wrapper._menu || wrapper.querySelector('.custom-select-menu');
  if (!menu || menu.hidden || menu.classList.contains('is-closing')) return;
  wrapper.classList.remove('is-open');
  trigger?.setAttribute('aria-expanded','false');
  menu.classList.add('is-closing');
  if (wrapper._closeTimer) clearTimeout(wrapper._closeTimer);
  wrapper._closeTimer = window.setTimeout(() => {
    menu.hidden = true;
    menu.classList.remove('is-closing');
    menu.style.removeProperty('top');
    menu.style.removeProperty('left');
    menu.style.removeProperty('right');
    menu.style.removeProperty('width');
    wrapper._closeTimer = null;
    if (returnFocus && trigger) trigger.focus({preventScroll:true});
  }, 140);
}
function closeCustomSelectMenus(except = null) {
  document.querySelectorAll('.custom-select-wrap.is-open').forEach(wrapper => {
    if (wrapper !== except) closeCustomSelect(wrapper);
  });
}
function toggleCustomSelect(trigger) {
  const wrapper = trigger.closest('.custom-select-wrap');
  const menu = wrapper?._menu || wrapper?.querySelector('.custom-select-menu');
  if (!wrapper || !menu) return;
  if (!menu.hidden && wrapper.classList.contains('is-open')) { closeCustomSelect(wrapper, true); return; }
  closeCustomSelectMenus(wrapper);
  if (wrapper._closeTimer) { clearTimeout(wrapper._closeTimer); wrapper._closeTimer = null; }
  menu.classList.remove('is-closing');
  menu.hidden = false;
  wrapper.classList.add('is-open');
  trigger.setAttribute('aria-expanded','true');
  positionCustomSelectMenu(wrapper);
  const selected = menu.querySelector('[aria-selected="true"]') || menu.querySelector('[data-custom-select-option]:not(:disabled)');
  if (selected) selected.focus({preventScroll:true});
}
function chooseCustomSelectOption(optionButton) {
  const wrapper = optionButton._selectWrapper || optionButton.closest('.custom-select-wrap');
  const select = wrapper?.querySelector('select');
  if (!select || optionButton.disabled) return;
  select.value = optionButton.dataset.value;
  updateCustomSelect(wrapper);
  select.dispatchEvent(new Event('input',{bubbles:true}));
  select.dispatchEvent(new Event('change',{bubbles:true}));
  closeCustomSelect(wrapper, true);
}
function enhanceSelects(root = document) {
  document.querySelectorAll('.custom-select-menu').forEach(menu => { const owner=menu._selectWrapper; const parentModal=owner?.closest('#modalOverlay'); if (!owner?.isConnected || (parentModal && parentModal.hidden)) menu.remove(); });
  root.querySelectorAll('select:not([data-custom-enhanced])').forEach(select => {
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select-wrap';
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    select.dataset.customEnhanced = 'true';
    select.classList.add('native-select-source');
    select.setAttribute('tabindex','-1');
    select.setAttribute('aria-hidden','true');
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.id = `${select.id || 'select'}-custom-trigger`;
    trigger.className = 'custom-select-trigger';
    trigger.dataset.customSelectToggle = '';
    trigger.setAttribute('aria-haspopup','listbox');
    trigger.setAttribute('aria-expanded','false');
    const label = document.createElement('span');
    label.className = 'custom-select-value';
    const arrow = document.createElement('span');
    arrow.className = 'custom-select-arrow';
    arrow.innerHTML = icon('chevron');
    trigger.append(label,arrow);
    const menu = document.createElement('div');
    menu.className = 'custom-select-menu';
    menu.id = `${select.id || 'select'}-custom-menu`;
    menu.setAttribute('role','listbox');
    menu.hidden = true;
    trigger.setAttribute('aria-controls',menu.id);
    Array.from(select.options).forEach(option => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'custom-select-option';
      button.dataset.customSelectOption = '';
      button.dataset.value = option.value;
      button.setAttribute('role','option');
      button.textContent = option.textContent;
      button.disabled = option.disabled;
      menu.appendChild(button);
    });
    wrapper.append(trigger);
    wrapper._menu = menu;
    menu._selectWrapper = wrapper;
    menu.querySelectorAll('[data-custom-select-option]').forEach(option => { option._selectWrapper = wrapper; });
    document.body.appendChild(menu);
    document.querySelectorAll(`label[for="${CSS.escape(select.id)}"]`).forEach(labelEl => labelEl.htmlFor = trigger.id);
    updateCustomSelect(wrapper);
  });
}
function getItemByType(type,id) {
  const listMap={task:'tasks',class:'classes',exam:'exams',grade:'grades',note:'notes'};const list=state[listMap[type]];return list?.find(x=>x.id===id)||null;
}
function openModal(type, id = null, defaults = {}) {
  const overlay=document.getElementById('modalOverlay');const form=document.getElementById('modalForm');const fieldsEl=document.getElementById('modalFields');
  if (modalCloseTimer) { clearTimeout(modalCloseTimer); modalCloseTimer = null; }
  overlay.classList.remove('is-closing');
  overlay.querySelector('.modal-card')?.classList.remove('is-closing');
  modalConfigType=type;modalEditingId=id;modalDefaults=defaults||{};
  document.getElementById('modalError').textContent='';
  if(type==='quick') {
    document.getElementById('modalEyebrow').textContent='افزودن سریع';document.getElementById('modalTitle').textContent='چه چیزی می‌خواهی اضافه کنی؟';document.getElementById('modalSubmit').hidden=true;form.onsubmit=e=>e.preventDefault();
    fieldsEl.innerHTML=`<div class="quick-add-grid"><button class="quick-access" type="button" data-action="choose-add" data-type="task"><span class="quick-access-icon">${icon('tasks')}</span><span>تکلیف</span></button><button class="quick-access" type="button" data-action="choose-add" data-type="class"><span class="quick-access-icon">${icon('calendar')}</span><span>کلاس</span></button><button class="quick-access" type="button" data-action="choose-add" data-type="exam"><span class="quick-access-icon">${icon('exam')}</span><span>امتحان</span></button><button class="quick-access" type="button" data-action="choose-add" data-type="grade"><span class="quick-access-icon">${icon('grades')}</span><span>نمره</span></button><button class="quick-access" type="button" data-action="choose-add" data-type="note"><span class="quick-access-icon">${icon('notes')}</span><span>یادداشت</span></button></div>`;
    document.querySelector('.modal-actions').hidden=true;
  } else {
    const config=MODAL_CONFIGS[type];if(!config)return;
    const existing=id?getItemByType(type,id):null;
    document.getElementById('modalEyebrow').textContent=config.eyebrow;
    document.getElementById('modalTitle').textContent=existing?({task:'ویرایش تکلیف',class:'ویرایش کلاس',exam:'ویرایش امتحان',grade:'ویرایش نمره',note:'ویرایش یادداشت'})[type]:config.title;
    document.getElementById('modalSubmit').textContent=existing?'ذخیره تغییرات':config.submit;document.getElementById('modalSubmit').hidden=false;document.querySelector('.modal-actions').hidden=false;
    form.onsubmit=handleModalSubmit;
    fieldsEl.innerHTML=config.fields.map(f=>fieldHtml(f,existing && Object.prototype.hasOwnProperty.call(existing,f.name)?existing[f.name]:(Object.prototype.hasOwnProperty.call(defaults,f.name)?defaults[f.name]:f.value))).join('');
    if(type==='task'&&!existing&&defaults.dueDate) { const due=document.getElementById('field-dueDate');if(due)due.value=defaults.dueDate; }
    if(type==='class'&&!existing&&defaults.day){const day=document.getElementById('field-day');if(day)day.value=defaults.day;}
    const first=fieldsEl.querySelector('input,select,textarea');if(first)window.setTimeout(()=>first.focus(),40);
  }
  hydrateIcons(overlay);enhanceSelects(overlay);overlay.hidden=false;document.body.style.overflow='hidden';
}
function closeModal(immediate = false) {
  const overlay=document.getElementById('modalOverlay');
  if (!overlay || overlay.hidden) return;
  const card=overlay.querySelector('.modal-card');
  if (immediate) {
    overlay.hidden=true; overlay.classList.remove('is-closing'); card?.classList.remove('is-closing');
    document.body.style.overflow=''; modalConfigType=null; modalEditingId=null; modalDefaults={};
    return;
  }
  if (modalCloseTimer) clearTimeout(modalCloseTimer);
  overlay.classList.add('is-closing'); card?.classList.add('is-closing');
  modalCloseTimer=window.setTimeout(()=>{
    overlay.hidden=true; overlay.classList.remove('is-closing'); card?.classList.remove('is-closing');
    document.body.style.overflow=''; modalConfigType=null; modalEditingId=null; modalDefaults={}; modalCloseTimer=null;
  },160);
}
function handleModalSubmit(event) {
  event.preventDefault();if(!modalConfigType||modalConfigType==='quick')return;
  const config=MODAL_CONFIGS[modalConfigType];const form=new FormData(event.currentTarget);const data={};config.fields.forEach(f=>data[f.name]=String(form.get(f.name)??'').trim());
  const err=document.getElementById('modalError');err.textContent='';
  for (const field of config.fields.filter(f=>f.type==='date')) {
    const value = String(data[field.name] || '');
    if (field.required && !value) { err.textContent = `لطفاً ${field.label} را انتخاب کن.`; return; }
    if (value && !isValidISODate(value)) { err.textContent = `تاریخ «${field.label}» معتبر نیست؛ روز و ماه را بررسی کن.`; return; }
  }
  if(!data.title && ['task','class','exam','note'].includes(modalConfigType)){err.textContent='لطفاً عنوان را وارد کن.';return;}
  if(modalConfigType==='grade'){
    const score=Number(data.score);if(!data.subject){err.textContent='نام درس را وارد کن.';return;}if(data.score===''||!Number.isFinite(score)||score<0||score>20){err.textContent='نمره باید عددی بین ۰ تا ۲۰ باشد.';return;}data.score=score;
  }
  if(modalConfigType==='exam'&&!data.date){err.textContent='تاریخ امتحان را انتخاب کن.';return;}
  if(modalConfigType==='class'&&data.startTime&&data.endTime&&data.endTime<=data.startTime){err.textContent='ساعت پایان باید بعد از ساعت شروع باشد.';return;}
  const listMap={task:'tasks',class:'classes',exam:'exams',grade:'grades',note:'notes'};const list=state[listMap[modalConfigType]];const existing=modalEditingId?list.find(x=>x.id===modalEditingId):null;const now=Date.now();
  if(modalConfigType==='task') {data.done=existing?existing.done:false;data.createdAt=existing?existing.createdAt:now;}
  if(modalConfigType==='note') {data.createdAt=existing?existing.createdAt:now;data.updatedAt=now;}
  if(modalConfigType==='grade') data.score=Number(data.score);
  if(existing) Object.assign(existing,data); else list.push({id:newId(),...data});
  persistState();const kind={task:'تکلیف',class:'کلاس',exam:'امتحان',grade:'نمره',note:'یادداشت'}[modalConfigType];closeModal();renderCurrentView();toast(existing?`${kind} ویرایش شد.`:`${kind} اضافه شد.`);
}
function saveProfileSettings(event) {
  event.preventDefault();const fd=new FormData(event.currentTarget);const goal=Math.round(Number(fd.get('goalMinutes')));if(!Number.isFinite(goal)||goal<10||goal>600){toast('هدف روزانه باید بین ۱۰ تا ۶۰۰ دقیقه باشد.','error');return;}
  state.profile.name=String(fd.get('name')||'').trim().slice(0,60);state.profile.goalMinutes=goal;
  const focusDuration=Math.max(5,Math.min(180,Number(fd.get('focusDuration'))||25));state.profile.focusMinutes=focusDuration;timer.durations.focus=focusDuration;if(timer.mode==='focus'){timer.remaining=focusDuration*60;timer.finished=false;if(timer.running) stopTimer(false);}
  persistState();renderCurrentView();document.getElementById('avatarInitial').textContent=state.profile.name?state.profile.name.trim().charAt(0):'د';toast('تنظیمات ذخیره شد.');
}
function deleteItem(type,id) {
  const listMap={task:'tasks',class:'classes',exam:'exams',grade:'grades',note:'notes'};const key=listMap[type];if(!key)return;const item=state[key].find(x=>x.id===id);if(!item)return;
  const names={task:'این تکلیف',class:'این کلاس',exam:'این امتحان',grade:'این نمره',note:'این یادداشت'};
  if(!window.confirm(`آیا از حذف ${names[type]} مطمئنی؟`))return;
  state[key]=state[key].filter(x=>x.id!==id);persistState();renderCurrentView();toast(`${names[type]} حذف شد.`);
}
function toggleTask(id) { const item=state.tasks.find(t=>t.id===id);if(!item)return;item.done=!item.done;persistState();renderCurrentView();toast(item.done?'تکلیف انجام‌شده علامت خورد.':'تکلیف به فهرست کارهای باقی‌مانده برگشت.'); }
function setTimerMode(mode) {
  if(!['focus','short','long'].includes(mode))return;
  if(timer.running) stopTimer(false);
  timer.mode=mode;timer.remaining=timer.durations[mode]*60;timer.finished=false;renderCurrentView();
}
function adjustTimer(step) {
  if(timer.running)stopTimer(false);const next=Math.max(1,Math.min(180,timer.durations[timer.mode]+Number(step||0)));timer.durations[timer.mode]=next;timer.remaining=next*60;timer.finished=false;renderCurrentView();
}
function startTimer() {
  if(timer.running){stopTimer(true);return;}
  if(timer.remaining<=0){timer.remaining=timer.durations[timer.mode]*60;timer.finished=false;}
  timer.running=true;timer.endAt=Date.now()+timer.remaining*1000;
  timerInterval=window.setInterval(tickTimer,250);updateTimerDom();
}
function stopTimer(update=true) {
  timer.running=false;if(timerInterval){clearInterval(timerInterval);timerInterval=null;}if(update)updateTimerDom();
}
function resetTimer() { stopTimer(false);timer.remaining=timer.durations[timer.mode]*60;timer.finished=false;renderCurrentView(); }
function tickTimer() {
  if(!timer.running)return;
  timer.remaining=Math.max(0,Math.ceil((timer.endAt-Date.now())/1000));
  if(timer.remaining<=0){stopTimer(false);timer.finished=true;if(timer.mode==='focus'){state.sessions.push({id:newId(),date:localISODate(),minutes:timer.durations.focus,createdAt:Date.now()});persistState();}updateTimerDom();if(timer.mode==='focus')toast(`آفرین! جلسه تمرکز ${toFa(timer.durations.focus)} دقیقه‌ای کامل شد.`);else toast('زمان استراحت تمام شد؛ هر وقت آماده‌ای ادامه بده.');return;}
  updateTimerDom();
}
function updateTimerDom() {
  ['dashboardTimerDisplay','focusTimerDisplay'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=formatTimer(timer.remaining);});
  ['dashboardTimerState','focusTimerStatus'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=timerStatusText();});
  ['dashboardTimerStart','focusTimerStart'].forEach(id=>{const el=document.getElementById(id);if(el){el.innerHTML=`${icon(timer.running?'clock':timer.mode==='focus'?'focus':'coffee')} ${timer.running?'مکث تایمر':id==='dashboardTimerStart'?'شروع تمرکز':'شروع جلسه'}`;}});
  const ring=document.getElementById('focusTimerRing');if(ring){const duration=timer.durations[timer.mode]*60;const fraction=duration?timer.remaining/duration:0;ring.style.strokeDashoffset=String(540-540*Math.max(0,Math.min(1,fraction)));}
}
function downloadBlob(text, filename, type='application/json;charset=utf-8') {
  const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();window.setTimeout(()=>URL.revokeObjectURL(url),1500);
}
function exportData() {
  const payload={app:'darsyar',version:2,exportedAt:new Date().toISOString(),data:state};
  downloadBlob(JSON.stringify(payload,null,2),`darsyar-backup-${localISODate()}.json`);toast('فایل پشتیبان آماده شد.');
}
function importDataFile(file) {
  if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const raw=JSON.parse(String(reader.result));const imported=normaliseState(raw.data||raw);if(!window.confirm('با بازیابی پشتیبان، اطلاعات فعلی با اطلاعات فایل جایگزین می‌شود. ادامه می‌دهی؟'))return;state=imported;persistState();renderCurrentView();toast('پشتیبان با موفقیت بازیابی شد.');}catch(err){console.error(err);toast('فایل پشتیبان معتبر نیست یا قابل خواندن نیست.','error');}};reader.onerror=()=>toast('خواندن فایل با خطا روبه‌رو شد.','error');reader.readAsText(file);
}
function clearAllData() {
  if(!window.confirm('همه تکالیف، کلاس‌ها، امتحان‌ها، نمره‌ها، یادداشت‌ها و تاریخچه تمرکز حذف شوند؟ این کار قابل بازگشت نیست.'))return;
  state=blankState();try{localStorage.removeItem(STORAGE_KEY);}catch{}stopTimer(false);timer.mode='focus';timer.durations={focus:25,short:5,long:15};timer.remaining=1500;timer.finished=false;renderCurrentView();toast('همه اطلاعات برنامه پاک شد.');
}
function quickSearch(query) {
  const box=document.getElementById('searchResults');const q=query.trim().toLocaleLowerCase('fa');
  if(q.length<2){box.hidden=true;box.innerHTML='';return;}
  const all=[];
  const add=(type,label,desc,item)=>{if(`${label} ${desc}`.toLocaleLowerCase('fa').includes(q))all.push({type,label,desc,id:item.id});};
  state.tasks.forEach(x=>add('task',x.title,x.subject,x));state.classes.forEach(x=>add('class',x.title,`${DAY_NAMES.find(d=>d.id===x.day)?.label||''} ${x.teacher}`,x));state.exams.forEach(x=>add('exam',x.title,`${x.subject} ${x.date}`,x));state.grades.forEach(x=>add('grade',x.subject,`${x.score} ${x.category}`,x));state.notes.forEach(x=>add('note',x.title,`${x.category} ${x.content}`,x));
  box.innerHTML=all.length?all.slice(0,8).map(x=>`<button class="search-result" type="button" data-action="open-search-result" data-type="${x.type}" data-id="${escapeHtml(x.id)}"><span>${icon(({task:'tasks',class:'calendar',exam:'exam',grade:'grades',note:'notes'})[x.type])}</span><strong>${escapeHtml(x.label)}</strong><span class="search-result-type">${({task:'تکلیف',class:'کلاس',exam:'امتحان',grade:'نمره',note:'یادداشت'})[x.type]}</span></button>`).join(''):`<div class="search-empty">نتیجه‌ای پیدا نشد.</div>`;
  box.hidden=false;hydrateIcons(box);
}
function handleAction(actionEl) {
  const action=actionEl.dataset.action;const type=actionEl.dataset.type;const id=actionEl.dataset.id;
  switch(action){
    case 'add': openModal(type,null,type==='task'&&currentRoute==='dashboard'?{dueDate:localISODate()}:{});break;
    case 'edit': openModal(type,id);break;
    case 'delete': deleteItem(type,id);break;
    case 'toggle-task': toggleTask(id);break;
    case 'task-filter': taskFilter=actionEl.dataset.filter||'all';renderCurrentView();break;
    case 'note-filter': noteFilter=actionEl.dataset.filter||'all';renderCurrentView();break;
    case 'add-today-task': openModal('task',null,{dueDate:localISODate()});break;
    case 'add-class-slot': openModal('class',null,{day:actionEl.dataset.day||'sat',startTime:actionEl.dataset.time||''});break;
    case 'timer-mode': setTimerMode(actionEl.dataset.mode);break;
    case 'timer-adjust': adjustTimer(actionEl.dataset.step);break;
    case 'timer-start': startTimer();break;
    case 'timer-reset': resetTimer();break;
    case 'date-prev': if(datePickerMonth){if(datePickerMonth.month===1){if(datePickerMonth.year>1300){datePickerMonth.year--;datePickerMonth.month=12;}}else datePickerMonth.month--;renderDatePicker();}break;
    case 'date-next': if(datePickerMonth){if(datePickerMonth.month===12){if(datePickerMonth.year<1500){datePickerMonth.year++;datePickerMonth.month=1;}}else datePickerMonth.month++;renderDatePicker();}break;
    case 'date-select': commitPickedDate(actionEl.dataset.date||'');break;
    case 'date-today': commitPickedDate(localISODate());break;
    case 'date-clear': commitPickedDate('');break;
    case 'date-close': closeDatePicker();break;
    case 'modal-close': closeModal();break;
    case 'choose-add': {const t=actionEl.dataset.type;openModal(t);break;}
    case 'export': exportData();break;
    case 'import': document.getElementById('importFileInput').click();break;
    case 'clear-data': clearAllData();break;
    case 'open-search-result': {const t=actionEl.dataset.type;const rid=actionEl.dataset.id;const route={task:'tasks',class:'schedule',exam:'exams',grade:'grades',note:'notes'}[t];document.getElementById('globalSearch').value='';globalQuery='';document.getElementById('searchResults').hidden=true;navigate(route);openModal(t,rid);break;}
  }
}
function initEvents() {
  document.addEventListener('click',event=>{
    const selectOption=event.target.closest('[data-custom-select-option]');
    if(selectOption){event.preventDefault();chooseCustomSelectOption(selectOption);return;}
    const selectToggle=event.target.closest('[data-custom-select-toggle]');
    if(selectToggle){event.preventDefault();toggleCustomSelect(selectToggle);return;}
    if(!event.target.closest('.custom-select-wrap')) closeCustomSelectMenus();
    const dateOpenEl=event.target.closest('[data-date-open]');
    if(dateOpenEl){event.preventDefault();openDatePicker(dateOpenEl.dataset.dateOpen);return;}
    if(event.target.id==='datePickerOverlay'){closeDatePicker();return;}
    const routeEl=event.target.closest('[data-route]');if(routeEl){event.preventDefault();navigate(routeEl.dataset.route);return;}
    const actionEl=event.target.closest('[data-action]');if(actionEl){if(actionEl.tagName==='INPUT'&&actionEl.type==='checkbox')return;event.preventDefault();handleAction(actionEl);return;}
  });
  document.getElementById('quickAddButton').addEventListener('click',()=>openModal('quick'));
  document.getElementById('themeToggle').addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
  document.getElementById('globalSearch').addEventListener('input',e=>{globalQuery=e.target.value;quickSearch(globalQuery);if(currentRoute==='notes')renderCurrentView();});
  document.getElementById('globalSearch').addEventListener('keydown',e=>{if(e.key==='Escape'){e.target.value='';globalQuery='';document.getElementById('searchResults').hidden=true;}if(e.key==='Enter'){const first=document.querySelector('#searchResults [data-action="open-search-result"]');if(first)first.click();}});
  document.addEventListener('click',event=>{const wrap=document.querySelector('.global-search-wrap');if(wrap&&!wrap.contains(event.target))document.getElementById('searchResults').hidden=true;});
  document.getElementById('modalOverlay').addEventListener('click',e=>{if(e.target.id==='modalOverlay')closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){const dateOverlay=document.getElementById('datePickerOverlay');if(dateOverlay&&!dateOverlay.hidden){closeDatePicker();return;}const openSelect=document.querySelector('.custom-select-wrap.is-open');if(openSelect){closeCustomSelect(openSelect,true);return;}const overlay=document.getElementById('modalOverlay');if(!overlay.hidden)closeModal();document.getElementById('searchResults').hidden=true;}});
  window.addEventListener('resize',()=>closeCustomSelectMenus());
  window.addEventListener('scroll',()=>closeCustomSelectMenus(),{passive:true});
  document.getElementById('importFileInput').addEventListener('change',e=>{importDataFile(e.target.files&&e.target.files[0]);e.target.value='';});
  document.getElementById('pageContent').addEventListener('change',e=>{const target=e.target;if(target.matches('[data-action="toggle-task"]'))toggleTask(target.dataset.id);});
}
function initApp() {
  hydrateIcons();initTheme();initEvents();
  document.getElementById('avatarInitial').textContent=state.profile.name?state.profile.name.trim().charAt(0):'د';
  // No example school data is inserted or saved on first launch.
  renderCurrentView();
}

initApp();
