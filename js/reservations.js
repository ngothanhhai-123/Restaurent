import { renderNavbar, renderFooter } from '../components/index.js';

const mockTables = [
  { id: 'T01', name: 'Bàn Cửa Sổ 1', maxGuests: 2, description: 'Bàn cạnh cửa sổ với view nhìn ra thành phố, không gian lãng mạn.' },
  { id: 'T02', name: 'Bàn Cửa Sổ 2', maxGuests: 4, description: 'Bàn cạnh cửa sổ, phù hợp cho gia đình nhỏ hoặc nhóm bạn.' },
  { id: 'T03', name: 'Bàn VIP 1', maxGuests: 6, description: 'Khu vực riêng tư, ghế sofa êm ái, phục vụ chuyên biệt.' },
  { id: 'T04', name: 'Bàn Sân Vườn', maxGuests: 8, description: 'Không gian mở thoáng đãng, gần gũi với thiên nhiên.' },
  { id: 'T05', name: 'Bàn Trung Tâm', maxGuests: 4, description: 'Vị trí trung tâm nhà hàng, dễ dàng di chuyển.' },
];

let step = 1;
let searchParams = { date: '', time: '', guests: 2 };
let availableTables = [];
let selectedTable = null;

function renderReservationFlow() {
  const container = document.getElementById('reservation-container');
  if (!container) return;

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    window.location.href = '/pages/login.html';
    return;
  }

  let html = '<div class="text-white">';

  if (step < 4) {
    html += `
      <div class="flex items-center justify-center mb-8">
        <div class="flex items-center ${step >= 1 ? 'text-primary' : 'text-slate-500'}">
          <div class="size-8 rounded-full border-2 flex items-center justify-center font-bold border-current">1</div>
          <span class="ml-2 font-medium hidden sm:block">Tìm bàn</span>
        </div>
        <div class="w-12 h-0.5 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-slate-700'}"></div>
        <div class="flex items-center ${step >= 2 ? 'text-primary' : 'text-slate-500'}">
          <div class="size-8 rounded-full border-2 flex items-center justify-center font-bold border-current">2</div>
          <span class="ml-2 font-medium hidden sm:block">Chọn bàn</span>
        </div>
        <div class="w-12 h-0.5 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-slate-700'}"></div>
        <div class="flex items-center ${step >= 3 ? 'text-primary' : 'text-slate-500'}">
          <div class="size-8 rounded-full border-2 flex items-center justify-center font-bold border-current">3</div>
          <span class="ml-2 font-medium hidden sm:block">Xác nhận</span>
        </div>
      </div>
    `;
  }

  if (step === 1) {
    html += `
      <form id="search-form" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold uppercase tracking-widest text-primary">Ngày đặt</label>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            <input type="date" id="date-input" required value="${searchParams.date}" class="w-full bg-bg-dark/50 border border-primary/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold uppercase tracking-widest text-primary">Giờ đặt</label>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <input type="time" id="time-input" required value="${searchParams.time}" class="w-full bg-bg-dark/50 border border-primary/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold uppercase tracking-widest text-primary">Số lượng khách</label>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <input type="number" id="guests-input" required min="1" value="${searchParams.guests}" class="w-full bg-bg-dark/50 border border-primary/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
          </div>
        </div>
        <div class="md:col-span-3 pt-4">
          <button type="submit" class="w-full inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 py-4 text-lg uppercase tracking-widest gap-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Tìm bàn trống
          </button>
        </div>
      </form>
    `;
  } else if (step === 2) {
    html += `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold">Danh sách bàn trống phù hợp</h3>
          <button id="btn-back-step1" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Đổi thời gian</button>
        </div>
        
        ${availableTables.length > 0 ? `
          <div class="grid gap-4">
            ${availableTables.map(table => `
              <div class="bg-bg-dark/50 border border-primary/30 rounded-xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center hover:border-primary transition-colors">
                <div>
                  <div class="flex items-center gap-3 mb-2">
                    <span class="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-bold">${table.id}</span>
                    <h4 class="text-lg font-bold">${table.name}</h4>
                  </div>
                  <div class="flex items-center gap-4 text-sm text-slate-400 mb-2">
                    <span class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      Tối đa ${table.maxGuests} khách
                    </span>
                  </div>
                  <p class="text-sm text-slate-300 flex items-start gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0 text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    ${table.description}
                  </p>
                </div>
                <button class="btn-select-table shrink-0 w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 text-white" data-id="${table.id}">
                  Chọn bàn này
                </button>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="text-center py-12 bg-bg-dark/50 rounded-xl border border-dashed border-slate-600">
            <p class="text-slate-400 mb-4">Rất tiếc, không có bàn nào trống phù hợp với yêu cầu của bạn.</p>
            <button id="btn-back-step1-empty" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Thử tìm thời gian khác</button>
          </div>
        `}
      </div>
    `;
  } else if (step === 3 && selectedTable) {
    html += `
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-center mb-6">Xác nhận thông tin đặt bàn</h3>
        
        <div class="bg-bg-dark/50 border border-primary/30 rounded-xl p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4 border-b border-slate-700 pb-4">
            <div>
              <span class="text-slate-400 text-sm block mb-1">Ngày đặt</span>
              <span class="font-medium text-lg">${searchParams.date}</span>
            </div>
            <div>
              <span class="text-slate-400 text-sm block mb-1">Giờ đặt</span>
              <span class="font-medium text-lg">${searchParams.time}</span>
            </div>
            <div>
              <span class="text-slate-400 text-sm block mb-1">Số lượng khách</span>
              <span class="font-medium text-lg">${searchParams.guests} người</span>
            </div>
          </div>
          
          <div class="pt-2">
            <span class="text-slate-400 text-sm block mb-2">Thông tin bàn</span>
            <div class="flex items-center gap-3">
              <span class="bg-primary/20 text-primary px-2 py-1 rounded text-sm font-bold">${selectedTable.id}</span>
              <span class="font-bold text-lg">${selectedTable.name}</span>
            </div>
            <p class="text-sm text-slate-300 mt-2">${selectedTable.description}</p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold uppercase tracking-widest text-primary">Ghi chú thêm (Tùy chọn)</label>
          <textarea 
            class="w-full bg-bg-dark/50 border border-primary/30 rounded-lg py-3 px-4 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
            placeholder="Dị ứng, kỷ niệm ngày cưới..."
            rows="2"
          ></textarea>
        </div>

        <div class="flex gap-4 pt-4">
          <button id="btn-back-step2" class="flex-1 py-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground">Quay lại</button>
          <button id="btn-confirm" class="flex-1 py-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 text-white">Xác nhận đặt bàn</button>
        </div>
      </div>
    `;
  } else if (step === 4) {
    html += `
      <div class="text-center py-8 space-y-6 animate-fade-in-up">
        <div class="size-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <h3 class="text-3xl font-bold text-white">Đặt bàn thành công!</h3>
        <p class="text-slate-300 max-w-md mx-auto">
          Cảm ơn bạn đã lựa chọn L'Elite. Thông tin đặt bàn đã được lưu lại. Chúng tôi rất mong được phục vụ bạn vào ngày ${searchParams.date} lúc ${searchParams.time}.
        </p>
        
        <div class="pt-8 flex justify-center gap-4">
          <button id="btn-reset" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Đặt thêm bàn khác</button>
          <a href="/profile.html" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 text-white">Xem lịch sử đặt bàn</a>
        </div>
      </div>
    `;
  }

  html += '</div>';
  container.innerHTML = html;

  // Attach event listeners
  if (step === 1) {
    const form = document.getElementById('search-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        searchParams.date = document.getElementById('date-input').value;
        searchParams.time = document.getElementById('time-input').value;
        searchParams.guests = parseInt(document.getElementById('guests-input').value) || 1;
        
        availableTables = mockTables.filter(t => t.maxGuests >= searchParams.guests);
        step = 2;
        renderReservationFlow();
      });
    }
  } else if (step === 2) {
    const btnBack1 = document.getElementById('btn-back-step1');
    const btnBack1Empty = document.getElementById('btn-back-step1-empty');
    if (btnBack1) btnBack1.addEventListener('click', () => { step = 1; renderReservationFlow(); });
    if (btnBack1Empty) btnBack1Empty.addEventListener('click', () => { step = 1; renderReservationFlow(); });

    document.querySelectorAll('.btn-select-table').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        selectedTable = mockTables.find(t => t.id === id);
        step = 3;
        renderReservationFlow();
      });
    });
  } else if (step === 3) {
    const btnBack2 = document.getElementById('btn-back-step2');
    const btnConfirm = document.getElementById('btn-confirm');
    if (btnBack2) btnBack2.addEventListener('click', () => { step = 2; renderReservationFlow(); });
    if (btnConfirm) btnConfirm.addEventListener('click', () => { step = 4; renderReservationFlow(); });
  } else if (step === 4) {
    const btnReset = document.getElementById('btn-reset');
    if (btnReset) btnReset.addEventListener('click', () => {
      step = 1;
      searchParams = { date: '', time: '', guests: 2 };
      selectedTable = null;
      renderReservationFlow();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  renderReservationFlow();
});
