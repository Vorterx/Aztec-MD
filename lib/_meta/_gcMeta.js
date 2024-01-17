const vorterx = require('../client');
const { makeInMemoryStore } = require('your-store-library'); // Replace 'your-store-library' with the actual library name
const { getBuffer } = require('../_getBuffer');

const store = makeInMemoryStore({ logger: P().child({ level: 'silent' }) });

store.bind = (event) => {};
store.unbind = (event) => {
           
};
store.bind(vorterx.ev);

vorterx.ev.on('group-participants.update', async (m, { participants, gcName }) => {
    
    try {
        const userId = participants[0];
        const userName = `*@${userId.split("@")[0]}*`;
        const user_IMG = await getUserProfilePicture(userId);
        const ppgroup = await getUserProfilePicture(userId);
        const membar = participants.length;
        const WLCM = await getBuffer(user_IMG);
        const LEFT = await getBuffer(user_IMG);

        const get_bff = await getBuffer(user_IMG);
        const mods = `*😏HELLO*: ${userName}\n\n *Welcome to*: ${gcName}\n\n*❤️Enjoy the funny with everyone* $`;

        if (mods) {
            await vorterx.sendMessage(m.id, { text: mods });
        }
    } catch (error) {
      PPError(error);
    }

    if (m.action === 'remove') {
        const sudo = `*GOODBYE*: ${userName}\n\n*🖐️Will miss you ya_* $`;

        if (sudo) {
            await vorterx.sendMessage(m.id, { text: sudo });
        }
    }
});

async function get_ProfilePicture(userId) {
    try {
        return await vorterx.profilePictureUrl(userId, 'image');
    } catch (error) {
        return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60';
    }
}

function PPError(error) {
    console.error(error.message);

}
