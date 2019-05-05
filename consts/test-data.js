export const APP_INITIAL_DATA = {
    navigationStore: {
        items: [
            {
                "id": "home",
                "title": "Home",
                "href": "/"
            }
        ]
    },
    dateStore: {
        ISODate: '2019-01-01T00:00:00.000Z'
    }
};

export const CALENDAR_INITIAL_DATA = {
    "2019-04-10T00:00:00.000Z": [
        {
            "id": "abcde1",
            "title": "Action 1",
            "description": "Description of action 1"
        },
        {
            "id": "abcde2",
            "title": "Action 2",
            "description": "Description of action 2"
        }
    ],
    "2019-03-11T00:00:00.000Z": [
        {
            "id": "abcde2",
            "title": "Action 2",
            "description": "Description of action 2"
        },
        {
            "id": "abcde3",
            "title": "Action 4",
            "description": "Description of action 4"
        }
    ]
}
