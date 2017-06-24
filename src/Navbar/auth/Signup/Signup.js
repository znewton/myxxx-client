import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fauth from 'firebase/auth';
import GoogleButton from '../GoogleButton/GoogleButton';

export default class Signup extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    }
  }
  onChange (name, value) {
    this.setState({[name]: value});
  }
  signup(custom) {
    if (custom) {
      if (this.state.password !== this.state.password_confirmation) {
        this.setState({error: 'Passwords must match'})
      }
      fauth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => this.setState({error: error.message}))
        .then(() => {
          this.props.close();
        });
    } else {
      let provider = new fauth.GoogleAuthProvider();
      fauth.signInWithRedirect(provider);
      fauth.getRedirectResult().then(result => {
        this.props.close();
      }).catch(error => this.setState({error: error.message}))
    }
  }
  render () {
    return (
      <div className="Signup">
        <div>
          <div className="error">{this.state.error}</div>
          <div>
            <input type="email"
              name="email"
              value={this.state.email}
              onChange={(e) => this.onChange('email', e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <input type="password"
              name="password"
              value={this.state.password}
              onChange={(e) => this.onChange('password', e.target.value)}
              placeholder="Password"
            />
          </div>
          <div>
            <input type="password"
              name="password_confirmation"
              value={this.state.password_confirmation}
              onChange={(e) => this.onChange('password_confirmation', e.target.value)}
              placeholder="Confirm Password"
            />
          </div>
          <div>
            <button
              className="btn"
              disabled={!this.state.email || !this.state.password || !this.state.password_confirmation}
              onClick={() => this.signup(true)}
            >Signup</button>
          </div>
        </div>
        <div className="or">or</div>
        <div>
          <GoogleButton type="up" onClick={() => this.signup(false)} />
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  close: PropTypes.func.isRequired
}

Signup.defaultProps = {}
