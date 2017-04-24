import {inlineFactory} from '../utils/InlineComponent'
import {blcokFactory, dataBlockBtnFactory} from '../utils/BlockComponent'
import {
    Bold,
    UnderLine,
    Italic,
    Strikethrough,
    Bulleted,
    Numbered,
    AlignJustify,
    AlignLeft,
    AlignCenter,
    AlignRight
} from '../utils/Button'
import {List} from 'immutable'
import BOTTOMTAG from '../plugin/BottomTag'
import UPPERTAG from '../plugin/UpperTag'
import FONTSIZE from '../plugin/FontSize'
import FONTFAMILY from '../plugin/FontFamliy'
import HEADERBLOCK from '../plugin/HeaderBlock'
import FONTCOLOR from '../plugin/FontColor'
import BACKGROUNDCOLOR from '../plugin/BackgroundColor'
import LINK from '../plugin/Link'
import UNLINK from '../plugin/UnLink'
import IMAGE from '../plugin/Image'
import INCREASE from '../plugin/Increase'
import DECREASE from '../plugin/Decrease'
import REDO from '../plugin/Redo'
import UNDO from '../plugin/Undo'
import CLEAR from '../plugin/Clear'
const BOLD = inlineFactory('BOLD', Bold)
const UNDERLINE = inlineFactory('UNDERLINE',UnderLine)
const ITALIC = inlineFactory('ITALIC', Italic)
const STRIKETHROUGH = inlineFactory('STRIKETHROUGH',Strikethrough)
// const UNLINK = 
const UNORDEREDLIST = blcokFactory('unordered-list-item', Bulleted)
const ORDERLIST = blcokFactory('ordered-list-item', Numbered)
const ALIGNJUSTIFY = dataBlockBtnFactory('justify', AlignJustify, 'text-align')
const ALIGNLEFT = dataBlockBtnFactory('left', AlignLeft, 'text-align')
const ALIGNCENTER = dataBlockBtnFactory('center', AlignCenter, 'text-align')
const ALIGNRIGHT = dataBlockBtnFactory('right', AlignRight, 'text-align')
// console.log(BOLD)
export default List([
    BOLD,
    UNDERLINE,
    ITALIC,
    STRIKETHROUGH,
    UPPERTAG,
    BOTTOMTAG,
    UNORDEREDLIST,
    ORDERLIST,
    ALIGNJUSTIFY,
    ALIGNLEFT,
    ALIGNCENTER,
    ALIGNRIGHT,
    INCREASE,
    DECREASE,
    LINK,
    UNLINK,
    FONTCOLOR,
    BACKGROUNDCOLOR,
    UNDO,
    REDO,
    CLEAR,
    IMAGE,
    FONTSIZE,
    FONTFAMILY,
    HEADERBLOCK
])