import { loadApiData, getEtiketlerData, getYapimcilarList, getTagsGenreList, getLabelsData } from './apiManager.js';
let currentExcelGenre = ''; 
let currentExcelLabel = '';
/**
 * Etiket dropdown'ını doldurur.
 */
function populateGenreDropdown() {
    const genres = getTagsGenreList(); // Sadece 'tags' sayfasındaki genre listesi
    const genreDropdown = document.getElementById('fallbackGenreSelect');

    genreDropdown.innerHTML = '<option value="">-- Tür Seçin --</option>';

    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreDropdown.appendChild(option);
    });

    //console.log('🎵 fallbackGenreSelect listesi dolduruldu:', genres);
}


/**
 * Yapımcı autocomplete kutusunu kurar.
 */
function initLabelSearch() {
    const labelData = getYapimcilarList()
        .map(label => typeof label === 'object' ? label['believe-name']?.toString().trim() : label)
        .filter(Boolean);

    //console.log('🏢 Yapımcı listesi:', labelData);

    setupLabelSearch('labelSearchInput', 'labelSuggestionBox', labelData);
}

/**
 * Yapımcı arama kutusunu oluşturur
 */
function setupLabelSearch(inputId, suggestionBoxId, labelData) {
    const input = document.getElementById(inputId);
    const suggestionBox = document.getElementById(suggestionBoxId);
    let selectedIndex = -1;

    function getSortedMatches(query, data, limit = 5) {
        const lowerQuery = query.toLowerCase();
        const scored = data.map(label => {
            const labelStr = String(label || '');
            const lowerLabel = labelStr.toLowerCase();

            let score = 0;
            if (lowerLabel === lowerQuery) score += 5;
            else if (lowerLabel.startsWith(lowerQuery)) score += 3;
            else if (lowerLabel.includes(lowerQuery)) score += 2;

            return { label: labelStr, score };
        });

        return scored
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.label);
    }

    function renderSuggestions(matches) {
        suggestionBox.innerHTML = '';
        matches.forEach((label, i) => {
            const li = document.createElement('li');
            li.textContent = label;
            li.tabIndex = -1;
            li.classList.add('suggestion-item');
            if (i === selectedIndex) li.classList.add('active');

            // ✅ Seçim yapılınca sadece burada güncelleme yapılır
            li.addEventListener('click', () => {
                input.value = label;
                suggestionBox.style.display = 'none';
                updateLabelInOutput(true);       // sadece burada çağrılıyor
                updateLabelStatusIcon();
            });

            suggestionBox.appendChild(li);
        });

        suggestionBox.style.display = matches.length ? 'block' : 'none';
    }

    // 🛑 Sadece öneri kutusunu güncelle, output'a yazma
    input.addEventListener('input', () => {
        const query = input.value.trim();
        selectedIndex = -1;

        if (!query) {
            suggestionBox.innerHTML = '';
            suggestionBox.style.display = 'none';
            return;
        }

        const matches = getSortedMatches(query, labelData);
        renderSuggestions(matches);
    });

    // 🔼 🔽 Enter tuşu navigasyonu
    input.addEventListener('keydown', (e) => {
        const items = suggestionBox.querySelectorAll('li');
        if (!items.length) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % items.length;
            renderSuggestions(getSortedMatches(input.value.trim(), labelData));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + items.length) % items.length;
            renderSuggestions(getSortedMatches(input.value.trim(), labelData));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0) {
                const selectedText = items[selectedIndex].textContent;
                input.value = selectedText;
                suggestionBox.style.display = 'none';
                updateLabelInOutput(true);       // ENTER ile de seçim yapılırsa
                updateLabelStatusIcon();
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            suggestionBox.style.display = 'none';
        }
    });

    // Kutudan çıkınca listeyi kapat ama output'u değiştirme
    document.addEventListener('click', (e) => {
        if (!suggestionBox.contains(e.target) && e.target !== input) {
            suggestionBox.style.display = 'none';
        }
    });
}


// Sayfa yüklendiğinde önce API verilerini getir, sonra dropdown'ları doldur
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadApiData(); // apiManager.js içindeki veri çekme fonksiyonu
        populateGenreDropdown();
        initLabelSearch();
        document.getElementById('apiStatus').classList.add('ready');
        document.getElementById('apiStatus').title = 'API bağlantısı başarılı!';
        //console.log('🎉 API verileri yüklendi.');
    } catch (err) {
        //console.error('❌ API verileri yüklenemedi:', err);
        document.getElementById('apiStatus').classList.remove('ready');
        document.getElementById('apiStatus').title = 'API bağlantısı başarısız!';
    }
});
/**
 * Excel'den gelen genre için etiket var mı?
 */
export function hasOriginalTags() {
    const etiketler = getEtiketlerData();
    return etiketler.some(item =>
        item.genre?.toLowerCase() === currentExcelGenre.toLowerCase() &&
        item['merge-tags']
    );
}

/**
 * Seçilen fallback genre için etiket var mı?
 */
export function hasFallbackTags() {
    const fallbackSelect = document.getElementById('fallbackGenreSelect');
    const fallback = fallbackSelect?.value?.trim() || '';

    if (!fallback) return false;

    const etiketler = getEtiketlerData();
    return etiketler.some(item =>
        item.genre?.toLowerCase() === fallback.toLowerCase() &&
        item['merge-tags']
    );
}

/**
 * Excel dosyasından gelen genre bilgisini ayarlar.
 * @param {string} genre 
 */
