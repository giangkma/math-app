export default {
    isLoggingEnable: false,
    timeout: 30000,
    useDummyData: false,
    unauthorizedErrorCode: 401,

    // api
    HOST:
        process.env.REACT_APP_API_HOST || 'https://math-database.herokuapp.com',
};
