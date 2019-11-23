export class Singleton {
    constructor() {
        this.instance;
    }
    getInstance() {
        if (!this.instance) {
            this.instance = this.createInstance();
        }
        return this.instance;
    }
    createInstance() {
        let instance = {
            id: 0,
            title: '',
            images: [
                {
                    name: '',
                    id: 0,
                    url: ''
                }
            ]
        }
        return instance;
    }
}