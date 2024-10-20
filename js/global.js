document.addEventListener('DOMContentLoaded', () => {
  const arrow = document.querySelector('.arrow');
  const li = document.querySelector('#project-li');

  goToProjects(arrow);
  goToProjects(li);
});

function goToProjects(el) {
  el.onclick = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight,
      behavior: 'smooth',
    });
  };
}
