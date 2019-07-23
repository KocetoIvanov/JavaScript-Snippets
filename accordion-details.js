"use strict";
/**
* @author Emiliya Sokolova & Konstantin Ivanov
* @version 1.0.0
* @description JavaScript Sitefinity Accordion
*
* @class
* AccordionJS
*/

;(function(window){

    var accordion = null,
        activePanelClass = 'is-active',
        accordionPanels = null,
        currentPanel = null,
        childrenLinks = null,
        reverencesClass = 'references-panel',
        disableTrigger = 'disable-trigger';
            

    /**
     *  Contructor
     *
     * @param {containerID} to enable more than one accordion on a page
     * @param {panelClass} to add custom class for accordion panel
     * @param {triggerClass} to add custom class for accordion trigger panel
     * @param {contentClass} to add custom class for accordion content
     */
    function AccordionJS(containerID, panelClass, triggerClass, contentClass) {

        var accordionContainer = (containerID) ? containerID : 'sf-accordion';
        var accordionPanel = (panelClass) ? panelClass : 'sf-accordion__panel';
        var accordionTrigger = (triggerClass) ? triggerClass : 'sf-accordion__trigger-panel';
        var accordionContent = (contentClass) ? contentClass : 'sf-accordion__content';

        accordion = document.querySelector('#' + accordionContainer);

        if(accordion !== null) {

            accordionPanels = accordion.querySelectorAll('.' + accordionPanel + ':not(.' + reverencesClass + ')');

            childrenLinks = accordion.querySelectorAll('a[href=""]');

            if(accordionPanels.length > 4 ){
                accordionPanels = accordion.querySelectorAll('.' + accordionPanel);
                _init(accordionPanel, accordionTrigger, accordionContent);
            } else {
                accordion.classList.add(disableTrigger);
            }
        }
    }

    /**
     * _init method
     */
    function _init(accordionPanel, accordionTrigger, accordionContent){

        currentPanel = _checkForActivePanelOnLoad();

        if (typeof NodeList.prototype.forEach !== 'function') {
            NodeList.prototype.forEach = Array.prototype.forEach;
        }

        accordionPanels.forEach(function(panel, e){
            panel.querySelector('.' + accordionTrigger).addEventListener('click', function (event) {
                return _activateSelectedPanel(event, accordionPanel, accordionContent);
              });
        });

        _linkHandler();

        for (var i = 0; i < childrenLinks.length; i++) {
            childrenLinks[i].addEventListener('click', _activatePanelChildrenLinks(e));
        }
    }

    /**
     * begin the activation process on selecting a panel
     * @param  {Event} evt
     * @return {Void}
     */
    function _activateSelectedPanel(evt, accordionPanel, accordionContent){

        evt.preventDefault();

        var selectedPanel = _findAncestor(evt.currentTarget, accordionPanel);

        if (currentPanel === selectedPanel && currentPanel.classList.contains(activePanelClass)) {
            currentPanel = selectedPanel;
            _removeCurrentPanel(accordionContent);
            return;
        };

        _removeCurrentPanel(accordionContent);

        _displaySelectedPanel(selectedPanel, accordionContent);

    }

    /**
     * dispaly the new selected panel
     *
     * @param  {Object} selectedPanel the selected panel
     * @return {Void}
     */
    function _displaySelectedPanel(selectedPanel, accordionContent){
        selectedPanel.classList.add(activePanelClass);

        var currentContent = selectedPanel.querySelector('.' + accordionContent);
        currentContent.style.display = 'block';
        currentContent.style.height = currentContent.offsetHeight;
        currentContent.style.opacity = 1;

        currentPanel = selectedPanel;  
    }

    /**
     * Remove the currently selected panel
     *
     * @return {self} to enable chaining
     */
    function _removeCurrentPanel(accordionContent){
        if (typeof currentPanel === 'undefined') return this;

        var currentContent = currentPanel.querySelector('.' + accordionContent);
        currentContent.style.opacity = 0;
        currentContent.style.display = 'none';

        currentPanel.classList.remove(activePanelClass);
    }
    /**
     * check to see if the user has enabled a panel on inital page load
     * @return {Object} set to the active panel if set
     */
    function _checkForActivePanelOnLoad(){

        for (var i = 0; i < accordionPanels.length; i++) {

            if(accordionPanels[i].classList.contains(activePanelClass)){
              return accordionPanels[i];
            }
        }
    }


    /**
     * begin the activation process on selecting a panel content hash links
     * @param  {Event} evt
     * @return {Void}
     */
    function _activatePanelChildrenLinks(evt) {

        for (var i = 0; i < childrenLinks.length; ++i) {
            childrenLinks[i].classList.remove('active');
        }

        evt.currentTarget.classList.add('active')
    }


    /**
     * add active class depending on url hashtag
     */
    function _linkHandler() {
        if (window.location.href) {
            _activateLink(window.location.href);
        }
    }

    function _activateLink(href) {

        var activeChildrenLink = accordion.querySelectorAll('a[href="' + href + '"]');

        for (var i = 0; i < activeChildrenLink.length; ++i) {
            activeChildrenLink[i].classList.add('active');

            var closestElement = _findAncestor(activeChildrenLink[i], accordionPanel);
            if (closestElement != null) {
                _displaySelectedPanel(closestElement);
            }      
        }
    }

    function _findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

     //-- return the window object
     window.AccordionJS = AccordionJS;

 })(window);

 
/**
 * Example usage
 *
 * <!-- SF Accordion wrapper -->
 * <div id="sf-accordion" class="sf-accordion">
 *
 *   <!-- sf accordion panel -->
 *   <div class="sf-accordion__panel">
 *      <div class="sf-accordion__trigger-panel"><a href="#"><!-- Your Panel title/link copy here --></a></div>
 *      <div class="sf-accordion__content">
 *        <!-- your panel content to go here-->
 *      </div>
 *    </div>
 *    <!-- end:sf accordion panel -->
 *
 *    <!-- add as many sf accordion panels as required -->
 *
 * </div>
 * <!-- end:SF Accordion wrapper -->
 *
 *  to call/init
 *      <script type="text/javascript">
 *      (function(){
 *          new AccordionJS();
 *          new AccordionJS('sf-accordion', 'sf-accordion__panel', 'sf-accordion__trigger-panel', 'sf-accordion__content');
 *      })();
 *     </script>
 *
 * The second option enables you to assign a different id value, so you can run two or more on one page, also to assign custom classes for accordion panel, trigger-panel and content
 * Example usage for references <div class="sf-accordion__panel references-panel"> 
 */
