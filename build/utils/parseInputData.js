const parseInputData = (rawCommand) => {
    const [fullCommand, arg1, arg2] = rawCommand.split(' ');
    const [controller, command] = fullCommand.split('_');
    return {
        controller,
        command,
        args: {
            arg1,
            arg2
        }
    };
};
export default parseInputData;
