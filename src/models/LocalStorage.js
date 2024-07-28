class LocalStorage {
  constructor(storageKey) {
    this.storageKey = storageKey;
  }

  set item(value) {
    localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  get item() {
    const item = localStorage.getItem(this.storageKey);
    return item ? JSON.parse(item) : null;
  }

  remove() {
    localStorage.removeItem(this.storageKey);
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}

export default LocalStorage;
