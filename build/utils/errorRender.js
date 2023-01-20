export default (command) => {
    const result = `Failed processing "${command}". Either unknown command or handler error.`;
    console.log('\x1b[31m' + result + '\x1b[0m');
};
