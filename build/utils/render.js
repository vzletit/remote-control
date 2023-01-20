export default (data, prefix = '') => {
    const parsedDataArr = data.split[' '];
    console.log(prefix !== undefined
        ? `${prefix} ${parsedDataArr[0]}`
        : parsedDataArr[0]);
};
