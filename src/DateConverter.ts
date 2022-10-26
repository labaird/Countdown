const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = SECOND_IN_MS * 60;
const HOUR_IN_MS = MINUTE_IN_MS * 60;
const DAY_IN_MS = HOUR_IN_MS * 24;

export type TimeUnitCounts = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export function createCountdownTimeUnits(targetDate: Date): TimeUnitCounts {
    return getTimeUnitCounts(getDateDifference(targetDate, new Date()));
}

function getDateDifference(futureDate: Date, currentDate: Date): number {
    const target: number = futureDate.getTime();
    const current: number = currentDate.getTime();

    if (target < current) {
        throw new Error('target date cannot be before current date');
    }

    return target - current;
}

function getTimeUnitCounts(
    milliseconds: number
): TimeUnitCounts {

    const result: TimeUnitCounts = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    let remaining: number = milliseconds;

    [result.days, remaining] = getDays(remaining);
    [result.hours, remaining] = getHours(remaining);
    [result.minutes, remaining] = getMinutes(remaining);
    [result.seconds] = getSeconds(remaining);

    return result;
}

function getDays(remaining: number): [number, number] {
    return getUnits(remaining, DAY_IN_MS);
}

function getHours(remaining: number): [number, number] {
    return getUnits(remaining, HOUR_IN_MS);
}

function getMinutes(remaining: number): [number, number] {
    return getUnits(remaining, MINUTE_IN_MS);
}

function getSeconds(remaining: number) {
    return getUnits(remaining, SECOND_IN_MS);
}

function getUnits(milliseconds: number, unit: number): [number, number] {
    const count: number = getUnitCount(milliseconds, unit);

    const remaining: number = removeUnits(milliseconds, unit, count);

    return [count, remaining];
}

function getUnitCount(milliseconds: number, unit: number): number {
    return Math.floor(milliseconds / unit);
}

function removeUnits(milliseconds: number, unit: number, unitCount: number): number {
    const unitsInMS: number = unitCount * unit;

    if (milliseconds < unitsInMS) {
        throw new Error(
            'Cannot remove unit from given milliseconds. Milliseconds are less than given unit.'
        );
    }

    return milliseconds - unitsInMS;
}
