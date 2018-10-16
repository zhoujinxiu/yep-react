import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';

export default class Message extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.any),
    /**
     * 通知显示时间，-1代表一直存在，需要用户手动关闭
     * 单位毫秒
     */
    duration: PropTypes.number,

    /**
     * 通知类型，普通通知、警告通知、错误通知
     */
    tipType: PropTypes.oneOf(['info', 'warn', 'error']),

    /**
     * 通知位置：固定顶部、固定底部、在通知栏所处DOM位置不变
     */
    position: PropTypes.oneOf(['fix-top', 'fix-bottom', 'in-place']),

    icon: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    prefixCls: 'Yep-message',
    className: '',
    style: {},
    duration: -1,
    tipType: 'info',
    position: 'in-place',
    icon: false,
  };

  constructor() {
    super();
    this.state = {
      isShow: true,
    };
    this.closeMessage = this.closeMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  componentDidMount() {
    const {duration} = this.props;

    if (duration > 0) {
      this.timer = setTimeout(() => {
        this.closeMessage();
      }, duration);
    }
  }

  closeMessage() {
    // 清空定时器
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.setState({
      isShow: false,
    });
  }

  showMessage() {
    // 清空定时器
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.setState({
      isShow: true,
    });
  }

  render() {
    if (!this.state.isShow) return null;

    const {prefixCls, className, style, tipType, position, icon, duration} = this.props;

    const wrapperCls = classNames(prefixCls, position, className);
    const box = classNames('box', `box-${tipType}`);

    // icon分为info,warn,error三级
    return (
      <div className={wrapperCls} style={style}>
        <div className={box}>
          {icon && <Icon onClick={this.closeMessage} className="icon icon-info" type="lego_yichang" color="#fff" />}

          <div className="message-text">{this.props.children}</div>
          {duration !== -1 && (
            <Icon onClick={this.closeMessage} className="icon icon-close" type="lego_cuowu2" color="#fff" />
          )}
        </div>
      </div>
    );
  }
}
