'use babel';

import MyopiaView from './myopia-view';
import { CompositeDisposable } from 'atom';

export default {

  myopiaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myopiaView = new MyopiaView(state.myopiaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myopiaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'myopia:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myopiaView.destroy();
  },

  serialize() {
    return {
      myopiaViewState: this.myopiaView.serialize()
    };
  },

  toggle() {
    console.log('Myopia was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
