const StringUtils = (() => {
    const isNotEmpty = (value) => value.trim() !== '';

    const isValidEmail = (email) =>
        email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    const isValidPassword = (value) => value.trim().length >= 6;

    return {
        isNotEmpty,
        isValidEmail,
        isValidPassword
    };
})();

export default StringUtils;