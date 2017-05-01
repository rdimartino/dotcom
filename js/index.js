var cursorX;
var cursorY;
document.onmousemove = function(e) {
  cursorX = e.clientX;
  cursorY = e.clientY;
};

HTMLElement.prototype.mouseOn = function() {
  rect = this.getBoundingClientRect();
  return (
    cursorX >= rect.left &&
    cursorX <= rect.right &&
    cursorY >= rect.top &&
    cursorY <= rect.bottom
  );
};

document.querySelectorAll(".flip-container").forEach(function(el, idx) {
  el.addEventListener("mouseover", flip, { once: true });
  setTimeout(function() {
    if (!el.mouseOn()) {
      flip.call(el);
    }
  }, idx * 150);
});

function flip() {
  this.classList.add("hover");
  this.addEventListener("transitionend", postFlip, { once: true });
}

function postFlip() {
  if (this.mouseOn()) {
    this.addEventListener("mouseleave", postpostFlip, { once: true });
  } else {
    postpostFlip.call(this);
  }
}

function postpostFlip() {
  this.classList.add("post-hover");
  this.addEventListener("transitionend", unflip, { once: true });
}

function unflip() {
  var flipper = this.querySelector(".flipper");
  flipper.classList.add("notransition");
  this.classList.remove("hover", "post-hover");
  window.getComputedStyle(flipper).transform;
  flipper.classList.remove("notransition");
  if (this.mouseOn()) {
    flip.call(this);
  } else {
    this.addEventListener("mouseover", flip, { once: true });
  }
}
