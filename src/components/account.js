import React, {Component} from "react"
import {base_url} from "../functions/constants.js"

class Account extends Component {
  state = {
    showButtons: true,
    action: null,
    username: "",
    pword: "",
    confpword: "",
    error: null
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    let endpoint = base_url
    let requestBody = {}
    if (this.state.action === "create") {
      endpoint += "/users"
      requestBody = {
        username: this.state.username,
        password: this.state.pword,
        password_confirmation: this.state.confpword
      }
    } else {
      endpoint += "/users/login"
      requestBody = {
        username: this.state.username,
        password: this.state.pword
      }
    }
    fetch(endpoint, {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })
    .then(response => response.json())
    .then(json => this.handleResponse(json))
    .catch(error => console.log(error))
  }
  handleResponse = (data) => {
    if (data.password) {
      this.setState({
        error: "Please check your password and try again"
      })
    } else if (data.message) {
      this.setState({
        error: data.message
      })
    } else if (data.username[0] === "has already been taken") {
      this.setState({
        error: "That username has already been taken. Try another one!"
      })
    } else if (data.user_id) {
      this.setState({
        showButtons: true,
        action: null,
        username: "",
        pword: "",
        confpword: "",
        error: null
      })
      this.props.setSession(data)
    }
  }
  render() {
    return (
      <div className="account">
        {
          this.state.action === null ?
          <h3 id="account-header">Create your Account or Log In to train with The Sensei</h3>
          : null
        }
        {
          this.state.showButtons ?
          <div className="account-actions">
            <button onClick={() => {
              this.setState({
                action: "create",
                showButtons: false})
            }}>Create Account</button>
            <button className="button-primary" onClick={() => {
              this.setState({
                action: "login",
                showButtons: false})
            }}>Log In</button>
          </div>
          : null
        }
        {
          this.state.action === "create" ?
          <div className="create-account">
            <h3 id="account-header">Create your Account, and begin training!</h3>
            <form
              className="account-form"
              onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="twelve columns">
                  <input className="form-field u-full-width"
                    id="username"
                    type="text"
                    value={this.state.username}
                    placeholder="username"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input className="form-field u-full-width"
                    id="pword"
                    type="password"
                    value={this.state.pword}
                    placeholder="password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input className="form-field u-full-width"
                    id="confpword"
                    type="password"
                    value={this.state.confpword}
                    placeholder="confirm password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input
                    className="button-primary u-full-width"
                    type="submit"
                    value="Create Account"
                  />
                </div>
              </div>
            </form>
            <p id="account-toggle" onClick={() => {
              this.setState({
                action: "login",
                showButtons: false,
                error: null
              })
            }}>Log in to an existing account</p>
            {
              this.state.error !== "" ?
              <p id="error">{this.state.error}</p>
              : null
            }
          </div>
          : null
        }
        {
          this.state.action === "login" ?
          <div className="log-in">
            <h3 id="account-header">Log in to continue your training!</h3>
            <form className="account-form"
              onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="twelve columns">
                  <input className="form-field u-full-width"
                    id="username"
                    type="text"
                    value={this.state.username}
                    placeholder="username"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input className="form-field u-full-width"
                    id="pword"
                    type="password"
                    value={this.state.pword}
                    placeholder="password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input className="button-primary u-full-width"
                    type="submit"
                    value="Log In"
                  />
                </div>
              </div>
            </form>
            <p id="account-toggle" onClick={() => {
              this.setState({
                action: "create",
                showButtons: false,
                error: null
              })
            }}>Can't Log In? Create an Account</p>
            {
              this.state.error !== "" ?
              <p id="error">{this.state.error}</p>
              : null
            }
          </div>
          : null
        }
        <div id="sensei-image"></div>
      </div>
    )
  }
}

export default Account
