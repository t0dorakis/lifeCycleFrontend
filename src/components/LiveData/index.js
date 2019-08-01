import React, { useEffect } from 'react';
import '../../style.scss'
import { useStore } from "../../Store/useStore";
import * as moment from 'moment';


import { withFirebase } from '../Firebase';

const LiveData = (props) => {
    const { state, dispatch } = useStore();
    const newCreature = (payload) =>  dispatch({type: 'newCreature', payload: payload})
    const lastSpokenSentence = (payload) =>  dispatch({type: 'lastSpokenSentence', payload: payload})
    const lastHeardSentence = (payload) =>  dispatch({type: 'lastHeardSentence', payload: payload})
    const getAlive = (payload) =>  dispatch({type: 'getAlive', payload: payload})

    useEffect(() => {
        console.log("componentDidMount");

        const unsubscribeCreature = props.firebase.creature()
            .orderBy("created", "desc")
            .limit(1)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const creature = {
                        id: doc.id,
                        name: doc.data().name,
                        character: doc.data().character,
                        age: doc.data().age,
                        created: doc.data().created
                    }
                    newCreature(creature)
                });
            });
            const unsubscribeSpoken = props.firebase.state()
                .doc('currentCreature')
                .onSnapshot((doc) => {
                    // console.log("Current heardSentences: ", doc.data());
                    lastSpokenSentence(doc.data().lastSpokenSentence)
                    lastHeardSentence(doc.data().lastHeardSentence)
                    getAlive(doc.data().alive)

                });
        // if (state.creature.id !== "test") {
        // }
        return () => {
            console.log("componentWillUnmount");
            unsubscribeCreature()
            unsubscribeSpoken()
        };
    }, []); // empty-array means don't watch for any updates


    const parseDate = (time) => moment.unix(time).format("dddd, MMMM Do YYYY, h:mm:ss a");

    const parseSentiment = (score) => {
        if (score < -0.5) {
            return 'Perceived as highly negative'
        } else if (score < 0) {
            return 'Perceived as negative'
        } else if (score === 0) {
            return 'Neutral'
        }  else if (score < 0.5) {
            return 'Perceived as positive'
        }   else {
            return 'Perceived as highly positive'
        }
    }

    // const date = parseDate(state.creature.created.seconds)
    return (
            <div className="liveData">
                <div className="row">
                    {state.alive === false &&
                    <div>
                        <span className="liveData__name">Life Cycle</span>
                        <span className="liveData__name__under">Life Cycle</span>
                    </div>
                    }
                    {state.alive === true &&
                    <div>
                        <span className="liveData__name">{state.creature.name}</span>
                        <span className="liveData__name__under">{state.creature.name}</span>
                    </div>
                    }
                    {state.alive === true &&
                    <table className="liveData__table">
                        <tbody>
                        <tr>
                            <td className="liveData__table__key">born:</td>
                            <td className="liveData__table__value">{parseDate(state.creature.created.seconds)}</td>
                        </tr>
                        <tr>
                            <td className="liveData__table__key">time left:</td>
                            <td className="liveData__table__value">{7 - state.creature.age}</td>
                        </tr>
                        <tr>
                            <td className="liveData__table__key">Happiness:</td>
                            <td className="liveData__table__value">{Math.round(state.creature.character * 100)}%</td>
                        </tr>
                        <tr>
                            <td className="liveData__table__key">Despair:</td>
                            <td className="liveData__table__value">{Math.round(state.creature.age * 10 - (state.creature.character * 50))}%</td>
                        </tr>
                        <tr>
                            <td className="liveData__table__key">Narcism:</td>
                            <td className="liveData__table__value">{Math.round(state.creature.age * 10 + (state.creature.character * 30))}%</td>
                        </tr>
                        </tbody>
                    </table>
                    }
                </div>
                <div className="row">
                    {state.creature.age > 7 &&
                        <div className="liveData__kill__box">
                            <span className="liveData__kill">Kill it!</span>
                        </div>
                    }
                </div>


                <div className="row">
                    <div className="liveData__sentence">
                        <div className="liveData__sentence__spoken">
                            <div className="liveData__sentence__key">Creature said:</div>
                            <div className="liveData__sentence__value">{state.lastSpokenSentence}</div>
                        </div>
                        <div className="liveData__sentence__heard">
                            <div className="liveData__sentence__key">Creature heard: (<span> {parseSentiment(state.lastHeardSentence.sentiment.score)}</span>)</div>
                            <div className="liveData__sentence__value">{state.lastHeardSentence.text}</div>
                            </div>
                    </div>
                </div>

            </div>
        );
}

export default withFirebase(LiveData);