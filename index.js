(function() {
  
  if (typeof __CC_OPTIONS__ === 'undefined') {
    console.warn('__CC_OPTIONS__ must be set with domain');
    return false;
  }

  var options = {
    block: 'cookieconfirm',
    theme: '',  
    exDays: 14, 
    privacyUrl: '/datenschutz',
    styleUrl: '',
    domain: null,
    alert: 'Unsere Website verwendet an einigen Stellen sogenannte Cookies.',
    description: 'Sie dienen dazu, das Angebot nutzerfreundlicher zu machen. Sie können in Ihren Browser-Einstellungen festlegen, dass keine Cookies gespeichert werden. Wir weisen darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website in vollem Umfang nutzen können.',
    info: 'Weitere Informationen zum Thema Cookies und Schutz Ihrer Daten finden Sie ',
    link: 'hier',
    button: 'ok, einverstanden'
  };

  if (__CC_OPTIONS__) {
    for (var key in options) {
      if (__CC_OPTIONS__[key]) {
        options[key] = __CC_OPTIONS__[key]; 
      }
    } 
  }

  if (!options.domain) {
    alert('options.domain must be set in __CC_OPTIONS__');
  }
  var block = options.block;
  var theme = options.theme;

  function styleClass(ele) {
    var s = options.block;
    if (!ele) {
      return s + ' ' + s + '--' + theme; 
    }
    s += '__' + ele;
    if (!theme) {
      return s; 
    }
    return s + ' ' + s + '--' + theme;
  }

  function createEl(tagName, attributes, text) {
    var el = document.createElement(tagName);
    if (attributes) { 
      for (var key in attributes) {
        el.setAttribute(key, attributes[key]); 
      }
    }
    if (text) { 
      var textNode = document.createTextNode(text);
      el.appendChild(textNode);
    }
    return el;
  }

  var cc = createEl('div', {
    id: 'cookieconfirm',
    class: styleClass()  
  }); 
  document.body.appendChild(cc);
  // default hidden 
  cc.style.display = 'none';
  
  var ccDialog = createEl('div', {
    id: 'cookieconfirm-dialog',
    class: styleClass('dialog')
  }); 
  cc.appendChild(ccDialog);
  
  var ccContent = createEl('div', {
    class: styleClass('content')
  }); 
  ccDialog.appendChild(ccContent);
  
  var ccExplanation = createEl('div', {
    class: styleClass('explanation')
  }); 
  ccContent.appendChild(ccExplanation);

  var ccAlert = createEl('div', {
    class: styleClass('alert')
  }, options.alert); 
  ccExplanation.appendChild(ccAlert);
  
  var ccDescription = createEl('div', {
    class: styleClass('description')
  }, options.description); 
  ccExplanation.appendChild(ccDescription);

  var ccInfo = createEl('div', {
    class: styleClass('info')
  }, options.info); 
  ccExplanation.appendChild(ccInfo);
  
  var ccLink = createEl('a', {
    class: styleClass('link'),
    href: options.privacyUrl 
  }, options.link); 
  ccInfo.appendChild(ccLink);

  var ccButtonBar = createEl('div', {
    class: styleClass('button-bar')
  });
  ccDialog.appendChild(ccButtonBar);
  
  var ccButton = createEl('button', {
    class: styleClass('button'),
    id: 'cookieconfirm-button'
  }, options.button);
  ccButtonBar.appendChild(ccButton);
  
  // stole this from https://www.w3schools.com/js/js_cookies.asp

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;domain=' + options.domain;
  }

  function getCookie(cname) {
    console.log('document.cookie:', document.cookie);
    var name = cname + '=',
      ca = document.cookie.split(';');

    for(var i = 0, l = ca.length; i < l; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  function initButton() {
    ccButton.addEventListener('click', function(ev) {
      ev.preventDefault();
      setCookie('cookieconfirm', 'true', options.exDays);
      hideDialog();
    });
  }

  function hideDialog() {
    var dialog = document.getElementById('cookieconfirm');
    dialog.style.display = 'none';
  }

  function showDialog() {
    var dialog = document.getElementById('cookieconfirm');
    dialog.style.display = 'block';
  }

  function checkCookie(evt) {

    var cookieconfirm = getCookie('cookieconfirm');

    if (cookieconfirm) {
      //alert('Welcome again ' + user);
    } else {
      // cookie is not confirmed
      showDialog();
      initButton();
    }

  }

  function addCss() {
    if (options.styleUrl) {
      var styleEl = createEl('link', {
        type: 'text/css',
        rel: 'stylesheet',
        href: options.styleUrl
      }); 
      document.head.appendChild(styleEl);
    } 
  }

  if (window.location.hostname.indexOf(options.domain) !== -1) {
    window.addEventListener('DOMContentLoaded', function() {
      addCss(); 
      checkCookie();
    });
  }
})();
