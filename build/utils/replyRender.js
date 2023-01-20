export default (data, prefix) => {
    const separator = ' ';
    const result = data.includes(separator, 1)
        ? data.split(separator)[0]
        : data;
    console.log(prefix !== undefined
        ? `${prefix} ${result}`
        : result);
};