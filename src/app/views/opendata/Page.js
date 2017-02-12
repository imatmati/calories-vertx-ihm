import React, {
    Component
} from 'react'
import Griddle from 'griddle-react'
import {
    Typeahead
} from 'react-bootstrap-typeahead';
import {
    fetchAlimentsNames,
    fetchAlimentById
}
from "../../services"
import shallowCompare from 'react-addons-shallow-compare';

export default class Page extends Component {

    componentDidMount() {
        fetchAlimentsNames().then(data => {
            this.setState({
                alimentNames: data
            })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    constructor(props) {
        super(props);
        this.state = {
            alimentNames: [],
            alimentId: null
        };
    }

    getAliment(alimentSelected) {
        fetchAlimentById(alimentSelected[0]._id).then(data => {
            this.setState({
                aliment: data
            })
        });
    }

    calculate() {
      
    }

    render() {
        return (<div>
                    <Typeahead options = { this.state.alimentNames } labelKey = { "ORIGFDNM" } onChange = {this.getAliment.bind(this)}  placeholder = "Nom d'aliments"/>
                    {this.state.aliment && <button type="button" className="btn btn-primary" onClick={this.calculate.bind(this)}>Calcul Calories</button>}
                    <Griddle columnMetadata={ [{"columnName": "ORIGFDNM", "displayName": "Nom"},{"columnName": "proteines", "displayName": "Protéines"}, {"columnName": "glucides", "displayName": "Glucides"},  {"columnName": "lipides", "displayName": "Lipides"}]}
                        showPager={false}  results={this.state.aliment && [this.state.aliment] || []} columns={["ORIGFDNM","proteines", "glucides", "lipides"]}  noDataMessage="Vous n'avez pas encore choisi votre aliment" />
                </div>
        );
    }
}
