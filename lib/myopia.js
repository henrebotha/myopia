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
    // return (
    //   this.modalPanel.isVisible()
    //   ? this.modalPanel.hide()
    //   : this.modalPanel.show()
    // )
    let editor = atom.workspace.getActiveTextEditor()
    if (!editor) return

    let selection = editor.getSelectedText() // string
    let reversed = selection.split('').reverse().join('')
    editor.insertText(reversed)
  }
}
