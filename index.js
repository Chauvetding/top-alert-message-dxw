import {CheckCircleFilled, ExclamationCircleFilled, CloseCircleFilled} from '@ant-design/icons'
import React from 'react'
import ReactDOM from 'react-dom';

class Alert extends React.Component {
  render() {
    const {msg, type, style} = this.props
    return(
      <div style={{color: "#666",textAlign:"center",padding: "8px", ...style}}>
        <span>{type==='success' ?
        <CheckCircleFilled style={{color: "#72c140"}}/> :
        type==='warning' ?
        <ExclamationCircleFilled style={{color: "#f0af41"}}/> :
        <CloseCircleFilled style={{color: "#ed5b56"}}/>}</span>
        <span>{msg}</span>
      </div>
    )
  }
}
class TopAlert {
  success = msg => {
    const style = {background: 'rgba(183, 235, 143,.9)'}
    const temp = {
      msg,
      type: "success"
    }
    this.alert(temp, style)
  }
  warning = msg => {
    const style = {background: 'rgba(255,229,143,.9)'}
    const temp = {
      msg,
      type: "warning"
    }
    this.alert(temp, style)
  }
  error = msg => {
    const style = {background: 'rgba(255,204,199,.9)'}
    const temp = {
      msg,
      type: "error"
    }
    this.alert(temp,style)
  }
  alert = (options, style={}) => {
    const div = document.createElement('div')
    div.style.position = "fixed"
    div.style.top = 0
    div.style.zIndex = 99999
    div.style.width = "100%"
    div.style.textAlign = "cennter"
    div.classList.add("animate__animated","animate__fadeInDown")
    document.body.append(div)
    ReactDOM.render(<Alert {...options} style={{textAlign: 'center',...style}} showIcon/>, div)
    setTimeout(() => {
      div.classList.remove('animate__fadeInDown')
      div.classList.add("animate__fadeOutUp")
      setTimeout(() => {
        document.body.removeChild(div)
      }, 1000);
    }, 3000);
  }
}

TopAlert.getInstance = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new TopAlert()
    }
    return instance
  }
})()
export const Message = TopAlert.getInstance()