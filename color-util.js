module.exports = {
    colors: new Map(),
    
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
    
    //to preset colors based on types
    getFixedColor: function getFixedColor(type) {
        switch (type) {
            case "A":
                return "#9b38b2";
                break;
            case "B":
                return "#f3a314";
                break;
            case "C":
                return "#207068";
                break;
            default:
                //random color
                return '#' + Math.random().toString(16).substr(-6);
        }
    }
}