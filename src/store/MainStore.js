import { action, makeObservable, observable } from "mobx";





class MainStore{

    notifications = [];
    visible = false;

    constructor(){
        makeObservable(this,{
            notifications: observable,

            push: action
        })
    }

    push(notification){
        this.notifications = [notification, ...this.notifications];
    }

}

export default new MainStore();