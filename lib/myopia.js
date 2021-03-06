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

    let newEditor = atom.workspace.buildTextEditor()
    let pane = atom.workspace.getActivePane()
    let item = pane.addItem(newEditor)
    pane.activateItem(item)

    newEditor.insertText(selection)

    // set grammar
    // attach callback for 'before save'
    newEditor.onDidChange(function (changes) {
      let start = changes[0].start
      let oldExtent = changes[0].oldExtent
      let newExtent = changes[0].newExtent
      let newText = changes[0].newText
      debugger
    })

    return newEditor
  }
}
