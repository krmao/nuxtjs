/* eslint-disable curly */
// noinspection JSUnusedGlobalSymbols,SuspiciousTypeOfGuard,UnnecessaryLocalVariableJS

export type LimitedKeys<T> = keyof T;

const stringToNumber = (value?: string | number | any, defaultValue?: number): number | undefined => {
  if (
    value == null ||
    typeof value === 'undefined' ||
    (typeof value === 'number' && isNaN(value)) ||
    (typeof value === 'string' && value.length <= 0) ||
    typeof value === 'object'
  ) {
    console.log('stringToNumber invalid value', value);
    return defaultValue ?? undefined;
  }

  let number;
  try {
    number = parseInt(value, 10);
  } catch (e) {
    console.log('stringToNumber', value, e);
    number = defaultValue ?? undefined;
  }
  return number;
};

const arrayFilterToEnd = (array: any[], filter: (item: any) => boolean): any[] => {
  if (!array || array.length <= 0 || !filter) {
    return array;
  }
  // @ts-ignore
  const start = [];
  // @ts-ignore
  const end = [];
  array.forEach((item) => {
    if (!filter(item)) {
      start.push(item);
    } else {
      end.push(item);
    }
  });
  // @ts-ignore
  return start.concat(end);
};
const isValid = (value?: any): boolean => {
  return (
    (typeof value === 'number' && !isNaN(value)) ||
    (typeof value === 'string' && value?.length && value !== '--') ||
    (typeof value !== 'number' && typeof value !== 'string' && typeof value !== 'undefined' && value !== null)
  );
};

/**
 * check object is '{ }'
 * @param object
 */
const isObjectEmpty = (object?: any): boolean => {
  return !object || Object.keys(object).length === 0;
};

/**
 * 通过四舍五入法保留 decimals 位小数, 补0
 * @param value
 * @param decimals
 * @return null if not a number
 */
const roundString = (value: number | undefined, decimals: number = 0): string | any => {
  if (typeof value === 'undefined' || typeof value !== 'number' || typeof decimals !== 'number') return value;
  return valueUtil.round(value, decimals).toFixed(decimals);
};

/**
 * 获取给定数值第shr位(从右向左数)的值(0/1)
 * @param value 初始值
 * @param shr 向右移位, 从右向左数
 */

const getBitValue = (value: number, shr: number = 0) => (value >> shr) & 1;

/**
 * 通过四舍五入法保留 decimals 位小数 https://stackoverflow.com/a/32178833/4348530
 * @param value
 * @param decimals
 */
const round = (value: number, decimals: number = 0): number => {
  if (typeof value === 'undefined' || typeof value !== 'number' || typeof decimals !== 'number') return value;
  return Number(Math.round(parseFloat(value + 'e' + decimals)) + 'e-' + decimals);
};

/**
 * 输入时格式化, 非四舍五入, 直接对字符串进行截断, 替换
 * 1. 只能输入浮点数(数字和'.')
 * 2. 只能输入 decimals 个小数
 *
 * @param value input string value
 * @param decimals >=0
 * @return format string
 */
const inputNumberFormat = (value: string, decimals: number = 1): string => {
  decimals = decimals < 0 ? 0 : decimals;
  return (
    value
      .replace(/[^\d.]/g, '') // 将所有非数字替换为空, '/' 表示正则分隔符, '[]' 表示字符集合, '^' 中括号内为取反中括号外为开头/起始符, '^\d'. 非数字, '/g' 全局匹配
      .replace(/\.{2,}/g, '.') // 连续2个点替换为1个点
      // region 保证整个字符串只有一个'.', 把'.'转换成一个比较特殊的字符串以防止被第二个正则替换给替换掉
      .replace('.', '$#$') // 只将第一个字符'.'替换成特殊字符串'$#$', 利用 replace 对于字符串只匹配一次
      .replace(/\./g, '') // 将其余的字符'.'删除
      .replace('$#$', decimals <= 0 ? '' : '.') // 把特殊字符串'$#$'替换回原来的'.', 如果不需要小数这里不再添加'.'
      // endregion
      // .replace(/^(-)*(\d+)\.(\d).*$/, "$1$2.$3") // 保留1位小数, 第一组重复匹配0-n个'-'; 第二组匹配1-n个数字; 随后匹配一个'.'; 第三组匹配一个数字; 随后匹配任意字符0-n个直到结束(.*$); 替换为'(第一组匹配)(第二组匹配).(第三组匹配)'
      .replace(
        new RegExp(
          '^(-)*(\\d+)\\.(' +
            new Array(decimals)
              .fill(0)
              .map(() => '\\d')
              .join('') +
            ').*$'
        ),
        '$1$2.$3'
      ) // 正则 '//' 作为正则分隔符, 使用new RegExp()动态生成时不需要加这两个斜杠, 但是对'\d'这里的'\'要加多一个'\'进行转义
      .replace(/^\./g, '') // 如果开头是'.'则删除
  );
};

