export interface StoreWithFetch<T> {
    fetch: (url: string) => Promise<T[]>;
}

export const createFetchStore =
    <T>(set: any) => ({
        fetch: async (url: string) => {
            const response = await fetch(url);
            set({ data: (await response.json()) as T[] });
        }
    });