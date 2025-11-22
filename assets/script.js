const form = document.getElementById('rsvp-form');
const toast = document.getElementById('toast');
const preview = {
  name: document.getElementById('preview-name'),
  team: document.getElementById('preview-team'),
  email: document.getElementById('preview-email'),
  status: document.getElementById('preview-status'),
  message: document.getElementById('preview-message'),
};

const updatePreview = () => {
  if (!form) return;
  const data = new FormData(form);
  const entries = {
    name: data.get('name')?.toString().trim() || '—',
    team: data.get('team')?.toString().trim() || '—',
    email: data.get('email')?.toString().trim() || '—',
    status: data.get('status')?.toString().trim() || '—',
    message: data.get('message')?.toString().trim() || '—',
  };

  Object.entries(entries).forEach(([key, value]) => {
    if (preview[key]) preview[key].textContent = value;
  });
};

form?.addEventListener('input', updatePreview);
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  updatePreview();
  toast?.classList.add('show');
  toast?.focus?.();

  setTimeout(() => {
    toast?.classList.remove('show');
  }, 2600);
});

updatePreview();
