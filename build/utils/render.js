const reply = (data) => {
    const prefix = '<-';
    const separator = ' ';
    const result = data.includes(separator, 1)
        ? data.split(separator)[0]
        : data;
    return prefix !== undefined
        ? `${prefix} ${result}`
        : result;
};
const info = (data) => data;
const handleError = (command) => `\x1b[31mFailed processing "${command}". Either unknown command or handler error \x1b[0m`;
const socketError = () => '\x1b[31mSocket connection error \x1b[0m';
export default (data, options = { mode: 'info' }) => {
    const { mode } = options;
    const renderByMode = {
        info,
        reply,
        handleError,
        socketError
    };
    console.log(renderByMode[mode](data));
};
