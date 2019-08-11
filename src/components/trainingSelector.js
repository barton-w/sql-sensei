import React, {Component} from "react"
import trainingContent from "../functions/trainingContent.js"
import Query from "./query.js"

class TrainingSelector extends Component {
  state = {
    training: "joinTraining1"
  }
  handleSelect = (event) => {
    this.setState({
      training: event.target.value
    })
  }
  render() {
    return (
      <>
        <h2>{this.props.username} - Choose Your Ninja Level!</h2>
        <button>Joins</button>
        <button>Aggregate Functions</button>
        <select onChange={this.handleSelect}>
          <option
            value="joinTraining1"
            default
            >Ninja Level 1</option>
          <option
            value="joinTraining2"
            >Ninja Level 2</option>
          <option
            value="joinTraining3"
            >Ninja Level 3</option>
          <option
            value="joinTraining4"
            >Ninja Level 4</option>
        </select>
        <div className="situation">
          <h4>Situation</h4>
          <h5>{trainingContent(this.state.training).situationHeader}</h5>
          <>
            {
              trainingContent(this.state.training).situationBody.map((item, index) => {
                return(
                  <p key={index}>{item}</p>
                )
              })
            }
          </>
        </div>
        <div className="ninja-moves">
          <h4>Your Ninja Moves</h4>
          <p>{trainingContent(this.state.training).ninjaMoves}</p>
        </div>
        <Query
          training={this.state.training}
          userId={this.props.userId}
          username={this.props.username}
          session={this.props.session}
        />
      </>
    )
  }
}

export default TrainingSelector
