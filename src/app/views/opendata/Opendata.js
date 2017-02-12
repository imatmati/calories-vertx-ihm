import React , {Component} from 'react'
import Griddle from 'griddle-react'
import {
    Typeahead
} from 'react-bootstrap-typeahead';
import {
    fetchAlimentsNames,
    fetchAlimentById,calculateCalorie
}
from "../../services"
import shallowCompare from 'react-addons-shallow-compare';
import {Jumbotron}      from '../../components';

export default class Opendata extends Component {

  columns = ["ORIGFDNM","proteines", "glucides", "lipides"];
  columnsNames = [{"columnName": "ORIGFDNM", "displayName": "Nom"},{"columnName": "proteines", "displayName": "Protéines"},
                  {"columnName": "glucides", "displayName": "Glucides"}, {"columnName": "lipides", "displayName": "Lipides"},
                  {"columnName": "calories", "displayName": "Calories"}];
  columnsWithCalories =  this.columns.concat(["calories"])

    componentDidMount() {
        fetchAlimentsNames().then(data => {
            this.setState({
                alimentNames: data
            })
        })
    }



    constructor(props) {
        super(props);
        this.state = {
            alimentNames: [],
            aliment : {}
        };
    }

    getAliment() {
        fetchAlimentById(this.state.alimentSelected[0]._id).then(data => {
            this.setState({
                aliment: data
            })
        });
    }

    setAliment(alimentSelected) {
      this.setState({
        alimentSelected
      })

    }

    calculate(evt) {
      calculateCalorie(this.state.aliment._id).then(data=> {
        this.setState({
            aliment: data[0]
        });

      });
    }

    render() {
        return (<Jumbotron>
          <div className="row">
              <div className="col-md-6 col-xs-12">
                    <Typeahead options = { this.state.alimentNames } labelKey = { "ORIGFDNM" } onChange={this.setAliment.bind(this)} placeholder = "Nom d'aliments"/>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn btn-primary" onClick={this.getAliment.bind(this)}>Envoi</button>
            </div>
              <div className="col-md-3">
                {this.state.aliment && <button type="button" className="btn btn-primary" onClick={this.calculate.bind(this)}>Calcul Calories</button>}
            </div>
          </div>
          <div className="row top-buffer">
            <div className="col-md-12">
                    <Griddle  key={this.state.aliment.calories} columnMetadata={this.columnsNames}
                             showPager={false}  results={this.state.aliment && [this.state.aliment] || []}
                             columns={this.state.aliment.calories && this.columnsWithCalories || this.columns}
                             noDataMessage="Vous n'avez pas encore choisi votre aliment" />
                </div>
           </div>
          </Jumbotron>
        );
    }
}
