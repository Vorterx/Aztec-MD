const config = require("../config");
const commands = [];

function Zenith({ get, func }) {
    const data = {
        ...get,
        function: func,
        dontAddCommandList: get.dontAddCommandList || false,
        desc: get.desc || '',
        category: get.category || 'misc',
        filename: get.filename || 'awesome',
    };
    commands.push(data);
}

const AddCommand = Zenith;

module.exports = {
    Zenith,
    AddCommand,
    commands,
};
