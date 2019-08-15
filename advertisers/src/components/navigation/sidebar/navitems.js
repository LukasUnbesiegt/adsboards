
export const navitems = [


    {
        name: 'adverts',
        icon: 'fa-ad',
        linkTo: '/adverts',
        admin: false,
        dropdowns: false,

    },
    {
        name: ' find boards',
        icon: 'fa-tv',
        linkTo: '/spots',
        admin: false,
        dropdowns: false,

    },

    {
        name: 'board requests',
        icon: 'fa-paper-plane',
        linkTo: '/requests',
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
        name: 'profile',
        icon: 'fa-id-card',
        admin: false,
        dropdowns: true,
        links: [
            {
                name: 'company',
                linkTo: '/profile'
            },
            {
                name: 'account',
                linkTo: '/account'
            },


        ]

    }






]