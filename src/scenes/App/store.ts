export class AppStore {

    private constructor() {        
    }

    static async create() {
        const appStore = new AppStore()
        return appStore
    }
}