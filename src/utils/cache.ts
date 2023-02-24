class LocalCache {
  PREFIX = "brain_internet_things_";
  constructor() {
    //
  }
  setSSCache(key: string, value: any) {
    sessionStorage.setItem(this.PREFIX + key, JSON.stringify(value));
  }
  getSSCache(key: string) {
    const value = sessionStorage.getItem(this.PREFIX + key);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }
  removeSSCache(key: string) {
    sessionStorage.removeItem(this.PREFIX + key);
  }
  clearSSCache() {
    sessionStorage.clear();
  }
}

export default new LocalCache();
