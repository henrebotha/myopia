# Plan

## Plugin design

* On create, detect what area of text is selected.
* Mark the start and end of the selection.
* Create a new buffer containing the selection.
* When the new buffer is saved, replace the original selection with the contents of the buffer, and close the buffer.

At the time of writing, it looks like pointing two editors at the same buffer is way too complex. So we'll just execute as above.

## Various thoughts

* A core question: do I make a new editor pointing at the same buffer, or do I make a completely new buffer and manually populate it?
  * Reuse buffer: guaranteed mirroring of everything. Guaranteed reuse of the same grammar and other editor/file settings.
  * New buffer: whitelist functionality. Guaranteed protection against whole-editor commands actually hitting parts of the file outside of the new editor.
