window.__require=function t(e,n,o){function i(c,s){if(!n[c]){if(!e[c]){var u=c.split("/");if(u=u[u.length-1],!e[u]){var a="function"==typeof __require&&__require;if(!s&&a)return a(u,!0);if(r)return r(u,!0);throw new Error("Cannot find module '"+c+"'")}}var l=n[c]={exports:{}};e[c][0].call(l.exports,function(t){return i(e[c][1][t]||t)},l,l.exports,t,e,n,o)}return n[c].exports}for(var r="function"==typeof __require&&__require,c=0;c<o.length;c++)i(o[c]);return i}({Client:[function(t,e,n){"use strict";cc._RF.push(e,"1eb3a0wjMVEZYr0CHpnS3iz","Client");var o=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var i=t("../Plugins/MoeEvent"),r=cc._decorator,c=r.ccclass,s=(r.property,function(){function t(){this.readyEvent=new i.default,this._ready=!1,this.connectEvent=new i.default,this.messageEvent=new i.default,this.commandEvent=new i.default,this.networkMessageEvent=new i.default,this.errorEvent=new i.default,this.disconnectEvent=new i.default}return Object.defineProperty(t.prototype,"isConnected",{get:function(){return null!=this.socket&&this.socket.readyState==this.socket.OPEN},enumerable:!0,configurable:!0}),t.prototype.connect=function(t){this.socket=new WebSocket(t),this.socket.onopen=this.onConnected.bind(this),this.socket.onmessage=this.onMessage.bind(this),this.socket.onerror=this.onError.bind(this),this.socket.onclose=this.onDisconnect.bind(this)},Object.defineProperty(t.prototype,"name",{get:function(){return this._name},set:function(t){this._name=t,this.send("player name: "+this._name)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultName",{get:function(){return"Player Name"},enumerable:!0,configurable:!0}),t.isValidName=function(t){return null!=t&&!(t.length<1)},Object.defineProperty(t.prototype,"ready",{get:function(){return this._ready},set:function(t){this._ready=t,this.send("ready: "+this._ready),this.readyEvent.invoke(this._ready)},enumerable:!0,configurable:!0}),t.prototype.send=function(t){this.socket.send(t)},t.prototype.onConnected=function(t){this.connectEvent.invoke(t)},t.prototype.onMessage=function(t){if(this.messageEvent.invoke(t),"string"==typeof t.data){var e=t.data;e.length>0&&("#"==e.charAt(0)?this.onCommand(e.slice(1).toLowerCase()):e.includes('"ID":')&&this.onNetworkMessage(e))}},t.prototype.onCommand=function(t){"retry"==t&&(this.ready=!1),this.commandEvent.invoke(t)},t.prototype.onNetworkMessage=function(t){var e=JSON.parse(t);this.networkMessageEvent.invoke(e)},t.prototype.onError=function(t){this.errorEvent.invoke(t)},t.prototype.onDisconnect=function(t){this.disconnectEvent.invoke(t)},t=o([c],t)}());n.default=s,cc._RF.pop()},{"../Plugins/MoeEvent":"MoeEvent"}],ControlMenu:[function(t,e,n){"use strict";cc._RF.push(e,"b9207qOdpNF/JGXHNnmY3ZV","ControlMenu");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=t("../Game"),c=t("./Menu"),s=t("../../Plugins/Virtual Joystick/VirtualJoystick"),u=cc._decorator,a=u.ccclass,l=u.property,p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.initial=null,e.HUD=null,e.death=null,e.leftStick=null,e.rightStick=null,e.healthBar=null,e.healthLabel=null,e}return o(e,t),e.prototype.setActiveMenu=function(t){this.initial.visibile=t==this.initial,this.HUD.visibile=t==this.HUD,this.death.visibile=t==this.death},Object.defineProperty(e.prototype,"game",{get:function(){return r.default.instance},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"client",{get:function(){return this.game.client},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"popup",{get:function(){return this.game.popup},enumerable:!0,configurable:!0}),e.prototype.onEnable=function(){this.setActiveMenu(this.initial),this.healthBar.node.active=!1,this.client.disconnectEvent.add(this.onDisconnect,this),this.client.commandEvent.add(this.onCommand,this),this.client.networkMessageEvent.add(this.onNetworkMessage,this),this.leftStick.onValueChanged.add(this.updateInput,this),this.rightStick.onValueChanged.add(this.updateInput,this)},e.prototype.updateInput=function(){var t=new f(this.leftStick.value,this.rightStick.value);this.client.send(t.getJSON())},e.prototype.onCommand=function(t){"start"==t&&this.setActiveMenu(this.HUD),"retry"==t&&(this.setActiveMenu(this.initial),this.healthBar.node.active=!1)},e.prototype.onNetworkMessage=function(t){if(11==t.ID){var e=h.default.Parse(t,new d);this.healthBar.progress=e.value/e.max,this.healthBar.node.active=!0,this.healthLabel.string=e.value.toFixed(1)+"/"+e.max.toFixed(1),e.value,e.max,0==e.value&&this.onDeath()}},e.prototype.onDeath=function(){this.setActiveMenu(this.death)},e.prototype.onDisconnect=function(){this.client.disconnectEvent.remove(this.onDisconnect),this.popup.display("Disconnected",this.game.reload,"Return")},i([l(c.default)],e.prototype,"initial",void 0),i([l(c.default)],e.prototype,"HUD",void 0),i([l(c.default)],e.prototype,"death",void 0),i([l(s.default)],e.prototype,"leftStick",void 0),i([l(s.default)],e.prototype,"rightStick",void 0),i([l(cc.ProgressBar)],e.prototype,"healthBar",void 0),i([l(cc.Label)],e.prototype,"healthLabel",void 0),e=i([a],e)}(c.default);n.default=p;var h=t("../Tools/NetworkMessage"),f=function(t){function e(e,n){var o=t.call(this,10)||this;return o.ID=10,o.left=e,o.right=n,o}return o(e,t),e}(h.default),d=function(t){function e(){return t.call(this,11)||this}return o(e,t),e}(h.default);cc._RF.pop()},{"../../Plugins/Virtual Joystick/VirtualJoystick":"VirtualJoystick","../Game":"Game","../Tools/NetworkMessage":"NetworkMessage","./Menu":"Menu"}],Game:[function(t,e,n){"use strict";cc._RF.push(e,"22d032rf9VIjpF6hk5QYgdb","Game");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=t("./Menu/Menu"),c=t("./Menu/ControlMenu"),s=t("./Menu/Popup"),u=t("./Client"),a=cc._decorator,l=a.ccclass,p=a.property,h=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.canvas=null,e.titleMenu=null,e.joinMenu=null,e.controlMenu=null,e.popup=null,e.client=null,e}var n;return o(e,t),n=e,e.prototype.onLoad=function(){n.instance=this,this.titleMenu.visibile=!1,this.joinMenu.visibile=!1,this.controlMenu.visibile=!1,this.popup.init(),this.popup.display("Retrieving Resources",null,null),f("RSC","Server Port",this.onServerPortRecieved,this),this.client=new u.default},e.prototype.onServerPortRecieved=function(t){4==t.readyState&&200==t.status?(this.popup.hide(),this.port=t.response,this.titleMenu.visibile=!0):this.popup.display("Failure Retrieving Resources",this.reload,"Retry")},e.prototype.start=function(){},e.prototype.reload=function(){cc.director.loadScene(cc.director.getScene().name)},i([p(cc.Canvas)],e.prototype,"canvas",void 0),i([p(r.default)],e.prototype,"titleMenu",void 0),i([p(r.default)],e.prototype,"joinMenu",void 0),i([p(c.default)],e.prototype,"controlMenu",void 0),i([p(s.default)],e.prototype,"popup",void 0),e=n=i([l],e)}(cc.Component);function f(t,e,n,o){var i=cc.loader.getXMLHttpRequest();i.open("RSC","Server Port",!0),i.onreadystatechange=function(){n.bind(o)(i)},i.send()}n.default=h,cc._RF.pop()},{"./Client":"Client","./Menu/ControlMenu":"ControlMenu","./Menu/Menu":"Menu","./Menu/Popup":"Popup"}],JoinMenu:[function(t,e,n){"use strict";cc._RF.push(e,"4169cmjk41NPbqWnQixoR7V","JoinMenu");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=t("../Game"),c=t("../Client"),s=t("./Menu"),u=cc._decorator,a=u.ccclass,l=u.property,p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.playerName=null,e.button=null,e}return o(e,t),e.prototype.initPlayerName=function(){var t=new cc.EditBox.EventHandler;t.component="JoinMenu",t.handler="onPlayerNameEdit",t.target=this.node,this.playerName.textChanged.push(t);var e=new cc.EditBox.EventHandler;e.component="JoinMenu",e.handler="onPlayerNameEditEnd",e.target=this.node,this.playerName.editingDidEnded.push(e);var n=cc.sys.localStorage.getItem("player name");null==n&&(n=c.default.defaultName),this.playerName.string=n,this.onPlayerNameEdit()},e.prototype.initButton=function(){var t=new cc.Button.EventHandler;t.component="JoinMenu",t.handler="onButtonClick",t.target=this.node,this.button.clickEvents.push(t),this.button.node.on("touchstart",this.onButtonTouched,this)},Object.defineProperty(e.prototype,"game",{get:function(){return r.default.instance},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"client",{get:function(){return this.game.client},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"popup",{get:function(){return this.game.popup},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hostName",{get:function(){return""==location.hostname?"localhost":location.hostname},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"address",{get:function(){return"ws://"+this.hostName+":"+this.game.port},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.initButton(),this.initPlayerName()},e.prototype.onButtonClick=function(){this.client.connectEvent.add(this.onConnected,this),this.client.disconnectEvent.add(this.onDisconnected,this),this.popup.display("Connecting",null,null),this.client.connect(this.address)},e.prototype.onButtonTouched=function(){0==c.default.isValidName(this.playerName.string)&&this.popup.display("Invalid Name",this.popup.hide,"Close")},e.prototype.onPlayerNameEdit=function(){this.button.interactable=c.default.isValidName(this.playerName.string)},e.prototype.onPlayerNameEditEnd=function(){cc.sys.localStorage.setItem("player name",this.playerName.string),this.game.reload()},e.prototype.onConnected=function(){this.client.connectEvent.remove(this.onConnected),this.client.disconnectEvent.remove(this.onDisconnected),this.popup.visibile=!1,this.game.canvas.fitWidth=!0,this.game.canvas.fitHeight=!1,this.client.name=this.playerName.string,this.visibile=!1,this.game.controlMenu.visibile=!0},e.prototype.onDisconnected=function(){this.client.connectEvent.remove(this.onConnected),this.client.disconnectEvent.remove(this.onDisconnected),this.popup.display("Connection\nFailed",this.popup.hide,"Close")},i([l(cc.EditBox)],e.prototype,"playerName",void 0),i([l(cc.Button)],e.prototype,"button",void 0),e=i([a],e)}(s.default);n.default=p,cc._RF.pop()},{"../Client":"Client","../Game":"Game","./Menu":"Menu"}],Menu:[function(t,e,n){"use strict";cc._RF.push(e,"5cbd0wxCuZDhKa72KFrxa5C","Menu");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=t("../../Plugins/MoeEvent"),c=cc._decorator,s=c.ccclass,u=(c.property,function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.onVisibilityChanged=new r.default,e.onShow=new r.default,e.onHide=new r.default,e}return o(e,t),Object.defineProperty(e.prototype,"visibile",{get:function(){return this.getVisible()},set:function(t){this.setVisible(t)},enumerable:!0,configurable:!0}),e.prototype.getVisible=function(){return this.node.activeInHierarchy},e.prototype.setVisible=function(t){t?this.show():this.hide()},e.prototype.show=function(){this.node.active=!0,this.onShow.invoke(null),this.onVisibilityChanged.invoke(!0)},e.prototype.hide=function(){this.node.active=!1,this.onShow.invoke(null),this.onVisibilityChanged.invoke(!1)},e.prototype.toggle=function(){this.visibile=!this.visibile},e=i([s],e)}(cc.Component));n.default=u,cc._RF.pop()},{"../../Plugins/MoeEvent":"MoeEvent"}],MoeEvent:[function(t,e,n){"use strict";cc._RF.push(e,"2d6f9UNHvRJl6inpa5qi9e9","MoeEvent"),Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function t(){this.callbacks=new Array}return t.prototype.add=function(t,e){var n=new i(t,e);return this.callbacks.push(n),n},t.prototype.remove=function(t){for(var e=0;e<this.callbacks.length;e++){if(this.callbacks[e].callback==t){this.callbacks.splice(e,1);break}}},t.prototype.invoke=function(t){for(var e=0;e<this.callbacks.length;e++)this.callbacks[e].invoke(t)},t}();n.default=o;var i=function(){function t(t,e){this.callback=t,this.bind=t.bind(e)}return t.prototype.invoke=function(t){this.bind(t)},t}();cc._RF.pop()},{}],NetworkMessage:[function(t,e,n){"use strict";cc._RF.push(e,"cfd9cUqqUFBS7hqwD5BejVA","NetworkMessage"),Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function t(t){this.ID=t}return t.prototype.getJSON=function(){return JSON.stringify(this)},t.Parse=function(t,e){for(var n in t)e[n]=t[n];return e},t}();n.default=o,cc._RF.pop()},{}],Popup:[function(t,e,n){"use strict";cc._RF.push(e,"645c43XbAFHNYzxYJu3X24l","Popup");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=t("./Menu"),c=cc._decorator,s=c.ccclass,u=c.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.label=null,e.button=null,e.action=null,e}return o(e,t),Object.defineProperty(e.prototype,"text",{set:function(t){this.label.string=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"interactable",{set:function(t){this.button.node.active=t},enumerable:!0,configurable:!0}),e.prototype.initButton=function(){this.buttonLabel=this.button.getComponentInChildren(cc.Label);var t=new cc.Button.EventHandler;t.component="Popup",t.handler="onButtonClick",t.target=this.node,this.button.clickEvents.push(t)},e.prototype.init=function(){this.initButton(),this.visibile=!1},e.prototype.onButtonClick=function(){null!=this.action&&this.action()},e.prototype.display=function(t,e,n){this.text=t,null==e?this.interactable=!1:(this.action=e,this.interactable=!0,this.buttonLabel.string=n),0==this.visibile&&(this.visibile=!0)},i([u(cc.Label)],e.prototype,"label",void 0),i([u(cc.Button)],e.prototype,"button",void 0),e=i([s],e)}(r.default);n.default=a,cc._RF.pop()},{"./Menu":"Menu"}],ReadyOnButton:[function(t,e,n){"use strict";cc._RF.push(e,"bb1fec+uvBF+Y2pG6vfanou","ReadyOnButton");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=t("../Game"),c=cc._decorator,s=c.ccclass,u=c.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.readyColor=cc.Color.GREEN,e.unreadyColor=cc.Color.RED,e}return o(e,t),Object.defineProperty(e.prototype,"game",{get:function(){return r.default.instance},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"client",{get:function(){return this.game.client},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.button=this.getComponent(cc.Button),this.background=this.getComponentInChildren(cc.Sprite),this.label=this.getComponentInChildren(cc.Label);var t=new cc.Button.EventHandler;t.target=this.node,t.component="ReadyOnButton",t.handler="onButtonClick",this.button.clickEvents.push(t),this.client.readyEvent.add(this.onReadyChanged,this),this.UpdateState()},e.prototype.onButtonClick=function(){this.client.ready=!this.client.ready},e.prototype.onReadyChanged=function(){this.UpdateState()},e.prototype.UpdateState=function(){this.client.ready?(this.label.string="Ready",this.background.node.color=this.readyColor):(this.label.string="UnReady",this.background.node.color=this.unreadyColor)},i([u],e.prototype,"readyColor",void 0),i([u],e.prototype,"unreadyColor",void 0),e=i([s],e)}(cc.Component);n.default=a,cc._RF.pop()},{"../Game":"Game"}],Sandbox:[function(t,e,n){"use strict";cc._RF.push(e,"5c544O4gRFOtLtptOByZ6p8","Sandbox");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=cc._decorator,c=r.ccclass,s=r.property,u=function(){function t(){this.number=10,this.label=null}return i([s(Number)],t.prototype,"number",void 0),i([s(cc.Label)],t.prototype,"label",void 0),t=i([c("DataStructure")],t)}();n.DataStructure=u;var a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.data=new u,e}return o(e,t),e.prototype.start=function(){cc.log(this.data.number)},i([s(u)],e.prototype,"data",void 0),e=i([c],e)}(cc.Component);n.default=a,cc._RF.pop()},{}],TitleMenu:[function(t,e,n){"use strict";cc._RF.push(e,"23a30LjHJFCybOb0Bm+vtz0","TitleMenu");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=t("./Menu"),c=t("../Game"),s=cc._decorator,u=s.ccclass,a=(s.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}var n;return o(e,t),n=e,Object.defineProperty(e.prototype,"game",{get:function(){return c.default.instance},enumerable:!0,configurable:!0}),e.prototype.start=function(){n.beenSeen?(this.visibile=!1,this.game.joinMenu.visibile=!0):(n.beenSeen=!0,this.node.on("touchstart",this.onClick,this))},e.prototype.onClick=function(){this.visibile=!1,this.game.joinMenu.visibile=!0},e.beenSeen=!1,e=n=i([u],e)}(r.default));n.default=a,cc._RF.pop()},{"../Game":"Game","./Menu":"Menu"}],VirtualJoystick:[function(t,e,n){"use strict";cc._RF.push(e,"3a51ahJ5CdK6YCWFTV9Ul5O","VirtualJoystick");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=t("../MoeEvent"),c=cc._decorator,s=c.ccclass,u=c.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.body=null,e.pointer=null,e._value=cc.Vec2.ZERO,e.onValueChanged=new r.default,e.touchID=null,e}var n;return o(e,t),n=e,Object.defineProperty(e.prototype,"value",{get:function(){return this._value},set:function(t){t.mag()>1&&(t=t.normalize()),this._value=t,this.onValueChanged.invoke(this.value)},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.initialPosition=this.body.node.position,this.node.on("touchstart",this.onTouchStart,this),this.node.on("touchmove",this.onTouchMove,this),this.node.on("touchend",this.onTouchEnd,this),this.node.on("touchcancel",this.onTouchCancel,this)},e.prototype.onTouchStart=function(t){if(null==this.touchID){var e=t.getLocation();this.body.node.position=this.node.convertToNodeSpaceAR(e),this.touchID=t.getID()}},e.prototype.onTouchMove=function(t){if(t.getID()==this.touchID){var e=t.getLocation();this.pointer.node.position=this.body.node.convertToNodeSpaceAR(e);var o=this.body.node.getContentSize(),i=(o.width+o.height)/4;this.pointer.node.position=n.clampVector(this.pointer.node.position,i),this.value=n.divideVector(this.pointer.node.position,i)}},e.prototype.onTouchEnd=function(t){t.getID()==this.touchID&&this.reset()},e.prototype.onTouchCancel=function(t){this.onTouchEnd(t)},e.prototype.reset=function(){null!=this.initialPosition&&(this.body.node.position=this.initialPosition),this.pointer.node.position=cc.Vec2.ZERO,this.value=this.pointer.node.position,this.touchID=null},e.prototype.onDisable=function(){this.reset()},e.clampVector=function(t,e){return t.mag()>e&&((t=t.normalize()).x*=e,t.y*=e),t},e.divideVector=function(t,e){return t.x/=e,t.y/=e,t},i([u(cc.Sprite)],e.prototype,"body",void 0),i([u(cc.Sprite)],e.prototype,"pointer",void 0),e=n=i([s],e)}(cc.Component);n.default=a,cc._RF.pop()},{"../MoeEvent":"MoeEvent"}]},{},["MoeEvent","VirtualJoystick","Sandbox","Client","Game","ControlMenu","JoinMenu","Menu","Popup","TitleMenu","NetworkMessage","ReadyOnButton"]);