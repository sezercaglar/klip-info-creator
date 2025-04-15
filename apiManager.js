const API_URL = 'https://script.google.com/macros/s/AKfycbwkMVhA2OfLmscXrz7ITqSC14_8Ty6KTwis8lmIYsSJFlCKEDThd4EHxt2g7QdUQcfj/exec';

let _etiketler = [];
let _tags = [];
let _labels = [];
let _yapimcilar = [];

export async function loadApiData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Sayfalara göre verileri al
        _etiketler = data.etiketler || [];
        _tags = data.tags || [];
        _labels = data.labels || [];
        _yapimcilar = (data.yapimcilar || []).map(item => item['believe-name']?.trim()).filter(Boolean);

        console.log('✅');
    } catch (error) {
        console.error('❌', error);
        throw error;
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
