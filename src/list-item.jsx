const React = require('react');
const Firebase = require('firebase');

const config = {
    apiKey: "AIzaSyAzkxldz9dJyItsVe-BymE9JJWQNGyhn0k",
    authDomain: "todos-eb788.firebaseapp.com",
    databaseURL: "https://todos-eb788.firebaseio.com/",
    storageBucket: "todos-eb788.appspot.com",
};

module.exports = React.createClass({

  getInitialState: function () {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function () {
    this.fb = new Firebase(config.databaseURL + 'items/' + this.props.item.key);
  },
  render: function () {
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          onChange={this.handleDoneChange}
          checked={this.state.done}
          type="checkbox"/>
      </span>
      <input type="text"
        disabled={this.state.done}
        className="form-control"
        value={this.state.text}
        onChange={this.handleTextChange}/>
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          className="btn btn-warning"
          onClick={this.handleDelete}>
          Delete
        </button>
      </span>
    </div>
  },
  changesButtons: function () {
    if(!this.state.textChanged){
      return null
    } else {
      return [
        <button
          onClick={this.handleSave}
          className="btn btn-success">
          Save
        </button>,
        <button
          onClick={this.handleUndo}
          className="btn btn-info">
          Undo
        </button>
      ]
    }
  },
  handleDoneChange: function (event) {
    const update = {done: event.target.checked};
    this.setState(update);
    this.fb.update(update);
  },
  handleDelete: function () {
    this.fb.remove();
  },
  handleTextChange: function (event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    })
  },
  handleUndo: function () {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    })
  },
  handleSave: function () {
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false})
  }
});
