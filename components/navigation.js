class NavigationComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        // Add events
        this.shadowRoot.addEventListener('changed', e => {
            console.log('change detected from child');
        });
        this.shadowRoot.addEventListener('click', e => {
            this.sendCustomEvent({ title: e.target.innerText }, 'viewChanged');
            e.target.classList.add('active');
        });
    }
    // LifeCycle Events
    static get observedAttributes() {
        console.log('observedAttributes');
        return [];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log('attributeChangedCallback');
    }
    connectedCallback() {
        this.render();
    }
    disconnectedCallback() {
        console.log('disconnectedCallback');
    }
    // PROPS
    get views() {
       return JSON.parse(this.getAttribute('views'));
    }
    set views(value) {
       this.setAttribute('views', JSON.stringify(value));
    }
    // METHODS
    sendCustomEvent(data, eventType) {
        let customEvt = new CustomEvent('changed', {
            detail: {
                data: data,
                component: 'w3b-navigation',
                eventType: eventType
            },
            bubbles: true
        });
        this.dispatchEvent(customEvt);
    }
    generateViewButtons() {
        let template = '';
        if (this.views) {
            this.views.forEach(view => {
                if (view.isVisible) {
                    template += `<li class="active"><a>${view.title}</a></li>`; 
                } else {
                    template += `<li><a>${view.title}</a></li>`;
                }
                
            });
        }
        return template;
    }
    render() {
        this.shadowRoot.innerHTML = `
        <style>
            w3b-navigation, :host {  
                width: var(--w3b-width);
                background-color: var(--w3b-bgcolor);
                height: var(--w3b-height);
                box-sizing: border-box;
                text-align: center;
            }
            ul {
                position: fixed;
                top: 50px;
                left: 0;
                margin: 0;
                float: left;
                padding: 0;
                list-style-type: none;
                width:100%;
                overflow: none;
                border-bottom: 1px solid #211f6d;
                background-color: #fff;

            }
            li {
                float: left;
                box-sizing: border-box;
                padding: 10px;
                border-bottom: 1px solid var(--w3b-bgcolor);
            }
            li:hover {
                background-color: #211f6d;
                color: #fff;
            }
            .active {
                background-color: #211f6d;
                color: #fff;
            }
            @media screen and (min-width: 501px) {
            }
              
            @media screen and (max-width: 500px) {    
                ul {
                    position: fixed;
                    top: 50px;
                    left: 0;
                    margin: 0;
                    float: left;
                    padding: 0;
                    list-style-type: none;
                    width:100%;
                    overflow: none;
                    border-bottom: 1px solid #211f6d;
                }
            }
        </style>  
        <nav>
            <ul>
                ${this.generateViewButtons()}
            </ul
        </nav>
        `;
    }
}
customElements.define('w3b-navigation', NavigationComponent);