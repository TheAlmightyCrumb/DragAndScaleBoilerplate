// Make the DIV element draggable:
const playground = document.querySelector('#playground');
const playgroundRect = playground.getBoundingClientRect();
const main = document.querySelector('#main'); 
dragElement(main);

function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.querySelector('#header').onmousedown = dragMouseDown;

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";

    if (element.offsetTop < playgroundRect.top) {
      element.style.top = playgroundRect.top + "px";
    }
    if (element.offsetTop + element.offsetHeight > playgroundRect.bottom) {
      element.style.top = playgroundRect.bottom - element.offsetHeight + "px";
    }
    if (element.offsetLeft < playgroundRect.left) {
      element.style.left = playgroundRect.left + "px";
    }
    if (element.offsetLeft + element.offsetWidth > playgroundRect.right) {
      element.style.left = playgroundRect.right - element.offsetWidth + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


function makeResizableDiv(div) {
    const element = document.querySelector(div);
    const resizers = document.querySelectorAll(div + ' .resizer')
    const minimum_size = 200;
    let original_width = 200;
    let original_height = 200;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0;i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener('mousedown', function(e) {
        e.preventDefault()
        original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
      })
      
      function resize(e) {
        if (currentResizer.classList.contains('bottom-right')) {
            const width = original_width + (e.pageX - original_mouse_x);
            const height = original_height + (e.pageY - original_mouse_y);
            if (width > minimum_size) {
              element.style.width = width + 'px'
            }
            if (height > minimum_size) {
              element.style.height = height + 'px'
            }
          }
          else if (currentResizer.classList.contains('bottom-left')) {
            const height = original_height + (e.pageY - original_mouse_y)
            const width = original_width - (e.pageX - original_mouse_x)
            if (height > minimum_size) {
              element.style.height = height + 'px'
            }
            if (width > minimum_size) {
              element.style.width = width + 'px'
              element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
          }
          else if (currentResizer.classList.contains('top-right')) {
            const width = original_width + (e.pageX - original_mouse_x)
            const height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + 'px'
            }
            if (height > minimum_size) {
              element.style.height = height + 'px'
              element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
          }
          else if(currentResizer.classList.contains('top-left')) {
            const width = original_width - (e.pageX - original_mouse_x)
            const height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + 'px'
              element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
            if (height > minimum_size) {
              element.style.height = height + 'px'
              element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
          }
          else if(currentResizer.classList.contains('left')) {
            const width = original_width - (e.pageX - original_mouse_x)
            if (width > minimum_size) {
              element.style.width = width + 'px'
              element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
          }
          else if(currentResizer.classList.contains('top')) {
            const height = original_height - (e.pageY - original_mouse_y)
            if (height > minimum_size) {
              element.style.height = height + 'px'
              element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
          }
          else if (currentResizer.classList.contains('right')) {
            const width = original_width + (e.pageX - original_mouse_x)
            if (width > minimum_size) {
              element.style.width = width + 'px'
            }
          }
          else if (currentResizer.classList.contains('bottom')) {
            const height = original_height + (e.pageY - original_mouse_y)
            if (height > minimum_size) {
              element.style.height = height + 'px'
            }
          }

          if (element.offsetTop  < playgroundRect.top) {
             element.style.top = Math.ceil(playgroundRect.top) + "px";
          }
          if (element.offsetTop + element.offsetHeight > playgroundRect.bottom) {
             element.style.top = Math.floor(playgroundRect.bottom - element.offsetHeight) + "px";
          }
          if (element.offsetLeft < playgroundRect.left) {
             element.style.left = Math.ceil(playgroundRect.left) + "px";
          }
          if (element.offsetLeft + element.offsetWidth > playgroundRect.right) {
             element.style.left = Math.floor(playgroundRect.right - element.offsetWidth) + "px";
          }
      }
      
      function stopResize() {
        window.removeEventListener('mousemove', resize)
      }
    }
  }
  
  makeResizableDiv('.resizable')