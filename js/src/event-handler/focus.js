export default class FocusHandler {

  inputFocused = false;
  editorMouseDown = false;

  onEditorMouseDown = () => {
    this.editorFocused = true;
  }

  onInputMouseDown = () => {
    this.inputFocused = true;
  }

  isEditorBlur = (event) => {
    if (event.target.tagName === 'INPUT' && !this.editorFocused) {
      this.inputFocused = false;
      return true;
    } else if (event.target.tagName !== 'INPUT' && !this.inputFocused) {
      this.editorFocused = false;
      return true;
    }
    return false;
  }

  isEditorFocused = () => {
    if (!this.inputFocused) {
      return true;
    }
    this.inputFocused = false;
    return false;
  }

  isToolbarFocused = () => {
    if (!this.editorFocused) {
      return true;
    }
    this.editorFocused = false;
    return false;
  }

  isInputFocused = () => {
    return this.inputFocused;
  }
}
