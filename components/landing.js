class LandingComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
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
        let btn = this.shadowRoot.querySelectorAll('.login-btn')
        btn.forEach((el) => {
            el.addEventListener('click', this.signIn.bind(this));
        })
    }
    disconnectedCallback() {
        console.log('disconnectedCallback');
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
    signIn() {
        this.sendCustomEvent('signIn', 'signIn');
    }
    loadHome() {
        return `
            <section id="home" class="_1_1  panel">
                <span id="home-text" class="_1_1">
                    <p class="font-size-l"> 
                        Are you creating Web Apps?
                    </p>
                    <span id="home-img" class="_1_2 right">
                        <img class="home-img" src="../assets/batman.png" />
                    </span>
                    <p class='font-size-xxl'>
                        Like to build
                        <i class="gray">Secure</i>, 
                        <i class="gray">Private</i> &
                        <i class="gray">Encrypted</i> W3bApp's ? <br /><br />
                        Would You like to do that with,
                        <i class="gray">Web Components!</i>

                        <br />
                        <b class="font-size-l">
                            Some Serverless Blockstack and just build
                        </b>
                    </p>
                    
                    <p class="font-size-m"> 
                        Start building W3bApp's now <br />
                        <button class="purple font-size-m login-btn"> Check the Code</button>
                    </p>    
                </span>
            </section>
        `
    }
    loadProducts() {
        return `
            <section id="products" class="_1_1 panel purple">
                <span class="_1_2 product-title">
                    <p class="font-size-l">W3bApp</p> 
                    <p class="font-size-m">Build Freemium Apps</p> 
                    <img class="product-img" src="../assets/batman.png" /> <br /> <br />
                    W3bApp is a simple set of Web Components and Scripts to start building apps without build process.<br />
                    <button class="product-button purple font-size-l login-btn"> Start build App's Now!!</button>
                </span>
                <span class="_1_2 product-title divider orange">
                    <p class="font-size-l">W3bApp PRO</p> 
                    <p class="font-size-m">Build Business Apps</p> 
                    <img class="product-img" src="../assets/batman.png" />  <br /> <br />
                    W3bAppPro is a simple set of Web Components and Scripts to start building apps without build process.<br />
                    <button class="product-button purple font-size-l login-btn"> Start build Business App's Now!!</button>
                </span>
            </section>
        `
    }
    loadExplanation() {
        return `
            <section id="explanation" class="_1_1 panel">
            <p class="font-size-xl">Why is W3bApp Different?</p>
                <span class="_1_5 explanation-text">
                    <h3>Decentralised</h3>
                    Blockstack is a decentralized computing protocol that enables a new generation of applications where developers and users 
                    can interact fairly and securely. JOin  and help build a fair and open Internet that returns digital rights to developers and consumers.
                </span>
                <span class="_1_5 explanation-text">
                    <h3>Own Your Data</h3>
                    In a professional context it often happens that private or corporate clients data is breached. With W3bApp and Blockstack 
                    you can choose where you want to store your encrypted data.
                </span>
                <span class="_1_5 explanation-text">
                    <h3>Secure</h3>
                    Because your data always stays with you, there'll never be a scary data breach exposing your cherished W3bApp. Your privacy comes first. 
                    W3bApp works with Blockstack Authentication and Gaia storage. No one can spy or use your encrypted data but you.
                </span> 
                <span class="_1_5 explanation-text">
                    <h3>On any device</h3>
                    Access your W3bApp via any device the only thing you need is your Blockstack Id. And your W3bApp will be in sync across all your devices.
                </span>
                <span class="_1_5 explanation-text">
                    <h3>Developer Friendly</h3>
                    Tiered of frameworks and build scripts, just use Web Components, start a server in the root and yoe ar good to go. 
                    I was tiered of learning frameworks, configuring build scripts and fight dependencies. The W3bApp's set is basic but can be build on further.
                </span>
                <button class="_1_3 product-button purple font-size-l login-btn">Start building W3bApp's Today</button>
            </section>
        `
    }
    loadExamples() {
        return `
            <section id="examples" class="_1_1 panel purple">
                <h1 class="font-size-xl">Examples</h1>
                <span class="_1_4 example-img-wrapper">
                    <img class="example-img" src="../assets/batman.png" />
                    Example
                </span>
                <span class="_1_4 example-img-wrapper">
                    <img class="example-img" src="../assets/batman.png" />
                    Example
                </span>
                <span class="_1_4 example-img-wrapper">
                    <img class="example-img" src="../assets/batman.png" />
                    Example
                </span>
                <span class="_1_4 example-img-wrapper">
                    <img class="example-img" src="../assets/batman.png" />
                    Example
                </span>
                <br /><br /><br /><br />
                <span class="_1_4 example-img-wrapper">
                    <img class="example-img" src="../assets/batman.png" />
                    Example
                </span>
                <span class="_1_4 example-img-wrapper">
                    <img class="example-img" src="../assets/batman.png" />
                    Example
                </span>
                <span class="_1_4 example-img-wrapper">
                    <img class="example-img" src="../assets/batman.png" />
                    Example
                </span>
                <span class="_1_4 example-img-wrapper">
                    <img class="example-img" src="../assets/batman.png" />
                    Example
                </span>
                <br /><br /><br /><br />
                <button class="product-button purple  font-size-l login-btn">So with what will you Start?</button>
            </section>
        `
    }
    getStyle() {
        return `
            <style>
                :host, w3b-landing, .w3b-landing {
                    float: left;
                }
                ._1_1, ._1_2, ._1_3, ._1_4, ._1_5, ._2_3, ._3_4,
                .panel {
                    box-sizing: border-box;
                    float: left;
                    overflow: hidden;
                }
                ._1_1 {
                    display: block;
                    width: 100%;
                }
                ._1_2 {
                    display: block;
                    width: 50%;
                }
                ._1_3 {
                    display: block;
                    width: 33.3333%;
                }
                ._2_3 {
                    display: block;
                    width: 66.6666%;
                }
                ._1_4 {
                    display: block;
                    width: 25%;
                }
                ._3_4 {
                    display: block;
                    width: 75%;  
                }
                ._1_5 {
                    display: block;
                    width: 20%;
                }
                ._2_5 {
                    display: block;
                    width: 40%;
                }
                ._3_5 {
                    display: block;
                    width: 60%;
                }
                .panel {
                    display: block;
                    width: 100%;
                    padding: 20px;
                }
                #home {
                    margin: 100px 0; 
                    padding: 50px;
                }
                .home-img {
                    width: 70%;
                }
                #products, #examples {
                    color: #fff;
                }
                .product-title {
                    padding: 10px;
                    text-align: center;
                }
                .product-img {
                    width: 50%;
                }
                .product-button  {
                    margin: 30px;
                }
                #explanation {
                    text-align: center;
                    padding: 60px 0;
                }
                .explanation-text {
                    padding: 15px;
                }
                #examples {
                    text-align: center;
                }
                .example-img {
                    border-radius: 50%;
                    width: 100%;
                    padding: 2px;
                }
                .example-img-wrapper {
                    padding: 10px;
                }
                footer {
                    text-align: center;
                }
                button {
                    padding: 10px;
                    margin: 10px 0;
                }
                .divider {
                    border-left: 1px solid #fff;
                }
                .font-size-m {
                    font-size: 20px;
                }
                .font-size-l {
                    font-size: 24px;
                }
                .font-size-xl {
                    font-size: 28px;
                }
                .font-size-xxl {
                    font-size: 36px;
                }
                .right {
                    float: right;
                }
                .purple {
                    background-color: green ;
                    color: #fff;
                }
                .orange {
                    color: orange;
                }
                .gray {
                    color: #878181;
                }
                @media screen and (min-width: 801px) {
                }  
                @media screen and (max-width: 800px) {
                    .product-title, .product-img, .explanation-text {
                        display: block; 
                        width: 100%;
                    }
                    .divider {
                        border: 0px;
                        border-top: 1px solid #fff;
                    }
                    #home {
                        margin: 0;
                    }
                    #home-img {
                        width: 100%;
                    }
                }
            </style>`
    }
    render() {
        this.shadowRoot.innerHTML = `
            ${this.getStyle()}
            <section class="w3b-landing">
                ${this.loadHome()}
                ${this.loadProducts()}
                ${this.loadExplanation()}
                ${this.loadExamples()}
                <footer class="_1_1">
                    <h5> 
                        Design & Code with <3 from Antwerp 
                        | <a href="mailto:info@webwizart.be">info@webwizart.be</a> 
                        | <a href="http://www.webwizart.be" target="_blank">www.webwizart.be</a>
                    </h5>
                </footer>
            </section>`;
    }
}
customElements.define('w3b-landing', LandingComponent);
