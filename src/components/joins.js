import React, {Component} from "react"
import trainingContent from "../functions/trainingContent.js"
import Query from "./query.js"

class Joins extends Component {
  state = {
    training: "joinTraining1"
  }
  handleSelect = (event) => {
    this.setState({
      training: event.target.value
    })
  }
  render() {
    return(
      <div className="training">
        <div className="choose-move">
          <h4>Choose Your Ninja Move</h4>
          <select id="moves-select" onChange={this.handleSelect}>
            <option
              value="joinTraining1"
              default
              >Ninja Move 1</option>
            <option
              value="joinTraining2"
              >Ninja Move 2</option>
            <option
              value="joinTraining3"
              >Ninja Move 3</option>
            <option
              value="joinTraining4"
              >Ninja Move 4</option>
          </select>
        </div>
        <div className="training-summary">
          <div className="situation">
            <h5 id="header">Situation</h5>
            <h6 id="situation-content">
              {trainingContent(this.state.training).situationHeader}</h6>
            <>
              {
                trainingContent(this.state.training).situationBody.map((item, index) => {
                  return(
                    <p id="situation-content" key={index}>{item}</p>
                  )
                })
              }
            </>
          </div>
          <div className="ninja-moves">
            <h5 id="header">Your Ninja Moves</h5>
            <p id="situation-content">
              {trainingContent(this.state.training).ninjaMoves}</p>
            <a id="postgres" target="_blank" rel="noopener noreferrer" href="https://www.postgresql.org/docs/9.2/sql-syntax.html">PostgreSQL syntax only</a>
          </div>
        </div>
        <Query
          training={this.state.training}
          userId={this.props.userId}
          username={this.props.username}
          session={this.props.session}
        />
      </div>
    )
  }
}

export default Joins
