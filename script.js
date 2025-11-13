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
     // Prevent it from finishing code
     return;
   }


   const data = {
     name: nameEl.value.trim(),
     location: locEl.value.trim(),
     email: emailEl.value.trim(),
     diet: document.getElementById('diet').value.trim()
   };

   // Show success RSVP entry
   const msg = document.createElement('p');
   msg.textContent = `✅ ${data.name} from ${data.location} — confirmation sent to ${data.email}`;
   rsvpList.appendChild(msg);

   msg.style.opacity = '0';
   msg.style.transform = 'translateY(6px)';
   requestAnimationFrame(() => {
     msg.style.transition = 'opacity .28s ease, transform .28s ease';
     msg.style.opacity = '1';
     msg.style.transform = 'translateY(0)';
   });

   rsvpList.classList.add('success');
   setTimeout(() => form.reset(), 900);
 }

 // Attach form validation handler
 form.addEventListener('submit', validateForm);
