import React, { Component } from 'react';
import { Hero } from './Hero';
import EditHero from './EditHero';
import api from './api';
import heroesAPI from './api';

export default class Heroes extends Component {
    constructor() {
        super();
        this.state = {heroes: [], addingHero: false};
        this.handleSelect = this.handleSelect.bind(this); // this creates a vlaue for select within the handleSeect function
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnableAddMode = this.handleEnableAddMode.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    componentDidMount() {
        api.get().then(json => this.setState({ heroes: json }))
    }

    handleSelect(hero) {
        this.setState({ selectedHero: hero})
    }

    handleSave(hero) {
        let heroes = this.state.heroes;

        if(this.state.addingHero) {
            // create
            heroesAPI.create(this.state.selectedHero)
            .then(hero => {
                heroes.push(hero);
                this.setState({
                    heroes: heroes,
                    addingHero: false,
                    selectedHero: null
                });
            });
        }
        else {
            // update
            heroesAPI.update(this.state.selectedHero).then(() => {
                this.setState({selectedHero: null});
            });
        }
    }

    handleCancel() {
        this.setState({ selectedHero: null, addingHero: false})
    }

    handleChange(event) {
        let selectedHero = this.state.selectedHero;
        selectedHero[event.target.name] = event.target.value;
        this.setState({selectedher: selectedHero})
    }

    handleEnableAddMode() {
        this.setState({
            addingHero: true,
            selectedHero: {id: '', name: '', saying: ''} // need to pass in a selected hero or else we see nothing
        });
    }

    handleDelete(event, hero) {
        event.stopPropagation(); // stops the on select from firing since triggering this function requires you to click on the delete button within the heroes component
    
        api.destroy(hero).then(() => {
          let heroes = this.state.heroes;
          heroes = heroes.filter(h => h !== hero); 
          this.setState({ heroes: heroes }); // set state to all heroes that don't equal hero
    
          if (this.selectedHero === hero) {
            this.setState({ selectedHero: null });
          }
        });
    }

    render() {
        const heroes = this.state.heroes.map(hero =>
            <Hero hero={hero} onSelect={this.handleSelect} selectedHero={this.state.selectedHero} onDelete={this.handleDelete}/>
        );
        return (
            <div>
                <ul className='heroes'>
                    {
                        // Heroes
                        heroes
                    }
                </ul>
                <div className='editarea'>
                <button onClick={this.handleEnableAddMode}>Add New Hero</button>
                    <EditHero
                        addingHero={this.state.addingHero}
                        selectedHero={this.state.selectedHero}
                        onChange={this.handleChange}
                        onSave={this.handleSave}
                        onCancel={this.handleCancel}
                    />
                </div>
            </div>
        );
    }
}
