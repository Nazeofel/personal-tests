document.addEventListener('DOMContentLoaded', () => {
  const arrow = document.querySelector('.arrow');
  const header = document.querySelector('header');
  const projectNavLink = document.querySelector('#project-li');
  const aboutMeNavLink = document.querySelector('#about-me-li');
  const projectWrapper = document.querySelector('.wrapper');
  const project = document.querySelector('.project');
  const aboutMe = document.querySelector('.wrapper-about-me');
  const contentContainer = document.querySelector(
    '.wrapper-about-me > .content'
  );
  const leftBracket = document.querySelector('.topLeft');
  const rightBracket = document.querySelector('.bottomRight');

  placeSquare(contentContainer, rightBracket, leftBracket);

  window.addEventListener('resize', () => {
    placeSquare(contentContainer, rightBracket, leftBracket);
  });

  const projectsArray = [
    {
      title: 'Forum',
      techno: 'NextJS,Prisma',
      desc: 'Developed a Forum project using technologies such as NextJS',
      link: 'https://github.com/',
    },
    {
      title: 'RoboJS',
      techno: 'NodeJS,NextJS,LotsOfJs',
      desc: 'Discord Framework aiming to assist users in the creation of Bot and Activities.',
      link: '',
    },
  ];

  let projectIndex = 0;
  let projectSection = false;
  let canScroll = true;
  let triggerNavOrHeader = false;
  let triggerAboutMeNav = false;
  document.addEventListener('wheel', (e) => {
    if (canScroll && projectSection) {
      if (isScrollUp(e) === false && projectSection) {
        if (projectIndex + 1 >= projectsArray.length) {
          triggerNavOrHeader = false;
          document.querySelector('body').style.overflow = 'unset';
          return;
        }
        projectIndex++;
        updateProject(projectsArray[projectIndex]);
        timeouScroll();
      } else {
        if (projectIndex - 1 < 0) {
          document.querySelector('body').style.overflow = 'unset';
          return;
        }
        projectIndex--;
        updateProject(projectsArray[projectIndex]);
        timeouScroll();
      }
    }
  });

  function timeouScroll() {
    canScroll = false;
    setTimeout(() => {
      canScroll = true;
    }, 400);
  }

  function isScrollUp(delta) {
    if (delta.wheelDelta) {
      return delta.wheelDelta > 0;
    }
    return delta.deltaY < 0;
  }

  let options = {
    root: null,
    rootMargin: '0px',
    threshold: [0.2, 0.3, 0.5, 0.55, 0.6, 0.75, 0.9, 0.95, 0.99, 1],
  };

  let firstScroll = true;

  const observe = new IntersectionObserver((entries) => {
    for (entry of entries) {
      if (
        (entry.intersectionRatio >= 0.9 &&
          entry.target.classList.contains('header')) ||
        (entry.intersectionRatio >= 0.5 &&
          entry.target.classList.contains('wrapper-about-me'))
      ) {
        projectSection = false;
      }

      if (
        entry.intersectionRatio >= 0.5 &&
        entry.target.classList.contains('wrapper-about-me')
      ) {
        if (!triggerAboutMeNav) {
          scrolls.scrollToElement(aboutMe);
        }
        const leftBracket = document.querySelector('.topLeft');
        const rightBracket = document.querySelector('.bottomRight');
        const aboutMeDesc = document.querySelector('.about-me');
        const aboutMeTitle = document.querySelector('.about-me-title');
        leftBracket.classList.add('animateBrackets');
        rightBracket.classList.add('animateBrackets');

        aboutMeDesc.classList.add('animationTextAboutMe');
        aboutMeTitle.classList.add('animationTextAboutMe');

        triggerAboutMeNav = false;
        observe.unobserve(entry.target);
      }

      if (!triggerAboutMeNav) {
        if (
          entry.intersectionRatio >= 1 &&
          entry.target.classList.contains('wrapper')
        ) {
          document.querySelector('body').style.overflow = 'hidden';
        }

        if (
          entry.intersectionRatio >= 0.2 &&
          entry.target.classList.contains('project') &&
          firstScroll
        ) {
          updateProject(projectsArray[projectIndex]);
          firstScroll = false;
        }

        if (
          entry.intersectionRatio >= 0.5 &&
          entry.target.classList.contains('project')
        ) {
          if (!triggerNavOrHeader && !projectSection) {
            scrolls.scrollToElement(projectWrapper);
          }
          projectSection = true;
        }
      }
    }
  }, options);

  observe.observe(header);
  observe.observe(aboutMe);
  observe.observe(project);
  observe.observe(projectWrapper);

  function updateProject(project) {
    const pName = document.querySelector('.p-name');
    const pTech = document.querySelector('.p-tech > span');
    const desc = document.querySelector('.desc');
    const pLink = document.querySelector('.project-link');

    const descAnim = desc.animate(
      [
        {
          transform: 'translateY(0px)',
          opacity: '1',
        },
        {
          opacity: '0.5',
        },
        {
          transform: 'translateY(100px)',
          opacity: '0',
        },
      ],
      {
        fill: 'forwards',
        duration: 300,
      }
    );

    if (descAnim.finished) {
      descAnim.finished
        .then(() => {
          desc.textContent = project.desc;
          desc.animate(
            [
              {
                transform: 'translateY(100px)',
                opacity: '0',
              },
              {
                opacity: '0.5',
              },
              {
                transform: 'translateY(0px)',
                opacity: '1',
              },
            ],
            {
              fill: 'forwards',
              duration: 300,
            }
          );
        })
        .catch((error) => {
          console.error('Animation failed:', error);
        });
    }

    pName.textContent = project.title;
    pTech.textContent = project.techno;
    pLink.href = project.link;

    pLink.animate(
      [
        {
          opacity: '0',
        },
        {
          opacity: '0.5',
        },
        {
          opacity: '1',
        },
      ],
      {
        fill: 'forwards',
        duration: 500,
      }
    );

    pName.animate(
      [
        {
          transform: 'translateY(20px)',
          opacity: '0',
        },
        {
          opacity: '0.5',
        },
        {
          transform: 'translateY(0px)',
          opacity: '1',
        },
      ],
      {
        fill: 'forwards',
        duration: 500,
      }
    );
    pTech.animate(
      [
        {
          transform: 'translateY(-10px)',
          opacity: '0',
        },
        {
          opacity: '0.5',
        },
        {
          transform: 'translateY(0px)',
          opacity: '1',
        },
      ],
      {
        fill: 'forwards',
        duration: 500,
      }
    );
  }

  [arrow, projectNavLink].forEach((el) => {
    el.onclick = () => {
      triggerNavOrHeader = true;
      scrolls.scrollToElement(projectWrapper);
    };
  });

  aboutMeNavLink.onclick = () => {
    triggerAboutMeNav = true;
    scrolls.scrollToElement(aboutMe);
  };
});

