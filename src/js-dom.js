
export class JS_DOM {

  isDom(obj){
    try {
      return obj instanceof HTMLElement;
    }
    catch(e){
      return false;
    }
  }

  isStr(str){
    try {
      return typeof str == 'string';
    }
    catch(e){
      return false;
    }
  }

  selectDom(elem){
    if(!elem) return false;
    let _dom;
    if(( Array.isArray(elem) || elem.length ) && !this.isStr(elem)){
      if(this.isDom(elem[0])){
        _dom = Array.prototype.slice.call( elem );
      } else {
        return false;
      }
    } else {
      if(this.isDom(elem)){
        _dom = Array(elem);
      } else {
        _dom = Array.prototype.slice.call( document.querySelectorAll(elem) );
      }
    }
    if(_dom.length === 0) _dom = null; 
    return _dom;
  }

  hasClass(elem, className){
    if(this.isDom(elem)){
      return elem.classList.contains(className);
    } else {
      return document.querySelector(elem).classList.contains(className);
    }
  }

  addClass(elem, className){
    let _dom = this.selectDom(elem);
    if(!_dom) return false;
    _dom.map((item)=>{
      item.classList.add(className);
    });
  }

  removeClass(elem, className){
    let _dom = this.selectDom(elem);
    if(!_dom) return false;
    _dom.map((item)=>{
      item.classList.remove(className);
    });
  }

  toggleClass(elem, className){
    let _dom = this.selectDom(elem);
    if(!_dom) return false;
    _dom.map((item)=>{
      item.classList.toggle(className);
    });
  }

  setHtml(elem, html){
    let _dom = this.selectDom(elem);
    if(!_dom) return false;
    _dom.map((item)=>{
      item.innerHTML = html;
    });
  }

  appendHtml(elem, html){
    let _dom = this.selectDom(elem);
    if(!_dom) return false;
    _dom.map((item)=>{
      item.innerHTML += html;
    });
  }

  addEvent(elem, event, func){
    if(elem === window){
      window.addEventListener(event, func);
    } else {
      let _dom = this.selectDom(elem);
      if(!_dom) return false;
      _dom.map((item)=>{
        item.addEventListener(event, func);
      });
    }
  }

  removeEvent(elem, event, func){
    if(elem === window){
      window.removeEventListener(event, func);
    } else {
      let _dom = this.selectDom(elem);
      if(!_dom) return false;
      _dom.map((item)=>{
        item.removeEventListener(event, func);
      });
    }
  }

  setStyle(elem, obj){
    let _dom = this.selectDom(elem);
    if(!_dom) return false;
    _dom.map((item)=>{
      let _style = '';
      Object.keys(obj).forEach((key) => {
        _style += key.replace(/([A-Z])/g, '-$1').toLowerCase() + ':' + obj[key] + ';';
      });
      item.setAttribute('style', _style);
    });
  }

  setAttribute(elem, obj){
    let _dom = this.selectDom(elem);
    if(!_dom) return false;
    _dom.map((item)=>{
      let _property = '';
      Object.keys(obj).forEach((key) => {
        _property = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        item.setAttribute(_property, obj[key]);
      });
    });
  }

}
