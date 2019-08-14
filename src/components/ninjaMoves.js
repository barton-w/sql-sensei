import React, {Component} from "react"
import {base_url} from "../functions/constants.js"

class NinjaMoves extends Component {
  state = {
    solutions: []
  }
  getSolutions = () => {
    fetch(base_url + "/solutions/user", {
      body: JSON.stringify({
        user_id: this.props.userId
      }),
      method: "POST",
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${this.props.session}`
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        solutions: data.solutions
      })
    })
    .catch(error => console.log(error))
  }
  deleteSolution = (id) => {
    fetch(base_url + `/solutions/${id}`, {
      body: JSON.stringify({
        user_id: this.props.userId
      }),
      method: "DELETE",
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${this.props.session}`
      }
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      let solutionsArray = this.state.solutions
      console.log("Solutions Array: ", solutionsArray)
      for (let i = 0; i < solutionsArray.length; i++) {
        if (solutionsArray[i].id === data.solutions.id) {
          solutionsArray.splice(i, 1)
        }
      }
      this.setState({
        solutions: solutionsArray
      })
    })
    .catch(error => console.log(error))
  }
  componentDidMount() {
    this.getSolutions()
  }
  render() {
    return(
      <div className="saved-ninja-moves">
        <h3>Your Saved Ninja Moves</h3>
          {
            this.state.solutions.length > 0 ?
              <div className="ninja-moves-list">
                {
                  this.state.solutions.map((solution) => {
                    return(
                      <div
                        key={solution.id}
                        className="single-ninja-move">
                        <h5>{solution.training}</h5>
                        <p>{solution.solution}</p>
                        <p
                          onClick={() => {
                            this.deleteSolution(solution.id)
                          }}
                          id="remove"
                          >remove</p>
                      </div>
                    )
                  })
                }
              </div>
            : <h5>Nothing saved yet. Keep training!</h5>
          }
      </div>
    )
  }
}

export default NinjaMoves
