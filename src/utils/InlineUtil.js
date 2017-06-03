import {EditorState,genKey,Modifier,RichUtils,ContentBlock} from 'draft-js'


export function togglePrefixStyle (prefix, callbacks){
    return function (styleName) {
        const { getEditorState, setEditorState } = callbacks
        let editorState = getEditorState()
        // const selection = editorState.getSelection()
        let contentState = editorState.getCurrentContent()
        const selection = editorState.getSelection()
        const startBlock = contentState.getBlockForKey(selection.getStartKey())
        let inlineStyle = startBlock.getInlineStyleAt(selection.getStartOffset())
        let nextContent = inlineStyle.reduce((content, style) => {
            if (style.indexOf(`${prefix}`) !== -1) {
               return Modifier.removeInlineStyle(content, selection, style)
            } else {
                return content
            }
        }, contentState)
        console.log(nextContent)
        nextContent = Modifier.applyInlineStyle(nextContent, selection, styleName)
        let nextEditorState = EditorState.push(
            editorState,
            nextContent,
            'change-inline-style'
        )
        
        if (selection.isCollapsed()) {
            inlineStyle = inlineStyle.add(styleName)
            nextEditorState = EditorState.setInlineStyleOverride(nextEditorState, inlineStyle)
        }
        // changeStyle = nextEditorState.getCurrentInlineStyle()
        // if (!inlineStyle.has(styleName)) {
        // }
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