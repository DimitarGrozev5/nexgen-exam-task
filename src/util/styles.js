export class Style {
  constructor(stylesObj) {
    this.stylesObj = stylesObj;
    this.styles = [];
  }

  add(className) {
    this.styles.push(this.stylesObj[className]);
  }

  remove(className) {
    this.styles = this.styles.filter((c) => c === className);
  }

  get className() {
    return this.styles.join(' ');
  }
}
