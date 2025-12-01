(function () {
  if (document.startViewTransition) {
    console.log("ViewTransition supported — skipping JS fallback");
    document.querySelectorAll(".reveal").forEach(el => {
      el.classList.remove("reveal");
    });
    return;
  }
  console.log("ViewTransition NOT supported — using JS fallback");
  const allAnchors = document.querySelectorAll("a"); 
  
  allAnchors.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const link = e.target; e.preventDefault(); // animate current page OUT 
      console.log(document.documentElement); // let animation begin, then navigate 
      document.documentElement.classList.add("leaving");

      setTimeout(() => { window.location.href = link.href; }, 300);
    });
  });
  // outgoing animation on link click // incoming animation (DOMContentLoaded + rAF) 
  function reveal() {
    const els = document.querySelectorAll(".reveal");
    requestAnimationFrame(() => { els.forEach(el => el.classList.add("visible")); });
  }
  if (didViewTransition) {
    console.log('skipping reveal due to VT');
    return
  }
  else {
    document.addEventListener("DOMContentLoaded", reveal, { once: true });
  }
})();