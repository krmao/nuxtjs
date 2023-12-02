// noinspection JSUnusedGlobalSymbols,PointlessArithmeticExpressionJS

let enable: boolean;
export default class WindowResizeUtil {
  zoom: number = 1;

  // 获取系统类型
  static getSystem = () => {
    if (typeof enable !== 'undefined') {
      // console.log("getSystem cache enable", enable);
      return enable;
    }

    const agent = navigator.userAgent.toLowerCase();
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent);

    let result = false;

    if (isMac) {
      result = false;
    }
    if (agent.includes('windows')) {
      result = true;
    }

    if (typeof enable === 'undefined') {
      enable = result;
    }
    return result;
  };

  // 监听方法兼容写法
  _addHandler = (element, type, handler) => {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else {
      // noinspection JSUnresolvedVariable
      if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
      } else {
        element['on' + type] = handler;
      }
    }
  };

  // 校正浏览器缩放比例 在这里进行配置。页面的缩放为多少，及对应的像素下 进行适配。
  _correct = (onZoomChangedListener) => {
    const width = window.innerWidth;
    const zoom = width < 1440 ? (width / 1440) * 1 : 1;
    if (this.zoom !== zoom) {
      this.zoom = zoom;
      // noinspection TypeScriptUnresolvedReference
      const body = document.getElementsByTagName('body')[0];
      if (body instanceof HTMLBodyElement) {
        (body.style as any).zoom = zoom;
      }
      onZoomChangedListener?.(zoom);
    }
  };

  getZoom = () => {
    return enable && window.innerWidth < 1440 ? (window.innerWidth / 1440) * 1 : 1;
  };

  // 监听页面缩放
  _watch = (onZoomChangedListener) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const t = this;
    t._addHandler(window, 'resize', function () {
      // 注意这个方法是解决全局有两个window.resize
      // 重新校正
      t._correct(onZoomChangedListener);
    });
  };

  // 初始化页面比例
  init = (onZoomChangedListener) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const t = this;
    if (WindowResizeUtil.getSystem()) {
      // 判断设备，目前只在windows系统下校正浏览器缩放比例
      // 初始化页面校正浏览器缩放比例
      t._correct(onZoomChangedListener);
      // 开启监听页面缩放
      t._watch(onZoomChangedListener);
    }
  };
}
