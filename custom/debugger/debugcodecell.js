function DebugCodeCell() {
  // Call the parent constructor
  CodeCell.call(this);
};

// inherit Person
DebugCodeCell.prototype = new CodeCell();

// correct the constructor pointer because it points to Person
DebugCodeCell.prototype.constructor = DebugCodeCell;
 
DebugCodeCell.prototype.create_element = function () {
    IPython.CodeCell.prototype.create_element.apply(this, arguments);
}

// TODO: remove temp
DebugCodeCell.prototype.testDebug = function(){
  alert('hi, I am a debug cell');
};