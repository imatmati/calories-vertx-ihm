import React, {
    Component
} from 'react'
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

export default class Page extends Component {

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

    getAliment(alimentSelected) {
        fetchAlimentById(alimentSelected[0]._id).then(data => {
            this.setState({
                aliment: data
            })
        });
    }

    calculate(evt) {
      calculateCalorie(this.state.aliment._id).then(data=> {
        this.setState({
            aliment: data[0]
        });

      });
    }

    render() {
      console.log ("render")
      console.log (this.state.aliment.calories && this.columnsWithCalories || this.columns)
      console.log ("this.state.aliment.calories" ,this.state.aliment.calories)
        return (<div>
                    <Typeahead options = { this.state.alimentNames } labelKey = { "ORIGFDNM" } onChange = {this.getAliment.bind(this)}  placeholder = "Nom d'aliments"/>
                    {this.state.aliment && <button type="button" className="btn btn-primary" onClick={this.calculate.bind(this)}>Calcul Calories</button>}

                    { this.state.aliment.calories && <div>
                      <div>Calories présentes</div>
                          <Griddle  key={this.state.aliment.calories} columnMetadata={this.columnsNames}
                             showPager={false}  results={this.state.aliment && [this.state.aliment] || []}
                             columns={["ORIGFDNM", "proteines", "glucides", "lipides", "calories"]}
                             noDataMessage="Vous n'avez pas encore choisi votre aliment" />
                      </div>
                      ||
                      <div>
                          <div>Calories absentes</div>
                           <Griddle key={this.state.aliment.calories} columnMetadata={this.columnsNames}
                              showPager={false}  results={this.state.aliment && [this.state.aliment] || []}
                              columns={ ["ORIGFDNM", "proteines", "glucides", "lipides"]}
                              noDataMessage="Vous n'avez pas encore choisi votre aliment" />
                       </div>
                     }
                </div>
        );
    }


}
