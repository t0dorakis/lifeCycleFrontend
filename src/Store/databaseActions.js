export const creatureInitialState = {
    creature: {
        name: 'Life Cycle',
        created: {
            seconds: 0
        },
        id: "test",
        age: 0,
        character: 0.5,
        narcism: 2,
        stepsLeft: 9,
        alive: true
    },
    lastSpokenSentence: 'nothing spoken',
    lastHeardSentence: {
        text: 'nothing heard',
        sentiment: 0
    }
};

export const databaseActions = {
    newCreature: (state, action) => ({ creature: action.payload }),
    lastSpokenSentence: (state, action) => {
        console.log(action.payload)
        return {lastSpokenSentence: action.payload}
    },
    lastHeardSentence: (state, action) => {
        if (action.payload.text) {
            return { lastHeardSentence: action.payload}
        }
    },
    getAlive: (state, action) => {
        return { alive: action.payload }
    },
};