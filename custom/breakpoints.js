// Breakpoints extension - allow execute of notebook cells until a breakpoint
// is encountered. If a breakpoint is set at the currently selected cell, 
// run cell anyway, allowing to step through the notebook

"using strict";

var cellstate_extension = (function() {
    var breakpointKey = { "Alt-B" : function(){ /* TODO: add breakpoint key */ ;} };

    function setMarker() {
        var marker = document.createElement("div");
        marker.style.color = "#822";
        marker.innerHTML = "●";
        return marker;
    }

    /**
     * Concatenate associative array objects
     *
     * Source: http://stackoverflow.com/questions/2454295/javascript-concatenate-properties-from-multiple-objects-associative-array
     */
    function collect() {
        var ret = {};
        var len = arguments.length;
        for (var i=0; i<len; i++) {
            for (p in arguments[i]) {
                if (arguments[i].hasOwnProperty(p)) {
                    ret[p] = arguments[i][p];
                }
            }
        }
        return ret;
    }

    /**
     * Toggle breakpoint marker on/off
     * 
     * @param {Object} current codecell
     * @param {Boolean} turn breakpoint on/off 
     */
    function makeLineMarker(cm,n) {
        var info = cm.lineInfo(n);
        cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : setMarker());        
    };

    /**
     * Register newly created cell TODO: needed here ??
     *
     * @param {Object} event
     * @param {Object} nbcell notebook cell
     */
    create_cell = function (event,nbcell,nbindex) {
        var cell = nbcell.cell;
        if ((cell instanceof IPython.CodeCell)) {
            cell.code_mirror.on("gutterClick", makeLineMarker);
            var gutters = cell.code_mirror.getOption('gutters');
            cell.code_mirror.setOption('gutters', [gutters, "breakpoints" ]);
            var keys = cell.code_mirror.getOption('extraKeys');
            cell.code_mirror.setOption('extraKeys', collect(keys, breakpointKey ));
        }
    };
    
    // Go over existing cells
    var cells = IPython.notebook.get_cells();
    for(var i in cells){
        var cell = cells[i];
        if ((cell instanceof IPython.CodeCell)) {
            cell.code_mirror.on("gutterClick", makeLineMarker);
            var gutters = cell.code_mirror.getOption('gutters');
            cell.code_mirror.setOption('gutters', [gutters, "breakpoints" ]);
            var keys = cell.code_mirror.getOption('extraKeys');
            cell.code_mirror.setOption('extraKeys', collect(keys, breakpointKey ));
        }
    };
    
    // Attach a listener to every newly created cell
    $([IPython.events]).on('create.Cell',create_cell);
})();