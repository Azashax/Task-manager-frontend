export const time = {
    //*villa
    listVillaWithEasy: [0, 900, 1680, 2880, 4320, 6120, 6600, 8100, 9000, 10200, 11400],
    listVillaWithMedium: [0, 1380, 2400, 3360, 5100, 7200, 7800, 9000, 10200, 11700, 13200],
    listVillaWithHard: [0, 1800, 2880, 3840, 5400, 7800, 9300, 10800, 12300, 14100, 15600],

    listVillaWithoutEasy: [0, 600, 1200, 1740, 2640, 4080, 4800, 5700, 6600, 7500, 8400],
    listVillaWithoutMedium: [0, 900, 1500, 2460, 4200, 6000, 7200, 8400, 9600, 11100, 12000],
    listVillaWithoutHard: [0, 1200, 2010, 3100, 4400, 7500, 9000, 10500, 12000, 13800, 15000],

    //*without Page data
    listWithoutNormalEasy: [468, 655, 936, 1404, 1872, 2527],
    listWithoutNormalMedium: [655, 936, 1404, 2059, 2808, 3744],
    listWithoutNormalHard: [936, 1310, 1965, 2808, 3744, 4960],

    listWithoutDuplexEasy: [0, 936, 1404, 1872, 2808, 4680, 7488, 8892, 10296, 11700, 13104],
    listWithoutDuplexMedium: [0, 1404, 1872, 2808, 4680, 7488, 11232, 13104, 14976, 17316, 18720],
    listWithoutDuplexHard: [0, 1560, 2184, 3120, 4680, 7800, 11700, 13650, 15600, 17940, 19500],

    listWithoutDuplexpenthouseEasy: [0, 0, 468, 842, 1310, 1684, 0, 0, 0, 0, 0],
    listWithoutDuplexpenthouseMedium: [0, 0, 468, 1029, 1872, 1872, 0, 0, 0, 0, 0],
    listWithoutDuplexpenthouseHard: [0, 0, 514, 1092, 1248, 2286, 0, 0, 0, 0, 0],

    listWithoutPenthouseEasy: [0, 0, 1404, 2246, 3182, 4212, 5616, 7020, 8424, 9828, 11232],
    listWithoutPenthouseMedium: [0, 0, 1872, 3088, 4680, 7020, 8892, 10764, 12636, 14508, 16380],
    listWithoutPenthouseHard: [0, 0, 2620, 4212, 6552, 8704, 11044, 13384, 15724, 18064, 20124],

    //*with Page data
    listWithNormalEasy: [672, 1152, 1536, 2112, 2880, 4032],
    listWithNormalMedium: [1056, 1824, 2496, 3360, 4512, 5952],
    listWithNormalHard: [1440, 2304, 3072, 3840, 5280, 7008],

    listWithDuplexEasy: [0, 1440, 2112, 3456, 4992, 7488, 10560, 12960, 14400, 16320, 18240],
    listWithDuplexMedium: [0, 2208, 3168, 4512, 6528, 9408, 12480, 14400, 16320, 18720, 21120],
    listWithDuplexHard: [0, 2880, 3840, 5280, 7200, 10272, 14880, 17280, 19680, 22560, 24960],

    listWithDuplexpenthouseEasy: [0, 0, 576, 1152, 1920, 2304, 0, 0, 0, 0, 0],
    listWithDuplexpenthouseMedium: [0, 0, 672, 864, 1632, 2112, 0, 0, 0, 0, 0],
    listWithDuplexpenthouseHard: [0, 0, 768, 864, 1440, 2208, 0, 0, 0, 0, 0],

    listWithPenthouseEasy: [0, 0, 2112, 3264, 4800, 7200, 8640, 10080, 11520, 12960, 14880],
    listWithPenthouseMedium: [0, 0, 2688, 4224, 6144, 8832, 10752, 12672, 14592, 16512, 18432],
    listWithPenthouseHard: [0, 0, 3168, 4704, 6720, 9600, 12000, 14400, 16800, 19200, 21600],
};


export const getDataList = (page, type, level) => {
    const list = `list${textForm(page)}${textForm(type)}${textForm(level)}`;
    return time[list]
};


const textForm = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
