const API_URL = 'https://divine-river-2cc3.szercglar.workers.dev/';

let _etiketler = [];
let _tags = [];
let _labels = [];
let _yapimcilar = [];

/*export async function loadApiData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Sayfalara göre verileri al
        _etiketler = data.etiketler || [];
        _tags = data.tags || [];
        _labels = data.labels || [];
        _yapimcilar = (data.yapimcilar || []).map(item => item['believe-name']?.trim()).filter(Boolean);

        //console.log('✅');
    } catch (error) {
        console.error('❌', error);
        //throw error;
    }
}*/

export async function loadApiData() {
  try {
    const res = await fetch(API_URL, { method: 'GET', cache: 'no-store' });
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    const text = await res.text();

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} — ${text.slice(0,160)}`);
    }
    if (!ct.includes('application/json')) {
      throw new Error(`Beklenmeyen içerik türü: ${ct || 'unknown'} — ${text.slice(0,160)}`);
    }

    const data = JSON.parse(text);
    if (data?.ok === false) throw new Error('Yetkisiz erişim');
    // ... mevcut atamalar ...
    return true;
  } catch (err) {
    console.error('loadApiData:', err);
    alert('Veri yüklenemedi. Lütfen sayfayı yenileyip tekrar deneyin.');
    return false;
  }
}

// --- Getter fonksiyonları ---
export function getEtiketlerData() {
    return _etiketler;
}

export function getTagsGenreList() {
    return _tags.map(item => item.genre?.trim()).filter(Boolean);
}

export function getLabelsData() {
    return _labels;
}

export function getYapimcilarList() {
    return _yapimcilar;
}


