const vorterx = require('../client');
const { makeInMemoryStore } = require('@iamrony777/baileys');
const { getBuffer } = require('../_getBuffer');
const store = makeInMemoryStore({ logger: P().child({ level: 'silent' }) });

store.bind = (event) => {};
store.unbind = (event) => {};
store.bind(vorterx.ev);
vorterx.ev.on('group-participants.update', async (m, { participants, gcName }) => {
    
    try {
        const M3TA = participants[0];
        const N3ME = `*@${M3TA.split("@")[0]}*`;
        const M3TA_IMG = await getUserProfilePicture(M3TA);
        const GCPP = await getUserProfilePicture(M3TA);
        const membar = participants.length;
        const WLCM = await getBuffer(M3TA_IMG);
        const LEFT = await getBuffer(M3TA_IMG);

        const GET_BUFFER = await getBuffer(M3TA_IMG);
        const MODS = `*😏HELLO*: ${N3ME}\n\n *Welcome to*: ${gcName}\n\n*❤️Enjoy the funny with everyone* $`;

        if (MODS) {
            await vorterx.sendMessage(m.id, { text: MODS });
        }
    } catch (error) {
      PP3ERR(error);
    }

    if (m.action === 'remove') {
        const SUDO = `*GOODBYE*: ${N3ME}\n\n*🖐️Will miss you ya_* $`;

        if (SUDO) {
            await vorterx.sendMessage(m.id, { text: SUDO });
        }
    }
});

async function get_ProfilePicture(M3TA) {
    try {
        return await vorterx.profilePictureUrl(M3TA, 'image');
    } catch (error) {
        return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60';
    }
}

function PP3ERR(error) {
    console.error(error.message);

}
