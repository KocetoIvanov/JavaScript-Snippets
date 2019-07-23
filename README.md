# JavaScript-Snippets
_Most examples come from the Sitefinity project and some of the classes, ids and html structure of them, can be strange, but it can easily be transformed and used everywhere and as needed for everyone._
___
### Sticky navigation on scroll with Pure Javascript
[Link to a script file](./sticky.js)
___
### JavaScript Sitefinity Accordion with Pure Javascript
```javascript
function stickyNavigation() {
  window.onscroll = function (e) {
    var y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
        navId = document.getElementById("navigation"),
        navOffsetTop = navId.offsetTop;
    if (y >= navOffsetTop) {
      navId.className = 'stick';
    } else {
      navId.className = '';
    }
  }
}
```
[Link to a script file](./accordion-details.js)
___
