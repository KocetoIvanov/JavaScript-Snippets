# JavaScript-Snippets

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
