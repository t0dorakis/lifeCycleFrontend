import React, { useCallback } from 'react';
import '../../style.scss'
import { useStore } from "../../Store/useStore";
import * as moment from 'moment';


import { withFirebase } from '../Firebase';

const LiveData = (props) => {

    const { state, dispatch } = useStore();
    const newCreature = (payload) =>  dispatch({type: 'newCreature', payload: payload})

    let date;
        // this.setState({ loading: true });

        props.firebase.creature()
            .orderBy("created", "desc")
            .limit(1)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    newCreature(doc.data())
                    console.log(state.creature)
                    date = moment(doc.data().created.seconds).format("dddd, MMMM Do YYYY, h:mm:ss a");
                    console.log(date)
                });
        });
    const parseDate = (time) => moment.unix(time).format("dddd, MMMM Do YYYY, h:mm:ss a");

    // const date = parseDate(state.creature.created.seconds)
    return (
            <div className="liveData">
                <span className="liveData__name">{state.creature.name}</span>
                <span className="liveData__name__under">{state.creature.name}</span>
                <span className="liveData__name__under-line"> </span>
                <table className="liveData__table">
                    <tr>
                        <td className="liveData__table__key">born:</td>
                        <td className="liveData__table__value">{parseDate(state.creature.created.seconds)}</td>
                    </tr>
                    <tr>
                        <td className="liveData__table__key">time left:</td>
                        <td className="liveData__table__value">{state.creature.stepsLeft}</td>
                    </tr>
                    <tr>
                        <td className="liveData__table__key">Happiness</td>
                        <td className="liveData__table__value">{state.creature.happiness}</td>
                    </tr>
                    <tr>
                        <td className="liveData__table__key">Despair</td>
                        <td className="liveData__table__value">{state.creature.despair}</td>
                    </tr>
                    <tr>
                        <td className="liveData__table__key">Narcism</td>
                        <td className="liveData__table__value">{state.creature.narcism}</td>
                    </tr>
                </table>
                {/*<div ref={this.updatePixiCnt} />*/}
            </div>
        );
}

export default withFirebase(LiveData);