if (typeof document !== 'undefined') {
    require('codemirror/mode/javascript/javascript')
    require('codemirror/mode/jsx/jsx')

    // make it easier to navigate the slides via the keyboard
    document.body.tabIndex = '-1'
    window.addEventListener('keyup', e => {
        if (e.key === 'Escape') {
            document.body.focus()
        }
    })
}