export function setExcelGenre(genre) {
    currentExcelGenre = genre?.trim() || '';
}


/**
/**
 * Genre bilgisinden etiketleri döner. Fallback ve boş seçim durumlarını da kontrol eder.
 * @returns {string} Etiketler (virgülle ayrılmış)
 */
export function getFinalGenreTags() {
    const fallbackSelect = document.getElementById('fallbackGenreSelect');
    const selectedGenre = fallbackSelect?.value?.trim() || '';

    const genreToUse = selectedGenre || currentExcelGenre;

    if (!genreToUse) {
        console.warn('🎯 Hiçbir genre seçilmedi.');
        return '';
    }

    const etiketler = getEtiketlerData();

    const genreMatch = etiketler.find(item =>
        item.genre?.toLowerCase() === genreToUse.toLowerCase() &&
        item['merge-tags']
    );

    if (genreMatch && genreMatch['merge-tags']) {
        const rawTags = genreMatch['merge-tags'];
        const cleanedTags = rawTags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag && !tag.toLowerCase().startsWith("genre:"));

        console.log(`✅ Etiket bulundu [${genreToUse}]:`, cleanedTags);
        return cleanedTags.join(', ');
    } else {
        console.warn(`🚫 Etiket bulunamadı [${genreToUse}]`);
        return '';
    }
}

/**
 * Excel'den gelen label verisini ayarlar.
 * @param {string} label - Excel dosyasından gelen label değeri (örneğin D sütunundan)
 */
export function setExcelLabel(label) {
    currentExcelLabel = label?.trim().toLowerCase() || '';
}

/**
 * Label için (ilk aşama) otomatik eşleşme: labels sayfasındaki
 * descriptionTitle sütunu ile eşleşme kontrolü yapar.
 * Eğer eşleşirse ilgili labelTitle'ı döndürür.
 * Eğer eşleşme yoksa boş string döndürür.
 * @returns {string} Eşleşen labelTitle değeri veya boş string
 */
export function getFinalLabelTitle() {
    // İlk aşama: Excel'den gelen değeri kullanarak labels sayfasını kontrol et
    const labels = getLabelsData();
    const autoMatch = labels.find(item =>
        item.descriptionTitle?.toLowerCase() === currentExcelLabel
    );
    if (autoMatch && autoMatch.labelTitle) {
        console.log(`✅ Otomatik eşleşme bulundu [${currentExcelLabel}]:`, autoMatch.labelTitle);
        return autoMatch.labelTitle;
    }
    // Eğer otomatik eşleşme bulunamadı, kullanıcı girişi (manuel) kontrolü yapılacak
    const labelInput = document.getElementById('labelSearchInput');
    const userInput = labelInput?.value?.trim() || '';
    if (userInput) {
        // Manuel seçimi yaparken "yapimcilar" sayfasını kullanacağız
        const yapimcilar = getYapimcilarList();
        const userMatch = yapimcilar.find(item =>
            (typeof item === 'object' ? item['believe-name']?.toLowerCase() : String(item).toLowerCase()) === userInput.toLowerCase()
        );
        if (userMatch) {
            console.log(`✅ Manuel seçim eşleşti:`, userInput);
            return typeof userMatch === 'object' ? userMatch['believe-name'] : userMatch;
        } else {
            console.warn("🚫 Kullanıcı seçimi API'de bulunamadı:", userInput);
            return ''; // Bu durumda hiçbir label döndürülmez
        }
    }
    return ''; // Hiçbir değer bulunmadı
}






/**
 * UpdateLabelInOutput: Output içindeki label satırını, getFinalLabelTitle() sonucuna göre günceller.
 * Bu fonksiyon, kullanıcı inputu üzerinden değer seçildiğinde ya da otomatik eşleşme sonucu döndüğünde çağrılacak.
 * @param {boolean} triggeredByListClick - Eğer liste üzerinden seçim yapıldıysa true.
 */
export function updateLabelInOutput(triggeredByListClick = false) {
    const outputDiv = document.getElementById('output');
    if (!outputDiv || outputDiv.innerText.trim() === '') return;

    const lines = outputDiv.innerText.split('\n');
    const labelTitle = getFinalLabelTitle(triggeredByListClick);
    const labelLineIndex = lines.findIndex(line => line.startsWith("Label:"));
    if (labelLineIndex !== -1 && labelTitle) {
        lines[labelLineIndex] = `Label: ${labelTitle}`;
    }
    outputDiv.innerText = lines.join('\n');
    outputDiv.setAttribute('data-user-modified', 'false');
}


/**
 * Output içindeki label bilgisini kontrol eder ve label durum ikonunu günceller.
 * Ayrıca indir butonunun durumunu da günceller.
 */
export function updateLabelStatusIcon() {
    const labelIcon = document.getElementById("labelStatusIcon");
    const currentLabel = getFinalLabelTitle();

    if (currentLabel) {
        labelIcon.classList.remove('missing', 'error');
        labelIcon.classList.add('ready');
        labelIcon.title = "Label bulundu!";
    } else {
        labelIcon.classList.remove('ready');
        labelIcon.classList.add('error');
        labelIcon.title = "Label bulunamadı!";
    }

    // İndir butonunu da buna göre güncelle
    const genreValid = hasOriginalTags() || hasFallbackTags();
    const labelValid = labelIcon.classList.contains("ready");

    const downloadBtn = document.getElementById('processButton');
    downloadBtn.classList.remove('ready', 'missing', 'error');
    downloadBtn.classList.add((!genreValid || !labelValid) ? 'error' : 'ready');
}

