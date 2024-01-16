store.bind(vorterx.ev)

vorterx.ev.on('group-participants.update', async (info) => {
           if (info.action == 'add') {
            if (wtext !== false) await sock.sendMessage(info.id, { text: wtext });
           } else if (info.action == 'remove') {
            
            if (gtext !== false) await sock.sendMessage(info.id, { text: gtext });
           }
        });
