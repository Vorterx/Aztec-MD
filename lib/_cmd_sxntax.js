var config = require("../config");
var commands = [];

function Zenith(get, func) {
    var data = get;
    data.function = func;
    if (!get.desc) get.desc = '';
    if (!data.isOwner) data.isOwner = false;
    if (!get.category) data.category = 'misc';
    if (!get.filename) data.filename = "Not Provided";
    commands.push(data);
    return data;
}

module.exports = {
    cmd: Zenith,
    AddCommand: Zenith,
    Function: Zenith,
    Module: Zenith,
    commands,
};
        
