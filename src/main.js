// https://regexper.com/#%2F%5B%3C%3E%5C%2F%5Cu2028%5Cu2029%5D%2Fg
const UNSAFE_CHARS_REGEXP = /[<>\/\u2028\u2029]/g;

const ESCAPED_CHARS = new Map([
    ['<'     , '\\u003C'],
    ['>'     , '\\u003E'],
    ['/'     , '\\u002F'],
    ['\u2028', '\\u2028'],
    ['\u2029', '\\u2029'],
]);

const escapeUnsafeChars = (unsafeChar) => {
    return ESCAPED_CHARS.get(unsafeChar);
};

const replacer = () => {
    return (key, value) => {
        if (value instanceof Object && !(value instanceof Array)) {
            return Object.keys(value).reduce((obj, k) => {
                const saneValue = (typeof value[k] === "string") ? value[k].replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars) : value[k];
                const saneKey = k.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars);
                return {...obj, ...{ [saneKey]: saneValue }};
            },{});
        }      
        return value;
    };
};

export default replacer;
