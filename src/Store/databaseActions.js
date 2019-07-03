export const creatureInitialState = {
    creature: {
        name: 'storeCreatureD',
        created: {
            seconds: 0
        },
        happiness: 3,
        narcism: 2,
        stepsLeft: 9
    }
};

export const databaseActions = {
    newCreature: (state, action) => ({ creature: action.payload }),
};