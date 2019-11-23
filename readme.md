# W3bApp

A set of Web Components to create a component based W3b App with:
- State Store with Singleton & Observer Pattern
- View Components
- Navigation Component
- Header Component
- Blockstack Login
- Landing page 
- Responsive Design -> Mobile first

# Getting Started
Start a server in the root to host the W3bApp pick one but make sure to set CORS for the Blockstack Auth. I Use a global package called `http-server` which you can find on NPM.
```
$ npm i -g http-server
$ http-server --cors
```

That's it folks!!

# Add a View
1. Create a new view file `myComponent.view.js` and store it in the views folder.
2. Add your new view component to `views.config.js`. 
```
    {
        title: 'My Component !!',
        tag: 'my-component'
    }        
```
3. Add a new script tag to the `index.html` view file. 
```
<script src='./components/views/myComponent.view.js' type='module'></script>
```
4. Refresh and you have one more view.

No worries for your navigation because its renderd there too based on the `views.config.js` file.