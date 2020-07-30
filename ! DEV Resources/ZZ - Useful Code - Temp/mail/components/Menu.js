import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from "../actions";
import R from "ramda";

export const renderMenu = R.curry(selectGroup =>
    R.map((count, name) =>
                        <MenuItem name={name} count={count} key={name} handleClick={() => selectGroup(name.toLowerCase())} />
  ))
);

export class Menu extends Component {

  render() {
    const { menuItems, selectGroup } = this.props;
    const renderMenuItems = renderMenu(selectGroup);

        
return (
            <div id="nav" className="pure-u">
                <div className="nav-inner">
                    <Link to="/compose" className="primary-button pure-button">Compose</Link>
          </Link>
          <div className="pure-menu">
            <ul className="pure-menu-list">{renderMenuItems(menuItems).valueSeq()}</ul>
          </div>
        </div>
      </div>
    );
  }

}

Menu.propTypes = {
    selectGroup: PropTypes.func.isRequired,
      "menuItems" : PropTypes.object.isRequired
};


export const MenuItem = props => (
  <li className="pure-menu-item">
    <Link to={`/list/${props.name.toLowerCase()}`} className="pure-menu-link" onClick={props.handleClick}>
      {props.name} {props.count ? <span className="email-count">({props.count})</span> : null}
    </Link>
  </li>
);


MenuItem.propTypes = {
  name: PropTypes.string,
};
export const capString = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);

};
export const getMenuItems = emailList => {
  return emailList.map(value => value.size).mapKeys(capString);

};

export const mapStateToProps = state => ({
  menuItems: getMenuItems(state.email.get('emailList')),
});


export default connect(
  mapStateToProps,
  actions
)(Menu);
