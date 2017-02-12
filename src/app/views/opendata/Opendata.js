import React , {Component} from 'react'
import Page from './Page'
import {
    fetchAliments
}
from "../../services"

export default class Opendata extends Component {

  state = {
    aliments : []
  }
  componentDidMount() {
    fetchAliments().then(aliments => {
            this.setState({
                aliments

            })
        }).catch(err => {
            console.log ("err",err)
        })
  }

  render() {
    return(<Page results={this.state.aliments} />)
  }
}
