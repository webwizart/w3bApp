export class ViewComponent extends HTMLElement {
    // LifeCycle Events
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        // Listen to child events
        this.shadowRoot.addEventListener('changed', e => {
            console.log('change detected from child');
        });
        this.shadowRoot.addEventListener('click', e => {
            this.dispatchChange(this.data, 'dataChanged');
        });
    }
    static get observedAttributes() {
        return ['data'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render();
    }
    connectedCallback() {
        if (!this.isVisible) {
            this.isVisible = false;
        }
        this.render();
    }
    disconnectedCallback() {
        console.log('disconnectedCallback');
    }

    // PROPERTIES GET/SET
    get title() {
        return this.getAttribute('title');
    }
    set title(value) {
        this.setAttribute('title', value);
    }
    get isVisible() {
        let isVisible = this.getAttribute('isVisible');
        if (isVisible !== 'true') {
            return false;
        }
        return isVisible;
    }
    set isVisible(value) {
        this.setAttribute('isVisible', JSON.stringify(value));
    }

    // METHODS
    sendCustomEvent(data, eventType) {
        let customEvt = new CustomEvent('changed', {
            detail: {
                data: data,
                component: 'w3b-view',
                eventType: eventType
            },
            bubbles: true
        });
        this.dispatchEvent(customEvt);
    }
    dispatchChange(data, eventType) {
        data.user = `Changed By ${this.title}`;
        this.data = data;
        this.sendCustomEvent(this.data, eventType);
    }
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                w3b-view, :host {      
                    float: left;  
                    box-sizing: border-box;
                    border-left: 1px solid #ccc;
                    width: var(--w3b-width);
                    background-color: var(--w3b-bgcolor);
                    padding: 10px;
                    margin-top: 60px;
                    height: var(--w3b-height);
                }
            </style>
                <h1>${this.title}</h1>
                <button class="child">click</button>
                Id: ${this.data ? this.data.user : 'nada'}<br /><br />
        `;
    }
}
customElements.define('w3b-view', ViewComponent);



