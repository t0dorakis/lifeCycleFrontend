import React, { Component } from 'react';
import * as PIXI from "pixi.js";
import babyBrain from '../../assets/babyBrain.jpg';
import uvMap from '../../assets/shader/Crumpled_Foil_Normal_Map.png';
import oceanShader from '../../assets/shader/oceanShader.frag';

import { withFirebase } from '../Firebase';

class LiveData extends Component {
    constructor(props) {
        super(props);
        this.pixi_cnt = null;
        this.app = new PIXI.Application({width: 600, height: 600, transparent:false})
        this.filter = {}
        this.state = {
            loading: false,
            creature: {
                name: '',
                created: ''
            },
        };
    }
    setup = () => {
        this.app.loader.add('shader', oceanShader)
            .load(this.initialize);

    };

    initialize = (loader, res) => {
        console.log(res.shader.data)
        // Create the new filter, arguments: (vertexShader, framentSource)
        const uniform = {
         HDRMultiplier: 0.5,
         Kr: 1,
         FresnelBias: 0.1,
         FresnelExp: 0.1,
         KWater: 0.1,
         DeepColor: {type:"vec3", value:[1,1,1]},
         ShallowColor: {type:"vec3", value:[1,1,1]},
         ReflTint: {type:"vec3", value:[1,1,1]},
         sampler2D: babyBrain,
         samplerCube: uvMap,
    }
        this.filter = new PIXI.Shader(res.shader.data, uniform);
        console.log(this.filter)
        //We will create a sprite and then add it to stage and (0,0) position
        this.sprite = PIXI.Sprite.from(babyBrain)
        this.sprite.shader = this.filter
        const rect = new PIXI.Graphics();
        rect.drawRect(0, 0, 300, 300);
        // this.app.stage.addChild(this.sprite);
        this.app.stage.addChild(this.rect);


    };
    updatePixiCnt = (element) => {
        // the element is the DOM object that we will use as container to add pixi stage(canvas)
        this.pixi_cnt = element;
        //now we are adding the application to the DOM element which we got from the Ref.
        if(this.pixi_cnt && this.pixi_cnt.children.length<=0) {
            this.pixi_cnt.appendChild(this.app.view);
            //The setup function is a custom function that we created to add the sprites. We will this below
            this.setup();
        }
    };

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.creature()
            .orderBy("created", "desc")
            .limit(1)
            .onSnapshot((querySnapshot) => {
                const cities = [];
                querySnapshot.forEach((doc) => {
                    this.setState({ creature: doc.data() });
                    console.log(doc.data())
                    cities.push(doc.data().name);
                });
        });
    }

    render() {
        return (
            <div className="liveData">
                <h1 className="liveData__name">{this.state.creature.name}</h1>
                <div ref={this.updatePixiCnt} />
            </div>
        );
    }
}

export default withFirebase(LiveData);