window.onload = function () {
  const config = require('../../../config/index');
  import { navbar } from '../home/staticData'

  const navbar = (function () {
    /**
     * @functionName {getNavbarData}
     * @description {获取菜单数据}
     * @param {*}
     * @return {*}
     * @author: 北栀女孩儿
     */
    function getNavbarData () {
      $.ajax({
        type: 'GET',
        url: `${config.MODULE_SERVICE_URL}/module/getModule`,
        async: true,
        cache: true,
        success: function (result) {
          console.log(result);
          templateData.navbarData = result.data;
        }
      });
    }
    return {
      init: function () {
        getNavbarData();
      }
    };
  })();
  navbar.init();
};
