import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from 'react-redux';
import "../static/css/email_edit.css";

class EmailEditor extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { setForm } = this.props;

        setForm(name, value);
    
}

  render() {
    const { sendEmail } = this.props;

        
return (
            <div className="pure-u-1 pure-form">
        <div className="email-content">
          <div className="email-content-header pure-g">
            <div className="pure-u-1-2">
              <h1 className="email-content-title">
                                <label>
                  <input
                    type="text"
                    className="pure-input-1 email-subject-edit"
                    name="emailSubject"
                    value={this.props.emailSubject}
                    onChange={this.handleChange}
                                </label>
                            </h1>
                            <p className="email-content-subtitle">
                                From  <a>Current User</a>
                            </p>
                        </div>
            <div className="email-content-controls pure-u-1-2">
              <button
                className="secondary-button pure-button"
                onClick={() => sendEmail(this.props.emailSubject, this.props.emailBody)}>
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="email-content-body">
          <textarea
            className="pure-input-1"
            name="emailBody"
            value={this.props.emailBody}
            onChange={this.handleChange}
            style={{ height: '400px' }}
          />
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
    emailBody: state.email.get("emailBody"),
  emailSubject: state.email.get('emailSubject'),
});

export default connect(
  mapStateToProps,
  actions
)(EmailEditor);
