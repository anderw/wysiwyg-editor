import createButton from '../utils/createButton'
import React, {Component} from 'react'

let style={
    fill: "currentcolor",
    verticalAlign: "middle",
    width: 16,
    height: 16
}

export let Bold = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4h-6.25v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zm-5.6-4.29h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9h-3.5v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g> 
</svg>)})

export let UnderLine = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M12 17c3.31 0 6-2.69 6-6v-8h-2.5v8c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5v-8h-2.5v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2h-14z"></path></g>
</svg>)})

export let Italic = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M10 4v3h2.21l-3.42 8h-2.79v3h8v-3h-2.21l3.42-8h2.79v-3z"></path></g>
</svg>)})

export let Strikethrough = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M10 19h4v-3h-4v3zm-5-15v3h5v3h4v-3h5v-3h-14zm-2 10h18v-2h-18v2z"></path></g>
</svg>)})

export let UpperTag =  createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M8 11h3v10h2v-10h3l-4-4-4 4zm-4-8v2h16v-2h-16z"></path></g>
</svg>)})

export let BottomTag = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M16 13h-3v-10h-2v10h-3l4 4 4-4zm-12 6v2h16v-2h-16z"></path></g>
</svg>)})

export let Bulleted = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0 12.17c-.74 0-1.33.6-1.33 1.33s.6 1.33 1.33 1.33 1.33-.6 1.33-1.33-.59-1.33-1.33-1.33zm3 2.33h14v-2h-14v2zm0-6h14v-2h-14v2zm0-8v2h14v-2h-14z"></path></g>
</svg>)})

export let Numbered = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M2 17h2v.5h-1v1h1v.5h-2v1h3v-4h-3v1zm1-9h1v-4h-2v1h1v3zm-1 3h1.8l-1.8 2.1v.9h3v-1h-1.8l1.8-2.1v-.9h-3v1zm5-6v2h14v-2h-14zm0 14h14v-2h-14v2zm0-6h14v-2h-14v2z"></path></g>
</svg>)})

export let AlignJustify = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M3 21h18v-2h-18v2zm0-4h18v-2h-18v2zm0-4h18v-2h-18v2zm0-4h18v-2h-18v2zm0-6v2h18v-2h-18z"></path></g>
</svg>)})

export let AlignLeft = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M15 15h-12v2h12v-2zm0-8h-12v2h12v-2zm-12 6h18v-2h-18v2zm0 8h18v-2h-18v2zm0-18v2h18v-2h-18z"></path></g>
</svg>)})

export let AlignCenter = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <path d="M7 15v2h10v-2h-10zm-4 6h18v-2h-18v2zm0-8h18v-2h-18v2zm4-6v2h10v-2h-10zm-4-4v2h18v-2h-18z"></path>
</svg>)})

export let AlignRight = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M3 21h18v-2h-18v2zm6-4h12v-2h-12v2zm-6-4h18v-2h-18v2zm6-4h12v-2h-12v2zm-6-6v2h18v-2h-18z"></path></g>
</svg>)})

export let ColorText = createButton({children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path fill-opacity=".36" d="M0 20h24v4h-24z"></path><path d="M11 3l-5.5 14h2.25l1.12-3h6.25l1.12 3h2.25l-5.49-14h-2zm-1.38 9l2.38-6.33 2.38 6.33h-4.76z"></path></g>
</svg>)})
export let ColorFill = createButton({
    children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M16.56 8.94l-8.94-8.94-1.41 1.41 2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zm-11.35 1.06l4.79-4.79 4.79 4.79h-9.58zm13.79 1.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"></path><path fill-opacity=".36" d="M0 20h24v4h-24z"></path></g>
    </svg>)
})

export let UnLink = createButton({
    children: (<img style={{width:'16px', height:'16px'}} src={require('assets/icon/unlink-symbol.svg')} />)
})

export let Link = createButton({
    children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4v-1.9h-4c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9h-4c-1.71 0-3.1-1.39-3.1-3.1zm4.1 1h8v-2h-8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4v1.9h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
    </svg>)
})

export let Increase = createButton({
    children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M3 21h18v-2h-18v2zm0-13v8l4-4-4-4zm8 9h10v-2h-10v2zm-8-14v2h18v-2h-18zm8 6h10v-2h-10v2zm0 4h10v-2h-10v2z"></path></g>
    </svg>)
})

export let Decrease = createButton({
    children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M11 17h10v-2h-10v2zm-8-5l4 4v-8l-4 4zm0 9h18v-2h-18v2zm0-18v2h18v-2h-18zm8 6h10v-2h-10v2zm0 4h10v-2h-10v2z"></path></g>
    </svg>)
})

export let Image = createButton({
    children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M21 19v-14c0-1.1-.9-2-2-2h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-12.5-5.5l2.5 3.01 3.5-4.51 4.5 6h-14l3.5-4.5z"></path></g>
    </svg>)
})

export let Redo = createButton({
    children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M18.4 10.6c-1.85-1.61-4.25-2.6-6.9-2.6-4.65 0-8.58 3.03-9.96 7.22l2.36.78c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88l-3.62 3.62h9v-9l-3.6 3.6z"></path></g>
    </svg>)
})

export let Undo = createButton({
    children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6l-3.6-3.6v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78c-1.39-4.19-5.32-7.22-9.97-7.22z"></path></g>
    </svg>)
})

export let Clear = createButton({
    children: (
    <svg viewBox="0 0 24 24"  style={style}  preserveAspectRatio="xMidYMid meet" fit >
          <g><path d="M3.27 5l-1.27 1.27 6.97 6.97-2.47 5.76h3l1.57-3.66 5.66 5.66 1.27-1.27-14.45-14.46-.28-.27zm2.73 0v.18l2.82 2.82h2.4l-.72 1.68 2.1 2.1 1.61-3.78h5.79v-3h-14z"></path></g>
    </svg>)
})