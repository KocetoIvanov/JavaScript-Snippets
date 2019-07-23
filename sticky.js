"use strict";
/**
* @author Konstantin Ivanov
* @version 1.0.0
* @description Sticky In-Page navigation
*
* @class
* InPageNavigationHeader
*/

(function (window) {

    var inPageId = document.getElementById("sf-navigation-inpage"),
        inPageList = document.getElementById('sf-navigation-inpage-list'),
        inPageListOffsetTop = inPageList.offsetTop;

    function StickyInPageNavigation() {
        // Check that navigation exists.
        if (inPageId.length > 0) {
            init();
        }
    }

    /**
     * _init method
     */
    function init() {
        stickyNavigation();
    }

    /**
    * Fixed In-page navigation on scroll
    */
    function stickyNavigation() {
        
        window.onscroll = function (e) {
            var y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            if (y >= inPageListOffsetTop) {
                inPageId.className = 'stick';
            } else {
                inPageId.className = '';
            }
        }
    }

    //-- return the window object
    window.StickyInPageNavigation = StickyInPageNavigation;

})(window);



/**
 * Example usage
 * 
 * <!-- SF Accordion wrapper -->
 * <div id="sf-navigation-inpage">
 *  <div class="container">
 *      <ul id="sf-navigation-inpage-list">
 *          <li>
 *              <a href="some-link">Link text</a>
 *          </li>
 *          <!-- add as many links as required -->
 *      </ul>
 *   </div>
 * </div>
 *
 *  to call/init
 *      <script type="text/javascript">
 *      (function(){
 *          new StickyInPageNavigation();
 *      })();
 *     </script>
 *
 */