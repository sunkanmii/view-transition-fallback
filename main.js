(function () {
  if (document.startViewTransition) {
    console.log("ViewTransition supported — skipping JS fallback");
    document.querySelectorAll(".reveal").forEach(el => {
      el.classList.remove("reveal");
    });
    return;
  }
  
  document.querySelectorAll(".default").forEach(el => {
    el.classList.remove("default");
  });
  
  // console.log("ViewTransition NOT supported — using JS fallback");
  const allAnchors = document.querySelectorAll("a"); 
  
  allAnchors.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
    
      e.preventDefault(); // animate current page OUT 

      // console.log(document.documentElement); // let animation begin, then navigate 
      document.documentElement.classList.add("leaving");

      setTimeout(() => { window.location.href = anchor.href; }, 300);
    });
  });
  
  // outgoing animation on link click // incoming animation (DOMContentLoaded + rAF) 
  function reveal() {
    const els = document.querySelectorAll(".reveal");
    requestAnimationFrame(() => { els.forEach(el => el.classList.add("visible")); });
  }
  
    document.addEventListener("DOMContentLoaded", reveal, { once: true });
  
})();