import React, {Component} from "react"
import Joins from "./joins.js"
import AggregateFunctions from "./aggregateFunctions.js"

class TrainingSelector extends Component {
  state = {
    skill: null,
    joinClass: "button",
    aggregateClass: "button"
  }
  render() {
    return (
      <>
        <h3>{this.props.username} - Choose Your Ninja Skill!</h3>
        <button
          id="ninja-skill-button"
          className={this.state.joinClass}
          onClick={() => {
          this.setState({
            skill: "joins",
            joinClass: "button-secondary",
            aggregateClass: "button"
          })
        }}>Joins</button>
        <button
          id="ninja-skill-button"
          className={this.state.aggregateClass}
          onClick={() => {
          this.setState({
            skill: "aggregate",
            joinClass: "button",
            aggregateClass: "button-secondary"
          })
        }}>Aggregate Functions</button>
        {
          this.state.skill === "joins" ?
          <Joins
            userId={this.props.userId}
            username={this.props.username}
            session={this.props.session}
          />
          : null
        }
        {
          this.state.skill === "aggregate" ?
          <AggregateFunctions
            userId={this.props.userId}
            username={this.props.username}
            session={this.props.session}
          />
          : null
        }
      </>
    )
  }
}

export default TrainingSelector
