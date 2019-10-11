https://dmauro.github.io/Keypress/

var listener = new window.keypress.Listener();
listener.simple_combo("shift s", function() {
    console.log("You pressed shift and s");
});
