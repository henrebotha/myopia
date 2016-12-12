'use babel'

/* global atom */

import MyopiaView from './myopia-view'
import { CompositeDisposable } from 'atom'

export default {
  myopiaView: null,
  modalPanel: null,
  subscriptions: null,

  activate (state) {
    this.myopiaView = new MyopiaView(state.myopiaViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myopiaView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'myopia:narrow': () => this.narrow()
    }))
  },

  deactivate () {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.myopiaView.destroy()
  },

  serialize () {
    return {
      myopiaViewState: this.myopiaView.serialize()
    }
  },

  narrow () {
    console.log('Myopia was toggled!')

    let editor = atom.workspace.getActiveTextEditor()
    if (!editor) return // Can't work without an open file

    let selection = editor.getSelectedText() // string
    if (!selection) return // Can't work without a text selection

    let buffer = editor.getBuffer() // current buffer
    // Get new TextEditor into file
    // - make new editor into buffer
    let newEditor = atom.workspace.buildTextEditor()
    debugger
    // - get current pane
    let pane = atom.workspace.getActivePane()
    // - insert editor into current pane
    let item = pane.addItem(newEditor)
    pane.activateItem(item)

    newEditor.insertText(selection)

    return newEditor
  }
}
