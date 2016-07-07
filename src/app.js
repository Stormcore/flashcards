import { addDeck, showAddDeck, hideAddDeck } from './actions'

const cards = (state, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      let newCard = Object.assign({}, action.data, {
        score: 1,
        id: +new Date
      });
      return state.concat([newCard]);
    default:
      return state || [];
  }
};

const decks = (state, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      let newDeck = {
        name: action.data,
        id: +new Date
      };
      return state.concat([newDeck]);
    default:
      return state || [];
  }
};

const addingDeck = (state, action) => {
  switch (action.type) {
    case 'SHOW_ADD_DECK':
      return true;
    case 'HIDE_ADD_DECK':
      return false;
    default:
      return !!state;
  }
};

const store = Redux.createStore(Redux.combineReducers({
  cards,
  decks,
  addingDeck
}));

const Sidebar = React.createClass({
  componentDidUpdate() {
    let element = ReactDOM.findDOMNode(this.refs.add);
    if (element) element.focus();
  },
  render() {
    let props = this.props;
    return(<div className='sidebar'>
      <h2>ALL DECKS</h2>
      <button onClick={e => this.props.showAddDeck()}>New Deck</button>
      <ul>
        {
          props.decks.map((deck, i) =>
            <li key={i}>{deck.name}</li>
          )
        }
      </ul>
      { props.addingDeck && <input ref='add' onKeyPress={this.createDeck} /> }
    </div>);
  },
  createDeck(event) {
    if (event.which !== 13) return;
    let name = ReactDOM.findDOMNode(this.refs.add).value;
    this.props.addDeck(name);
    this.props.hideAddDeck();
  }
});

const App = (props) => {
  return (<div className='app'>
      { props.children }
    </div>);
};

function run() {
  let state = store.getState();
  console.log(state);
  ReactDOM.render(
    <app>
      <Sidebar
        decks={state.decks}
        addingDeck={state.addingDeck}
        addDeck={name => store.dispatch(addDeck(name))}
        showAddDeck={() => store.dispatch(showAddDeck())}
        hideAddDeck={() => store.dispatch(hideAddDeck())}
      />
    </app>,
     document.getElementById('root'));
}

run();

store.subscribe(run);