/**
 * 千 兆 吉 太 拍, 最小千 最大拍
 * @param value
 * @return {
 *   value: number,
 *   unit: string // 'k'/'M'/'G'/'T'/'P'
 * }
 */
const short = (value: number): { value: number; unit: string } => {
  if (typeof value === 'undefined' || typeof value !== 'number' || isNaN(value)) {
    return {
      value,
      unit: ''
    };
  }

  const isNegative = value < 0;
  const absValue = Math.abs(value);

  if (absValue < 1000) return { value, unit: '' };
  const kValue = absValue / 1000;
  if (kValue < 1000) return { value: isNegative ? -kValue : kValue, unit: 'k' };
  const MValue = kValue / 1000;
  if (MValue < 1000) return { value: isNegative ? -MValue : MValue, unit: 'M' };
  const GValue = MValue / 1000;
  if (GValue < 1000) return { value: isNegative ? -GValue : GValue, unit: 'G' };
  const TValue = GValue / 1000;
  if (TValue < 1000) return { value: isNegative ? -TValue : TValue, unit: 'T' };
  const PValue = TValue / 1000;
  return { value: isNegative ? -PValue : PValue, unit: 'P' };
};

/**
 * @param value
 * @param decimals
 * @return null if not a number
 */
const shortRoundString = (value: number, decimals?: number): { value: string; unit: string } => {
  const shortValue = short(value);
  return {
    value: valueUtil.roundString(shortValue.value, decimals),
    unit: shortValue.unit
  };
};

/**
 * 千 兆 吉 太 拍, 最小千 最大拍
 * @param kValue
 * @return {
 *   value: number,
 *   unit: string // 'k'/'M'/'G'/'T'/'P'
 * }
 */
const kShort = (kValue: number | undefined): { value?: number; unit: string } => {
  if (typeof kValue === 'undefined' || typeof kValue !== 'number' || isNaN(kValue)) {
    return {
      value: kValue,
      unit: ''
    };
  }

  const isNegative = kValue < 0;
  const absValue = Math.abs(kValue);

  if (absValue < 1000) return { value: kValue, unit: 'k' };
  const MValue = absValue / 1000;
  if (MValue < 1000) return { value: isNegative ? -MValue : MValue, unit: 'M' };
  const GValue = MValue / 1000;
  if (GValue < 1000) return { value: isNegative ? -GValue : GValue, unit: 'G' };
  const TValue = GValue / 1000;
  if (TValue < 1000) return { value: isNegative ? -TValue : TValue, unit: 'T' };
  const PValue = TValue / 1000;
  return { value: isNegative ? -PValue : PValue, unit: 'P' };
};

/**
 * @param kValue
 * @param decimals
 * @return null if not a number
 */
const kShortRoundString = (kValue: number, decimals?: number): { value?: string; unit: string } => {
  const kShortValue = kShort(kValue);
  return {
    value: valueUtil.roundString(kShortValue.value, decimals),
    unit: kShortValue.unit
  };
};

