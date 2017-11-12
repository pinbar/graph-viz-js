module.exports = {
    colors: new Map(),

    getLegend: function getLegend() {
        return JSON.stringify([...this.colors]);
    },

    //a random color is chosen for a type if one doesnt already exist
    getColor: function getColor(type) {
        color = this.colors.get(type);
        if (!color) {
            //random color
            color = '#' + Math.random().toString(16).substr(-6);
            this.colors.set(type, color);
        }
        return color;
    },

    //to preset colors based on types. 
    //the cases here is for "test.json", change it to your "node types"
    getFixedColor: function getFixedColor(type) {
        var color = "";
        switch (type) {
            case "A":
                color = "#9b38b2";
                this.setColor(type, color);
                return color;
                break;
            case "B":
                color = "#f3a314";
                this.setColor(type, color);
                return color;
                break;
            case "C":
                color = "#207068";
                this.setColor(type, color);
                return color;
                break;
            default:
                //random color
                color = '#' + Math.random().toString(16).substr(-6);
                this.setColor(type, color);
                return color;
        }
    },

    setColor: function setColor(type, color) {
        if (!this.colors.get(type)) {
            this.colors.set(type, color);
        }
    }
}