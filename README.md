# Koin Inventory Management Web App

### Installation And Basic Setup
A step by step procedure to have a local development environment running:

Clone Gitlab project
```
git clone https://github.com/shafaaf/koin-inventory-webapp.git
```

Install npm dependencies
```
npm install
```

Run server
```
npm start
```

Open browser and go to: 
localhost:3000/login

### Todos
- Fix CSS styling methods
- Image sizing
- Make transaction listing responsive, sorting allowed
- Fix sidebar anchor links to move slowly and show header. Not working cause Scrollchor within Sidebar. Also
	Hack of creating extra category hidden under navbar. CHANGE this sidebar implementation - its weird
- Horizontal scrolling prevented using overflowX: hidden in listInventory.js This good?
- Item descriptions need to be limited or else destroys row alignment
- Item gallery setting items using this.items = []; better way?
- Clean up code using npm start warnings
- Remove all print statements
- Some warning about set state in transactions. I think not using componentDidMount properly
- Add ability to confirm or remove the pictures uploaded on add item page
- Add in loading profile on successful login