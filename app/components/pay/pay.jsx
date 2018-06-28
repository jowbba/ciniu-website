import React from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import store from '../../store/store'
import Action from '../../action/action'
import css from 'Css2/pay'
import common from 'Css2/common'

class Pay extends React.Component {
  constructor() {
    super()
    this.state = {
      pointIndex : -1,
      price: 0
    }
  }

  componentWillMount() {
    if (!this.props.view.user) this.props.history.push('/login?from=pay')
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextprops) {
    // console.log(nextprops)
  }

  render() {
    let { width, height } = this.props.view
    let frameStyle = { width, height}
    let user, isLogin = false
    
    if (this.props.view.user) isLogin = true
    else return (null)
    
    user = this.props.view.user
    if (!user.point) user.point = 0
    let vip = user.roles.find(item => item.roleName == 'Vip')
    return (
      <div id={css.frame} style={frameStyle}>
        <div id={common.nav} style={{backgroundImage: 'linear-gradient(30deg, #3f4cfd, #2196f3)'}}>
          <img src={require('Image2/logo-1.png')} alt="" />
          <ul>
            <li><Link to='/'>产品介绍</Link></li>
            <li><Link to='/download'>客户端下载</Link></li>
            <li className={common.now}><Link to='/pay'>购买产品</Link></li>
            <li><Link to='/'>公司介绍</Link></li>
            {isLogin ?
              <li><Link to='/person'>个人中心</Link></li> :
              <li>
                <span><Link to='/login'>登录</Link></span>
                <span>|</span>
                <span><Link to='/register'>注册</Link></span>
              </li>
            }

          </ul>
        </div>
        <div className={css.content}>
          <div >
            <div className={css.type}>账户</div>
            <div className={css.username}>{user.username}</div>
          </div>
          <div >
            <div className={css.type}>软件产品</div>
            <div className={css.list}>
              <div className={css['list-row']}>
                <input type="radio" name="vip" id="" checked value='Vip' onChange={this.selectVip.bind(this, 'Vip')}/>
                <span>词牛违禁词软件</span>
                <span>{vip?'已购买':1000/年}</span>
              </div>
              <div className={css.line}></div>
              <div className={css['remain-point']}>剩余点数：{user.point}</div>
            </div>
          </div>
          <div >
            <div className={css.type + ' ' + css['height-type']}>充值点数</div>
            <div className={css['point-select-frame']}>
              {pointList.map((item, index) => {
                return (
                  <div onClick={this.select.bind(this, index)} className={css['select-colume']}
                    id={this.state.pointIndex == index?css.selected:''} key={index}>
                    <img style={this.state.index == index?{}:{display:'none'}} src={require('Image2/105.png')} />
                    <span>{item.price} 元</span>
                    <span>{item.count} 点</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div >
            <div className={css.type}>支付方式</div>
            <div className={css['pay-list']}>
              {payWayList.map((item, index) => {
                return (
                  <div className={css['pay-colume']} key={index}>
                    <img src={item.url} alt=""/>
                    <span>{item.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div >
            <div className={css.type}>结算总价</div>
            <div className={css.price}>{this.state.price} 元</div>
          </div>
          <div style={{marginTop: '25px'}}>
            <div className={css.type}></div>
            <div className={css.next}>下一步</div>
          </div>
        </div>
      </div>
    )
  }

  select(pointIndex) {
    if (pointIndex == this.state.pointIndex) this.setState({pointIndex: -1})
    else this.setState({pointIndex}, () => {
      let price = this.countPrice()
      console.log(this.state)
      this.setState({price})
    })
    

    
  }

  selectVip(type) {
    console.log(type)
  }

  countPrice() {
    let { pointIndex } = this.state
    let pointPrice = 0
    console.log(pointIndex)
    if (pointIndex !== -1) pointPrice += pointList[pointIndex].price

    return pointPrice
  }
}

const pointList = [
  {price: 50, count: '5,000'},
  {price: 98, count: '10,000'},
  {price: 180, count: '20,000'},
  {price: 350, count: '40,000'},
  {price: 1000, count: '120,000'},
]

const payWayList = [
  {url: require('Image2/101.png'), name: '支付宝'}
]

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Pay)