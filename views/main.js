var html = require('choo/html')

var TITLE = 'Drink me.'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy bg-black white">
      <main class="center tc mw5 mt6">
        <h1>
          Drink me.
        </h1>
      </main>
    </body>
  `
}
