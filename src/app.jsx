const React = require('react');
const ReactDOM = require('react-dom');
const ReactFire = require('reactfire');
const Firebase = require('firebase');
const Header = require('./header');
const List = require('./list');

const config = {
    apiKey: "AIzaSyAzkxldz9dJyItsVe-BymE9JJWQNGyhn0k",
    authDomain: "todos-eb788.firebaseapp.com",
    databaseURL: "https://todos-eb788.firebaseio.com/",
    storageBucket: "todos-eb788.appspot.com",
};
var App = React.createClass({
  // Copy all the method from an object to this one
  mixins: [ReactFire],
  getInitialState: function () {
    return {
      items: {},
      loaded: false
    }
  },
  // this code will be run one time at start !
  componentWillMount: function () {
    const fb = new Firebase(config.databaseURL + 'items/');
    this.bindAsObject(fb, 'items');
    fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items}/>
        <hr />
        <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
          <List items={this.state.items}/>
        </div>
      </div>
    </div>
  },
  handleDataLoaded: function () {
    this.setState({loaded: true})
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
