(function () {
  // Mustache.js
  !function t(e,n){"object"==typeof exports&&exports&&"string"!=typeof exports.nodeName?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):(e.Mustache={},n(e.Mustache))}(this,function t(e){var n=Object.prototype.toString,r=Array.isArray||function t(e){return"[object Array]"===n.call(e)};function i(t){return"function"==typeof t}function o(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function s(t,e){return null!=t&&"object"==typeof t&&e in t}var a=RegExp.prototype.test,u=/\S/;function c(t){var e,n;return e=u,n=t,!a.call(e,n)}var p={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},l=/\s*/,h=/\s+/,f=/\s*=/,d=/\s*\}/,v=/#|\^|\/|>|\{|&|=|!/;function g(t){this.string=t,this.tail=t,this.pos=0}function y(t,e){this.view=t,this.cache={".":this.view},this.parent=e}function w(){this.cache={}}g.prototype.eos=function t(){return""===this.tail},g.prototype.scan=function t(e){var n=this.tail.match(e);if(!n||0!==n.index)return"";var r=n[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r},g.prototype.scanUntil=function t(e){var n,r=this.tail.search(e);switch(r){case -1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,r),this.tail=this.tail.substring(r)}return this.pos+=n.length,n},y.prototype.push=function t(e){return new y(e,this)},y.prototype.lookup=function t(e){var n=this.cache;if(n.hasOwnProperty(e))r=n[e];else{for(var r,o,a,u=this,c=!1;u;){if(e.indexOf(".")>0)for(r=u.view,o=e.split("."),a=0;null!=r&&a<o.length;)a===o.length-1&&(c=s(r,o[a])),r=r[o[a++]];else r=u.view[e],c=s(u.view,e);if(c)break;u=u.parent}n[e]=r}return i(r)&&(r=r.call(this.view)),r},w.prototype.clearCache=function t(){this.cache={}},w.prototype.parse=function t(n,i){var s=this.cache,a=s[n];return null==a&&(a=s[n]=function t(n,i){if(!n)return[];var s,a,u,p,y,w,$,_,k,m=[],b=[],x=[],U=!1,T=!1;function V(){if(U&&!T)for(;x.length;)delete b[x.pop()];else x=[];U=!1,T=!1}function j(t){if("string"==typeof t&&(t=t.split(h,2)),!r(t)||2!==t.length)throw Error("Invalid tags: "+t);s=RegExp(o(t[0])+"\\s*"),a=RegExp("\\s*"+o(t[1])),u=RegExp("\\s*"+o("}"+t[1]))}j(i||e.tags);for(var C=new g(n);!C.eos();){if(p=C.pos,w=C.scanUntil(s))for(var S=0,I=w.length;S<I;++S)c($=w.charAt(S))?x.push(b.length):T=!0,b.push(["text",$,p,p+1]),p+=1,"\n"===$&&V();if(!C.scan(s))break;if(U=!0,y=C.scan(v)||"name",C.scan(l),"="===y?(w=C.scanUntil(f),C.scan(f),C.scanUntil(a)):"{"===y?(w=C.scanUntil(u),C.scan(d),C.scanUntil(a),y="&"):w=C.scanUntil(a),!C.scan(a))throw Error("Unclosed tag at "+C.pos);if(_=[y,w,p,C.pos],b.push(_),"#"===y||"^"===y)m.push(_);else if("/"===y){if(!(k=m.pop()))throw Error('Unopened section "'+w+'" at '+p);if(k[1]!==w)throw Error('Unclosed section "'+k[1]+'" at '+p)}else"name"===y||"{"===y||"&"===y?T=!0:"="===y&&j(w)}if(k=m.pop())throw Error('Unclosed section "'+k[1]+'" at '+C.pos);return function t(e){for(var n,r,i=[],o=i,s=[],a=0,u=e.length;a<u;++a)switch((n=e[a])[0]){case"#":case"^":o.push(n),s.push(n),o=n[4]=[];break;case"/":(r=s.pop())[5]=n[2],o=s.length>0?s[s.length-1][4]:i;break;default:o.push(n)}return i}(function t(e){for(var n,r,i=[],o=0,s=e.length;o<s;++o)(n=e[o])&&("text"===n[0]&&r&&"text"===r[0]?(r[1]+=n[1],r[3]=n[3]):(i.push(n),r=n));return i}(b))}(n,i)),a},w.prototype.render=function t(e,n,r){var i=this.parse(e),o=n instanceof y?n:new y(n);return this.renderTokens(i,o,r,e)},w.prototype.renderTokens=function t(e,n,r,i){for(var o,s,a,u="",c=0,p=e.length;c<p;++c)a=void 0,"#"===(s=(o=e[c])[0])?a=this.renderSection(o,n,r,i):"^"===s?a=this.renderInverted(o,n,r,i):">"===s?a=this.renderPartial(o,n,r,i):"&"===s?a=this.unescapedValue(o,n):"name"===s?a=this.escapedValue(o,n):"text"===s&&(a=this.rawValue(o)),void 0!==a&&(u+=a);return u},w.prototype.renderSection=function t(e,n,o,s){var a=this,u="",c=n.lookup(e[1]);if(c){if(r(c))for(var p=0,l=c.length;p<l;++p)u+=this.renderTokens(e[4],n.push(c[p]),o,s);else if("object"==typeof c||"string"==typeof c||"number"==typeof c)u+=this.renderTokens(e[4],n.push(c),o,s);else if(i(c)){if("string"!=typeof s)throw Error("Cannot use higher-order sections without the original template");null!=(c=c.call(n.view,s.slice(e[3],e[5]),function t(e){return a.render(e,n,o)}))&&(u+=c)}else u+=this.renderTokens(e[4],n,o,s);return u}},w.prototype.renderInverted=function t(e,n,i,o){var s=n.lookup(e[1]);if(!s||r(s)&&0===s.length)return this.renderTokens(e[4],n,i,o)},w.prototype.renderPartial=function t(e,n,r){if(r){var o=i(r)?r(e[1]):r[e[1]];if(null!=o)return this.renderTokens(this.parse(o),n,r,o)}},w.prototype.unescapedValue=function t(e,n){var r=n.lookup(e[1]);if(null!=r)return r},w.prototype.escapedValue=function t(n,r){var i=r.lookup(n[1]);if(null!=i)return e.escape(i)},w.prototype.rawValue=function t(e){return e[1]},e.name="mustache.js",e.version="2.3.0",e.tags=["{{","}}"];var $=new w;return e.clearCache=function t(){return $.clearCache()},e.parse=function t(e,n){return $.parse(e,n)},e.render=function t(e,n,i){if("string"!=typeof e){var o;throw TypeError('Invalid template! Template should be a "string" but "'+(r(o=e)?"array":typeof o)+'" was given as the first argument for mustache#render(template, view, partials)')}return $.render(e,n,i)},e.to_html=function t(n,r,o,s){var a=e.render(n,r,o);if(!i(s))return a;s(a)},e.escape=function t(e){return String(e).replace(/[&<>"'`=\/]/g,function t(e){return p[e]})},e.Scanner=g,e.Context=y,e.Writer=w,e});

  var fullscreenElement = null;
  document.addEventListener("fullscreenchange", function () {
    fullscreenElement =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
  });

  document.addEventListener("dblclick", (event) => {
    const selection = window.getSelection();

    if (selection && selection.toString().trim()) {

      // avoid show definition if the element is an input
      if (event.target && (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA")) {
          return;
      }

      const selectedWord = selection.toString().trim();

      if (/^\S+$/.test(selectedWord) && selectedWord.length > 1) {
        chrome.runtime.sendMessage(
          { type: "fetch_raw", eventKey: 9, instanceId: 2, query: selectedWord, event },
          (params)=>{
            handleSearchResult(params, event)
          }
        );
      }
    }

  });

  var contentStyles = null;
  fetch(chrome.extension.getURL("content.css")).then((res) => {
    if (res.ok) {
      res.text().then((css) => {
        contentStyles = css;

        
      });
    }
  });

  var browserActionStyles = null;
  fetch(chrome.extension.getURL("templates/browser_action.min.css")).then((res) => {
    if (res.ok) {
      res.text().then((css) => {
        browserActionStyles = css;
      });
    }
  });

  
  let template = null;
  fetch(chrome.extension.getURL("./templates/browser_action_dict.html")).then((res) => {
    if (res.ok) {
      res.text().then((js) => {
        template = js
      });
    }
  });

  let meaning = document.createElement("div");
  meaning.id = "meaning";

  const handleSearchResult = (result, event) => {
    console.log(event)
    const container = document.createElement("div");
    container.id = "wdi-host";
    const shadowRoot = container.attachShadow({ mode: "open" });


    fullscreenElement
        ? fullscreenElement.appendChild(container)
        : document.body.appendChild(container);
    
    var render = Mustache.render(template, result);

    shadowRoot.innerHTML = /*html*/ `
      <style>${contentStyles}</style>
      <style>${browserActionStyles}</style>
      <div id="wdi-main" style="left: ${event.clientX}px; top: ${event.clientY}px">
          <div id="wdi-close"></div>
          ${render}
      </div>
      <div>
        <!--
        <div id="wdi--arrow-main" style="top: 517.448px; left: 155.983px;">
          <div id="wdi-arrow-inner-down"></div>
          <div id="wdi-arrow-outer-down"></div>
        </div>
        -->
      </div>
    `;

    const audioElements = shadowRoot.querySelectorAll(".audio");
    
    audioElements.forEach((element) => {
      const audio = document.createElement("audio");
      shadowRoot.appendChild(audio);
      audio.preload = true;
      if (!element.getAttribute("data-url")) {
        element.style.display = "none";
      }
      audio.src = element.getAttribute("data-url");
      element.addEventListener("click", audio.play.bind(audio), false);
    });

    const closeDefinition = (event) => {
      try{
        fullscreenElement
          ? fullscreenElement.removeChild(container)
          : document.body.removeChild(container);
        document.removeEventListener("click", clickHandler);
      }catch(err){}
    };

    const clickHandler = (event) => {
      if (!container.contains(event.target)) {
        closeDefinition();
      }
    };

    // Add a click event listener to the entire document
    document.addEventListener("click", clickHandler);
    shadowRoot.getElementById('wdi-close').addEventListener("click", closeDefinition )
    

    // Listen fullscreen mode
    document.addEventListener("fullscreenchange", ()=>{
      closeDefinition();
    });

    document.addEventListener("keydown", (event)=>{
      if (event.key === "Escape") {
        closeDefinition();
      }
    });
    
  };
})();
