/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const nav = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


/** 
 * Build ListItem and Link
 * @paramter section - section element
 * @return listItem - list item <li>, 
 * with a link <a> child pointing to  given section
 * 
 * example : <li><a href="#section_1">Section 1</a></li>
*/
function createSectionLink(section) {
  const id = section.getAttribute('id');
  const text = section.getAttribute('data-nav');
  const li = document.createElement('li');
  li.setAttribute('id', `${id}__link`);
  li.className = 'menu__link';
  const link = document.createElement('a');
  link.textContent = text;
  link.href = `#${id}`;
  li.appendChild(link);
  return li;
}

/** 
 * Build the navigation
 * @paramter section - section element
 * @parameter nav - nav element 
*/
function createNav(sections, nav) {
  const fragment = document.createDocumentFragment();
  for (let section of sections) {
    const link = createSectionLink(section);
    fragment.appendChild(link);
  }
  nav.appendChild(fragment);
}

// check if section is near top
function nearTop(section) {
  const allowance = 150;
  const windowY = window.scrollY;
  const sectionTop = section.offsetTop - allowance;
  const sectionBottom = sectionTop + section.offsetHeight;
  const nearTop = ((sectionTop < windowY) && (windowY < sectionBottom));
  return nearTop;
}

// Scroll to anchor ID using scrollTO event
function scrollToAnchor(anchor) {
  const targetElement = document.querySelector(anchor);
  targetElement.scrollIntoView({
    behavior: 'smooth'
  });
}

/**
 * End Main Functions
 * Begin Events
 *
*/

document.addEventListener("DOMContentLoaded", function(){
  // Build menu when DOM is loaded
  createNav(sections, nav);

  // Scroll to section on link click
  const links = nav.querySelectorAll('a');
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      scrollToAnchor(target);
    });
  });

  // Set sections as active when near top
  document.addEventListener('scroll', function() {
    sections.forEach((section) => {
      const active = 'your-active-class';
      const sectionId = section.getAttribute('id');
      const linkId = `${sectionId}__link`;
      const link = document.getElementById(linkId);
      if (nearTop(section)) {
        section.classList.add(active);
        link.classList.add(active);
      } else {
        section.classList.remove(active);
        link.classList.remove(active);
      }
    });
  });
});