/**
 * 千瓦时转换单位, 大于1000时单位升级, 最大 PWh, 最小 kWh
 *
 * 1 MWh 兆瓦时 === 1000 kWh 千瓦时
 * 1 GWh 吉瓦时 === 1000 MWh 兆瓦时
 * 1 TWh 太瓦时 === 1000 GWh 吉瓦时
 * 1 PWh 拍瓦时 === 1000 TWh 太瓦时
 *
 * @param kWhValue number 千瓦时
 * @return {
 *   value: number;
 *   unit: string; // 'kWh'/'MWh'/'GWh'/'TWh'/'PWh'
 * }
 *
 */
const kWhShort = (kWhValue: number | undefined): { value?: number; unit: string } => {
  const kShortValue = kShort(kWhValue);
  return { value: kShortValue.value, unit: kShortValue.unit + 'Wh' };
};

const kWhShortRoundString = (kWhValue: number, decimals?: number): { value?: string; unit: string } => {
  const kShortValue = kShortRoundString(kWhValue, decimals);
  return { value: kShortValue.value, unit: kShortValue.unit + 'Wh' };
};

const kvarhShort = (kvarhValue: number): { value?: number; unit: string } => {
  const kShortValue = kShort(kvarhValue);
  return { value: kShortValue.value, unit: kShortValue.unit + 'varh' };
};

const kvarhShortRoundString = (kvarhValue: number, decimals?: number): { value?: string; unit: string } => {
  const kShortValue = kShortRoundString(kvarhValue, decimals);
  return { value: kShortValue.value, unit: kShortValue.unit + 'varh' };
};

const kWShort = (kWValue: number | undefined): { value?: number; unit: string } => {
  const kShortValue = kShort(kWValue);
  return { value: kShortValue.value, unit: kShortValue.unit + 'W' };
};

const kWShortRoundString = (kWValue: number, decimals?: number): { value?: string; unit: string } => {
  const kShortValue = kShortRoundString(kWValue, decimals);
  return { value: kShortValue.value, unit: kShortValue.unit + 'W' };
};

const WShort = (WValue: number | undefined): { value: number | undefined; unit: string } => {
  if (typeof WValue === 'undefined' || typeof WValue !== 'number' || isNaN(WValue)) {
    return {
      value: WValue,
      unit: ''
    };
  }
  const kShortValue = short(WValue);
  return { value: kShortValue.value, unit: kShortValue.unit + 'W' };
};

const WShortRoundString = (WValue: number, decimals?: number): { value: string; unit: string } => {
  const wShortValue = WShort(WValue);
  return {
    value:
      typeof decimals === 'undefined' || decimals < 0
        ? wShortValue.value + ''
        : valueUtil.roundString(wShortValue.value, decimals),
    unit: wShortValue.unit
  };
};

/**
 * kvar 全小写
 * @param kvarValue
 */
const kvarShort = (kvarValue: number): { value?: number; unit: string } => {
  const kShortValue = kShort(kvarValue);
  return { value: kShortValue.value, unit: kShortValue.unit + 'var' };
};

const kvarShortRoundString = (kvarValue: number, decimals?: number): { value?: string; unit: string } => {
  const kShortValue = kShortRoundString(kvarValue, decimals);
  return { value: kShortValue.value, unit: kShortValue.unit + 'var' };
};

const varShort = (varValue: number): { value: number; unit: string } => {
  if (typeof varValue === 'undefined' || typeof varValue !== 'number' || isNaN(varValue)) {
    return {
      value: varValue,
      unit: ''
    };
  }
  const kShortValue = short(varValue);
  return { value: kShortValue.value, unit: kShortValue.unit + 'var' };
};

const varShortRoundString = (varValue: number, decimals?: number): { value: string; unit: string } => {
  const varShortValue = varShort(varValue);
  return {
    value:
      typeof decimals === 'undefined' || decimals < 0
        ? varShortValue.value + ''
        : valueUtil.roundString(varShortValue.value, decimals),
    unit: varShortValue.unit
  };
};

const kVAShort = (kVAValue: number): { value?: number; unit: string } => {
  const kShortValue = kShort(kVAValue);
  return { value: kShortValue.value, unit: kShortValue.unit + 'VA' };
};

