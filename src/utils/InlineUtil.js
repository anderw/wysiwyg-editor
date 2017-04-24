import {EditorState,genKey,Modifier,RichUtils,ContentBlock} from 'draft-js'


export function togglePrefixStyle (prefix, callbacks){
    return function (styleName) {
        const { getEditorState, setEditorState } = callbacks
        let editorState = getEditorState()
        let contentState = editorState.getCurrentContent()
        const selection = editorState.getSelection()
        let currentStyle = editorState.getCurrentInlineStyle()
        currentStyle.forEach( style => {
            if (style.indexOf(`${prefix}`) !== -1) {
                currentStyle = currentStyle.remove(style)
            }
        })
        let nextEditorState = EditorState.push(
            editorState,
            contentState,
            'change-inline-style'
        )
        let changeStyle = nextEditorState.getCurrentInlineStyle()
        if (selection.isCollapsed()) {
            nextEditorState = EditorState.setInlineStyleOverride(nextEditorState, currentStyle.has(styleName) ? currentStyle.remove(styleName) : currentStyle.add(styleName))
        }
        changeStyle = nextEditorState.getCurrentInlineStyle()
        if (!changeStyle.has(styleName)) {
            nextEditorState = RichUtils.toggleInlineStyle(
            nextEditorState,
            styleName
            )
        }
        setEditorState(nextEditorState)
    }
}

export function execlusiveStyleFn(editorState, styleType, style) {
    const selection = editorState.getSelection()
    const nextContentState = styleType.reduce((contentState, s) => {
        return Modifier.removeInlineStyle(contentState, selection, s)
    }, editorState.getCurrentContent())

    let nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        'change-inline-style'
    )

    const currentStyle = nextEditorState.getCurrentInlineStyle()
    if (selection.isCollapsed()) {
        nextEditorState = currentStyle.reduce((state, s) => {
            return RichUtils.toggleInlineStyle(state, s)
        }, nextEditorState)
    }

    if(!currentStyle.has(style)){
        nextEditorState = RichUtils.toggleInlineStyle(
            nextEditorState,
            style
        )
    }
    return nextEditorState
}