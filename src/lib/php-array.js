export class PhpArray extends Map {
  constructor(entries) {
    super(entries);
  }

  replace(entries) {
    this.clear();
    (entries || []).forEach(entry => this.set(entry[0], entry[1]));
  }

  // http://php.net/manual/en/function.asort.php
  asort() {
    this.replace([...this._map.entries()].sort((a, b) => {
      return a[1] > b[1];
    }));
  }

  get first() {
    return this.entries()[0];
  }
}
