function extend(obj, extension) {
    for (var key in extension) {
        obj[key] = extension[key];
    };
};
export function createSubject(object) {
    // Concrete Subject
    // Extend the controlling singleSTORE with the Subject class
    extend(object, new Subject());
    return object;
}
export function createObserver(data, elementType) {
    // Create a new element
    let element = document.createElement(`${elementType}`);
    // assign data
    const x = JSON.parse(JSON.stringify(data));
    element.data = x;
    // extend it with the observer functionality
    extend(element, new Observer());
    // Override with custom update behaviour - update is defined in Observer
    element.update = function (value) {
        this.data = value;
    };
    return element;

}
export class ObserverList {
    constructor() {
        this.observerList = []
    }
    add = function (obj) {
        return this.observerList.push(obj.title);
    };
    count = function () {
        return this.observerList.length;
    };
    get = function (index) {
        if (index > -1 && index < this.observerList.length) {
            return this.observerList[index];
        }
    };
    indexOf = function (obj, startIndex) {
        let i = startIndex;
        while (i < this.observerList.length) {
            if (this.observerList[i].title === obj.titel) {
                return i;
            }
            i++;
        }
        return -1;
    };
    removeAt = function (index) {
        this.observerList.splice(index, 1);
    };

}
// SUBJECT //
class Subject {
    constructor() {
        this.observers = new ObserverList();
    }
    addObserver = function (observer) {
        this.observers.add(observer);
    };
    removeObserver = function (observer) {
        this.observers.removeAt(this.observers.indexOf(observer, 0));
    };
    notify = function (context) {
        let observerCount = this.observers.count();
        for (let i = 0; i < observerCount; i++) {
            this.observers.get(i).update(context);

        }
    };
}
// The Observer //
class Observer {
    constructor() {
    }
    update = function () {
        // Override with custom update behaviour
    };
}