const kVAShortRoundString = (kVAValue: number, decimals?: number): { value?: string; unit: string } => {
  const kShortValue = kShortRoundString(kVAValue, decimals);
  return { value: kShortValue.value, unit: kShortValue.unit + 'VA' };
};

const VAShort = (VAValue: number): { value: number; unit: string } => {
  if (typeof VAValue === 'undefined' || typeof VAValue !== 'number' || isNaN(VAValue)) {
    return {
      value: VAValue,
      unit: ''
    };
  }
  const kShortValue = short(VAValue);
  return { value: kShortValue.value, unit: kShortValue.unit + 'VA' };
};

const VAShortRoundString = (VAValue: number, decimals?: number): { value: string; unit: string } => {
  const VAShortValue = VAShort(VAValue);
  return {
    value:
      typeof decimals === 'undefined' || decimals < 0
        ? VAShortValue.value + ''
        : valueUtil.roundString(VAShortValue.value, decimals),
    unit: VAShortValue.unit
  };
};

/**
 * 值不存在显示 '--', 否则显示 '值+单位'
 * @param value
 * @param unit
 * @param config reverse 单位在前, defaultValue 替换 '--'
 */
const __ = (
  value?: number | null,
  unit?: string,
  config?: {
    reverse?: boolean;
    defaultValue?: string;
    decimals?: number;
  }
) => {
  if (value == null || typeof value === 'undefined' || isNaN(value)) {
    return config?.defaultValue ?? '--';
  } else {
    // console.log('===typeof config?.decimals', typeof config?.decimals);
    value =
      typeof config?.decimals === 'number' && !isNaN(config?.decimals)
        ? valueUtil.roundString(value, config.decimals)
        : value;
    return config?.reverse ? (unit ?? '') + value : value + (unit ?? '');
  }
};

const ___ = (
  valueUnit?: {
    value?: number | null;
    unit?: string;
  },
  config?: {
    reverse?: boolean;
    defaultValue?: string;
    decimals?: number;
  }
) => {
  return __(valueUnit?.value, valueUnit?.unit, config);
};

/**
 * @param dateTime yyyy-mm-dd hh:mm
 */
const dateToHourWithDecimal = (dateTime?: string | number): number => {
  // console.log('====typeof dateTime', typeof dateTime, dateTime);
  if (
    dateTime === null ||
    (typeof dateTime === 'string' && !dateTime.length) ||
    (typeof dateTime === 'number' && isNaN(dateTime)) ||
    typeof dateTime === 'undefined'
  ) {
    return 0.0;
  }
  if (typeof dateTime === 'number') {
    return dateTime;
  }
  const hourMinuteArray = dateTime.split(' ')[1]?.split(':') ?? [];
  // console.log('-======hourMinuteArray', hourMinuteArray);
  const hourNumber = valueUtil.numberOrNull(hourMinuteArray[0]);
  const minuteNumber = valueUtil.numberOrNull(hourMinuteArray[1]);
  if (hourNumber == null || minuteNumber == null) {
    return 0.0;
  }
  const minuteDecimal = minuteNumber / 60;
  const hourWithDecimal = valueUtil.round(hourNumber + minuteDecimal, 2);
  // console.log('---- hourNumber', hourNumber);
  // console.log('---- minuteNumber', minuteNumber);
  // console.log('---- minuteDecimal', minuteDecimal);
  // console.log('---- hourWithDecimal', hourWithDecimal);
  return hourWithDecimal;
};

/**
 * @return hh:mm
 */
const hourWithDecimalToTime = (hourWithDecimal?: number | null): string | undefined => {
  if (
    hourWithDecimal === null ||
    (typeof hourWithDecimal === 'number' && isNaN(hourWithDecimal)) ||
    typeof hourWithDecimal === 'undefined'
  ) {
    return undefined;
  }
  const hourMinuteArray = (hourWithDecimal + '').split('.');
  let hourString = (valueUtil.numberOrNull(hourMinuteArray[0]) ?? 0) + '';
  hourString = hourString.length <= 1 ? '0' + hourString : hourString;
  let minuteString = (valueUtil.numberOrNull(hourMinuteArray[1]) ?? 0) * 60 + '';
  minuteString = minuteString.length > 2 ? minuteString.substring(0, 2) : minuteString;
  minuteString = minuteString.length <= 1 ? '0' + minuteString : minuteString;

  const time = hourString + ':' + minuteString;
  // console.log('---- hourWithDecimal', hourWithDecimal);
  // console.log('---- time', time);
  return time;
};

