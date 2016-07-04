const addDeck = name => ({
  type: 'ADD_DECK', data: name
});

const showAddDeck = () => ({
  type: 'SHOW_ADD_DECK'
});

const hideAddDeck = () => ({
  type: 'HIDE_ADD_DECK'
});

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

const deck = (state, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      let newDeck = {
        name: action.date,
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
  render() {
    let props = this.props;
    return(<div className='sidebar'>
      <h2>ALL DECKS</h2>
      <ul>
        {
          props.decks.map((deck, i) =>
            <li key={i}>{deck.name}</li>
          )
        }
      </ul>
      {
        props.addingDeck && <input ref='add' />
      }
    </div>);
  }
});

const App = (props) => {
  return (<div className='app'>
      { props.children }
    </div>);
};

function run() {
  let state = store.getState;
  ReactDOM.render(<app>
      <Sidebar decks={[ {name: 'Deck 1'}, {name: 'Deck 2'} ]} addingDeck={true} />
    </app>,
     document.getElementById('root'));
}
