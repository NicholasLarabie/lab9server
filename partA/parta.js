const EventEmitter = require('events');
const fs = require('fs');

class HauntedMansion extends EventEmitter {
    enterRoom(name, room) {
        console.log(`\n${name} enters the ${room}...`);
        this.emit('enterRoom', name, room);
    }

    scare(name, room) {
        console.log(`Boo! ${name} has been scared in the ${room}!`);
        this.emit('scare', name, room);
    }

    exit(name, room) {
        console.log(`${name} exits the ${room} safely.`);
        this.emit('exit', name, room);
    }
}

const mansion = new HauntedMansion();
const humans = ['Molly', 'Kerri', 'Alec', 'Sheridan'];
const scareCount = { humans: 0, monsters: 0};
const roomCount = {};


mansion.on('enterRoom', (name, room) => {
    mansion.scare(name, room);
});


mansion.on('enterRoom', (name, room) => {
    const time = new Date().toLocaleTimeString();
    fs.appendFileSync('mansion.log', `${time}: ${name} entered the ${room}\n`);
});


mansion.once('enterRoom', (name, room) => {
    console.log(`A ghost appears for the first visitor: ${name} in the ${room}!`);
});


mansion.on('scare', (name, room) => {
    if (humans.includes(name)) {
        scareCount.humans++;
    } else {
        scareCount.monsters++;
    }

    if (!roomCount[room]) roomCount[room] = 0;
    roomCount[room]++;
});


function monsterScareListener(name, room) {
    if (!humans.includes(name)) {
        console.log(`${name} waits in the ${room} for unsuspecting prey...`);
        mansion.removeListener('scare', monsterScareListener);
    }
}

mansion.on('scare', monsterScareListener);


mansion.once('exit', () => {
    console.log('\nFinal scare count:', scareCount);
    console.log('\nFinal room count:', roomCount);
});

mansion.enterRoom('Molly', 'Foyer');
mansion.enterRoom('Dracula', 'Library');
mansion.enterRoom('Kerri', 'Library');
mansion.enterRoom('Medusa', 'Bathroom');
mansion.enterRoom('Alec', 'Kitchen');
mansion.enterRoom('Frankenstein', 'Hallway');
mansion.enterRoom('Sheridan', 'Basement');

mansion.exit('Molly', 'Foyer');
mansion.exit('Dracula', 'Library');
mansion.exit('Kerri', 'Library');
mansion.exit('Medusa', 'Bathroom');
mansion.exit('Alec', 'Kitchen');
mansion.exit('Frankenstein', 'Hallway');
mansion.exit('Sheridan', 'Basement');