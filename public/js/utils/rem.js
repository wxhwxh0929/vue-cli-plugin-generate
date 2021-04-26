(function (win) {
  const doc = win.document;
  const docEl = doc.documentElement;
  let tid;
  function refreshRem () {
    const width = docEl.getBoundingClientRect().width; // 注释1
    const rem = width / 10; // 注释2
    docEl.style.fontSize = rem + 'px';
    document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + rem + 'px';
    if (parseInt(rem) != parseInt(getComputedStyle(document.getElementsByTagName('html')[0]).fontSize)) { // 注释3
      const remtrue = rem * (rem / parseInt(getComputedStyle(document.getElementsByTagName('html')[0]).fontSize));
      docEl.style.fontSize = remtrue + 'px';
      document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + remtrue + 'px';
    }
  }
  win.addEventListener('resize', function () { // 注释4
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', function (e) { // 注释5
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);
  refreshRem();
  document.addEventListener('DOMContentLoaded', refreshRem, false); // 注释6
})(window);
