/*jslint maxerr: 50, indent: 4, browser: true, white: true*/

/* moonPhase v1.0
 *
 * home: http://code.google.com/p/moon-phase/
 *
 * Calculate the Moon phase and provide a base64 encoded image that can be displayed.
 * Does not require any external libraries or images.
 *
 * Copyright (C) 2013  Graham Fairweather (a.k.a: Xotic750)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import MoonImages from "./moon-phases-images";

const moonPhase = (function () {
    const radian = Math.PI / 180;

    // http://en.wikipedia.org/wiki/Julian_day#Converting_Julian_or_Gregorian_calendar_date_to_Julian_Day_Number
    // http://www.cs.utsa.edu/~cs1063/projects/Spring2011/Project1/jdn-explanation.html

    const getJulianDayNumber = (year, month, day) => {
        const a = Math.floor((14 - month) / 12);
        const y = year + 4800 - a;
        const m = month + (12 * a) - 3;

        return day + Math.floor(((153 * m) + 2) / 5) + (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    }

    const getFractionalPart = (value) => Math.abs(value) - Math.floor(value);

    const degreesToRadians = (degrees) => degrees * radian;

    // http://www.ben-daglish.net/moon.shtml

    const getMoonPhase = (year, month, day) => {
        if (typeof year !== "number" || year < 0) {
            throw new TypeError("Year must be a number greater or equal to 0");
        }

        if (typeof month !== "number" || month < 1 || month > 12) {
            throw new TypeError("Month must be a number between 1 and 12");
        }

        if (typeof day !== "number" || day < 1 || day > 31) {
            throw new TypeError("Month must be a number between 1 and 31");
        }

        var thisJD = getJulianDayNumber(year, month, day),
            k0 = Math.floor((year - 1900) * 12.3685),
            t = (year - 1899.5) / 100,
            t2 = Math.pow(t, 2),
            t3 = Math.pow(t, 3),
            j0 = 2415020 + (29 * k0),
            f0 = (0.0001178 * t2) - (0.000000155 * t3) + 0.75933 + (0.53058868 * k0) - (0.000837 * t) + (0.000335 * t2),
            m0 = 360 * getFractionalPart(k0 * 0.08084821133) + 359.2242 - (0.0000333 * t2) - (0.00000347 * t3),
            m1 = 360 * getFractionalPart(k0 * 0.07171366128) + 306.0253 + (0.0107306 * t2) + (0.00001236 * t3),
            b1 = 360 * getFractionalPart(k0 * 0.08519585128) + 21.2964 - (0.0016528 * t2) - (0.00000239 * t3),
            phase = 0,
            jday = 0,
            oldJ,
            f,
            m5,
            m6,
            b6;

        while (jday < thisJD) {
            f = f0 + (1.530588 * phase);
            m5 = degreesToRadians(m0 + (phase * 29.10535608));
            m6 = degreesToRadians(m1 + (phase * 385.81691806));
            b6 = degreesToRadians(b1 + (phase * 390.67050646));
            f -= (0.4068 * Math.sin(m6)) + ((0.1734 - (0.000393 * t)) * Math.sin(m5));
            f += (0.0161 * Math.sin(2 * m6)) + (0.0104 * Math.sin(2 * b6));
            f -= (0.0074 * Math.sin(m5 - m6)) - (0.0051 * Math.sin(m5 + m6));
            f += (0.0021 * Math.sin(2 * m5)) + (0.0010 * Math.sin((2 * b6) - m6));
            f += 0.5 / 1440;
            oldJ = jday;
            jday = j0 + (28 * phase) + Math.floor(f);
            phase += 1;
        }

        return (thisJD - oldJ) % 30;
    }

    return (year, month, day) => {
        var phase = getMoonPhase(year, month, day);

        return {
            'phase': phase,
            'image': "data:image/gif;base64," + MoonImages[phase]
        };
    };
}());

export default moonPhase;
