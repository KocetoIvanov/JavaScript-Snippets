# JavaScript-Snippets

### Sticky navigation on scroll with Pure Javascript
[Link to a script file](./sticky.js)
___
### JavaScript Sitefinity Accordion with Pure Javascript
```javascript
function stickyNavigation() {
  window.onscroll = function (e) {
    var y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
        navClass = document.getElementById("sf-navigation-inpage"),
        navOffsetTop = document.getElementById("sf-navigation-inpage").offsetTop;
    if (y >= navOffsetTop) {
      navClass.className = 'stick';
    } else {
      navClass.className = '';
    }
  }
}
```
[Link to a script file](./accordion-details.js)
___
