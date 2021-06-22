export default {
    // app specific
    displayName: 'math-app',
    QUERY_PAGE_SIZE: 10,
    timerTick: 30, // seconds
    // generic config
    defaultAnimationDelay: 250, // ms
    defaultListEndReachedThreshold: 0.2,
    delayTextInputDebounce: 250,
    longAnimationDelay: 1000, // ms
    prefixReducer: 'math-app',
    dateFormat: 'MM/dd/yyyy',
    defaultCurrency: {
        symbol: '$',
    },
    FACEBOOK_APP_ID: '976964656413397',
    // env
    isDev: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    phoneRegExp: /^[0-9]{8}$/,
    emailRegExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordRegExp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    minLengthUsername: 3,
};
