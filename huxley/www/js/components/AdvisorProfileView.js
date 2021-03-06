/**
 * Copyright (c) 2011-2015 Berkeley Model United Nations. All rights reserved.
 * Use of this source code is governed by a BSD License (see LICENSE).
 */

'use strict';

const React = require('react');

const Button = require('components/Button');
const InnerView = require('components/InnerView');
const LogoutButton = require('components/LogoutButton');
const ConferenceContext = require('components/ConferenceContext');
const CurrentUserActions = require('actions/CurrentUserActions');
const PhoneInput = require('components/PhoneInput');
const ProgramTypes = require('constants/ProgramTypes');
const StatusLabel = require('components/StatusLabel');
const Table = require('components/Table');
const TextInput = require('components/TextInput');
const TextTemplate = require('components/TextTemplate');
const User = require('utils/User');
const _handleChange = require('utils/_handleChange');

const AdvisorProfileViewText = require('text/AdvisorProfileViewText.md');

const AdvisorProfileView = React.createClass({
  // #489
  // The below code was commented out due to
  // https://github.com/reactjs/react-router/blob/master/upgrade-guides/v1.0.0.md#routehandler
  // see the last section. I am wary to remove for fear that we won't validate
  // propTypes: {
  //   user: React.PropTypes.object.isRequired
  // },

  contextTypes: {
    conference: React.PropTypes.shape(ConferenceContext),
    shake: React.PropTypes.func,
  },

  getInitialState: function() {
    var user = this.props.user;
    var school = User.getSchool(user);
    return {
      errors: {},
      first_name: user.first_name,
      last_name: user.last_name,
      school_name: school.name,
      school_address: school.address,
      school_city: school.city,
      school_zip_code: school.zip_code,
      primary_name: school.primary_name,
      primary_email: school.primary_email,
      primary_phone: school.primary_phone,
      secondary_name: school.secondary_name,
      secondary_email: school.secondary_email,
      secondary_phone: school.secondary_phone,
      loading: false,
      success: false,
    }
  },

  componentWillUnmount: function() {
    this._successTimout && clearTimeout(this._successTimeout);
  },

  render: function() {
    var conference = this.context.conference;
    var user = this.props.user;
    var school = User.getSchool(user);
    return (
      <InnerView>
        <TextTemplate
          firstName={user.first_name}
          schoolName={school.name}
          conferenceSession={conference.session}
          conferenceExternal={conference.external}>
          {AdvisorProfileViewText}
        </TextTemplate>
        <form onSubmit={this._handleSubmit}>
          <Table emptyMessage="" isEmpty={false}>
            <thead>
              <tr>
                <th colSpan="2">Advisor Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First Name</td>
                <td>
                  <TextInput
                    defaultValue={this.state.first_name}
                    value={this.state.first_name}
                    onChange={_handleChange.bind(this, 'first_name')}
                  />
                  {this.renderError('first_name')}
                </td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>
                  <TextInput
                    defaultValue={this.state.last_name}
                    value={this.state.last_name}
                    onChange={_handleChange.bind(this, 'last_name')}
                  />
                  {this.renderError('last_name')}
                </td>
              </tr>
              <tr>
                <th colSpan="2">School Information</th>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  {school.name}
                </td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  <TextInput
                    defaultValue={this.state.school_address}
                    value={this.state.school_address}
                    onChange={_handleChange.bind(this, 'school_address')}
                  />
                  {this.renderError('address')}
                </td>
              </tr>
              <tr>
                <td>City</td>
                <td>
                  <TextInput
                    defaultValue={this.state.school_city}
                    value={this.state.school_city}
                    onChange={_handleChange.bind(this, 'school_city')}
                  />
                  {this.renderError('city')}
                </td>
              </tr>
              <tr>
                <td>Zip</td>
                <td>
                  <TextInput
                    defaultValue={this.state.school_zip_code}
                    value={this.state.school_zip_code}
                    onChange={_handleChange.bind(this, 'school_zip_code')}
                  />
                  {this.renderError('zip_code')}
                </td>
              </tr>
              <tr>
                <td>Waitlisted</td>
                <td>
                  {school.waitlist == true ? 'Yes' : 'No'}
                </td>
              </tr>
              <tr>
                <th colSpan="2">Program Information</th>
              </tr>
              <tr>
                <td>Program Type</td>
                <td>
                  {school.program_type === 1 ? 'Club' : 'Class'}
                </td>
              </tr>
              <tr>
                <td>Times Attended</td>
                <td>
                  {school.times_attended}
                </td>
              </tr>
              <tr>
                <td>Number of Beginner Delegates</td>
                <td>
                  {school.beginner_delegates}
                </td>
              </tr>
              <tr>
                <td>Number of Intermediate Delegates</td>
                <td>
                  {school.intermediate_delegates}
                </td>
              </tr>
              <tr>
                <td>Number of Advanced Delegates</td>
                <td>
                  {school.advanced_delegates}
                </td>
              </tr>
              <tr>
                <td>Number of Spanish Speaking
                Delegates</td>
                <td>
                  {school.spanish_speaking_delegates}
                </td>
              </tr>
              <tr>
                <td>Number of Chinese Speaking
                Delegates</td>
                <td>
                  {school.chinese_speaking_delegates}
                </td>
              </tr>
              <tr>
                <td>All Waivers Completed?</td>
                <td>
                  {school.waivers_completed ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <th colSpan="2">Primary Contact Information</th>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <TextInput
                    defaultValue={this.state.primary_name}
                    value={this.state.primary_name}
                    onChange={_handleChange.bind(this, 'primary_name')}
                  />
                  {this.renderError('primary_name')}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <TextInput
                    defaultValue={this.state.primary_email}
                    value={this.state.primary_email}
                    onChange={_handleChange.bind(this, 'primary_email')}
                  />
                  {this.renderError('primary_email')}
                </td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>
                  <PhoneInput
                    value={this.state.primary_phone}
                    isInternational={school.international}
                    onChange={_handleChange.bind(this, 'primary_phone')}
                  />
                  {this.renderError('primary_phone')}
                </td>
              </tr>
              <tr>
                <th colSpan="2">Secondary Contact Information</th>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <TextInput
                    defaultValue={this.state.secondary_name}
                    value={this.state.secondary_name}
                    onChange={_handleChange.bind(this, 'secondary_name')}
                  />
                  {this.renderError('secondary_name')}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <TextInput
                    defaultValue={this.state.secondary_email}
                    value={this.state.secondary_email}
                    onChange={_handleChange.bind(this, 'secondary_email')}
                  />
                  {this.renderError('secondary_email')}
                </td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>
                  <PhoneInput
                    value={this.state.secondary_phone}
                    isInternational={school.international}
                    onChange={_handleChange.bind(this, 'secondary_phone')}
                  />
                  {this.renderError('secondary_phone')}
                </td>
              </tr>
              <tr>
                <th colSpan="2">Fees</th>
              </tr>
              <tr>
                <td>Fees Owed</td>
                <td>
                  {'$' + school.fees_owed.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Fees Paid</td>
                <td>
                  {'$' + school.fees_paid.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Balance</td>
                <td>
                  {'$' + (school.fees_owed - school.fees_paid).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </Table>
          <Button
            color="green"
            loading={this.state.loading}
            success={this.state.success}
            type="submit">
            Save
          </Button>
          <span className="help-text"><em> Remember to save any changes!</em></span>
        </form>
      </InnerView>
    );
  },

  renderError: function(field) {
    if (this.state.errors[field]) {
      return (
        <StatusLabel status="error">
          {this.state.errors[field]}
        </StatusLabel>
      );
    }

    if (this.state.errors.school &&
        this.state.errors.school[field]) {
      return (
        <StatusLabel status="error">
          {this.state.errors.school[field]}
        </StatusLabel>
      );
    }

    return null;
  },

  _handleSubmit: function(event) {
    this._successTimout && clearTimeout(this._successTimeout);
    this.setState({loading: true});
    var user = this.props.user;
    CurrentUserActions.updateUser(user.id, {
      first_name: this.state.first_name.trim(),
      last_name: this.state.last_name.trim(),
      school: {
        address: this.state.school_address.trim(),
        city: this.state.school_city.trim(),
        zip_code: this.state.school_zip_code.trim(),
        primary_name: this.state.primary_name.trim(),
        primary_email: this.state.primary_email.trim(),
        primary_phone: this.state.primary_phone.trim(),
        secondary_name: this.state.secondary_name.trim(),
        secondary_email: this.state.secondary_email.trim(),
        secondary_phone: this.state.secondary_phone.trim(),
      }
    }, this._handleSuccess, this._handleError);
    event.preventDefault();
  },

  _handleSuccess: function(response) {
    this.setState({
      errors: {},
      loading: false,
      success: true,
    });

    this._successTimeout = setTimeout(() => this.setState({success: false}), 2000);
  },

  _handleError: function(response) {
    if (!response) {
      return;
    }

    this.setState({
      errors: response,
      loading: false
    }, () => {
      this.context.shake && this.context.shake();
    });
  }
});
module.exports = AdvisorProfileView;
