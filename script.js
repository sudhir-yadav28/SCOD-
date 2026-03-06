// Front-end logic: validate, store locally, and redirect to WhatsApp community link
(function(){
  const form = document.getElementById('joinForm');
  const after = document.getElementById('after');
  const submitBtn = document.getElementById('submitBtn');
  const whatsappLink = 'https://whatsapp.com/channel/0029VbBGe8vD38CbD7UrcE3E';

  function validateEmail(email){
    return /\S+@\S+\.\S+/.test(email);
  }

  function validatePhone(phone){
    if(!phone) return true; // optional
    // allow +, digits, spaces, dashes, parentheses
    return /^[+\d\s\-()]{7,25}$/.test(phone);
  }

  function showError(id, msg){
    const el = document.getElementById(id);
    if(el){ el.textContent = msg; el.style.display = msg? 'block' : 'none'; }
  }

  function clearErrors(){
    showError('nameError','');
    showError('emailError','');
    showError('phoneError','');
  }

  function saveSubmission(data){
    try{
      const key = 'whatsappLanding_submissions';
      const raw = localStorage.getItem(key);
      const arr = raw? JSON.parse(raw): [];
      arr.push(Object.assign({ts: Date.now()}, data));
      localStorage.setItem(key, JSON.stringify(arr));
    }catch(e){
      // ignore localStorage errors
      console.warn('Could not save submission locally', e);
    }
  }

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    if(submitBtn.disabled) return;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const consent = form.querySelector('#consent').checked;

    clearErrors();
    let hasError = false;
    if(!name){
      showError('nameError','Please enter your full name.');
      hasError = true;
    }
    if(!email || !validateEmail(email)){
      showError('emailError','Please enter a valid email address.');
      hasError = true;
    }
    if(!validatePhone(phone)){
      showError('phoneError','Please enter a valid phone number (digits, +, spaces).');
      hasError = true;
    }
    if(!consent){
      alert('Please agree to receive the e-book link inside the WhatsApp community.');
      hasError = true;
    }
    if(hasError) return;

    // Save locally (so the user can get a light confirmation if needed)
    saveSubmission({name,email,phone});

    // Provide quick UX feedback then redirect to WhatsApp link
    submitBtn.disabled = true;
    submitBtn.textContent = 'Opening WhatsApp...';
    after.classList.remove('hidden');

    // Small delay so user sees the message then redirect
    setTimeout(()=>{
      window.location.href = whatsappLink;
    }, 900);
  });

  // E-book preview modal logic
  const previewBtn = document.getElementById('previewEbook');
  const ebookModal = document.getElementById('ebookModal');
  const modalClose = document.getElementById('modalClose');
  const ebookFrame = document.getElementById('ebookFrame');

  function openModal(){
    if(!ebookModal) return window.open('demo-ebook.html','_blank');
    ebookModal.classList.remove('hidden');
    ebookModal.setAttribute('aria-hidden','false');
    // focus into iframe for accessibility
    setTimeout(()=>{ try{ ebookFrame.focus(); }catch(e){} },100);
  }
  function closeModal(){
    if(!ebookModal) return;
    ebookModal.classList.add('hidden');
    ebookModal.setAttribute('aria-hidden','true');
  }

  if(previewBtn){
    previewBtn.addEventListener('click', openModal);
  }
  if(modalClose){
    modalClose.addEventListener('click', closeModal);
  }
  // close modal on overlay click
  if(ebookModal){
    ebookModal.addEventListener('click', function(e){
      if(e.target === ebookModal) closeModal();
    });
  }

  // FAQ accordion logic
  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      const answer = this.nextElementSibling;
      if(!answer) return;
      if(!expanded){
        answer.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = 0;
        answer.classList.remove('open');
      }
    });
  });

  // Background visuals removed — parallax logic disabled
})();
