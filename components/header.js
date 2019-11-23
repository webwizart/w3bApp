class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }
    static get observedAttributes() {
        return ['isSignedIn'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render();
    }
    connectedCallback() {
        this.render();
        this.addEventListener('click', this.sign);
    }
    disconnectedCallback() {
        this.sendCustomEvent('signOut', 'signOut');
    }
    sendCustomEvent(data, eventType) {
        let customEvt = new CustomEvent(eventType, {
            detail: {
                data: data,
                component: 'w3b-landing'
            },
            bubbles: true
        });
        this.dispatchEvent(customEvt);
    }

    get isSignedIn() {
        return JSON.parse(this.getAttribute('isSignedIn'));
    }
    set isSignedIn(value) {
        this.setAttribute('isSignedIn', JSON.stringify(value));
    }
    get avatar() {
        return this.getAttribute('avatar');
    }
    set avatar(value) {
        this.setAttribute('avatar', value);
    }
    get logoText() {
       return this.getAttribute('logoText');
    }
    set logoText(value) {
       this.setAttribute('logoText', value);
    }

    sign() {
        if (this.isSignedIn) {
            this.isSignedIn = false;
            this.sendCustomEvent('signOut', 'signOut');
        } else {
            this.isSignedIn = true;
            this.sendCustomEvent('signIn', 'signIn');
        }
    }
    getStyle() {
        return `
            <style>
                w3b-header,
                header {
                    box-sizing: border-box;
                    background-color: #fff;
                    display: block;
                    width: 100%;
                    height: 50px;
                    cursor: pointer;
                    vertical-align: middle;
                    border-bottom: 1px solid #211f6d;
                    position: fixed;
                }
                img {
                    float: right;
                    border-radius: 50%;
                    border: 3px solid #211f6d;
                    height: 30px;
                    margin: 6px;
                }
                button {
                    float: right;
                    height: 49px;
                    background-color: transparent;
                    border: 0px solid transparent;
                }
                .logo {
                    float: left;
                    height: 100%;
                    padding: 5px;
                    margin-left: 10px;
                    color: #211f6d;
                    font-size: 32px;
                    width: 60%;
                    box-sizing: border-box;
                }
            </style>
        `;
    }
    render() {
        this.shadowRoot.innerHTML = `
            ${this.getStyle()}  
            <header>
                <span class="_3_5 logo">${this.logoText}</span>
                <img src=${this.avatar ? this.avatar : '../assets/batman.png'} alt="avatar" />    
                <button>${this.isSignedIn ? 'Sign Out' : 'Sign In'}</button>
            </header>
        `;
    }
}
customElements.define('w3b-header', HeaderComponent);