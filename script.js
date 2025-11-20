 // Dark mode
 const themeToggle = document.getElementById('themeToggle');
 const themeIcon = document.getElementById('themeIcon');
 const rootHtml = document.documentElement;

 function setMode(isDark) {
   if (isDark) {
     rootHtml.classList.add('dark');
     themeIcon.textContent = '☀️';
     themeToggle.setAttribute('aria-pressed', 'true');
     localStorage.setItem('mode', 'dark');
   } else {
     rootHtml.classList.remove('dark');
     themeIcon.textContent = '🌙';
     themeToggle.setAttribute('aria-pressed', 'false');
     localStorage.setItem('mode', 'light');
   }
 }

 const saved = localStorage.getItem('mode');
 setMode(saved === 'dark');

 themeToggle.addEventListener('click', () => setMode(!rootHtml.classList.contains('dark')));

 // Form Handling Section
 const form = document.getElementById('signupForm');
 const nameEl = document.getElementById('name');
 const locEl = document.getElementById('location');
 const emailEl = document.getElementById('email');
 const rsvpList = document.getElementById('rsvpList');


 function toggleValidity(el, ok, errId) {
   const err = document.getElementById(errId);
   if (!ok) {
     el.classList.add('error');
     err.style.display = 'block';
   } else {
     el.classList.remove('error');
     err.style.display = 'none';
   }
 }

 function validateName() {
   const ok = nameEl.value.trim().length >= 3;
   toggleValidity(nameEl, ok, 'nameErr');
   return ok;
 }

 function validateLoc() {
   const ok = locEl.value.trim().length >= 3;
   toggleValidity(locEl, ok, 'locErr');
   return ok;
 }

 function validateEmail() {
   const v = emailEl.value.trim();
   const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
   const ok = re.test(v);
   toggleValidity(emailEl, ok, 'emailErr');
   return ok;
 }

 nameEl.addEventListener('input', validateName);
 locEl.addEventListener('input', validateLoc);
 emailEl.addEventListener('input', validateEmail);

 // Form Validation Section
 function validateForm(e) {
  e.preventDefault();

  const name = validateName();
  const loc = validateLoc();
  const mail = validateEmail();

  if (!(name && loc && mail)) {
    return; // modal will NOT show on invalid RSVP
  }

  // Person object
  const person = {
    name: nameEl.value.trim(),
    location: locEl.value.trim(),
    email: emailEl.value.trim(),
    diet: document.getElementById('diet').value.trim()
  };

  // Add entry to list
  const msg = document.createElement('p');
  msg.textContent = `✅ ${person.name} from ${person.location} — confirmation sent to ${person.email}`;
  rsvpList.appendChild(msg);

  msg.style.opacity = '0';
  msg.style.transform = 'translateY(6px)';
  requestAnimationFrame(() => {
    msg.style.transition = 'opacity .28s ease, transform .28s ease';
    msg.style.opacity = '1';
    msg.style.transform = 'translateY(0)';
  });

  setTimeout(() => form.reset(), 900);

  // Show modal
  showSuccessModal(person);
}



// Attach form validation handler
form.addEventListener('submit', validateForm);


function showSuccessModal(person) {
  const modal = document.getElementById('success-modal');
  const modalText = document.getElementById('modal-text');
  const modalImg = document.getElementById('modal-img');

  // Clean centered paragraph
  modalText.textContent =
    `🎉 Congratulations, ${person.name}!\n\nYour RSVP has been successfully submitted.\nWe're excited to welcome you to the event!`;

  modal.style.display = 'flex';

  // Reset animation state
  modalImg.style.transform = "scale(0.5)";
  modalImg.style.opacity = "0";

  // Animate image popping in
  requestAnimationFrame(() => {
    modalImg.style.transition = "transform 0.6s ease, opacity 0.6s ease";
    modalImg.style.transform = "scale(1)";
    modalImg.style.opacity = "1";
  });

  // Auto-close in 4 secs
  setTimeout(() => {
    modal.style.display = "none";
  }, 4000);
}


