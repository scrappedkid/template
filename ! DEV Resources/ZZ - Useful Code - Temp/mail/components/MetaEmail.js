import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames";

export const MetaEmail = props => {
  const { selected, unread, name, subject, desc, avatar, handleClick, url } = props,
    emailClass = classNames({
            'email-item': true,
            'email-item-selected': selected && !unread,
       'email-item-unread': unread,
            'pure-g': true
        });

  return (
        <div className={emailClass}>
            <Link to={`${url}/email/${props.index}`} onClick={handleClick}>
                <Avatar avatar={avatar} name={props.name} />
                <UserDetails name={name} desc={desc} subject={subject} />
            </Link>
        </div>
  );

};

MetaEmail.propTypes = {
  selected: PropTypes.bool,
  unread: PropTypes.bool,
  name: PropTypes.string,
  subject: PropTypes.string,
};

export const UserDetails = props => (
    <div className="pure-u-3-4">
        <h5 className="email-name">{props.name}</h5>
        <h4 className="email-subject">{props.subject}</h4>
        <p className="email-desc">{props.desc}</p>
    </div>;
export const Avatar = props => (
    <div className="pure-u">
        <img width="64" height="64" alt={props.name} className="email-avatar" src={props.avatar} />
    </div>;
Avatar.propTypes = {
  avatar: PropTypes.string,
};
