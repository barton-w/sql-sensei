import React, {Component} from "react"
import clientSideValidation from "../functions/clientSideValidation.js"
import evaluate from "../functions/evaluate.js"
import {base_url} from "../functions/constants.js"
import "../App.css"

class Query extends Component {
  state = {
    query: "",
    results: [],
    error: "",
    sensei: ""
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  handleSubmit = () => {
    //event.preventDefault()
    const queryCheck = clientSideValidation(this.state.query)
    if (queryCheck.syntax) {
      fetch(base_url + "/query", {
        body: JSON.stringify({query_statement: queryCheck.query}),
        method: "POST",
        headers: {
          "Accept":"application/json",
          "Content-Type":"application/json",
          "Authorization":`Bearer ${this.props.session}`
        }
      })
      .then(response => response.json())
      .then(json => this.handleResponse(json))
      .catch(error => console.log(error))
    } else {
      this.setState({
        results: [],
        error: queryCheck.error
      })
    }
  }
  handleResponse = (response) => {
    if (response.syntax) {
      this.setState({
        results: response.results,
        error: ""
      })
    } else if (response.syntax === false) {
      this.setState({
        results: [],
        error: this.handleErrors(response.error)
      })
    } else if (response.message) {
      this.setState({
        results: [],
        error: "The SQL Sensei says: " + response.message
      })
    } else {
      this.setState({
        results: [],
        error: "The SQL Sensei doesn't like your query. Try again."
      })
    }
  }
  handleErrors = (str) => {
    if (/^PG/.test(str)) {
      let error = str.toLowerCase()
      error = error.replace(/\n/g, " ").replace(/\\/g, "").replace(/"/g, "'")
      const errorMessage = error.split("error: ")[1].split(" line")
      return "The SQL Sensei spots a syntax error: " + errorMessage[0]
    } else {
      return str
    }
  }
  getTableHeaders = () => {
    return Object.keys(this.state.results[0])
  }
  renderTableHeaders = () => {
    const headers = this.getTableHeaders()
    return headers.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }
  renderTableData = () => {
    const headers = this.getTableHeaders()
    const tabledata = []
    for (let i=0; i < this.state.results.length; i++) {
      const children = []
      for (let j=0; j < headers.length; j++) {
        children.push(<td key={j}>{this.state.results[i][headers[j]]}</td>)
      }
      tabledata.push(<tr key={i}>{children}</tr>)
    }
    return tabledata
  }
checkWithTheSensei = (training, query, session) => {
  evaluate(training, query, session).then(response => console.log("Decision in React:", response))
}
  render() {
    return (
      <div className="query">
        <form id="query-form">
          <textarea
            id="query"
            type="textarea"
            placeholder="write your query"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
        <button onClick={() => {
          this.handleSubmit()
        }}>
          Test It
        </button>
        <button
          className="button-primary"
          onClick={() => {
          this.checkWithTheSensei(this.props.training, this.state.query, this.props.session)
        }}
          >Prove Yourself to The SQL Sensei!</button>
          <div className="sensei">
            {
              this.state.sensei !== "" ?
              <h4>{this.state.sensei}</h4>
              : null
            }
          </div>
        <div className="error">
          {
            this.state.error !== "" ?
            <h5>{this.state.error}</h5>
            : null
          }
        </div>
        <div className="results">
          {
            this.state.results.length > 0 ?
              <table>
                <thead>
                  <tr>
                    {this.renderTableHeaders()}
                  </tr>
                </thead>
                <tbody>
                  {this.renderTableData()}
                </tbody>
              </table>
            : null
          }
        </div>
      </div>
    )
  }
}

export default Query
