
export const navitems = [


    {
        name: 'boards',
        icon: 'fa-tv',
        linkTo: '/spots',
        admin: false,
        dropdowns: false,

    },
    {
        name: 'ads requests',
        icon: 'fa-ad',
        linkTo: '/ads',
        admin: false,
        dropdowns: false,

    },

    {
        name: 'schedules',
        icon: 'fa-calendar-check',
        linkTo: '/schedules',
        admin: false,
        dropdowns: false,

    },

    {
        name: 'agency',
        icon: 'fa-id-card',
        admin: false,
        dropdowns: true,
        links: [
            {
                name: 'profile',
                linkTo: '/profile'
            },

            {
                name: 'account ',
                linkTo: '/account'
            },


        ]

    }









]