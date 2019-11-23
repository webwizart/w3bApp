class App extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }
    static get observedAttributes() {
        return ['blockstack'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render();
    }
    connectedCallback() {
        const { AppConfig, UserSession } = this.blockstack;
        const appConfig = new AppConfig(['store_write', 'publish_data'])
        this.userSession = new UserSession({ appConfig });
        this.shadowRoot.addEventListener('signOut', e => {
            e.preventDefault();
            this.isSignedin = false;
            this.userSession.signUserOut();
            this.render();
        });
        this.shadowRoot.addEventListener('signIn', e => {
            e.preventDefault();
            this.isSignedin = true;
            this.userSession.redirectToSignIn();     
        });
        if (this.userSession.isSignInPending()) {
            this.userSession.handlePendingSignIn().then((userData) => {
                window.location = window.location.origin;
            });
        }      
        this.render();
    }
    disconnectedCallback() {
        this.userSession.signUserOut();
    }
    sendCustomEvent(data, eventType) {
        let customEvt = new CustomEvent('appChanged', {
            detail: {
                data: data,
                component: 'w3b-app',
                eventType: eventType
            },
            bubbles: true
        });
        this.dispatchEvent(customEvt);
    }

    get usersSession() {
        return JSON.parse(this.getAttribute('usersSession'));
    }
    set usersSession(value) {
        this.setAttribute('usersSession', JSON.stringify(value));
    }
    get isSignedin() {
        return this.getAttribute('isSignedin')
    }
    set isSignedin(value) {
        this.setAttribute('isSignedin', JSON.stringify(value));
    }
    
    loadLanding() {
        return `<w3b-landing><w3b-landing>`;
    }
    loadApp() {
        return `<w3b-w3bapp></w3b-w3bapp>`;
    }
    render() {
        if (this.userSession.isUserSignedIn()) {
            let avatar = this.userSession.loadUserData().profile.image[0].contentUrl;
            this.shadowRoot.innerHTML = `
                <style>
                    body, html {
                        margin: auto;
                    }
                </style>
                <w3b-header 
                    class="_1_1"
                    avatar=${avatar} 
                    isSignedIn=${this.userSession.isUserSignedIn()}
                    logoText="w3bApp">
                </w3b-header>
                ${this.userSession.isUserSignedIn() ? this.loadApp() : this.loadLanding()}
            `;
        } else {
            this.shadowRoot.innerHTML = `
                <w3b-header 
                    class="_1_1"
                    isSignedIn=${this.userSession.isUserSignedIn()}
                    logoText="w3bApp">
                </w3b-header>
                ${this.userSession.isUserSignedIn() ? this.loadApp() : this.loadLanding()}
            `;
        }   
    }
}
customElements.define('w3b-app', App);
