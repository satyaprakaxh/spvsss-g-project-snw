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
