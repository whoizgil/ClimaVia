"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2560],{2560:(M,y,d)=>{d.r(y),d.d(y,{ion_segment:()=>p,ion_segment_button:()=>I});var w=d(467),r=d(773),b=d(5638),C=d(5083),m=d(333),B=d(8886);const p=class{constructor(t){(0,r.r)(this,t),this.ionChange=(0,r.d)(this,"ionChange",7),this.ionSelect=(0,r.d)(this,"ionSelect",7),this.ionStyle=(0,r.d)(this,"ionStyle",7),this.onClick=e=>{const n=e.target,o=this.checked;"ION-SEGMENT"!==n.tagName&&(this.value=n.value,n!==o&&this.emitValueChange(),(this.scrollable||!this.swipeGesture)&&(o?this.checkButton(o,n):this.setCheckedClasses()))},this.getSegmentButton=e=>{var n,o;const i=this.getButtons().filter(a=>!a.disabled),l=i.findIndex(a=>a===document.activeElement);switch(e){case"first":return i[0];case"last":return i[i.length-1];case"next":return null!==(n=i[l+1])&&void 0!==n?n:i[0];case"previous":return null!==(o=i[l-1])&&void 0!==o?o:i[i.length-1];default:return null}},this.activated=!1,this.color=void 0,this.disabled=!1,this.scrollable=!1,this.swipeGesture=!0,this.value=void 0,this.selectOnFocus=!1}colorChanged(t,e){(void 0===e&&void 0!==t||void 0!==e&&void 0===t)&&this.emitStyle()}swipeGestureChanged(){this.gestureChanged()}valueChanged(t){this.ionSelect.emit({value:t}),this.scrollActiveButtonIntoView()}disabledChanged(){this.gestureChanged();const t=this.getButtons();for(const e of t)e.disabled=this.disabled}gestureChanged(){this.gesture&&this.gesture.enable(!this.scrollable&&!this.disabled&&this.swipeGesture)}connectedCallback(){this.emitStyle()}componentWillLoad(){this.emitStyle()}componentDidLoad(){var t=this;return(0,w.A)(function*(){t.setCheckedClasses(),t.ionSelect.emit({value:t.value}),(0,b.r)(()=>{t.scrollActiveButtonIntoView(!1)}),t.gesture=(yield Promise.resolve().then(d.bind(d,405))).createGesture({el:t.el,gestureName:"segment",gesturePriority:100,threshold:0,passive:!1,onStart:e=>t.onStart(e),onMove:e=>t.onMove(e),onEnd:e=>t.onEnd(e)}),t.gestureChanged(),t.disabled&&t.disabledChanged()})()}onStart(t){this.valueBeforeGesture=this.value,this.activate(t)}onMove(t){this.setNextIndex(t)}onEnd(t){this.setActivated(!1),this.setNextIndex(t,!0),t.event.stopImmediatePropagation();const e=this.value;void 0!==e&&this.valueBeforeGesture!==e&&this.emitValueChange(),this.valueBeforeGesture=void 0}emitValueChange(){const{value:t}=this;this.ionChange.emit({value:t})}getButtons(){return Array.from(this.el.querySelectorAll("ion-segment-button"))}get checked(){return this.getButtons().find(t=>t.value===this.value)}setActivated(t){this.getButtons().forEach(n=>{t?n.classList.add("segment-button-activated"):n.classList.remove("segment-button-activated")}),this.activated=t}activate(t){const e=t.event.target,o=this.getButtons().find(i=>i.value===this.value);"ION-SEGMENT-BUTTON"===e.tagName&&(o||(this.value=e.value,this.setCheckedClasses()),this.value===e.value&&this.setActivated(!0))}getIndicator(t){return(t.shadowRoot||t).querySelector(".segment-button-indicator")}checkButton(t,e){const n=this.getIndicator(t),o=this.getIndicator(e);if(null===n||null===o)return;const i=n.getBoundingClientRect(),l=o.getBoundingClientRect(),g=`translate3d(${i.left-l.left}px, 0, 0) scaleX(${i.width/l.width})`;(0,r.w)(()=>{o.classList.remove("segment-button-indicator-animated"),o.style.setProperty("transform",g),o.getBoundingClientRect(),o.classList.add("segment-button-indicator-animated"),o.style.setProperty("transform","")}),this.value=e.value,this.setCheckedClasses()}setCheckedClasses(){const t=this.getButtons(),n=t.findIndex(o=>o.value===this.value)+1;for(const o of t)o.classList.remove("segment-button-after-checked");n<t.length&&t[n].classList.add("segment-button-after-checked")}scrollActiveButtonIntoView(t=!0){const{scrollable:e,value:n,el:o}=this;if(e){const l=this.getButtons().find(a=>a.value===n);if(void 0!==l){const a=o.getBoundingClientRect(),h=l.getBoundingClientRect();o.scrollBy({top:0,left:h.x-a.x-a.width/2+h.width/2,behavior:t?"smooth":"instant"})}}}setNextIndex(t,e=!1){const n=(0,C.i)(this.el),o=this.activated,i=this.getButtons(),l=i.findIndex(v=>v.value===this.value),a=i[l];let h,g;if(-1===l)return;const f=a.getBoundingClientRect(),S=f.left,z=f.width,k=t.currentX,L=f.top+f.height/2,O=this.el.getRootNode().elementFromPoint(k,L);if(o&&!e){if(n?k>S+z:k<S){const v=l-1;v>=0&&(g=v)}else if((n?k<S:k>S+z)&&o&&!e){const v=l+1;v<i.length&&(g=v)}void 0!==g&&!i[g].disabled&&(h=i[g])}if(!o&&e&&(h=O),null!=h){if("ION-SEGMENT"===h.tagName)return!1;a!==h&&this.checkButton(a,h)}return!0}emitStyle(){this.ionStyle.emit({segment:!0})}onKeyDown(t){const e=(0,C.i)(this.el);let o,n=this.selectOnFocus;switch(t.key){case"ArrowRight":t.preventDefault(),o=this.getSegmentButton(e?"previous":"next");break;case"ArrowLeft":t.preventDefault(),o=this.getSegmentButton(e?"next":"previous");break;case"Home":t.preventDefault(),o=this.getSegmentButton("first");break;case"End":t.preventDefault(),o=this.getSegmentButton("last");break;case" ":case"Enter":t.preventDefault(),o=document.activeElement,n=!0}if(o){if(n){const i=this.checked;this.checkButton(i||o,o),o!==i&&this.emitValueChange()}o.setFocus()}}render(){const t=(0,B.b)(this);return(0,r.h)(r.H,{key:"0cf2e11e5599a0de2b0c7dc2a46917f4894ceb05",role:"tablist",onClick:this.onClick,class:(0,m.c)(this.color,{[t]:!0,"in-toolbar":(0,m.h)("ion-toolbar",this.el),"in-toolbar-color":(0,m.h)("ion-toolbar[color]",this.el),"segment-activated":this.activated,"segment-disabled":this.disabled,"segment-scrollable":this.scrollable})},(0,r.h)("slot",{key:"913f2e4a823d3a58ea074dfb95314651c46739db"}))}get el(){return(0,r.f)(this)}static get watchers(){return{color:["colorChanged"],swipeGesture:["swipeGestureChanged"],value:["valueChanged"],disabled:["disabledChanged"]}}};p.style={ios:":host{--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:grid;grid-auto-columns:1fr;position:relative;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:center;justify-content:center;width:100%;background:var(--background);font-family:var(--ion-font-family, inherit);text-align:center;contain:paint;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.segment-scrollable){-ms-flex-pack:start;justify-content:start;width:auto;overflow-x:auto;grid-auto-columns:minmax(-webkit-min-content, 1fr);grid-auto-columns:minmax(min-content, 1fr)}:host(.segment-scrollable::-webkit-scrollbar){display:none}:host{--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.065);border-radius:8px;overflow:hidden;z-index:0}:host(.ion-color){background:rgba(var(--ion-color-base-rgb), 0.065)}:host(.in-toolbar){-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;width:auto}:host(.in-toolbar:not(.ion-color)){background:var(--ion-toolbar-segment-background, var(--background))}:host(.in-toolbar-color:not(.ion-color)){background:rgba(var(--ion-color-contrast-rgb), 0.11)}",md:":host{--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:grid;grid-auto-columns:1fr;position:relative;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:center;justify-content:center;width:100%;background:var(--background);font-family:var(--ion-font-family, inherit);text-align:center;contain:paint;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.segment-scrollable){-ms-flex-pack:start;justify-content:start;width:auto;overflow-x:auto;grid-auto-columns:minmax(-webkit-min-content, 1fr);grid-auto-columns:minmax(min-content, 1fr)}:host(.segment-scrollable::-webkit-scrollbar){display:none}:host{--background:transparent;grid-auto-columns:minmax(auto, 360px)}:host(.in-toolbar){min-height:var(--min-height)}:host(.segment-scrollable) ::slotted(ion-segment-button){min-width:auto}"};let A=0;const I=class{constructor(t){(0,r.r)(this,t),this.segmentEl=null,this.inheritedAttributes={},this.updateStyle=()=>{(0,r.i)(this)},this.updateState=()=>{const{segmentEl:e}=this;e&&(this.checked=e.value===this.value,e.disabled&&(this.disabled=!0))},this.checked=!1,this.disabled=!1,this.layout="icon-top",this.type="button",this.value="ion-sb-"+A++}valueChanged(){this.updateState()}connectedCallback(){const t=this.segmentEl=this.el.closest("ion-segment");t&&(this.updateState(),(0,b.a)(t,"ionSelect",this.updateState),(0,b.a)(t,"ionStyle",this.updateStyle))}disconnectedCallback(){const t=this.segmentEl;t&&((0,b.b)(t,"ionSelect",this.updateState),(0,b.b)(t,"ionStyle",this.updateStyle),this.segmentEl=null)}componentWillLoad(){this.inheritedAttributes=Object.assign({},(0,b.k)(this.el,["aria-label"]))}get hasLabel(){return!!this.el.querySelector("ion-label")}get hasIcon(){return!!this.el.querySelector("ion-icon")}setFocus(){var t=this;return(0,w.A)(function*(){const{nativeEl:e}=t;void 0!==e&&e.focus()})()}render(){const{checked:t,type:e,disabled:n,hasIcon:o,hasLabel:i,layout:l,segmentEl:a}=this,h=(0,B.b)(this);return(0,r.h)(r.H,{key:"5fda697569eb875991bb948be553ee0716ac9aa2",class:{[h]:!0,"in-toolbar":(0,m.h)("ion-toolbar",this.el),"in-toolbar-color":(0,m.h)("ion-toolbar[color]",this.el),"in-segment":(0,m.h)("ion-segment",this.el),"in-segment-color":void 0!==(null==a?void 0:a.color),"segment-button-has-label":i,"segment-button-has-icon":o,"segment-button-has-label-only":i&&!o,"segment-button-has-icon-only":o&&!i,"segment-button-disabled":n,"segment-button-checked":t,[`segment-button-layout-${l}`]:!0,"ion-activatable":!0,"ion-activatable-instant":!0,"ion-focusable":!0}},(0,r.h)("button",Object.assign({key:"86686e25d3bb8f487869a4d34c1e99a5d04105ec","aria-selected":t?"true":"false",role:"tab",ref:f=>this.nativeEl=f,type:e,class:"button-native",part:"native",disabled:n},this.inheritedAttributes),(0,r.h)("span",{key:"5c22e853fd385e2b7825335113346537ecefed31",class:"button-inner"},(0,r.h)("slot",{key:"cef944331f246a820747f98dff55e844281cb822"})),"md"===h&&(0,r.h)("ion-ripple-effect",null)),(0,r.h)("div",{key:"737b4b08c122a7738d5a5ed7a44f544da4c67649",part:"indicator",class:{"segment-button-indicator":!0,"segment-button-indicator-animated":!0}},(0,r.h)("div",{key:"e78696ff315d7e8ba76b97b82ea341379e9be7e5",part:"indicator-background",class:"segment-button-indicator-background"})))}get el(){return(0,r.f)(this)}static get watchers(){return{value:["valueChanged"]}}};I.style={ios:':host{--color:initial;--color-hover:var(--color);--color-checked:var(--color);--color-disabled:var(--color);--padding-start:0;--padding-end:0;--padding-top:0;--padding-bottom:0;border-radius:var(--border-radius);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:column;flex-direction:column;height:auto;background:var(--background);color:var(--color);text-decoration:none;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;grid-row:1;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:0;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;min-width:inherit;max-width:inherit;height:auto;min-height:inherit;max-height:inherit;-webkit-transition:var(--transition);transition:var(--transition);border:none;outline:none;background:transparent;contain:content;pointer-events:none;overflow:hidden;z-index:2}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:inherit;flex-flow:inherit;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;z-index:1}:host(.segment-button-checked){background:var(--background-checked);color:var(--color-checked)}:host(.segment-button-disabled){cursor:default;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}:host(:focus){outline:none}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}:host(.segment-button-checked:hover) .button-native{color:var(--color-checked)}}::slotted(ion-icon){-ms-flex-negative:0;flex-shrink:0;-ms-flex-order:-1;order:-1;pointer-events:none}::slotted(ion-label){display:block;-ms-flex-item-align:center;align-self:center;max-width:100%;line-height:22px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none}:host(.segment-button-layout-icon-top) .button-native{-ms-flex-direction:column;flex-direction:column}:host(.segment-button-layout-icon-start) .button-native{-ms-flex-direction:row;flex-direction:row}:host(.segment-button-layout-icon-end) .button-native{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.segment-button-layout-icon-bottom) .button-native{-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.segment-button-layout-icon-hide) ::slotted(ion-icon){display:none}:host(.segment-button-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color, var(--color-checked))}.segment-button-indicator{-webkit-transform-origin:left;transform-origin:left;position:absolute;opacity:0;-webkit-box-sizing:border-box;box-sizing:border-box;will-change:transform, opacity;pointer-events:none}.segment-button-indicator-background{width:100%;height:var(--indicator-height);-webkit-transform:var(--indicator-transform);transform:var(--indicator-transform);-webkit-box-shadow:var(--indicator-box-shadow);box-shadow:var(--indicator-box-shadow);pointer-events:none}.segment-button-indicator-animated{-webkit-transition:var(--indicator-transition);transition:var(--indicator-transition)}:host(.segment-button-checked) .segment-button-indicator{opacity:1}@media (prefers-reduced-motion: reduce){.segment-button-indicator-background{-webkit-transform:none;transform:none}.segment-button-indicator-animated{-webkit-transition:none;transition:none}}:host{--background:none;--background-checked:none;--background-hover:none;--background-hover-opacity:0;--background-focused:none;--background-focused-opacity:0;--border-radius:7px;--border-width:1px;--border-color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.12);--border-style:solid;--indicator-box-shadow:0 0 5px rgba(0, 0, 0, 0.16);--indicator-color:var(--ion-color-step-350, var(--ion-background-color, #fff));--indicator-height:100%;--indicator-transition:transform 260ms cubic-bezier(0.4, 0, 0.2, 1);--indicator-transform:none;--transition:100ms all linear;--padding-top:0;--padding-end:13px;--padding-bottom:0;--padding-start:13px;margin-top:2px;margin-bottom:2px;position:relative;-ms-flex-direction:row;flex-direction:row;min-width:70px;min-height:28px;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);font-size:13px;font-weight:450;line-height:37px}:host::before{margin-left:0;margin-right:0;margin-top:5px;margin-bottom:5px;-webkit-transition:160ms opacity ease-in-out;transition:160ms opacity ease-in-out;-webkit-transition-delay:100ms;transition-delay:100ms;border-left:var(--border-width) var(--border-style) var(--border-color);content:"";opacity:1;will-change:opacity}:host(:first-of-type)::before{border-left-color:transparent}:host(.segment-button-disabled){opacity:0.3}::slotted(ion-icon){font-size:24px}:host(.segment-button-layout-icon-start) ::slotted(ion-label){-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:0;margin-inline-end:0}:host(.segment-button-layout-icon-end) ::slotted(ion-label){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:2px;margin-inline-end:2px}.segment-button-indicator{-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:2px;padding-inline-end:2px;left:0;right:0;top:0;bottom:0}.segment-button-indicator-background{border-radius:var(--border-radius);background:var(--indicator-color)}.segment-button-indicator-background{-webkit-transition:var(--indicator-transition);transition:var(--indicator-transition)}:host(.segment-button-checked)::before,:host(.segment-button-after-checked)::before{opacity:0}:host(.segment-button-checked){z-index:-1}:host(.segment-button-activated){--indicator-transform:scale(0.95)}:host(.ion-focused) .button-native{opacity:0.7}@media (any-hover: hover){:host(:hover) .button-native{opacity:0.5}:host(.segment-button-checked:hover) .button-native{opacity:1}}:host(.in-segment-color){background:none;color:var(--ion-text-color, #000)}:host(.in-segment-color) .segment-button-indicator-background{background:var(--ion-color-step-350, var(--ion-background-color, #fff))}@media (any-hover: hover){:host(.in-segment-color:hover) .button-native,:host(.in-segment-color.segment-button-checked:hover) .button-native{color:var(--ion-text-color, #000)}}:host(.in-toolbar:not(.in-segment-color)){--background-checked:var(--ion-toolbar-segment-background-checked, none);--color:var(--ion-toolbar-segment-color, var(--ion-toolbar-color), initial);--color-checked:var(--ion-toolbar-segment-color-checked, var(--ion-toolbar-color), initial);--indicator-color:var(--ion-toolbar-segment-indicator-color, var(--ion-color-step-350, var(--ion-background-color, #fff)))}:host(.in-toolbar-color) .segment-button-indicator-background{background:var(--ion-color-contrast)}:host(.in-toolbar-color:not(.in-segment-color)) .button-native{color:var(--ion-color-contrast)}:host(.in-toolbar-color.segment-button-checked:not(.in-segment-color)) .button-native{color:var(--ion-color-base)}@media (any-hover: hover){:host(.in-toolbar-color:not(.in-segment-color):hover) .button-native{color:var(--ion-color-contrast)}:host(.in-toolbar-color.segment-button-checked:not(.in-segment-color):hover) .button-native{color:var(--ion-color-base)}}',md:':host{--color:initial;--color-hover:var(--color);--color-checked:var(--color);--color-disabled:var(--color);--padding-start:0;--padding-end:0;--padding-top:0;--padding-bottom:0;border-radius:var(--border-radius);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:column;flex-direction:column;height:auto;background:var(--background);color:var(--color);text-decoration:none;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;grid-row:1;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:0;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;min-width:inherit;max-width:inherit;height:auto;min-height:inherit;max-height:inherit;-webkit-transition:var(--transition);transition:var(--transition);border:none;outline:none;background:transparent;contain:content;pointer-events:none;overflow:hidden;z-index:2}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:inherit;flex-flow:inherit;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;z-index:1}:host(.segment-button-checked){background:var(--background-checked);color:var(--color-checked)}:host(.segment-button-disabled){cursor:default;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}:host(:focus){outline:none}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}:host(.segment-button-checked:hover) .button-native{color:var(--color-checked)}}::slotted(ion-icon){-ms-flex-negative:0;flex-shrink:0;-ms-flex-order:-1;order:-1;pointer-events:none}::slotted(ion-label){display:block;-ms-flex-item-align:center;align-self:center;max-width:100%;line-height:22px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none}:host(.segment-button-layout-icon-top) .button-native{-ms-flex-direction:column;flex-direction:column}:host(.segment-button-layout-icon-start) .button-native{-ms-flex-direction:row;flex-direction:row}:host(.segment-button-layout-icon-end) .button-native{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.segment-button-layout-icon-bottom) .button-native{-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.segment-button-layout-icon-hide) ::slotted(ion-icon){display:none}:host(.segment-button-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color, var(--color-checked))}.segment-button-indicator{-webkit-transform-origin:left;transform-origin:left;position:absolute;opacity:0;-webkit-box-sizing:border-box;box-sizing:border-box;will-change:transform, opacity;pointer-events:none}.segment-button-indicator-background{width:100%;height:var(--indicator-height);-webkit-transform:var(--indicator-transform);transform:var(--indicator-transform);-webkit-box-shadow:var(--indicator-box-shadow);box-shadow:var(--indicator-box-shadow);pointer-events:none}.segment-button-indicator-animated{-webkit-transition:var(--indicator-transition);transition:var(--indicator-transition)}:host(.segment-button-checked) .segment-button-indicator{opacity:1}@media (prefers-reduced-motion: reduce){.segment-button-indicator-background{-webkit-transform:none;transform:none}.segment-button-indicator-animated{-webkit-transition:none;transition:none}}:host{--background:none;--background-checked:none;--background-hover:var(--color-checked);--background-focused:var(--color-checked);--background-activated-opacity:0;--background-focused-opacity:.12;--background-hover-opacity:.04;--color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.6);--color-checked:var(--ion-color-primary, #3880ff);--indicator-box-shadow:none;--indicator-color:var(--color-checked);--indicator-height:2px;--indicator-transition:transform 250ms cubic-bezier(0.4, 0, 0.2, 1);--indicator-transform:none;--padding-top:0;--padding-end:16px;--padding-bottom:0;--padding-start:16px;--transition:color 0.15s linear 0s, opacity 0.15s linear 0s;min-width:90px;min-height:48px;border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);font-size:14px;font-weight:500;letter-spacing:0.06em;line-height:40px;text-transform:uppercase}:host(.segment-button-disabled){opacity:0.3}:host(.in-segment-color){background:none;color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.6)}:host(.in-segment-color) ion-ripple-effect{color:var(--ion-color-base)}:host(.in-segment-color) .segment-button-indicator-background{background:var(--ion-color-base)}:host(.in-segment-color.segment-button-checked) .button-native{color:var(--ion-color-base)}:host(.in-segment-color.ion-focused) .button-native::after{background:var(--ion-color-base)}@media (any-hover: hover){:host(.in-segment-color:hover) .button-native{color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.6)}:host(.in-segment-color:hover) .button-native::after{background:var(--ion-color-base)}:host(.in-segment-color.segment-button-checked:hover) .button-native{color:var(--ion-color-base)}}:host(.in-toolbar:not(.in-segment-color)){--background:var(--ion-toolbar-segment-background, none);--background-checked:var(--ion-toolbar-segment-background-checked, none);--color:var(--ion-toolbar-segment-color, rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.6));--color-checked:var(--ion-toolbar-segment-color-checked, var(--ion-color-primary, #3880ff));--indicator-color:var(--ion-toolbar-segment-color-checked, var(--color-checked))}:host(.in-toolbar-color:not(.in-segment-color)) .button-native{color:rgba(var(--ion-color-contrast-rgb), 0.6)}:host(.in-toolbar-color.segment-button-checked:not(.in-segment-color)) .button-native{color:var(--ion-color-contrast)}@media (any-hover: hover){:host(.in-toolbar-color:not(.in-segment-color)) .button-native::after{background:var(--ion-color-contrast)}}::slotted(ion-icon){margin-top:12px;margin-bottom:12px;font-size:24px}::slotted(ion-label){margin-top:12px;margin-bottom:12px}:host(.segment-button-layout-icon-top) ::slotted(ion-label),:host(.segment-button-layout-icon-bottom) ::slotted(ion-icon){margin-top:0}:host(.segment-button-layout-icon-top) ::slotted(ion-icon),:host(.segment-button-layout-icon-bottom) ::slotted(ion-label){margin-bottom:0}:host(.segment-button-layout-icon-start) ::slotted(ion-label){-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:0;margin-inline-end:0}:host(.segment-button-layout-icon-end) ::slotted(ion-label){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px}:host(.segment-button-has-icon-only) ::slotted(ion-icon){margin-top:12px;margin-bottom:12px}:host(.segment-button-has-label-only) ::slotted(ion-label){margin-top:12px;margin-bottom:12px}.segment-button-indicator{left:0;right:0;bottom:0}.segment-button-indicator-background{background:var(--indicator-color)}:host(.in-toolbar:not(.in-segment-color)) .segment-button-indicator-background{background:var(--ion-toolbar-segment-indicator-color, var(--indicator-color))}:host(.in-toolbar-color:not(.in-segment-color)) .segment-button-indicator-background{background:var(--ion-color-contrast)}'}},333:(M,y,d)=>{d.d(y,{c:()=>b,g:()=>m,h:()=>r,o:()=>E});var w=d(467);const r=(s,c)=>null!==c.closest(s),b=(s,c)=>"string"==typeof s&&s.length>0?Object.assign({"ion-color":!0,[`ion-color-${s}`]:!0},c):c,m=s=>{const c={};return(s=>void 0!==s?(Array.isArray(s)?s:s.split(" ")).filter(u=>null!=u).map(u=>u.trim()).filter(u=>""!==u):[])(s).forEach(u=>c[u]=!0),c},B=/^[a-z][a-z0-9+\-.]*:/,E=function(){var s=(0,w.A)(function*(c,u,p,_){if(null!=c&&"#"!==c[0]&&!B.test(c)){const x=document.querySelector("ion-router");if(x)return null!=u&&u.preventDefault(),x.push(c,p,_)}return!1});return function(u,p,_,x){return s.apply(this,arguments)}}()}}]);