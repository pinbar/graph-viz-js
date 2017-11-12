var fs = require('fs');
var config = require('./config');
var colorUtil = require('./color-util');

module.exports = {
    getGraphData: function getGraphData() {
        var dseData = loadJSON();
        var data = convertDSEToSigmaFmt(dseData);
        return {data: data, colors: colorUtil.getLegend()};
    }
}

function loadJSON() {
    var dseData = JSON.parse(fs.readFileSync(config.dataFile));
    return dseData;
}

function convertDSEToSigmaFmt(dseData) {
    var data = [];
    var nodes = [];
    var edges = [];

    dseData = dseData.result;

    if(config.sortNodes) {
        dseData.graph.vertices = dseData.graph.vertices.sort(nodeComparator)
    }

    for (i = 0; i < dseData.graph.vertices.length; i++) {
        var nodeId = dseData.graph.vertices[i].id;
        var type = dseData.graph.vertices[i].label;
        var name = dseData.graph.vertices[i].properties.name[0].value;
        
        //facilitates a balanced layout with random but spaced positioning
        var x = Math.cos(Math.PI * 2 * i / dseData.graph.vertices.length);
        var y = Math.sin(Math.PI * 2 * i / dseData.graph.vertices.length);
        
        //get node/edge colors
        var color = colorUtil.getColor(type);

        nodes.push({ "id": nodeId, "label": name, "color": color, "x": x, "y": y, "size": 1 });
    }

    for (i = 0; i < dseData.graph.edges.length; i++) {
        var edgeId = dseData.graph.edges[i].id;
        var target = dseData.graph.edges[i].inV;
        var source = dseData.graph.edges[i].outV;
        edges.push({ "id": edgeId, "source": source, "target": target, size: 100, "type": "arrow" });
    }

    data = { "nodes": nodes, "edges": edges };
    return data;
}

function nodeComparator(a, b) {
    console.log(a.label < b.label);
    if (a.label < b.label)
        return -1;
    if (a.label > b.label)
        return 1;
    return 0;
}