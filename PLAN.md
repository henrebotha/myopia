# Plan

## Plugin design

* On create, detect what area of text is selected.
* Mark the start and end of the selection.
* Create a new buffer containing the selection.
* When the new buffer is saved, replace the original selection with the contents of the buffer, and close the buffer.
