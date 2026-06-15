// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
let coaches = [
  {name:'Nicolas Mwalugo',role:'Head Coach',nat:'Kenyan',lic:'CAF C Licence',photo:null},
  {name:'Shukuran',role:'Assistant Coach',nat:'Kenyan',lic:'CAF D Licence',photo:null},
  {name:'Issah Hamisi',role:'Fitness Coach',nat:'Kenyan',lic:'—',photo:null},
];
let officials = [
  {name:'Duncan Unda',role:'Secretary',phone:'0742 830 707',email:'duncanunda01@gmail.com',photo:null},
  {name:'Mangi Wara',role:'Team Manager',phone:'0700 000 000',email:'mangiwara@msfc.co.ke',photo:null},
];
let players = [
  {name:'Hassan Ziro',num:1,pos:'GK',age:26,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Geoffrey Kazungu',num:13,pos:'GK',age:22,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Juma Harre',num:2,pos:'DEF',age:28,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Ali Katana ',num:16,pos:'DEF',age:25,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Tuma',num:4,pos:'DEF',age:24,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Emmanuel Kilumo',num:5,pos:'DEF',age:27,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Ramadhan Kiboni',num:6,pos:'MID',age:23,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Amani ',num:7,pos:'MID',age:21,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Mark Katana',num:8,pos:'MID',age:26,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Moses Gona',num:12,pos:'MID',age:24,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Gabriel Doku',num:11,pos:'FWD',age:22,nat:'Kenyan',dob:'',fifaId:'',note:'Top Scorer',photo:null},
  {name:'Jefa Johnson',num:10,pos:'FWD',age:25,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Nzai Moses',num:14,pos:'FWD',age:20,nat:'Kenyan',dob:'',fifaId:'',photo:null},
  {name:'Ramadhan Haro',num:9,pos:'FWD',age:23,nat:'Kenyan',dob:'',fifaId:'',photo:null},
];
let leagueTable = [
  {team:'MADAMANI STRIKERS',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:true},
  {team:'A.D.C GALANA',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
  {team:'ATLANTA',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
  {team:'BAOLALA',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
  {team:'JILORE UNITED',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
  {team:'KAKONENI ALLSTARS',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
  {team:'KING POWER',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
  {team:'LANGOBAYA',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
  {team:'MARK RANGERS',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
  {team:'MASTER DRIBBLERS',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
  {team:'NYAYO',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
  {team:'RED COMMANDOS',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
  {team:'SHAKAHOLA',p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false},
];
let fixtures = [
  {day:12,mon:'APR',home:'JILORE UNITED',away:'MADAMANI STRIKERS',status:'upcoming',score:'',venue:'KO 15:00 · Away'},
  {day:19,mon:'APR',home:'MADAMANI STRIKERS',away:'LANGOBAYA',status:'upcoming',score:'',venue:'KO 15:00 · Home'},
  {day:3,mon:'MAY',home:'NYAYO',away:'MADAMANI STRIKERS',status:'upcoming',score:'',venue:'KO 15:00 · Away'},
  {day:10,mon:'MAY',home:'MADAMANI STRIKERS',away:'MARK RANGERS',status:'upcoming',score:'',venue:'KO 15:00 · Home'},
  {day:17,mon:'MAY',home:'RED COMMANDOS',away:'MADAMANI STRIKERS',status:'upcoming',score:'',venue:'KO 15:00 · Away'},
  {day:24,mon:'MAY',home:'MADAMANI STRIKERS',away:'ATLANTA',status:'upcoming',score:'',venue:'KO 15:00 · Home'},
  {day:30,mon:'MAY',home:'KAKONENI ALLSTARS',away:'MADAMANI STRIKERS',status:'upcoming',score:'',venue:'KO 15:00 · Away'},
  {day:6,mon:'JUN',home:'MADAMANI STRIKERS',away:'A.D.C GALANA',status:'upcoming',score:'',venue:'KO 15:00 · Home'},
  {day:13,mon:'JUN',home:'SHAKAHOLA',away:'MADAMANI STRIKERS',status:'upcoming',score:'',venue:'KO 15:00 · Away'},
  {day:21,mon:'JUN',home:'MADAMANI STRIKERS',away:'KING POWER',status:'upcoming',score:'',venue:'KO 15:00 · Home'},
  {day:28,mon:'JUN',home:'MASTER DRIBBLERS',away:'MADAMANI STRIKERS',status:'upcoming',score:'',venue:'KO 15:00 · Away'},
  {day:5,mon:'JUL',home:'MADAMANI STRIKERS',away:'BAOLALA',status:'upcoming',score:'',venue:'KO 15:00 · Home'},
];
let galleryModalIndex = null;
let galleryImages = [
  {src:'https://picsum.photos/id/1011/720/520',title:'Stadium Sunrise',desc:'Morning light over Kilifi Stadium before kickoff.'},
  {src:'https://picsum.photos/id/1015/720/520',title:'Midfield Battle',desc:'A contested moment in midfield during a close match.'},
  {src:'https://picsum.photos/id/1027/720/520',title:'Goal Celebration',desc:'Players celebrate a late winner with the fans.'},
  {src:'https://picsum.photos/id/1033/720/520',title:'Supporters',desc:'Dedicated fans waving scarves and cheering the team.'},
  {src:'https://picsum.photos/id/1044/720/520',title:'Team Huddle',desc:'The squad gathers for a pre-match pep talk.'},
  {src:'https://picsum.photos/id/1050/720/520',title:'Night Match',desc:'Floodlights illuminate the action during an evening fixture.'},
];
let slideshowIndex = 0;
let slideshowTimer = null;
let slideshowPlaying = true;
let pendingRelease = null; // {type, idx}
let playerFilter = 'all';
const liveNews = [
  'Live: Madamani Strikers warm up ahead of the derby against Summit City FC.',
  'Club alert: Ticket allocations now open for the cup tie at Kilifi Stadium.',
  'Injury update: Kevin Kamau is fit again for the upcoming clash.',
  'Scout report: Strikers remain unbeaten in four consecutive away matches.',
  'Coach Njoroge previews the next fixture with confidence from training.'
];
let adminNews = JSON.parse(localStorage.getItem('msfc.news') || '[]');
const LIVE_MONTHS = {JAN:0,FEB:1,MAR:2,APR:3,MAY:4,JUN:5,JUL:6,AUG:7,SEP:8,OCT:9,NOV:10,DEC:11};
let newsIndex = 0;
function saveAdminNews(){try{localStorage.setItem('msfc.news',JSON.stringify(adminNews));}catch(e){console.warn('saveAdminNews failed',e);}}

// Session activity for fixtures (kept per-browser-session)
let fixtureSession = JSON.parse(sessionStorage.getItem('msfc.fixtureSession') || '[]');
let otherTeamsFixtures = JSON.parse(localStorage.getItem('msfc.otherTeamsFixtures') || '[]');
function saveFixtureSession(){ try{ sessionStorage.setItem('msfc.fixtureSession', JSON.stringify(fixtureSession)); }catch(e){ console.warn('saveFixtureSession failed', e); } }
function saveOtherTeamsFixtures(){ try{ localStorage.setItem('msfc.otherTeamsFixtures', JSON.stringify(otherTeamsFixtures)); }catch(e){ console.warn('saveOtherTeamsFixtures failed', e); } }
function loadOtherTeamsFixtures(){
  try{
    const s = localStorage.getItem('msfc.otherTeamsFixtures');
    if(s){ const loaded = JSON.parse(s); if(Array.isArray(loaded) && loaded.length) otherTeamsFixtures = loaded; }
  }catch(e){ console.warn('loadOtherTeamsFixtures failed', e); }
}
function addFixtureSessionEntry(text){ try{ const now = new Date().toLocaleString(); fixtureSession.unshift({text, at: now}); if(fixtureSession.length>8) fixtureSession.pop(); saveFixtureSession(); renderFixturesSession(); }catch(e){console.warn('addFixtureSessionEntry failed',e);} }
function renderFixturesSession(){ const el = document.getElementById('fixtures-session'); if(!el) return; if(!fixtureSession.length){ el.innerHTML = '<div style="color:var(--muted)">No session activity yet.</div>'; return; } el.innerHTML = fixtureSession.map(s=>`<div style="background:rgba(0,0,0,0.03);padding:10px;border-radius:8px;margin-bottom:6px;"><strong>This session:</strong> ${s.at} — ${s.text}</div>`).join(''); el.scrollIntoView({behavior:'smooth'}); }

function formatTime(date){
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2,'0');
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes} ${suffix}`;
}
function countdownTo(match){
  const timeMatch = match.venue.match(/(\d{1,2}):(\d{2})/);
  const hour = timeMatch ? parseInt(timeMatch[1], 10) : 15;
  const minute = timeMatch ? parseInt(timeMatch[2], 10) : 0;
  const target = new Date(2026, LIVE_MONTHS[match.mon], match.day, hour, minute, 0);
  const diff = target - new Date();
  if(diff <= 0){
    if(diff > -5400000) return 'Live now';
    return 'Kick-off passed';
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if(days > 0) return `${days}d ${hours}h`;
  if(hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}
function getUpcomingFixture(){
  return fixtures.filter(f => f.status === 'upcoming' || f.status === 'cup')
    .sort((a,b) => {
      const da = new Date(2026, LIVE_MONTHS[a.mon], a.day, 15, 0, 0);
      const db = new Date(2026, LIVE_MONTHS[b.mon], b.day, 15, 0, 0);
      return da - db;
    })[0];
}
function updateNextMatchCard(){
  const match = getUpcomingFixture();
  const lineEl = document.getElementById('next-match-line-card');
  const heroLine = document.getElementById('next-match-line');
  const badge = document.getElementById('next-match-badge');
  const home = document.getElementById('next-match-home');
  const away = document.getElementById('next-match-away');
  const venue = document.getElementById('next-match-venue');
  const liveText = document.getElementById('hero-live-text');
  if(!match){
    if(lineEl) lineEl.textContent = 'No upcoming fixtures available.';
    if(heroLine) heroLine.textContent = 'Manage fixtures to enable live updates.';
    if(liveText) liveText.textContent = 'No live match scheduled yet.';
    return;
  }
  if(home) home.textContent = match.home;
  if(away) away.textContent = match.away;
  if(venue) venue.textContent = match.venue;
  const countdown = countdownTo(match);
  const isLive = countdown === 'Live now';
  const badgeLabel = isLive ? 'Live' : (match.status === 'cup' ? 'Cup Match' : 'Upcoming');
  const badgeClass = isLive ? 'badge-live' : (match.status === 'cup' ? 'badge-cup' : 'badge-up');
  if(badge){ badge.textContent = badgeLabel; badge.className = `fx-badge ${badgeClass}`; }
  if(lineEl) lineEl.textContent = isLive ? 'Match is live — follow the action now.' : `Kick-off in ${countdown}`;
  if(heroLine) heroLine.textContent = isLive ? `${match.home} vs ${match.away} is live at ${match.venue}` : `Next match starts in ${countdown}`;
}
function rotateNewsTicker(){
  const ticker = document.getElementById('news-ticker');
  if(!ticker) return;
  ticker.textContent = liveNews[newsIndex];
  newsIndex = (newsIndex + 1) % liveNews.length;
}
function updateClock(){
  const clock = document.getElementById('hero-clock');
  if(clock) clock.textContent = formatTime(new Date());
}
function initRealtime(){
  updateClock();
  rotateNewsTicker();
  updateNextMatchCard();
  setInterval(updateClock, 1000);
  setInterval(rotateNewsTicker, 6000);
  setInterval(updateNextMatchCard, 10000);
}

// ─────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────
function go(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const pg = document.getElementById('page-' + id);
  const nav = document.getElementById('nav-' + id);
  if(pg) pg.classList.add('active');
  if(nav) nav.classList.add('active');
  if (id === 'admin-panel') renderAdminPanel();
  if (id === 'news' && isAdmin) {
    const newsForm = document.getElementById('admin-news-form');
    if(newsForm) newsForm.style.display = 'block';
    renderAdminNewsPreview();
  } else if (id === 'news') {
    const newsForm = document.getElementById('admin-news-form');
    if(newsForm) newsForm.style.display = 'none';
  }
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', e => e.preventDefault()));

// ─────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────
function toast(msg) {
  const t = document.getElementById('toast');
  t.innerHTML = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
let adminFeedbackTimeout;
function adminMessage(msg, type = 'success') {
  const el = document.getElementById('admin-feedback');
  if (!el) return;
  el.textContent = msg;
  el.className = 'admin-feedback ' + type + ' show';
  clearTimeout(adminFeedbackTimeout);
  adminFeedbackTimeout = setTimeout(() => el.classList.remove('show'), 3200);
}

const ADMIN_PASSWORD = 'msfc2026';
let isAdmin = false;
// pending passport/profile photos awaiting admin approval
let pendingPassportPhotos = JSON.parse(localStorage.getItem('msfc.pendingPhotos') || '[]');
function savePendingPhotos(){ try{ localStorage.setItem('msfc.pendingPhotos', JSON.stringify(pendingPassportPhotos)); }catch(e){console.warn('savePendingPhotos failed',e)} }
function setAdminMode(enabled) {
  isAdmin = !!enabled;
  document.querySelectorAll('.admin-only').forEach(el => el.classList.toggle('active', isAdmin));
  const lock = document.querySelector('.admin-lock');
  if (lock) {
    lock.textContent = isAdmin ? '🔓 Admin' : '🔒 Admin';
    lock.classList.toggle('locked', !isAdmin);
  }
  if (!isAdmin) {
    const active = document.querySelector('.page.active');
    if (active && active.id === 'page-admin-panel') {
      go('home');
    }
  }
  // show/hide news form when toggling admin mode on news page
  const newsForm = document.getElementById('admin-news-form');
  if(newsForm && document.getElementById('page-news').classList.contains('active')) {
    newsForm.style.display = isAdmin ? 'block' : 'none';
    if(isAdmin) renderAdminNewsPreview();
  }
  if (isAdmin) localStorage.setItem('adminMode', 'true');
  else localStorage.removeItem('adminMode');
}
function toggleAdminModal() {
  document.getElementById('admin-modal').classList.toggle('open');
}
function unlockAdmin() {
  const pwd = document.getElementById('admin-password').value;
  if (pwd === ADMIN_PASSWORD) {
    setAdminMode(true);
    document.getElementById('admin-modal').classList.remove('open');
    document.getElementById('admin-password').value = '';
    toast('✓ Admin mode activated!');
  } else {
    toast('Incorrect password.');
  }
}
function initAdminMode() {
  setAdminMode(localStorage.getItem('adminMode') === 'true');
}

function updateFixtureSelect() {
  const select = document.getElementById('af-result-match');
  const select2 = document.getElementById('af-fixture-select');
  if (!select && !select2) return;
  if (!fixtures.length) {
    if(select) select.innerHTML = '<option value="">No fixtures available</option>';
    if(select2) select2.innerHTML = '<option value="">No fixtures available</option>';
    return;
  }
  const html = fixtures.map((f, i) => {
    const outcome = getMatchOutcome(f);
    return `<option value="${i}">${f.day} ${f.mon} — ${f.home} vs ${f.away} (${outcome.label || f.status || 'Upcoming'})</option>`;
  }).join('');
  if(select) select.innerHTML = html;
  if(select2) select2.innerHTML = html;
}

function requireAdminAction() {
  if (!isAdmin) {
    toggleAdminModal();
    return false;
  }
  return true;
}

function handleFixtureResultUpload(input) {
  if (!requireAdminAction()) return;
  if (!input.files || !input.files[0]) return;
  const idx = parseInt(document.getElementById('af-result-match').value, 10);
  if (isNaN(idx) || !fixtures[idx]) {
    toast('Select a valid fixture first.');
    return;
  }
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    fixtures[idx].resultImage = e.target.result;
    go('fixtures');
    renderFixtures();
    renderAdminPanel();
    saveFixturesToStorage();
    scrollToUpdatedFixture(idx);
    toast('Result image attached.');
    adminMessage(`Result image uploaded for ${fixtures[idx].home} vs ${fixtures[idx].away}.`);
    // add to session panel (append to session log)
    addFixtureSessionEntry(`Result image attached — ${fixtures[idx].home} ${fixtures[idx].score||''} ${fixtures[idx].away}`);
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function addFixtureResult(){
  if (!requireAdminAction()) return;
  const idx = parseInt(document.getElementById('af-fixture-select').value, 10);
  const score = document.getElementById('af-score').value.trim();
  if(isNaN(idx) || !fixtures[idx]) {adminMessage('Select a valid fixture', 'error'); return;}
  if(!score) {adminMessage('Enter a score (e.g., 2-1)', 'error'); return;}
  // parse score and record it — support results for any teams (not only Madamani)
  const m = score.match(/^(\d+)\s*-\s*(\d+)$/);
  if(m){
    const hg = parseInt(m[1],10);
    const ag = parseInt(m[2],10);
    fixtures[idx].score = `${hg}-${ag}`;
    // mark as played — outcome will be derived from the score
    fixtures[idx].status = 'played';
  } else {
    fixtures[idx].score = score; // allow freeform but league updates require numeric scores
    fixtures[idx].status = 'played';
  }
  // ensure fixture moves out of upcoming
  if(fixtures[idx].status === 'win' || fixtures[idx].status === 'loss' || fixtures[idx].status === 'draw'){
    // nothing else required — render will group results accordingly
  }
  // Navigate to fixtures page FIRST so page is visible for real-time update
  go('fixtures');
  // Now render the fixtures immediately
  renderFixtures();
  saveFixturesToStorage();
  renderTable();
  updateFixtureSelect();
  renderAdminPanel();
  // Scroll to and highlight the updated fixture in real-time
  scrollToUpdatedFixture(idx);
  // update session block below table
  const sessEl = document.getElementById('fixtures-session');
  if(sessEl){
    const f = fixtures[idx];
    addFixtureSessionEntry(`${f.home} ${f.score||''} ${f.away} — ${f.status}`);
  }
  adminMessage(`Result added: ${fixtures[idx].home} vs ${fixtures[idx].away} — ${fixtures[idx].score} (${fixtures[idx].status})`);
  toast('✓ Fixture result updated!');
  document.getElementById('af-score').value = '';
}

function renderAdminGalleryList() {
  const wrap = document.getElementById('admin-gallery-list');
  if (!wrap) return;
  wrap.innerHTML = '';
  galleryImages.forEach((g, i) => {
    const item = document.createElement('div');
    item.className = 'admin-gallery-item';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.gap = '10px';
    item.style.marginBottom = '10px';
    const img = document.createElement('img');
    img.src = g.src;
    img.style.width = '80px';
    img.style.height = '56px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    const meta = document.createElement('div');
    meta.style.flex = '1';
    meta.innerHTML = `<div style="font-weight:700">${g.title || 'Untitled'}</div><div style="font-size:12px;color:var(--muted)">${g.desc || ''}</div>`;
    const del = document.createElement('button');
    del.className = 'btn';
    del.style.background = 'var(--red)';
    del.style.color = '#fff';
    del.textContent = 'Delete';
    del.onclick = () => { if(confirm('Remove this photo?')) removeGalleryImage(i); };
    item.appendChild(img);
    item.appendChild(meta);
    item.appendChild(del);
    wrap.appendChild(item);
  });
}

function renderAdminPendingPhotos(){
  const wrap = document.getElementById('admin-pending-photos');
  if (!wrap) return;
  wrap.innerHTML = '';
  if (!pendingPassportPhotos.length) { wrap.innerHTML = '<div style="color:var(--muted)">No pending photos.</div>'; return; }
  pendingPassportPhotos.forEach((p,i) => {
    const it = document.createElement('div');
    it.style.display = 'flex'; it.style.alignItems='center'; it.style.gap='10px'; it.style.marginBottom='10px';
    const img = document.createElement('img'); img.src = p.src; img.style.width='80px'; img.style.height='80px'; img.style.objectFit='cover'; img.style.borderRadius='6px';
    const meta = document.createElement('div'); meta.style.flex='1'; meta.innerHTML = `<div style="font-weight:700">${p.name||'(no name)'} — ${p.type} #${p.idx}</div><div style="font-size:12px;color:var(--muted)">Uploaded: ${new Date(p.at).toLocaleString()}</div>`;
    const a = document.createElement('button'); a.className='btn'; a.style.background='var(--green)'; a.style.color='#fff'; a.textContent='Approve'; a.onclick = ()=>approvePendingPhoto(i);
    const r = document.createElement('button'); r.className='btn'; r.style.background='var(--red)'; r.style.color='#fff'; r.textContent='Reject'; r.onclick = ()=>rejectPendingPhoto(i);
    it.appendChild(img); it.appendChild(meta); it.appendChild(a); it.appendChild(r);
    wrap.appendChild(it);
  });
}

function approvePendingPhoto(i){
  const p = pendingPassportPhotos[i]; if(!p) return;
  if(p.type==='coaches') coaches[p.idx].photo = p.src;
  else if(p.type==='officials') officials[p.idx].photo = p.src;
  else players[p.idx].photo = p.src;
  pendingPassportPhotos.splice(i,1); savePendingPhotos(); renderAdminPendingPhotos(); renderAll(); adminMessage('Photo approved and applied.');
}

function rejectPendingPhoto(i){
  pendingPassportPhotos.splice(i,1); savePendingPhotos(); renderAdminPendingPhotos(); adminMessage('Photo rejected.');
}

// NEWS ADMIN FUNCTIONS
function addAdminNews(){
  const title = document.getElementById('admin-news-title').value.trim();
  const tag = document.getElementById('admin-news-tag').value;
  const desc = document.getElementById('admin-news-desc').value.trim();
  if(!title || !desc) {adminMessage('Please fill in title and description', 'error'); return;}
  const now = new Date();
  adminNews.unshift({title,tag,desc,date:now.toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'}),createdAt:Date.now()});
  saveAdminNews();
  clearNewsForm();
  renderAdminNewsPreview();
  adminMessage('News created successfully!');
  toast('✓ News published!');
}

function removeAdminNews(i){
  adminNews.splice(i,1);
  saveAdminNews();
  renderAdminNewsPreview();
  adminMessage('News deleted.');
}

function clearNewsForm(){
  document.getElementById('admin-news-title').value='';
  document.getElementById('admin-news-tag').value='Club News';
  document.getElementById('admin-news-desc').value='';
}

function renderAdminNewsPreview(){
  const wrap = document.getElementById('admin-news-list');
  if(!wrap) return;
  wrap.innerHTML = '';
  if(!adminNews.length) return;
  adminNews.forEach((n,i) => {
    const item = document.createElement('div');
    item.style.background='var(--dark-bg)';item.style.border='1px solid var(--border)';item.style.borderRadius='6px';item.style.padding='12px';item.style.marginBottom='8px';item.style.display='flex';item.style.justifyContent='space-between';item.style.alignItems='center';
    item.innerHTML = `<div><div style="font-weight:700;color:#fff">${n.title}</div><div style="font-size:12px;color:var(--muted)">${n.tag} · ${n.date}</div></div><button class="btn btn-red" onclick="removeAdminNews(${i})">Delete</button>`;
    wrap.appendChild(item);
  });
}

function renderAdminPanel() {
  renderAll && renderAll();
  renderGallery && renderGallery();
  renderAdminGalleryList();
  renderAdminPendingPhotos && renderAdminPendingPhotos();
  updateFixtureSelect();
  adminMessage('Admin panel is ready.');
}

// ─────────────────────────────────────────────
// TEAM TABS
// ─────────────────────────────────────────────
function switchTeamTab(btn, tabId) {
  document.querySelectorAll('.ttab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.team-section').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ─────────────────────────────────────────────
// PHOTO UPLOAD
// ─────────────────────────────────────────────
function triggerPhotoUpload(inputId) {
  document.getElementById(inputId).click();
}
function handlePhotoUpload(inputEl, type, idx) {
  if (!requireAdminAction()) return;
  const file = inputEl.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    if(type === 'coaches') coaches[idx].photo = e.target.result;
    else if(type === 'officials') officials[idx].photo = e.target.result;
    else players[idx].photo = e.target.result;
    renderAll();
    toast('&#10003; Photo uploaded successfully!');
    adminMessage('Profile photo uploaded successfully.');
  };
  reader.readAsDataURL(file);
}

// ─────────────────────────────────────────────
// PAGE EDITOR (admin only)
// ─────────────────────────────────────────────
function openPageEditor(pageId) {
  if (!isAdmin) { toggleAdminModal(); return; }
  const id = 'page-' + pageId;
  const el = document.getElementById(id);
  if (!el) { toast('Page not found.'); return; }
  const modal = document.getElementById('page-editor-modal');
  const title = document.getElementById('page-editor-title');
  const txt = document.getElementById('page-editor-text');
  title.textContent = pageId;
  // load innerHTML for editing
  txt.value = el.innerHTML.trim();
  modal.classList.add('open');
}

function closePageEditor() {
  const modal = document.getElementById('page-editor-modal');
  if (!modal) return;
  modal.classList.remove('open');
}

function savePageEditor() {
  if (!requireAdminAction()) return;
  const title = document.getElementById('page-editor-title').textContent;
  const txt = document.getElementById('page-editor-text').value;
  const id = 'page-' + title;
  const el = document.getElementById(id);
  if (!el) { toast('Page element missing.'); return; }
  // replace content
  el.innerHTML = txt;
  // re-run any renderers if necessary
  if (title === 'team') renderAll();
  if (title === 'fixtures') { renderFixtures(); updateFixtureSelect(); }
  if (title === 'gallery') renderGallery();
  if (title === 'admin-panel') renderAdminPanel();
  // ensure gallery and other interactive elements rebind
  renderGallery();
  closePageEditor();
  toast('Page saved.');
  adminMessage(title + ' page updated.');
}

// Persist/load/export utilities
function persistKey(pageId){ return 'msfc.page.'+pageId }

function savePageToLocal(pageId, html){
  try{ localStorage.setItem(persistKey(pageId), html); adminMessage('Saved '+pageId+' to localStorage.'); }catch(e){ adminMessage('Local save failed: '+e.message,'error') }
}

function loadPageFromLocal(pageId){
  return localStorage.getItem(persistKey(pageId));
}

function applySavedPages(){
  const keys = Object.keys(localStorage).filter(k=>k.startsWith('msfc.page.'));
  keys.forEach(k=>{
    const pageId = k.replace('msfc.page.','');
    const html = localStorage.getItem(k);
    const el = document.getElementById('page-'+pageId);
    if (el && html) el.innerHTML = html;
  });
}

function exportCurrentHtml(){
  if (!requireAdminAction()) return;
  const doctype = new XMLSerializer().serializeToString(document.doctype || document.implementation.createDocumentType('html','',''));
  const html = doctype + '\n' + document.documentElement.outerHTML;
  const blob = new Blob([html],{type:'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'index-edited.html';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  adminMessage('Export started.');
}

async function savePageToServer(pageId, html, url){
  if (!requireAdminAction()) return;
  if (!url) { adminMessage('Server URL not set','error'); return; }
  try{
    const res = await fetch(url, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({page:pageId,html:html})});
    if (!res.ok) throw new Error('Server returned '+res.status);
    adminMessage('Saved '+pageId+' to server.');
    return true;
  }catch(e){ adminMessage('Server save failed: '+e.message,'error'); return false; }
}

function saveAllPagesToServer(){
  if (!requireAdminAction()) return;
  const url = document.getElementById('persist-server-url').value.trim();
  if (!url){ adminMessage('Set server URL first','error'); return }
  // collect common pages
  const pages = ['home','news','team','fixtures','gallery','about','contact','admin-panel'];
  pages.forEach(async (p)=>{
    const el = document.getElementById('page-'+p);
    if (!el) return;
    await savePageToServer(p, el.innerHTML, url);
  });
}

// Editor mode helpers
function toggleEditorPreview(){
  const mode = document.getElementById('page-editor-mode').value;
  if (mode === 'wysiwyg'){
    const wysi = document.getElementById('page-editor-wysiwyg');
    wysi.style.display = (wysi.style.display==='none')?'block':'none';
  } else {
    const ta = document.getElementById('page-editor-text');
    ta.style.display = (ta.style.display==='none')?'block':'none';
  }
}

// enhance open & save to support modes and persistence
const _openPageEditorOrig = openPageEditor;
openPageEditor = function(pageId){
  _openPageEditorOrig(pageId);
  const modeSel = document.getElementById('page-editor-mode');
  const ta = document.getElementById('page-editor-text');
  const wysi = document.getElementById('page-editor-wysiwyg');
  const struct = document.getElementById('page-editor-structured');
  modeSel.value = 'raw';
  ta.style.display='block'; wysi.style.display='none'; struct.style.display='none';
  const el = document.getElementById('page-'+pageId);
  const saved = loadPageFromLocal(pageId);
  const htmlToLoad = saved || (el?el.innerHTML.trim():'');
  ta.value = htmlToLoad;
  wysi.innerHTML = htmlToLoad;
  // populate structured fields (first h1, first p)
  const temp = document.createElement('div'); temp.innerHTML = htmlToLoad;
  const h1 = temp.querySelector('h1');
  const p = temp.querySelector('p');
  document.getElementById('structured-title').value = h1? h1.textContent : '';
  document.getElementById('structured-intro').value = p? p.innerHTML : '';
  // mode change handler
  modeSel.onchange = function(){
    const v = this.value;
    if (v==='raw'){ ta.style.display='block'; wysi.style.display='none'; struct.style.display='none'; }
    if (v==='wysiwyg'){ ta.style.display='none'; wysi.style.display='block'; struct.style.display='none'; }
    if (v==='structured'){ ta.style.display='none'; wysi.style.display='none'; struct.style.display='block'; }
  }
}

// override save to honor modes and persistence
const _savePageEditorOrig = savePageEditor;
savePageEditor = function(){
  const title = document.getElementById('page-editor-title').textContent;
  const mode = document.getElementById('page-editor-mode').value;
  const ta = document.getElementById('page-editor-text');
  const wysi = document.getElementById('page-editor-wysiwyg');
  let newHtml = '';
  if (mode==='raw') newHtml = ta.value;
  else if (mode==='wysiwyg') newHtml = wysi.innerHTML;
  else if (mode==='structured'){
    const titleVal = document.getElementById('structured-title').value;
    const introVal = document.getElementById('structured-intro').value;
    const el = document.getElementById('page-'+title);
    const temp = document.createElement('div'); temp.innerHTML = el?el.innerHTML:'';
    // replace first h1 and first p
    const h1 = temp.querySelector('h1');
    if (h1) h1.textContent = titleVal; else temp.insertAdjacentHTML('afterbegin','<h1>'+titleVal+'</h1>');
    const p = temp.querySelector('p');
    if (p) p.innerHTML = introVal; else temp.querySelector('h1')?.insertAdjacentHTML('afterend','<p>'+introVal+'</p>');
    newHtml = temp.innerHTML;
  }
  // apply
  const el = document.getElementById('page-'+title);
  if (el) el.innerHTML = newHtml;
  // persistence
  const persistToggle = document.getElementById('persist-pages-toggle');
  if (persistToggle && persistToggle.checked){ savePageToLocal(title, newHtml); }
  // server save if URL present
  const url = document.getElementById('persist-server-url').value.trim();
  if (url){ savePageToServer(title,newHtml,url); }
  // call original post-save hooks
  if (title === 'team') renderAll();
  if (title === 'fixtures') { renderFixtures(); updateFixtureSelect(); }
  if (title === 'gallery') renderGallery();
  if (title === 'admin-panel') renderAdminPanel();
  renderGallery();
  closePageEditor();
  toast('Page saved.');
  adminMessage(title + ' page updated.');
}

// apply saved pages immediately on load
try{ if (document.readyState==='complete' || document.readyState==='interactive') applySavedPages(); else window.addEventListener('DOMContentLoaded',applySavedPages); }catch(e){console.warn('applySavedPages failed',e)}

// ─────────────────────────────────────────────
// RENDER MEMBERS
// ─────────────────────────────────────────────
const posEmoji = {GK:'&#129520;',DEF:'&#128737;',MID:'&#9881;',FWD:'&#9917;'};
const posLabel = {GK:'Goalkeeper',DEF:'Defender',MID:'Midfielder',FWD:'Forward'};

function memberPhotoArea(type, idx, data) {
  const hasPhoto = data.photo;
  const inputId = `photo-input-${type}-${idx}`;
  const adminOnly = isAdmin ? `onclick="triggerPhotoUpload('${inputId}')"` : `style="cursor:not-allowed;opacity:0.6;"`;
  return `
    <div class="photo-area" ${adminOnly}>
      ${hasPhoto ? `<img class="passport-photo" src="${data.photo}" alt="${data.name}"/>` : `<div class="photo-placeholder"><div class="photo-placeholder-icon">&#128100;</div><div class="photo-placeholder-text">PASSPORT PHOTO</div></div>`}
      ${isAdmin ? `<div class="photo-overlay">
        <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.92c.04-.33.07-.67.07-1.08s-.03-.74-.07-1.08l2.37-1.84a.55.55 0 00.13-.71l-2.24-3.87a.55.55 0 00-.67-.24l-2.8 1.12c-.58-.45-1.21-.83-1.9-1.11l-.42-2.98A.543.543 0 0013.5 3h-3c-.29 0-.54.2-.58.47l-.42 2.98c-.69.28-1.32.66-1.9 1.11L4.8 6.44a.556.556 0 00-.67.24L1.89 10.55c-.13.24-.08.54.13.71l2.37 1.84c-.04.34-.07.68-.07 1.08s.03.74.07 1.08l-2.37 1.84a.555.555 0 00-.13.71l2.24 3.87c.13.24.41.31.67.24l2.8-1.12c.58.45 1.21.83 1.9 1.11l.42 2.98c.04.27.29.47.58.47h3c.29 0 .54-.2.58-.47l.42-2.98c.69-.28 1.32-.66 1.9-1.11l2.8 1.12c.26.1.54.02.67-.24l2.24-3.87c.13-.24.08-.54-.13-.71l-2.37-1.84z"/></svg>
        <div class="upload-hint">CHANGE PHOTO</div>
      </div>` : ''}
      ${isAdmin ? `<input type="file" id="${inputId}" class="photo-upload-input" accept="image/*" onchange="handlePhotoUpload(this,'${type}',${idx})"/>` : ''}
    </div>`;
}

function renderCoaches() {
  const grid = document.getElementById('grid-coaches');
  document.getElementById('coaches-count').textContent = coaches.length + ' members';
  grid.innerHTML = coaches.map((c,i) => `
    <div class="member-card">
      <button class="member-del" onclick="removeMember('coaches',${i})">&#10006; Remove</button>
      ${memberPhotoArea('coaches', i, c)}
      <div class="member-role-tag">${c.role}</div>
      <div class="member-info">
        <div class="member-name">${c.name}</div>
        <div class="member-det">🌍 ${c.nat}</div>
        <div class="member-det">📋 License: ${c.lic}</div>
      </div>
    </div>`).join('');
}

function renderOfficials() {
  const grid = document.getElementById('grid-officials');
  document.getElementById('officials-count').textContent = officials.length + ' members';
  grid.innerHTML = officials.map((o,i) => `
    <div class="member-card">
      <button class="member-del" onclick="removeMember('officials',${i})">&#10006; Remove</button>
      ${memberPhotoArea('officials', i, o)}
      <div class="member-role-tag">${o.role}</div>
      <div class="member-info">
        <div class="member-name">${o.name}</div>
        <div class="member-det">📞 ${o.phone}</div>
        <div class="member-det">📧 ${o.email}</div>
      </div>
    </div>`).join('');
}

function renderPlayers() {
  const grid = document.getElementById('grid-players');
  const filtered = playerFilter === 'all' ? players : players.filter(p => p.pos === playerFilter);
  document.getElementById('players-count').textContent = players.length + ' players';
  document.getElementById('hs-players').textContent = players.length;
  grid.innerHTML = filtered.map((p,i) => {
    const realIdx = players.indexOf(p);
    const fifaBadge = p.fifaId ? `<div style="font-size:10px;background:#003da5;color:#fff;border-radius:4px;padding:3px 7px;margin-top:4px;display:inline-block;font-weight:600;">FIFA: ${p.fifaId}</div>` : '';
    const dobDisplay = p.dob ? `📅 Born: ${new Date(p.dob).toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'})}` : '';
    return `
    <div class="member-card" data-pos="${p.pos}">
      <button class="member-del" onclick="removeMember('players',${realIdx})">&#10006; Release</button>
      ${memberPhotoArea('players', realIdx, p)}
      <div class="member-num">${p.num}</div>
      <div class="member-role-tag">${posLabel[p.pos]}</div>
      <div class="member-info">
        <div class="member-name">${p.name}${p.note?'<span style="color:var(--red);font-size:11px;margin-left:4px;">⭐</span>':''}</div>
        <div class="member-det">👤 Age ${p.age}</div>
        <div class="member-det">🌍 ${p.nat}</div>
        ${dobDisplay ? `<div class="member-det">${dobDisplay}</div>` : ''}
        ${fifaBadge}
      </div>
    </div>`;
  }).join('');
}

function renderAll() {
  renderCoaches(); renderOfficials(); renderPlayers();
}

// ─────────────────────────────────────────────
// ADD MEMBER
// ─────────────────────────────────────────────
function addMember(type) {
  if (!requireAdminAction()) return;
  if(type === 'coaches') {
    const name = document.getElementById('c-name').value.trim();
    const role = document.getElementById('c-role').value;
    const nat  = document.getElementById('c-nat').value.trim() || 'Kenyan';
    const lic  = document.getElementById('c-lic').value.trim() || '—';
    if(!name) { toast('Enter a name!'); return; }
    coaches.push({name,role,nat,lic,photo:null});
    document.getElementById('c-name').value='';
    document.getElementById('c-lic').value='';
    renderCoaches();
    toast('&#10003; '+name+' added to coaching staff!');
    adminMessage(name+' has been added to coaches.');
  } else if(type === 'officials') {
    const name  = document.getElementById('o-name').value.trim();
    const role  = document.getElementById('o-role').value;
    const phone = document.getElementById('o-phone').value.trim() || '—';
    const email = document.getElementById('o-email').value.trim() || '—';
    if(!name) { toast('Enter a name!'); return; }
    officials.push({name,role,phone,email,photo:null});
    document.getElementById('o-name').value='';
    document.getElementById('o-phone').value='';
    document.getElementById('o-email').value='';
    renderOfficials();
    toast('&#10003; '+name+' added as '+role+'!');
    adminMessage(name+' has been added to officials.');
  } else {
    const name  = document.getElementById('p-name').value.trim();
    const num   = parseInt(document.getElementById('p-num').value);
    const pos   = document.getElementById('p-pos').value;
    const age   = parseInt(document.getElementById('p-age').value);
    const nat   = document.getElementById('p-nat').value.trim() || 'Kenyan';
    const dob   = document.getElementById('p-dob').value;
    const fifaId= document.getElementById('p-fifa').value.trim();
    if(!name || !num) { toast('Enter name and shirt number!'); return; }
    if(players.some(p => p.num === num)) { toast('Shirt number '+num+' already taken!'); return; }
    players.push({name,num,pos,age:age||0,nat,dob,fifaId,photo:null});
    document.getElementById('p-name').value='';
    document.getElementById('p-num').value='';
    document.getElementById('p-age').value='';
    document.getElementById('p-nat').value='';
    document.getElementById('p-dob').value='';
    document.getElementById('p-fifa').value='';
    renderPlayers();
    toast('&#10003; '+name+' added to the squad!');
    adminMessage(name+' is now part of the squad.');
  }
}

// ─────────────────────────────────────────────
// REMOVE MEMBER
// ─────────────────────────────────────────────
function removeMember(type, idx) {
  if (!requireAdminAction()) return;
  const arr = type==='coaches'?coaches:type==='officials'?officials:players;
  const name = arr[idx].name;
  document.getElementById('release-modal-text').textContent = 'Remove '+name+' from the squad/staff? This cannot be undone.';
  pendingRelease = {type, idx};
  document.getElementById('release-modal').classList.add('open');
}
function confirmRelease() {
  if(!pendingRelease) return;
  if (!requireAdminAction()) return;
  const {type, idx} = pendingRelease;
  const arr = type==='coaches'?coaches:type==='officials'?officials:players;
  const name = arr[idx].name;
  arr.splice(idx,1);
  pendingRelease = null;
  closeModal();
  renderAll();
  toast('&#10003; '+name+' has been removed.');
  adminMessage(name+' has been removed from the roster.');
}
function closeModal() {
  document.getElementById('release-modal').classList.remove('open');
  pendingRelease = null;
}

// ─────────────────────────────────────────────
// PLAYER FILTER
// ─────────────────────────────────────────────
function filterPlayers(btn, pos) {
  document.querySelectorAll('#tab-players .fb').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  playerFilter = pos;
  renderPlayers();
}

// ─────────────────────────────────────────────
// LEAGUE TABLE
// ─────────────────────────────────────────────
function renderTable() {
  updateLeagueTableFromFixtures();
  const tbody = document.getElementById('league-tbody');
  const sorted = [...leagueTable].sort((a,b) => b.pts-a.pts || b.gd-a.gd);
  tbody.innerHTML = sorted.map((t,i) => {
    const pills = t.form.map(r => `<span class="form-pill pill-${r.toLowerCase()}">${r}</span>`).join('');
    return `<tr>
      <td><span class="team-pos ${i<3?'top3':''}">${i+1}</span></td>
      <td><span class="team-name-col ${t.own?'own':''}">${t.own?'&#128308; ':''}${t.team}</span></td>
      <td>${t.p}</td><td>${t.w}</td><td>${t.d}</td><td>${t.l}</td>
      <td style="color:${t.gd>=0?'#16a34a':'var(--red)'}">${t.gd>0?'+':''}${t.gd}</td>
      <td><strong>${t.pts}</strong></td>
      <td>${pills}</td>
      <td><button class="del-row" onclick="removeTeam(${leagueTable.indexOf(t)})">&#128465;</button></td>
    </tr>`;
  }).join('');
}
function addTeam() {
  if (!requireAdminAction()) return;
  const name = document.getElementById('at-name').value.trim();
  if(!name) { toast('Enter a team name!'); return; }
  leagueTable.push({team:name,p:+document.getElementById('at-p').value||0,w:+document.getElementById('at-w').value||0,d:+document.getElementById('at-d').value||0,l:+document.getElementById('at-l').value||0,gd:+document.getElementById('at-gd').value||0,pts:+document.getElementById('at-pts').value||0,form:[],own:false});
  renderTable();
  document.getElementById('at-name').value='';
  document.getElementById('add-team-bar').style.display='none';
  toast('&#10003; '+name+' added!');
}
function removeTeam(idx) {
  if (!requireAdminAction()) return;
  const name = leagueTable[idx].team;
  leagueTable.splice(idx,1);
  renderTable();
  toast('Removed '+name);
}

// ─────────────────────────────────────────────
// FIXTURES
// ─────────────────────────────────────────────
const MON_ORDER=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const badgeMap={upcoming:'badge-up',win:'badge-win',loss:'badge-loss',draw:'badge-draw',cup:'badge-cup'};
const badgeLabel={upcoming:'Upcoming',win:'Win',loss:'Loss',draw:'Draw',cup:'Cup Match'};
const scoreClass={win:'sc-w',loss:'sc-l',draw:'sc-d'};

// Determine match outcome and presentation based on score or status.
function getMatchOutcome(f){
  if(!f) return {label:'', badgeClass:'', scClass:''};
  if(f.score){
    const m = String(f.score).match(/^(\d+)\s*-\s*(\d+)$/);
    if(m){
      const hg = parseInt(m[1],10);
      const ag = parseInt(m[2],10);
      if(hg > ag) return {label:'Home Win', badgeClass:'badge-win', scClass:'sc-w', result:'home'};
      if(hg < ag) return {label:'Away Win', badgeClass:'badge-loss', scClass:'sc-l', result:'away'};
      return {label:'Draw', badgeClass:'badge-draw', scClass:'sc-d', result:'draw'};
    }
  }
  if(f.status && badgeLabel[f.status]) return {label:badgeLabel[f.status], badgeClass:badgeMap[f.status]||'', scClass: scoreClass[f.status]||''};
  return {label:f.status||'', badgeClass: badgeMap[f.status]||'', scClass: ''};
}

function calcStats() {
  // Compute stats specifically for Madamani matches using actual scores
  const played = fixtures.filter(f => f.score && /^(\d+)\s*-\s*(\d+)$/.test(f.score) && (f.home.toLowerCase().includes('madamani') || f.away.toLowerCase().includes('madamani')));
  const w = played.filter(f => {
    const m = f.score.match(/^(\d+)\s*-\s*(\d+)$/);
    if(!m) return false;
    const hg = parseInt(m[1],10), ag = parseInt(m[2],10);
    const isHome = f.home.toLowerCase().includes('madamani');
    const madGoals = isHome ? hg : ag;
    const oppGoals = isHome ? ag : hg;
    return madGoals > oppGoals;
  }).length;
  const d = played.filter(f => { const m = f.score.match(/^(\d+)\s*-\s*(\d+)$/); if(!m) return false; return parseInt(m[1],10) === parseInt(m[2],10); }).length;
  const l = played.length - w - d;
  const gf = played.reduce((a,f)=>{ const m=f.score.match(/^(\d+)\s*-\s*(\d+)$/); if(!m) return a; const isHome=f.home.toLowerCase().includes('madamani'); return a + (isHome?parseInt(m[1],10):parseInt(m[2],10)); },0);
  document.getElementById('stat-p').textContent = played.length;
  document.getElementById('stat-w').textContent = w;
  document.getElementById('stat-d').textContent = d;
  document.getElementById('stat-l').textContent = l;
  document.getElementById('stat-gf').textContent = gf;
}
function updateLeagueTableFromFixtures() {
  const teamMap = new Map();
  const getTeam = name => {
    const key = name.trim().toUpperCase();
    if(teamMap.has(key)) return teamMap.get(key);
    const existing = leagueTable.find(t => t.team.trim().toUpperCase() === key);
    if(existing) {
      existing.p = existing.w = existing.d = existing.l = existing.gd = existing.pts = 0;
      existing.form = [];
      teamMap.set(key, existing);
      return existing;
    }
    const newTeam = {team:name,p:0,w:0,d:0,l:0,gd:0,pts:0,form:[],own:false};
    leagueTable.push(newTeam);
    teamMap.set(key, newTeam);
    return newTeam;
  };
  leagueTable.forEach(t => { const key = t.team.trim().toUpperCase(); if(!teamMap.has(key)) teamMap.set(key, t); });
  // Use numeric scores (where present) to compute league table for any teams - both Madamani fixtures and other teams' fixtures
  const allFixtures = [...fixtures, ...otherTeamsFixtures];
  allFixtures.filter(f => f.score && /^(\d+)\s*-\s*(\d+)$/.test(f.score)).forEach(f => {
    const m = f.score.match(/^(\d+)\s*-\s*(\d+)$/);
    if(!m) return;
    const homeGoals = parseInt(m[1], 10);
    const awayGoals = parseInt(m[2], 10);
    const homeTeam = getTeam(f.home);
    const awayTeam = getTeam(f.away);
    const homeResult = homeGoals > awayGoals ? 'Win' : homeGoals < awayGoals ? 'Loss' : 'Draw';
    const awayResult = homeResult === 'Win' ? 'Loss' : homeResult === 'Loss' ? 'Win' : 'Draw';
    const update = (team, result, goalDiff) => {
      team.p += 1;
      if(result === 'Win') team.w += 1;
      else if(result === 'Draw') team.d += 1;
      else team.l += 1;
      team.gd += goalDiff;
      team.pts += result === 'Win' ? 3 : result === 'Draw' ? 1 : 0;
      team.form.unshift(result);
      if(team.form.length > 5) team.form.pop();
    };
    update(homeTeam, homeResult, homeGoals - awayGoals);
    update(awayTeam, awayResult, awayGoals - homeGoals);
  });
}
function fxCard(f,idx) {
  const outcome = getMatchOutcome(f);
  const scoreEl = f.score ? `<div class="fx-score ${outcome.scClass||''}">${f.score}</div>` : '';
  const resultImg = f.resultImage?`<img class="fx-result-img" src="${f.resultImage}" alt="Result image"/>`:'';
  const badge = outcome.label || (badgeLabel[f.status]||f.status);
  const badgeClassName = outcome.badgeClass || badgeMap[f.status] || '';
  return `<div class="fx">
    <div class="fx-date"><div class="fx-day">${f.day}</div><div class="fx-mo">${f.mon}</div></div>
    <div class="fx-div"></div>
    <div class="fx-teams">
      <div class="fx-team"><div class="t-icon" style="background:${f.home.toLowerCase().includes('madamani')?'var(--red)':'var(--black)'}">&#9917;</div><span class="t-name">${f.home}</span></div>
      <div class="vs">VS</div>
      <div class="fx-team"><div class="t-icon" style="background:${f.away.toLowerCase().includes('madamani')?'var(--red)':'var(--black)'}">&#9917;</div><span class="t-name">${f.away}</span></div>
    </div>
    ${scoreEl}
    <span class="fx-badge ${badgeClassName}">${badge}</span>
    <span class="fx-comp">${f.venue}</span>
    ${resultImg}
    <button class="fx-del" onclick="removeFixture(${idx})">&#10006;</button>
  </div>`;
}
function renderFixtures() {
  calcStats();
  updateNextMatchCard();
  const up=fixtures.filter(f=>f.status==='upcoming'||f.status==='cup');
  const res=fixtures.filter(f=>['win','loss','draw'].includes(f.status));
  const byMon={};
  res.forEach(f=>{if(!byMon[f.mon])byMon[f.mon]=[];byMon[f.mon].push(f);});
  let html='';
  if(up.length){html+=`<div class="fix-group"><div class="fix-month">Upcoming</div>`;up.forEach(f=>{html+=fxCard(f,fixtures.indexOf(f));});html+='</div>';}
  MON_ORDER.slice().reverse().forEach(m=>{if(byMon[m]){html+=`<div class="fix-group"><div class="fix-month">${m} — Results</div>`;byMon[m].forEach(f=>{html+=fxCard(f,fixtures.indexOf(f));});html+='</div>';}});
  document.getElementById('fixtures-list').innerHTML=html||'<p style="color:var(--muted);padding:20px 0">No fixtures yet.</p>';
  renderOtherTeamsFixtures();
}
// Persist fixtures to localStorage so results survive reloads
function saveFixturesToStorage(){
  try{ localStorage.setItem('msfc.fixtures', JSON.stringify(fixtures)); }catch(e){console.warn('Could not save fixtures',e);}
}
function loadFixturesFromStorage(){
  try{
    const s = localStorage.getItem('msfc.fixtures');
    if(s){ const loaded = JSON.parse(s); if(Array.isArray(loaded) && loaded.length) fixtures = loaded; }
  }catch(e){console.warn('Could not load fixtures',e);}
}
function scrollToUpdatedFixture(fixtureIdx){
  // Scroll to and highlight the updated fixture card in real-time
  setTimeout(()=>{
    const listEl = document.getElementById('fixtures-list');
    if(!listEl) return;
    const cards = listEl.querySelectorAll('.fx');
    if(cards.length > 0){
      const f = fixtures[fixtureIdx];
      if(!f) return;
      for(let card of cards){
        if(card.textContent.includes(f.home) && card.textContent.includes(f.away)){
          card.scrollIntoView({behavior:'smooth', block:'center'});
          card.style.transition = 'background-color 0.3s ease';
          card.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
          setTimeout(()=>{ card.style.backgroundColor = ''; }, 2000);
          break;
        }
      }
    }
  }, 100);
}
function addFixture() {
  if (!requireAdminAction()) return;
  const day=parseInt(document.getElementById('afx-day').value);
  const mon=document.getElementById('afx-mon').value;
  const home=document.getElementById('afx-home').value.trim();
  const away=document.getElementById('afx-away').value.trim();
  const status=document.getElementById('afx-status').value;
  const score=document.getElementById('afx-score').value.trim();
  const venue=document.getElementById('afx-venue').value.trim();
  if(!day||!home||!away){toast('Fill Day, Home and Away team!');return;}
  // default to upcoming when no explicit status provided
  const st = status && status.trim() ? status : 'upcoming';
  const sc = st === 'upcoming' ? '' : score;
  fixtures.unshift({day,mon,home,away,status:st,score:sc,venue});
  renderFixtures();
  saveFixturesToStorage();
  document.getElementById('afx-day').value='';
  document.getElementById('afx-home').value='';
  document.getElementById('afx-away').value='';
  document.getElementById('afx-score').value='';
  document.getElementById('afx-venue').value='';
  document.getElementById('afb-body').classList.remove('open');
  toast('&#10003; Fixture added!');
  // update selects and admin panel
  updateFixtureSelect();
  renderAdminPanel();
  // add to this session activity
  addFixtureSessionEntry(`Fixture added (${st}) — ${day} ${mon} — ${home} vs ${away}`);
}
function removeFixture(idx){ if (!requireAdminAction()) return; fixtures.splice(idx,1);renderFixtures(); saveFixturesToStorage(); toast('Fixture removed.');}
function addOtherTeamsFixture() {
  const day=parseInt(document.getElementById('otf-day').value);
  const mon=document.getElementById('otf-mon').value;
  const home=document.getElementById('otf-home').value.trim();
  const away=document.getElementById('otf-away').value.trim();
  const score=document.getElementById('otf-score').value.trim();
  const venue=document.getElementById('otf-venue').value.trim();
  if(!day||!home||!away||!score){toast('Fill all fields including score!');return;}
  // validate score format like "2-1"
  if(!/^(\d+)\s*-\s*(\d+)$/.test(score)){ toast('Score must be like 2-1'); return; }
  otherTeamsFixtures.unshift({day,mon,home,away,score,venue});
  renderOtherTeamsFixtures();
  renderTable();
  renderFixtures();
  saveOtherTeamsFixtures();
  document.getElementById('otf-day').value='';
  document.getElementById('otf-home').value='';
  document.getElementById('otf-away').value='';
  document.getElementById('otf-score').value='';
  document.getElementById('otf-venue').value='';
  document.getElementById('otf-form').style.display='none';
  toast('✓ Other team result added!');
}
function removeOtherTeamsFixture(idx){
  otherTeamsFixtures.splice(idx,1);
  renderOtherTeamsFixtures();
  renderTable();
  renderFixtures();
  saveOtherTeamsFixtures();
  toast('Other team result removed.');
}
function renderOtherTeamsFixtures(){
  const el = document.getElementById('other-teams-fixtures');
  if(!el) return;
  if(!otherTeamsFixtures.length){
    el.innerHTML = '<div style="color:var(--muted);padding:12px;text-align:center;">No other team results added yet.</div>';
    return;
  }
  // group by month and sort by day desc
  const byMon = {};
  otherTeamsFixtures.forEach((f, i) => { if(!byMon[f.mon]) byMon[f.mon]=[]; byMon[f.mon].push({f, i}); });
  let html = '';
  MON_ORDER.slice().reverse().forEach(m => {
    if(!byMon[m]) return;
    html += `<div class="fix-group"><div class="fix-month">${m} — Other Results</div>`;
    // sort month entries by day desc
    byMon[m].sort((a,b)=>b.f.day - a.f.day).forEach(item => {
      const f = item.f; const idx = item.i;
      html += `<div style="background:white;padding:12px;border-radius:8px;border-left:3px solid var(--black);display:grid;grid-template-columns:auto 1fr 1fr 1fr auto;gap:12px;align-items:center;margin-bottom:8px;">
        <div style="text-align:center;min-width:50px;">
          <div style="font-weight:bold;font-size:14px;">${f.day}</div>
          <div style="font-size:11px;color:var(--muted);">${f.mon}</div>
        </div>
        <div style="text-align:right;"><strong>${f.home}</strong></div>
        <div style="text-align:center;font-weight:bold;color:var(--red);min-width:60px;font-size:16px;">${f.score}</div>
        <div style="text-align:left;"><strong>${f.away}</strong></div>
        <button class="del-row" onclick="removeOtherTeamsFixture(${idx})" style="background:none;border:none;cursor:pointer;font-size:16px;">🗑</button>
      </div>`;
    });
    html += `</div>`;
  });
  el.innerHTML = html;
}

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────
function handleSend(btn){btn.innerHTML='&#10003; Message Sent!';btn.style.background='#16a34a';setTimeout(()=>{btn.innerHTML='Send Message &#10022;';btn.style.background='';},3000);}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
initAdminMode();
loadFixturesFromStorage();
loadOtherTeamsFixtures();
renderAll();
renderTable();
renderFixtures();
renderOtherTeamsFixtures();
initRealtime();
renderGallery();
renderFixturesSession();

function renderSlideshow() {
  const slideImage = document.getElementById('slideshow-img');
  const slideTitle = document.getElementById('slideshow-title');
  const slideDesc = document.getElementById('slideshow-desc');
  const playBtn = document.getElementById('slideshow-play-btn');
  if (!slideImage || !slideTitle || !slideDesc || !playBtn) return;
  if (!galleryImages.length) {
    slideImage.src = '';
    slideImage.alt = 'No gallery images available';
    slideTitle.textContent = 'No photos available';
    slideDesc.textContent = 'Upload club photos to start the slideshow.';
    playBtn.style.display = 'none';
    return;
  }
  slideshowIndex = ((slideshowIndex % galleryImages.length) + galleryImages.length) % galleryImages.length;
  const current = galleryImages[slideshowIndex];
  slideImage.src = current.src;
  slideImage.alt = current.title || 'Gallery slideshow image';
  slideTitle.textContent = current.title;
  slideDesc.textContent = current.desc;
  playBtn.style.display = 'inline-flex';
  playBtn.textContent = slideshowPlaying ? 'Pause' : 'Play';
}

function startSlideshow() {
  stopSlideshow();
  slideshowPlaying = true;
  slideshowTimer = setInterval(() => {
    nextSlideshow();
  }, 5000);
  renderSlideshow();
}

function stopSlideshow() {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
  slideshowPlaying = false;
  renderSlideshow();
}

function toggleSlideshowPlay() {
  slideshowPlaying = !slideshowPlaying;
  if (slideshowPlaying) {
    startSlideshow();
  } else {
    stopSlideshow();
  }
}

function prevSlideshow() {
  if (!galleryImages.length) return;
  slideshowIndex = (slideshowIndex - 1 + galleryImages.length) % galleryImages.length;
  renderSlideshow();
}

function nextSlideshow() {
  if (!galleryImages.length) return;
  slideshowIndex = (slideshowIndex + 1) % galleryImages.length;
  renderSlideshow();
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = galleryImages.map((item, idx) => `
    <div class="gallery-card">
      <button class="gallery-card-delete admin-only" onclick="removeGalleryImage(${idx})">×</button>
      <img src="${item.src}" alt="${item.title}" data-idx="${idx}" onclick="openGalleryModal(${idx})" />
      <div class="gallery-card-body">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    </div>
  `).join('');
  renderSlideshow();
  if (!slideshowTimer && slideshowPlaying) {
    startSlideshow();
  }
}

function openGalleryModal(idx) {
  const item = galleryImages[idx];
  if (!item) return;
  galleryModalIndex = idx;
  slideshowIndex = idx;
  renderSlideshow();
  const img = document.getElementById('gallery-modal-img');
  img.src = item.src;
  img.alt = item.title || 'Gallery preview';
  document.getElementById('gallery-modal-title').textContent = item.title;
  document.getElementById('gallery-modal-desc').textContent = item.desc;
  document.getElementById('gallery-modal').classList.add('open');
}

function closeGalleryModal() {
  document.getElementById('gallery-modal').classList.remove('open');
}

function prevGallery() {
  if (galleryModalIndex === null) return;
  const prev = (galleryModalIndex - 1 + galleryImages.length) % galleryImages.length;
  openGalleryModal(prev);
}

function nextGallery() {
  if (galleryModalIndex === null) return;
  const next = (galleryModalIndex + 1) % galleryImages.length;
  openGalleryModal(next);
}

// keyboard navigation for modal: Esc to close, ←/→ to move
document.addEventListener('keydown', function(e){
  const modal = document.getElementById('gallery-modal');
  if (!modal || !modal.classList.contains('open')) return;
  if (e.key === 'Escape') closeGalleryModal();
  if (e.key === 'ArrowLeft') prevGallery();
  if (e.key === 'ArrowRight') nextGallery();
});

function processGalleryUpload(input) {
  if (!requireAdminAction()) return;
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    galleryImages.unshift({
      src: e.target.result,
      title: file.name,
      desc: 'Uploaded photo from your device.',
    });
    renderGallery();
    renderAdminGalleryList();
    toast('Photo added to gallery.');
    adminMessage('Gallery photo uploaded successfully.');
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function processGalleryUrl() {
  if (!requireAdminAction()) return;
  const urlEl = document.getElementById('gallery-image-url');
  const titleEl = document.getElementById('gallery-image-title');
  const descEl = document.getElementById('gallery-image-desc');
  if (!urlEl) return;
  const src = (urlEl.value || '').trim();
  if (!src) {
    toast('Please enter a valid image URL.');
    return;
  }
  if (!/^https?:\/\//i.test(src)) {
    toast('Image URL must start with http:// or https://');
    return;
  }
  galleryImages.unshift({
    src,
    title: titleEl && titleEl.value.trim() ? titleEl.value.trim() : 'Imported gallery image',
    desc: descEl && descEl.value.trim() ? descEl.value.trim() : 'Imported from external URL.',
  });
  if (urlEl) urlEl.value = '';
  if (titleEl) titleEl.value = '';
  if (descEl) descEl.value = '';
  renderGallery();
  renderAdminGalleryList();
  toast('Image added to gallery.');
  adminMessage('Gallery image imported from URL.');
}

function removeGalleryImage(idx) {
  if (!isAdmin) {
    toggleAdminModal();
    return;
  }
  galleryImages.splice(idx, 1);
  renderGallery();
  renderAdminGalleryList();
  toast('Photo removed from gallery.');
  adminMessage('Gallery photo removed.');
}

function updateNavToggle() {
  const button = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const body = document.body;
  const isMobile = window.matchMedia('(max-width:768px)').matches;
  if (!button) return;
  if (isMobile) {
    button.innerHTML = nav.classList.contains('open') ? '&#10005;' : '&#9776;';
  } else {
    button.innerHTML = body.classList.contains('nav-hidden') ? '&#9776;' : '&#10005;';
  }
}

function toggleNav() {
  const nav = document.querySelector('nav');
  const body = document.body;
  const isMobile = window.matchMedia('(max-width:768px)').matches;

  if (isMobile) {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      body.classList.remove('nav-hidden');
    } else {
      nav.classList.add('open');
      body.classList.remove('nav-hidden');
    }
  } else {
    body.classList.toggle('nav-hidden');
    nav.classList.remove('open');
  }
  updateNavToggle();
}

window.addEventListener('resize', updateNavToggle);
updateNavToggle();
