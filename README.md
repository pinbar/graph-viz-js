## A simple example of graph data visualization with JavaScript

### tech stack
* **sigmajs** - javascript library for graph drawing 
* **nodejs** - javascript runtime built on v8 engine
* **express** - minimalistic web api framework for nodejs
* **jquery** - javascript helper library (for simpler ajax calls in this case)

### getting started
* clone repo and `npm install`
* in the project directory, run `node index.js`
* *optional: use **nodemon** to detect changes and auto restart the server
    * if you don't have nodemon, install it globally `npm install -g nodemon`
    * in the project directory run `nodemon`

### viewing the graph
* launch the browser and point to the baseurl `localhost:8080` 
    * port can be changed in `config.js`
* access the `/` or `graph` endpoints to render the graph on the page
* clicking on a node highlights its neighbors (nodes/edges connected to it), clicking elsewhere on the graph returns to the default view
* access the `data` endpoint to see the transformed JSON that is used for rendering the graph.

### customization
* this project uses the sigmajs library for drawing/rendering. It can be reconfigured by updating the sigma settings in `static/graph.js [line:11]`
* `color-util.js` provides two methods to choose colors for nodes/edges (random or fixed)
* to render nodes in a certain order, the data needs to be sorted. Sorting (default/natural sort) can be enabled in `config.js`

### data
* this project expects input data in a JSON format as exported by DSE (DataStax Enterprise) graph db. An example is `data/test.json`. 
    * For a different input format (from a different graph db), simply update the `convertDSEToSigmaFmt` method in `graph-service.js`.
* to use an input other than the `test.json`, change the `dataFile` path in `config.js`
