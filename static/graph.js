
function draw(data) {

    //add method needs to be done before instantiation
    addMethodNeighbors();

    //instantiate sigma
    s = new sigma({
        graph: data,
        container: 'container',
        settings: {
            minEdgeSize: 2.5,
            maxEdgeSize: 2.5,
            enableCamera: false
        }
    });

    //setup to highlight neighbors when a node is clicked
    setupNeighbors(s);
}

function addMethodNeighbors() {
    sigma.classes.graph.addMethod('neighbors', function (nodeId) {
        var k,
            neighbors = {},
            index = this.allNeighborsIndex[nodeId] || {};

        for (k in index)
            neighbors[k] = this.nodesIndex[k];

        return neighbors;
    });
}

function setupNeighbors(s) {
    
    //save the original colors
    s.graph.nodes().forEach(function (n) {
        n.originalColor = n.color;
    });
    s.graph.edges().forEach(function (e) {
        e.originalColor = e.color;
    });

    s.bind('clickNode', function (e) {
        var nodeId = e.data.node.id,
            toKeep = s.graph.neighbors(nodeId);
        toKeep[nodeId] = e.data.node;

        s.graph.nodes().forEach(function (n) {
            if (toKeep[n.id])
                n.color = n.originalColor;
            else
                n.color = '#eee';
        });

        s.graph.edges().forEach(function (e) {
            if (toKeep[e.source] && toKeep[e.target])
                e.color = e.originalColor;
            else
                e.color = '#eee';
        });

        s.refresh();
    });

    s.bind('clickStage', function (e) {
        s.graph.nodes().forEach(function (n) {
            n.color = n.originalColor;
        });

        s.graph.edges().forEach(function (e) {
            e.color = e.originalColor;
        });

        s.refresh();
    });
}