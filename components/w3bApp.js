
import { createObserver, createSubject } from "../utils/observerPattern.js";
import { Singleton } from "../utils/singletonPattern.js";
import { views } from './views/views.config.js';

class W3bApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        // Add events
        this.shadowRoot.addEventListener('changed', e => {
            switch (e.detail.eventType) {
                case 'dataChanged':
                    console.log('child has dataChanged', e.detail.component + ' | ' + e.detail.eventType + ' | ' + e.detail.data.user);
                    this.singleSTORE.store.collections = e.detail.data.collections;
                    this.singleSTORE.store.selectedCollection = e.detail.data.selectedCollection;
                    this.singleSTORE.store.selectedItem = e.detail.data.selectedItem;
                    this.singleSTORE.store.user = e.detail.data.user;
                    break;
                case 'viewChanged':
                    console.log('viewChanged to', e.detail.data.title);
                    this.singleSTORE.views.forEach(view => {
                        view.isVisible = false;
                        if (e.detail.data.title.toLowerCase() ===  view.title.toLowerCase()) {
                            view.isVisible = true;
                        }
                    });
                default:
                    break;
            }
            this.render();
        });

    }
    // LifeCycle Events
    static get observedAttributes() {
        return ['singleSTORE'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render();
    }
    connectedCallback() {
        // create a Singleton Store object
        let singleSTORE = new Singleton;
        this.singleSTORE = singleSTORE.getInstance();
        this.singleSTORE = {
            store: {
                selectedCollection: {},
                selectedItem: {},
                collections: [],
                user: 'w3bwizart',
            }
        }
        this.singleSTORE.views = views();
        // Concrete Subject
        // Extend the controlling singleSTORE with the Subject class
        this.singleSTORE = createSubject(this.singleSTORE);
        this.render();
    }
    disconnectedCallback() {
        delete this.singleSTORE;
    }
    sendCustomEvent(data, eventType) {
        let customEvt = new CustomEvent('changed', {
            detail: {
                data: data,
                component: 'w3b-w3bapp',
                eventType: eventType
            },
            bubbles: true
        });
        this.dispatchEvent(customEvt);
    }
    createView(title, elementType, isVisible = false) {
        // Create Observer
        let view = createObserver(this.singleSTORE.store, elementType);
        view.title = title;
        view.isVisible = isVisible;
        // Add the new observer to our list of observers for our main subject
        this.singleSTORE.addObserver(view);
        // Append the item to the container
        this.shadowRoot.appendChild(view);
    }
    createViews() {
        this.singleSTORE.views.forEach(view => {
            if (view.isVisible) {
                this.createView(view.title, view.tag, view.isVisible);
            }
        });
    }
    createNavigation() {
        let navigation = document.createElement('w3b-navigation');
        navigation.views = this.singleSTORE.views;
        this.shadowRoot.appendChild(navigation);
    }
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                w3b-w3bApp {
                    height:100%;
                }
                w3b-view {
                    --w3b-width: 90%;
                    --w3b-bgcolor: none;
                    --w3b-height: 600px;
                }
                w3b-navigation {
                    --w3b-width: 10%;
                    --w3b-bgcolor: none;
                    --w3b-height: 900px;
                }
            </style>
        `;
        this.createNavigation();
        this.createViews();
    }
}
customElements.define('w3b-w3bapp', W3bApp);