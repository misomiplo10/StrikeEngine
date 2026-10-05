const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
const flow = document.querySelector('[data-flow]');
const flowSteps = [...document.querySelectorAll('[data-step]')];
const flowBar = flow?.querySelector('.flow-progress span');
const policyDialog = document.querySelector('[data-policy-dialog]');

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
);

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
  revealObserver.observe(element);
});

const activateStep = (step) => {
  const index = Number(step.dataset.step);
  flowSteps.forEach((candidate) => candidate.classList.toggle('is-active', candidate === step));
  if (flowBar) flowBar.style.width = `${((index - 1) / (flowSteps.length - 1)) * 100}%`;
};

flowSteps.forEach((step) => {
  step.addEventListener('mouseenter', () => activateStep(step));
  step.addEventListener('focus', () => activateStep(step));
});

document.querySelector('[data-open-policy]')?.addEventListener('click', () => policyDialog?.showModal());
document.querySelector('[data-close-policy]')?.addEventListener('click', () => policyDialog?.close());
policyDialog?.addEventListener('click', (event) => {
  if (event.target === policyDialog) policyDialog.close();
});

document.querySelectorAll('.accordion details').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (!details.open) return;
    document.querySelectorAll('.accordion details').forEach((other) => {
      if (other !== details) other.open = false;
    });
  });
});
