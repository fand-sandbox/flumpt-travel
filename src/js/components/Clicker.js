import * as React    from 'react';
import { mixin, Component } from 'flumpt';
var PureRenderMixin = require('react-addons-pure-render-mixin');

const ClickCounter = React.createClass({

  mixins: [PureRenderMixin, mixin],

  render () {
    return <span>{this.props.counter}</span>;
  },

});

const ClickButton = React.createClass({

  mixins: [PureRenderMixin, mixin],

  render () {
    return (
      <button
        onClick={() => this.dispatch('increment')}>
        {this.props.button}!
      </button>
    );
  },

});

class Clicker extends Component {

  componentDidMount () {
    this.dispatch('increment');
  }

  render () {
    return (
      <div>
        <ClickCounter counter={this.props.count} />
        <ClickButton button={this.props.button} />
      </div>
    );
  }

}

export default Clicker;
