var html = document.getElementsByTagName("html")[0];
const mutationObserver = new MutationObserver(setTheme);
mutationObserver.observe(html, { attributeFilter: ["data-theme"] });

function setTheme() {
    var theme = html.dataset.theme;
    if (theme === "darkmode") {
        monaco.editor.setTheme('vs-dark')
    } else {
        monaco.editor.setTheme('vs')
    }
}

function addMonacoShortcodesAction(editor) {
    editor.addAction({
        id: "shortcodes",
        label: "Add Shortcode",
        run: function (editor) {
            shortcodesApp.init(function (value) {
                if (value) {
                    var selection = editor.getSelection();
                    var text = value;
                    var op = { range: selection, text: text, forceMoveMarkers: true };
                    editor.executeEdits("shortcodes", [op]);
                }
                editor.focus();
            })
        },
        contextMenuGroupId: 'orchardcore',
        contextMenuOrder: 0,
        keybindings: [
            monaco.KeyMod.Alt | monaco.KeyCode.KEY_S,
        ]
    });
}
