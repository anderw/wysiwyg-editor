import React, { Component } from 'react'
function remCalc(...values) {
    let remBase = 16
    return values.map((value) => `${value/remBase}rem`).join(" ")
}
const styles = {
    button: {
        background: "none",
        border: "1px solid #fff",
        color: "rgb(45, 45, 45)",
        cursor: "pointer",
        lineHeight: 0,
        outline: "none",
        margin : remCalc(3),
        padding: remCalc(8),
        transition: "color 250ms",
        verticalAlign: "middle"
    },
    active: {
        color: 'rgb(33, 134, 214)',
        border: "1px solid rgb(33, 134, 214)",
        background: "rgba(255, 255, 255, 0.0980392)",
        transition: "none"
    }
}
export default ({ style, children }) => {
    class InlineButton extends Component {
        state = {
            active : false
        }

        static get defaultProps() {
            return {
                active : false
            }
        }

        mergeStyles(...args) {
            return Object.assign({}, ...args)
        }

        componentWillReceiveProps(nextProps) {
            const {active} = this.props
            if('active' in nextProps){
                this.setState({
                    active : nextProps.active
                })
            }
        }

        setActive (status){
            this.setState({
                active : status
            })
        }

        interactionStateIsActive() {
            return this.state.active === true;
        }

        changeActive(e) {
            e.stopPropagation()
            e.preventDefault()
            let {onChange,operate} = this.props
            onChange && onChange(operate)
        }

        render (){
            const props = this.props
            return (<button
                {...props}
                onMouseDown={this.changeActive.bind(this)}
                style={this.mergeStyles(
                            styles.button,
                            this.props.style,
                            this.interactionStateIsActive() && styles.active
                    )}>
                {children}
            </button>)
        }
    }
    return InlineButton
}