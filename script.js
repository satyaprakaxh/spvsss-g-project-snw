// DOM elements
const form = document.getElementById('claimForm');
const policy = document.getElementById('policy');
const desc = document.getElementById('desc');
const filesInput = document.getElementById('files');
const browse = document.getElementById('browse');
const dropArea = document.getElementById('dropArea');
const thumbs = document.getElementById('thumbs');
const progressBar = document.getElementById('progressBar');
const policyStatus = document.getElementById('policyStatus');
const modal = document.getElementById('modal');
const claimIdEl = document.getElementById('claimId');
const toast = document.getElementById('toast');

// -------------------- TOAST HELPER --------------------
let toastTimeout;
function showToast(msg, timeout = 3000) {
  toast.textContent = msg;
  toast.style.display = 'block';
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.style.display = 'none';
  }, timeout);
}

// -------------------- POLICY CHECK --------------------
function checkPolicy() {
  const val = policy.value.trim();
  policyStatus.textContent = 'Checking...';
  policyStatus.style.color = '#8b9bb0';
  setTimeout(() => {
    if (!val || val.length < 6) {
      policyStatus.textContent = 'Invalid';
      policyStatus.style.color = '#ff6b6b';
    } else {
      policyStatus.textContent = 'Active';
      policyStatus.style.color = '#16a34a';
    }
  }, 700);
}

// -------------------- FILE UPLOAD --------------------
browse.addEventListener('click', () => filesInput.click());

// Drag & Drop events
['dragenter', 'dragover'].forEach(e => {
  dropArea.addEventListener(e, ev => {
    ev.preventDefault();
    dropArea.classList.add('drag');
  });
});
['dragleave', 'drop'].forEach(e => {
  dropArea.addEventListener(e, ev => {
    ev.preventDefault();
    dropArea.classList.remove('drag');
  });
});
dropArea.addEventListener('drop', e => {
  const dt = e.dataTransfer;
  if (!dt) return;
  handleFiles(dt.files);
});
filesInput.addEventListener('change', e => handleFiles(e.target.files));

function handleFiles(list) {
  const files = Array.from(list).slice(0, 6);
  thumbs.innerHTML = '';
  files.forEach(f => {
    const t = document.createElement('div');
    t.className = 'thumb';
    t.textContent = f.name.length > 12 ? f.name.slice(0, 11) + '...' : f.name;
    if (f.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.borderRadius = '6px';
      const reader = new FileReader();
      reader.onload = (ev) => {
        img.src = ev.target.result;
        t.innerHTML = '';
        t.appendChild(img);
      };
      reader.readAsDataURL(f);
    }
    thumbs.appendChild(t);
  });
}

// -------------------- SAVE DRAFT --------------------
document.getElementById('saveDraft').addEventListener('click', () => {
  const data = {
    policy: policy.value,
    date: document.getElementById('date').value,
    type: document.getElementById('type').value,
    contact: document.getElementById('contact').value,
    desc: desc.value
  };
  localStorage.setItem('guardianDraft', JSON.stringify(data));
  showToast('Draft saved locally');
});

// Load draft on page load
window.addEventListener('load', () => {
  const d = localStorage.getItem('guardianDraft');
  if (d) {
    try {
      const parsed = JSON.parse(d);
      policy.value = parsed.policy || '';
      document.getElementById('date').value = parsed.date || '';
      document.getElementById('type').value = parsed.type || '';
      document.getElementById('contact').value = parsed.contact || '';
      desc.value = parsed.desc || '';
    } catch (e) { console.error(e); }
  }
});

// -------------------- FORM SUBMIT --------------------
form.addEventListener('submit', e => {
  e.preventDefault();

  const policyVal = policy.value.trim();
  const descVal = desc.value.trim();
  const contactVal = document.getElementById('contact').value.trim();

  if (policyVal.length < 6) { showToast('Policy number looks wrong', 2000); policy.focus(); return; }
  if (descVal.length < 12) { showToast('Description too short', 2000); desc.focus(); return; }
  if (contactVal.length < 8) { showToast('Provide contact phone', 2000); document.getElementById('contact').focus(); return; }

  // Simulate upload
  progressBar.style.width = '0%';
  let p = 0;
  const up = setInterval(() => {
    p += Math.random() * 22;
    if (p >= 100) {
      p = 100;
      progressBar.style.width = p + '%';
      clearInterval(up);
      onUploadComplete();
    } else {
      progressBar.style.width = Math.floor(p) + '%';
    }
  }, 160);
});

function onUploadComplete() {
  const id = 'GU-' + Date.now().toString(36).toUpperCase().slice(-6);
  claimIdEl.textContent = id;
  document.getElementById('modalTitle').textContent = 'Submitted!';
  document.getElementById('modalMsg').textContent = 'Claim received — ID: ' + id;
  modal.style.display = 'flex';
  showToast('Claim submitted', 2000);
  localStorage.removeItem('guardianDraft');
}

// -------------------- MODAL --------------------
document.getElementById('closeModal').addEventListener('click', () => { modal.style.display = 'none'; });
document.getElementById('track').addEventListener('click', () => { showToast('Opening tracker (demo)'); modal.style.display = 'none'; });

// -------------------- UX --------------------
// policy check on blur
policy.addEventListener('blur', checkPolicy);

// hamburger demo toggle
document.getElementById('menuBtn').addEventListener('click', () => { showToast('Menu (demo)'); });

// close modal on ESC
window.addEventListener('keydown', e => { if (e.key === 'Escape') modal.style.display = 'none'; });

// small focus shadow
document.querySelectorAll('input, textarea, select').forEach(el => {
  el.addEventListener('focus', () => el.style.boxShadow = '0 8px 28px rgba(37,115,212,0.12)');
  el.addEventListener('blur', () => el.style.boxShadow = 'none');
});