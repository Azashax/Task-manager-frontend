import {v4 as uuidv4} from "uuid";

export const villaWithoutData = [
    {
        name: "Without",
        fields: [
            {
                columnType: "hidden",
                columnValue: "uuid",
            },
            {
                maxValue: 10,
                minValue: 0,
                columnTitle: "Bedroom",
                columnType: "number",
                columnValue: 0,
            },
            {
                maxValue: 10,
                minValue: 0,
                columnTitle: "Total",
                columnType: "number",
                columnValue: 0,
            },
            {
                columnTitle: "level",
                columnType: "select",
                columnValue: "EASY",
                options: [
                    {value: "EASY", title: "EASY"},
                    {value: "MEDIUM", title: "MEDIUM"},
                    {value: "HARD", title: "HARD"},
                ],
            },
            {
                columnTitle: "penthouse",
                columnType: "hidden",
                columnValue: false,
            },
        ],
        flats: [
            [
                uuidv4(),
                0,
                0,
                'EASY',
                false
            ]
        ],
    },
    // {
    //     name: "With",
    //     fields: [
    //         {
    //             columnType: "hidden",
    //             columnValue: "uuid",
    //         },
    //         {
    //             maxValue: 10,
    //             minValue: 0,
    //             columnTitle: "Bedroom",
    //             columnType: "number",
    //             columnValue: 0
    //         },
    //         {
    //             columnTitle: "Total",
    //             columnType: "hidden",
    //             columnValue: 0,
    //         },
    //         {
    //             columnTitle: "level",
    //             columnType: "select",
    //             columnValue: "EASY",
    //             options: [
    //                 {value: "EASY", title: "EASY"},
    //                 {value: "MEDIUM", title: "MEDIUM"},
    //                 {value: "HARD", title: "HARD"},
    //             ],
    //         },
    //         {
    //             columnTitle: "penthouse",
    //             columnType: "hidden",
    //             columnValue: false,
    //         },
    //     ],
    //     flats: [
    //         [
    //             uuidv4(),
    //             0,
    //             0,
    //             'EASY',
    //             false
    //         ]
    //     ],
    // },
]