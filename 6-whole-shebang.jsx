/*
Whole Shebang
This example shows most of the commonly used React functionality including:
- Component lifecycle events
- Mixins
- Default props
- Prop validation
- Looping
- DOM refs
- Browser events
See more here lifecycle events here:
http://facebook.github.io/react/docs/component-specs.html
*/

/*
Mixins are just objects with properties that are merged with the compoent
they are included in.
See: http://facebook.github.io/react/docs/reusable-components.html#mixins
*/
var MyMixin = {
  queryAPIorSomething: function (url, options, successCallback) {
    // Do some API magic here...
  },

  // This does not overwrite the components
  // `componentWillUnmount` method but will
  // be called along side it.
  componetWillUnmount: function () {
    // Abor XHR request or something else...
  }
};


var WholeShebang = React.createClass({
  mixins: [MyMixin],

  propTypes: {
    // This will log a message on the console if
    // items is not defined or if the wrong type
    // is supplied.
    items: React.PropTypes.array.isRequired,

    // This will only log if the type is wrong.
    prefix: React.PropTypes.string
  },

  getInitialState: function() {
      return {};
  },

  // Sane defaults for your component...
  getDefaultProps: function () {
    return {
      prefix: 'Hello'
    }
  },

  componentWillMount: function () {
    // Here you could setState, fetch data from a server or something else...
    this.queryAPIorSomething('path/to/api.json', {} , function (data) {
      this.setState({ data: data });
    }.bind(this));
  },

  componentDidMount: function () {
    // You now have access to the DOM:
    console.log(this.getDOMNode().html);

    // ... or to component references:
    console.log(this.refs.foobar.getDOMNode().html);
  },

  componentWillUpdate: function () {
    console.log('component about to update!');
  },

  componentDidUpdate: function () {
    console.log('component updated!');
    // DOM is available here...
  },

  componentWillUnmount: function () {
    // Use this to tear down any event listeners
    // or do other cleanup before the compoennt is
    // destroyed.
    console.log('component will unmount!');
  },

  shouldComponentUpdate: function () {
    // This is called when state/props changed and is
    // an opportunity where you can return false if
    // you don't want the component to update for
    // some reason.
    return true;
  },

  toggle: function (e) {
    // Prevent following the link.
    e.preventDefault();

    // Invert the chosen default.
    // This will trigger an intelligent re-render of the component.
    this.setState({ showDefault: !this.state.showDefault })
  },

  render: function () {
    var items = _.map(this.props.items, function (item, index) {
      // Any time you construct a list of elements or components,
      // you need to set the `key` so React can more easily work
      // with the DOM.
      return <li key={index}>{item}</li>;
    });

    return (
      <div>
        <span ref="foobar">Show default: {this.state.showDefault}</span>
        <ul>
          {items}
        </ul>
        <a href="" onClick={this.toggle}>Toggle</a>
    </div>
    );
  }
});

var items = ["Bob", "Mary", "Sally"] ;

React.render(
  <WholeShebang items={items} />, document.body );