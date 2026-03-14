export interface ServerStore {
  studyDates: string[];
}

const store: ServerStore = {
  studyDates: [],
};

export function getStore(): ServerStore {
  return store;
}

export function syncDates(dates: string[]): void {
  store.studyDates = Array.from(new Set(dates)).sort((a, b) => (a > b ? -1 : 1));
}
