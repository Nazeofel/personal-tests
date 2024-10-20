document.addEventListener('DOMContentLoaded', () => {
  let observer;

  const container = document.querySelector('.container');
  const projectContainer = document.querySelector('.project-container');

  let options = {
    root: null,
    rootMargin: '50px',
    threshold: [0.25, 0.5, 0.75, 1],
  };

  const p1 = document.querySelectorAll('.p1');
  const p2 = document.querySelectorAll('.p2');

  observer = new IntersectionObserver(handleIntersect, options);

  observer.observe(projectContainer);

  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      const ratio = Math.floor(entry.intersectionRatio);
      const target = entry.target;

      if (entry.isIntersecting) {
        if (
          entry.target === projectContainer &&
          entry.intersectionRatio >= 0.9
        ) {
          console.log('first');
        }
      }

      if (ratio >= 1) observer.unobserve(target);
    });
  }

  let c;

  c = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const target = entry.target;

        if (entry.isIntersecting) {
          target.style.opacity = entry.intersectionRatio;
        }
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: [0.25, 0.5, 0.75, 1],
    }
  );

  p1.forEach((el) => {
    c.observe(el);
  });

  p2.forEach((el) => {
    c.observe(el);
  });
});
