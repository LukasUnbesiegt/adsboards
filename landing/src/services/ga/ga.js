
const setPageAndSendToGA = url => {
    window.ga('set', 'page', url);
    window.ga('send', 'pageview');
};

export const trackGoogleAnalytics = location => {
    if (window.ga) {
        if (location.pathname == '/sign-up') {
            let url = location.pathname;
            this.setPageAndSendToGA(url);
        }

        if (location.search.length == 10) {

            // here we are using search Params, so we concat it to the url string

            let url = location.pathname + location.search;
            this.setPageAndSendToGA(url);
        }
    }
};