function placeSquare(contentContainer, rightBracket, leftBracket) {
  const containerSizeWidth = contentContainer.clientWidth;
  const containerSizeHeight = contentContainer.clientHeight;

  const bottomDivSizeWidth = rightBracket.clientWidth;
  const bottomDivSizeHeight = rightBracket.clientWidth;

  const topDivSizeWidth = leftBracket.clientWidth;
  const topDivSizeHeight = leftBracket.clientHeight;

  const width = containerSizeWidth / 2;
  const height = containerSizeHeight / 2;

  const differenceLeftBetweenTheTwoCubes =
    (height - topDivSizeHeight) / 2 - (height - bottomDivSizeHeight) / 2;

  const difference = Math.floor(differenceLeftBetweenTheTwoCubes / 2);

  leftBracket.style.transform = `translate(${Math.ceil(
    width - topDivSizeWidth / 2
  )}px, ${Math.ceil(height - topDivSizeHeight / 2 + difference - 2)}px)`;
  rightBracket.style.transform = `translate(-${Math.ceil(
    width - bottomDivSizeWidth / 2 - 5
  )}px, -${Math.ceil(height - bottomDivSizeHeight / 2 + difference)}px)`;
}

const scrolls = {
  scrollToElement: (elementToScrollTo, alignTop = true) => {
    elementToScrollTo.scrollIntoView({
      alignTop,
      behavior: 'smooth',
    });
  },
};