const dateToDayWithDecimal = (dateTime?: string | number): number => {
  if (
    dateTime === null ||
    (typeof dateTime === 'string' && !dateTime.length) ||
    (typeof dateTime === 'number' && isNaN(dateTime)) ||
    typeof dateTime === 'undefined'
  ) {
    return 0;
  }
  if (typeof dateTime === 'number') {
    return dateTime;
  }
  const dayNumber = numberOrNull(dateTime.split(' ')[0]?.split('-')?.[2]);
  const hourMinuteArray = dateTime.split(' ')[1]?.split(':') ?? [];
  // console.log('-======hourMinuteArray', hourMinuteArray);
  const hourNumber = numberOrNull(hourMinuteArray[0]) ?? 0;
  if (dayNumber == null) {
    return 0.0;
  }
  const hourDecimal = hourNumber / 24;
  const dayWithDecimal = round(dayNumber + hourDecimal, 0);
  return dayWithDecimal;
};

const dateToMonth = (dateTime?: string | number): number => {
  if (
    dateTime === null ||
    (typeof dateTime === 'string' && !dateTime.length) ||
    (typeof dateTime === 'number' && isNaN(dateTime)) ||
    typeof dateTime === 'undefined'
  ) {
    return 0;
  }
  if (typeof dateTime === 'number') {
    return dateTime;
  }
  const monthNumber = numberOrNull(dateTime.split(' ')[0]?.split('-')?.[1]);
  if (monthNumber == null) {
    return 0;
  }
  return monthNumber;
};

const dateToYear = (dateTime?: string | number): number => {
  if (
    dateTime === null ||
    (typeof dateTime === 'string' && !dateTime.length) ||
    (typeof dateTime === 'number' && isNaN(dateTime)) ||
    typeof dateTime === 'undefined'
  ) {
    return 0;
  }
  if (typeof dateTime === 'number') {
    return dateTime;
  }
  const yearNumber = numberOrNull(dateTime.substring(0, 4));
  if (yearNumber == null) {
    return 0;
  }
  return yearNumber;
};

/**
 * https://i.stack.imgur.com/QNMfI.png
 * @param value
 */
const numberOrNull = (value: number | string | null | undefined) => {
  if (typeof value === 'undefined' || value === null) {
    return null;
  }
  if (typeof value === 'string') {
    value = +value;
  }
  if (isNaN(value) || !isFinite(value)) {
    return null;
  }
  return value;
};

/**
 * @param text
 * @return 0 or else
 */
const hashCode = (text: string | null | undefined): number => {
  let hash = 0;
  let i;
  let chr;
  if (!text?.length) return hash;
  for (i = 0; i < text.length; i++) {
    chr = text.charCodeAt(i);

    hash = (hash << 5) - hash + chr;

    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
const hashCodeString = (text: string | null | undefined): string => {
  return `${hashCode(text)}`;
};

const valueUtil = {
  __,
  ___,
  numberOrNull,
  hashCode,
  hashCodeString,
  dateToDayWithDecimal,
  hourWithDecimalToTime,
  dateToHourWithDecimal,
  dateToMonth,
  dateToYear,
  stringToNumber,
  arrayFilterToEnd,
  isObjectEmpty,
  isValid,
  round,
  getBitValue,
  roundString,
  inputNumberFormat,
  short,
  shortRoundString,
  kShort,
  kShortRoundString,
  kWhShort,
  kWhShortRoundString,
  kvarhShort,
  kvarhShortRoundString,
  kWShort,
  kWShortRoundString,
  WShort,
  WShortRoundString,
  kvarShort,
  kvarShortRoundString,
  varShort,
  varShortRoundString,
  VAShort,
  VAShortRoundString,
  kVAShort,
  kVAShortRoundString
};
export default valueUtil;
