// Google Apps Script URL'nizi buraya ekleyin
const API_URL = 'https://script.google.com/macros/s/AKfycbwkMVhA2OfLmscXrz7ITqSC14_8Ty6KTwis8lmIYsSJFlCKEDThd4EHxt2g7QdUQcfj/exec';

let etiketlerData = [];
let labelsData = [];
let fallbackGenre = '';
let rowIndex = 2; // Varsayılan satır indeksi

// Sayfa yüklendiğinde API'den verileri çekme
document.addEventListener('DOMContentLoaded', function () {
    const fallbackGenreSelect = document.getElementById('fallbackGenreSelect');
    fallbackGenreSelect.addEventListener('change', function () {
        fallbackGenre = fallbackGenreSelect.value;
        console.log("Seçilen Fallback Genre:", fallbackGenre);
    });

    // API'den verileri çek
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            etiketlerData = data['etiketler'];
            labelsData = data['labels'];
            console.log('Hazır!');
        })
        .catch(error => console.error('Veriler yüklenirken hata oluştu:', error));
});

// Satır indeksi artırma ve azaltma işlevleri
document.getElementById('increaseRowIndex').addEventListener('click', function () {
    rowIndex++;
    document.getElementById('rowIndexDisplay').textContent = rowIndex;
});

document.getElementById('decreaseRowIndex').addEventListener('click', function () {
    if (rowIndex > 1) {
        rowIndex--;
        document.getElementById('rowIndexDisplay').textContent = rowIndex;
    }
});

document.getElementById('textFileInput').addEventListener('change', function (e) {
    var file = e.target.files[0];

    if (!file) {
        alert('Lütfen bir metin veya Word dosyası seçin.');
        return;
    }

    var textPreviewDiv = document.getElementById('textPreview');

    if (file.name.endsWith('.txt')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;

            // İçeriği önizleme panelinde göster
            textPreviewDiv.innerText = content;

            // Sekmeleri göster
            switchTab('textPreviewTab');
        };

        reader.readAsText(file);
    } else if (file.name.endsWith('.docx')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var arrayBuffer = e.target.result;

            mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then(function (result) {
                    var html = result.value; // HTML olarak dönüşüm
                    var messages = result.messages; // Dönüşüm sırasında oluşan mesajlar

                    // İçeriği önizleme panelinde göster
                    textPreviewDiv.innerHTML = html;

                    // Sekmeleri göster
                    switchTab('textPreviewTab');
                })
                .catch(function (error) {
                    console.error('Dosya dönüştürme hatası:', error);
                    alert('Word dosyası okunurken bir hata oluştu.');
                });
        };

        reader.readAsArrayBuffer(file);
    } else {
        alert('Lütfen .txt veya .docx uzantılı bir dosya seçin.');
    }
});

document.getElementById('fileInput').addEventListener('change', function (e) {
    // Burada herhangi bir işlem yapmamıza gerek yok çünkü ön izleme butonuna tıklandığında işlem yapıyoruz
});

// Ortak işlev: Çıktı oluşturma işlemi
function createOutputText(worksheet) {
    // Satır indeksi kontrolü
    const row = rowIndex;
    // Hücre adreslerine göre verileri al ve değişkenlere ata
    var trackTitle = worksheet[`A${row}`] ? worksheet[`A${row}`].v : '';
    var artist = worksheet[`B${row}`] ? worksheet[`B${row}`].v : '';
    var albumTitle = worksheet[`C${row}`] ? worksheet[`C${row}`].v : '';
    var label = worksheet[`D${row}`] ? worksheet[`D${row}`].v : '';
    var isrc = worksheet[`E${row}`] ? worksheet[`E${row}`].v : '';
    var upc = worksheet[`F${row}`] ? worksheet[`F${row}`].v : '';
    var genre = worksheet[`G${row}`] ? worksheet[`G${row}`].v : '';
    var releaseDate = worksheet[`H${row}`] ? worksheet[`H${row}`].v : '';
    var formattedReleaseDate = convertValueToString(releaseDate);
    var author = worksheet[`I${row}`] ? worksheet[`I${row}`].v : '';
    var composer = worksheet[`J${row}`] ? worksheet[`J${row}`].v : '';
    var arranger = worksheet[`K${row}`] ? worksheet[`K${row}`].v : '';
    var director = worksheet[`L${row}`] ? worksheet[`L${row}`].v : '';
    var typeOfRelease = worksheet[`M${row}`] ? worksheet[`M${row}`].v : '';
    var albumCoverStatus = worksheet[`N${row}`] ? worksheet[`N${row}`].v : '';
    var commentsStatus = worksheet[`O${row}`] ? worksheet[`O${row}`].v : '';
    var additionalDatas = worksheet[`P${row}`] ? worksheet[`P${row}`].v : '';

    var formattedTrackTitle = formatTrackTitle(trackTitle);
    var formattedArtist = formatArtist(artist);
    var genreLabels = lookupGenreTags(genre);
    var matchedLabelTitle = lookupLabelTitle(label);
    var formattedISRC = formatISRC(isrc);
    var title = formattedArtist.trim().concat(" - ", trackTitle.trim());
    var artistForTags = replaceFeatAndAnd(artist);
    var mergedTagsForArtistAndTrackTitle = "," + artistForTags.concat(",", trackTitle);
    var fileNameFormat = removeTurkishCharsAndSpaces(formattedArtist).concat("-", removeTurkishCharsAndSpaces(formattedTrackTitle));
    var possesiveArtist = addPossessiveSuffix(formattedArtist);
    var description = generateDescription(possesiveArtist, label.trim(), albumTitle.trim(), trackTitle.trim());
    var lyricsDescription = generateLyricsText(trackTitle);
    var kunye = generateKunye(author, composer, arranger, director, lyricsDescription);
    var playlistLinks = generateLinks(genre);
    var artistWithoutTurkishChars = removeTurkishChars(formattedArtist);
    var trackWithoutTurkishChars = removeTurkishChars(formattedTrackTitle);
    var mergedTags = getMergedTags(genre, fallbackGenre).concat(title, ",", formattedArtist, ",", trackTitle, ",", artistWithoutTurkishChars, ",", trackWithoutTurkishChars, ",", artistWithoutTurkishChars, " - ", trackWithoutTurkishChars);
    var hashTags = generateHashtags(artist, trackTitle);
    var searchURLs = generateSearchUrls(formattedArtist, trackTitle);
    var socialMediaURLs = socialMediaLinks();

    var outputText = `Label: ${matchedLabelTitle}

Genre: ${genre}
Usage Policy:

ISRC: ${formattedISRC}
UPC: ${upc}

${mergedTagsForArtistAndTrackTitle}
${fileNameFormat}

${formattedArtist}
${trackTitle}

Selamlar,

${title}
Yayın Tarihi: ${formattedReleaseDate}

YouTube: 

Sevgiler.

İzlesene: 

Netd: http://www.netd.com

------------
${description}

${kunye}

*Facebook* ${socialMediaURLs.facebookUrl}
*Instagram* ${socialMediaURLs.instagramUrl}
*Twitter* ${socialMediaURLs.twitterUrl}
*Youtube* ${socialMediaURLs.youtubeUrl}
*Tiktok* ${socialMediaURLs.tiktokUrl}

${playlistLinks}

${hashTags}

${mergedTags}

${searchURLs.youtubeUrlCombined}
${searchURLs.youtubeUrlArtist}
${searchURLs.googleUrl}
${searchURLs.studioEditUrl}
${searchURLs.believeSearchURL}`

    return outputText;
}

// Ön izleme butonu: Çıktı panelinde göster
document.getElementById('additionalButton').addEventListener('click', function () {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (!file) {
        alert('Lütfen bir Excel dosyası yükleyin.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });

        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];

        var outputText = createOutputText(worksheet);

        // Çıktı panelinde göster
        var outputDiv = document.getElementById('output');
        outputDiv.innerText = outputText;

        // Tabloyu önizleme panelinde göster
        previewMetadata(worksheet);

        // Sekmeleri göster
        switchTab('outputTab');
    };

    reader.readAsArrayBuffer(file);
});

// Sekme butonları için olay dinleyicileri
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function () {
        const tabId = this.dataset.tab;
        switchTab(tabId);
    });
});

// İndir butonu: Önizleme panelindeki içeriği indir
document.getElementById('processButton').addEventListener('click', function () {
    var outputContent = document.getElementById('output').innerText || document.getElementById('output').textContent;

    if (!outputContent) {
        alert('Önizleme panelinde içerik bulunamadı.');
        return;
    }

    // Satır sonu karakterlerini doğru şekilde ayarlama
    var adjustedContent = outputContent.replace(/\n/g, '\r\n');

    // TXT dosyasını indir
    var blob = new Blob([adjustedContent], { type: 'text/plain;charset=utf-8' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'klipInfo.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});

function formatTrackTitle(value) {
    // Türkçe karakterlerin büyük/küçük dönüşümleri için harita
    const turkishMap = {
        'i': 'İ', 'ş': 'Ş', 'ğ': 'Ğ', 'ü': 'Ü', 'ö': 'Ö', 'ç': 'Ç',
        'ı': 'I', 'İ': 'i', 'Ş': 'ş', 'Ğ': 'ğ', 'Ü': 'ü', 'Ö': 'ö', 'Ç': 'ç'
    };

    value = value.trim();

    value = value.split(' ').map(function(word) {
        if (word.length > 0) {
            let firstChar = word.charAt(0);
            let rest = word.substring(1);

            // İlk karakteri büyük harfe dönüştürürken Türkçe harfleri göz önünde bulundur
            firstChar = turkishMap[firstChar] !== undefined ? turkishMap[firstChar].toUpperCase() : firstChar.toUpperCase();

            // Kalan harfleri küçük harfe dönüştürürken Türkçe harfleri göz önünde bulundur
            rest = rest.toLowerCase().split('').map(char => {
                return turkishMap[char] !== undefined ? turkishMap[char].toLowerCase() : char;
            }).join('');

            return firstChar + rest;
        } else {
            return word;
        }
    }).join(' ');

    return value;
}

function lookupGenreTags(genre) {
    const entry = etiketlerData.find(item => item.genre.toLowerCase() === genre.toLowerCase());
    return entry ? entry['merge-tags'] : 'Etiket bulunamadı';
}

function lookupLabelTitle(label) {
    const entry = labelsData.find(item => item.descriptionTitle.toLowerCase() === label.toLowerCase());
    return entry ? entry.labelTitle : 'Label bulunamadı';
}

function searchByLabel(label) {
    const results = labelsData.filter(item => item.labelTitle.toLowerCase().includes(label.toLowerCase()));
    return results.length > 0 ? results : 'Label bulunamadı';
}

/* Bu fonksiyonla ISRC formatlanır ve geçerliliği kontrol edilir*/
function formatISRC(value) {
    // Boşlukları ve "-" işaretlerini sil
    value = value.replace(/[\s\-]/g, '').toUpperCase();

    // ISRC'nin doğru formatta olup olmadığını kontrol et
    var isValid = /^[A-Z]{2}[A-Z0-9]{3}\d{2}\d{5}$/.test(value);

    if (!isValid) {
        return 'Geçersiz ISRC formatı';
    }

    return value;
}

/* Bu fonksiyonla sanatçı adları etiket için ayrıştırılır */
function replaceFeatAndAnd(value) {
    // RegExp kullanarak "feat.", "feat", "&", "and" ifadelerini yakalayalım ve "," ile değiştirelim
    return value.replace(/\b(feat\.?|&|and)\b/gi, ',');
}

/* Bu fonksiyonla türkçe karakterler ve boşluklar silinir */
function removeTurkishCharsAndSpaces(value) {
    // Türkçe karakterleri İngilizce karşılıklarına dönüştür
    const turkishMap = {
        'ç': 'c', 'Ç': 'C',
        'ğ': 'g', 'Ğ': 'G',
        'ı': 'i', 'I': 'I',
        'ö': 'o', 'Ö': 'O',
        'ş': 's', 'Ş': 'S',
        'ü': 'u', 'Ü': 'U'
    };
    
    value = value.replace(/[çğıöşüÇĞIÖŞÜ]/g, function(match) {
        return turkishMap[match];
    });

    // Boşlukları kaldır
    value = value.replace(/\s+/g, '');

    return value;
}

function formatArtist(value) {
    // Başındaki ve sonundaki boşlukları temizle
    value = value.trim();

    // "ft", "feat", "Feat", "FEAT", "ft." gibi varyantları " feat." olarak değiştirelim
    value = value.replace(/\s(ft\.?|feat\.?|FEAT\.?|FT\.?)\s/gi, ' feat. ');

    // Feat. ifadesini değiştirdikten sonra başındaki ve sonundaki ekstra boşlukları bir kez daha temizle
    value = value.trim();

    return value;
}

/* Bu fonksiyon sanatçı adına iyelik eki ekler*/
function addPossessiveSuffix(artistName) {
    // Son harfi ve son harften önceki ilk sesli harfi belirle
    const lastChar = artistName.slice(-1).toLowerCase();
    const vowels = 'aeıioöuü';
    
    // Son harften önceki ilk sesli harfi bulmak için geriye doğru arama yap
    let lastVowel = '';
    for (let i = artistName.length - 1; i >= 0; i--) {
        if (vowels.includes(artistName[i].toLowerCase())) {
            lastVowel = artistName[i].toLowerCase();
            break;
        }
    }

    // Son harf sesli ise
    if (vowels.includes(lastChar)) {
        if (lastChar === 'e' || lastChar === 'i') {
            return artistName + "'nin";
        } else if (lastChar === 'a' || lastChar === 'ı') {
            return artistName + "'nın";
        } else if (lastChar === 'o' || lastChar === 'u') {
            return artistName + "'nun";
        } else if (lastChar === 'ö' || lastChar === 'ü') {
            return artistName + "'nün";
        }
    } else {
        // Son harf sessiz ise
        if (lastVowel === 'o' || lastVowel === 'u') {
            return artistName + "'un";
        } else if (lastVowel === 'a' || lastVowel === 'ı') {
            return artistName + "'ın";
        } else if (lastVowel === 'e' || lastVowel === 'i' || lastVowel === 'ö') {
            return artistName + "'in";
        } else if (lastVowel === 'ü') {
            return artistName + "'ün";
        }
    }

    // Eğer son harfi veya son sesli harfi bulamazsa, varsayılan olarak "nin" ekler
    return artistName + "'nin";
}

/* Bu fonksiyon açıklama satırını oluşturur*/
function generateDescription(value1, value2, value3, value4) {
    // Checkbox'ların durumunu kontrol et
    var isSingle = document.getElementById('isSingleCheckbox').checked;
    var is4K = document.getElementById('is4KCheckbox').checked;

    // Eğer Single seçili değilse
    if (!isSingle) {
        if (!is4K) {
            return `${value1}, ${value2} etiketiyle yayınlanan "${value3}" albümünde yer alan "${value4}" isimli şarkısı, video klibiyle netd müzik'te.`;
        } else {
            return `${value1}, ${value2} etiketiyle yayınlanan "${value3}" albümünde yer alan "${value4}" isimli şarkısı, 4K çözünürlüğünde video klibiyle netd müzik'te.`;
        }
    } else {
        // Eğer Single seçiliyse
        if (is4K) {
            return `${value1}, ${value2} etiketiyle yayınlanan "${value4}" isimli tekli çalışması, 4K çözünürlüğünde video klibiyle netd müzik'te.`;
        } else {
            return `${value1}, ${value2} etiketiyle yayınlanan "${value4}" isimli tekli çalışması, video klibiyle netd müzik'te.`;
        }
    }
}

/* Bu fonksiyon künyeyi oluşturur */
function generateKunye(author, composer, arranger, director, lyricsText) {
    let kunye = '';

    if (author && composer && author === composer) {
        kunye += `Söz & Müzik: ${author}\n`;
    } else {
        if (author) {
            kunye += `Söz: ${author}\n`;
        }
        if (composer) {
            kunye += `Müzik: ${composer}\n`;
        }
    }

    if (arranger) {
        kunye += `Düzenleme: ${arranger}\n`;
    }

    if (director) {
        kunye += `Yönetmen: ${director}\n`;
    }

    if (lyricsText) {
        kunye += `\n${lyricsText}`;
    }

    return kunye.trim();
}

function generateLyricsText(trackTitle) {
    var hasLyrics = document.getElementById('hasLyricsCheckbox').checked;

    if (hasLyrics) {
        return `"${trackTitle}" şarkı sözleri ile`;
    } else {
        return '';
    }
}

/* Bu fonksiyon ile playlist linkleri oluşturulur */
function generateLinks(genre) {
    // Metni oluştur
    let links = `netd müzik'te bu ay http://bit.ly/nd-eniyi\nYeni Hit Şarkılar http://bit.ly/nd-yenihit`;

    return links;
}

function getMergedTags(genre, fallbackGenre) {
    // İlk olarak genre ile sorgu yap
    let genreMatch = etiketlerData.find(item => item.genre.toLowerCase() === genre.toLowerCase() && item['merge-tags']);

    // Eğer genre için bir eşleşme bulunamazsa, fallbackGenre ile tekrar sorgu yap
    if (!genreMatch && fallbackGenre) {
        genreMatch = etiketlerData.find(item => item.genre.toLowerCase() === fallbackGenre.toLowerCase() && item['merge-tags']);
    }

    // Sonuçları döndür
    if (genreMatch && genreMatch['merge-tags']) {
        return genreMatch['merge-tags'];
    } else {
        return 'Etiket bulunamadı';
    }
}

function removeTurkishChars(value) {
    // Türkçe karakterleri İngilizce karşılıklarına dönüştür
    const turkishMap = {
        'ç': 'c', 'Ç': 'C',
        'ğ': 'g', 'Ğ': 'G',
        'ı': 'i', 'I': 'I',
        'ö': 'o', 'Ö': 'O',
        'ş': 's', 'Ş': 'S',
        'ü': 'u', 'Ü': 'U'
    };
    
    value = value.replace(/[çğıöşüÇĞIÖŞÜ]/g, function(match) {
        return turkishMap[match];
    });

    return value;
}

function generateHashtags(artist, trackTitle) {
    const collaborationTerms = ["feat\\.", "feat", "&", "X", "ft\\.", "ft"];
    const regex = new RegExp(`\\b(${collaborationTerms.join('|')})\\b`, 'gi');

    let splitArtists = artist.split(regex).filter(item => !regex.test(item));
    let cleanArtists = splitArtists.map(artist => artist.trim());

    function sanitizeForHashtag(value) {
        return value.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/g, '').trim();
    }

    let independentHashtags = cleanArtists.map(artist => `#${sanitizeForHashtag(artist)}`).join(' ');
    let combinedArtistHashtag = `#${cleanArtists.map(artist => sanitizeForHashtag(artist)).join('')}`;
    let trackHashtag = `#${sanitizeForHashtag(trackTitle)}`;
    let trackHashtagNoHash = `${sanitizeForHashtag(trackTitle)}`; // Başında # olmadan

    return `${independentHashtags} ${trackHashtag} ${combinedArtistHashtag}${trackHashtagNoHash}`;
}

function generateSearchUrls(artist, trackTitle) {
    // Google ve YouTube arama URL'lerinin temel formatları
    const googleSearchUrl = "https://www.google.com/search?q=";
    const youtubeSearchUrl = "https://www.youtube.com/results?search_query=";
    const studioEditUrl = "https://studio.youtube.com/video//edit";
    const believeSearchURL = "https://www.believebackstage.com/catalog/manager?~formSubmitted=1&backstageMiscSearch=";

    // Arama sorguları için artist ve trackTitle'ı birleştirme
    const queryArtist = encodeURIComponent(artist.trim());
    const queryTrackTitle = encodeURIComponent(trackTitle.trim());
    const queryCombined = encodeURIComponent(`${artist} - ${trackTitle}`.trim());

    // Google ve YouTube arama URL'lerini oluşturma
    const googleUrl = `${googleSearchUrl}${queryCombined}`;
    const youtubeUrlArtist = `${youtubeSearchUrl}${queryArtist}`;
    const youtubeUrlCombined = `${youtubeSearchUrl}${queryCombined}`;

    // URL'leri döndürme
    return {
        googleUrl: googleUrl,
        youtubeUrlArtist: youtubeUrlArtist,
        youtubeUrlCombined: youtubeUrlCombined,
    believeSearchURL: believeSearchURL,
    studioEditUrl: studioEditUrl
    };
}

// Metadata önizleme fonksiyonu
function previewMetadata(worksheet) {
    const previewTableBody = document.getElementById('previewTable').getElementsByTagName('tbody')[0];
    previewTableBody.innerHTML = ''; // Mevcut içeriği temizle

    // Çalışma sayfasının aralığını al
    let range = XLSX.utils.decode_range(worksheet['!ref']);
    let rowCount = range.e.r + 1; // Satır sayısını hesapla

    for (let row = 2; row <= rowCount; row++) {
        let trackTitle = worksheet[`A${row}`] ? worksheet[`A${row}`].v : '';
        let artist = worksheet[`B${row}`] ? worksheet[`B${row}`].v : '';
        let albumTitle = worksheet[`C${row}`] ? worksheet[`C${row}`].v : '';
        let label = worksheet[`D${row}`] ? worksheet[`D${row}`].v : '';
        let isrc = worksheet[`E${row}`] ? worksheet[`E${row}`].v : '';
        let upc = worksheet[`F${row}`] ? worksheet[`F${row}`].v : '';
        let genre = worksheet[`G${row}`] ? worksheet[`G${row}`].v : '';
        let releaseDate = worksheet[`H${row}`] ? worksheet[`H${row}`].v : '';
        let author = worksheet[`I${row}`] ? worksheet[`I${row}`].v : '';
        let composer = worksheet[`J${row}`] ? worksheet[`J${row}`].v : '';
        let arranger = worksheet[`K${row}`] ? worksheet[`K${row}`].v : '';
        let director = worksheet[`L${row}`] ? worksheet[`L${row}`].v : '';
        let typeOfRelease = worksheet[`M${row}`] ? worksheet[`M${row}`].v : '';
        let lyrics = worksheet[`O${row}`] ? worksheet[`O${row}`].v : ''; // Lyrics (O sütunu)
        let description = worksheet[`P${row}`] ? worksheet[`P${row}`].v : ''; // Description (P sütunu)

        let rowElement = document.createElement('tr');
        rowElement.innerHTML = `
            <td>${trackTitle}</td>
            <td>${artist}</td>
            <td>${albumTitle}</td>
            <td>${label}</td>
            <td>${isrc}</td>
            <td>${upc}</td>
            <td>${genre}</td>
            <td>${releaseDate}</td>
            <td>${author}</td>
            <td>${composer}</td>
            <td>${arranger}</td>
            <td>${director}</td>
            <td>${typeOfRelease}</td>
            <td>${lyrics}</td> 
            <td>${description}</td>
        `;

        previewTableBody.appendChild(rowElement);
    }
}

function switchTab(tabId) {
    // Tüm sekme içeriklerini gizle
    document.querySelectorAll('.tab-content').forEach(function (content) {
        content.style.display = 'none';
    });

    // İstenen sekmeyi göster
    const tabContent = document.getElementById(tabId);
    if (tabContent) {
        tabContent.style.display = 'block';
    } else {
        console.error(`Tab with ID "${tabId}" not found.`);
    }
}

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function () {
        const tabId = this.dataset.tab;
        switchTab(tabId);
    });
});

function socialMediaLinks () {
    // Sosyal medya linkleri
    const facebookUrl = "https://www.facebook.com/netdmuzik";
    const instagramUrl = "https://instagram.com/netdmuzik";
    const twitterUrl = "https://twitter.com/netdmuzik";
    const youtubeUrl = "https://www.youtube.com/@netdmuzik";
    const tiktokUrl = "https://www.tiktok.com/@netdmuzik";

    // URL'leri döndürme
    return {
        facebookUrl: facebookUrl,
        instagramUrl: instagramUrl,
        twitterUrl: twitterUrl,
        youtubeUrl: youtubeUrl,
        tiktokUrl: tiktokUrl
    };
}

function formatISRCForSearch(isrc) {
    isrc = isrc.replace(/-/g, '');

    if (isrc.length !== 12) {
        alert('ISRC kodu 12 karakter uzunluğunda olmalıdır.');
        return null;
    }

    let part1 = isrc.slice(0, 2);
    let part2 = isrc.slice(2, 5);
    let part3 = isrc.slice(5, 7);
    let part4 = isrc.slice(7, 12);

    return `${part1}-${part2}-${part3}-${part4}`;
}

function searchByISRC(worksheet) {
    let rowIndex = document.getElementById('rowIndexDisplay').textContent;

    // ISRC bilgisini Excel dosyasından al
    let isrc = worksheet[`E${rowIndex}`] ? worksheet[`E${rowIndex}`].v : null;

    if (!isrc) {
        alert('ISRC bilgisi bulunamadı!');
        return;
    }

    // ISRC kodunu formatla
    let formattedISRC = formatISRCForSearch(isrc);

    if (formattedISRC) {
        // Linki oluştur
        let searchURL = `https://www.believebackstage.com/catalog/manager?~formSubmitted=1&backstageMiscSearch=${formattedISRC}`;
        
        // Kullanıcıyı bu linke yönlendir
        window.open(searchURL, '_blank');
    }
}

document.getElementById('searchISRCButton').addEventListener('click', function () {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (!file) {
        alert('Lütfen bir Excel dosyası yükleyin.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });

        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];  // worksheet değişkenini burada tanımlıyoruz

        // ISRC ile arama yap
        searchByISRC(worksheet);  // worksheet parametresini burada geçiriyoruz
    };

    reader.readAsArrayBuffer(file);
});

function convertValueToString(value) {
    if (value instanceof Date) {
        // Eğer değer zaten bir Date nesnesiyse
        return value.toLocaleDateString('tr-TR');
    } else if (typeof value === 'number') {
        // Excel tarih numarasını tarihe çevir
        return convertExcelDate(value);
    } else {
        return String(value);
    }
}

function convertExcelDate(excelDate) {
    const excelBaseDate = new Date(1900, 0, 1); // 01.01.1900
    const convertedDate = new Date(excelBaseDate.getTime() + (excelDate - 2) * 24 * 60 * 60 * 1000); 
    // Excel'deki tarih 1900'den itibaren hesaplanır, düzeltme ile -2 ekliyoruz.

    // Tarihi 'dd.mm.yyyy' formatına çevirme
    const day = String(convertedDate.getDate()).padStart(2, '0');
    const month = String(convertedDate.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başlar
    const year = convertedDate.getFullYear();

    return `${day}.${month}.${year}`;
}

// "Backstage to Metadata" butonunun işlevi
async function generateExcel() {
    try {
        // Panodan veriyi al
        const clipboardText = await navigator.clipboard.readText();
        const lines = clipboardText.split("\n");

        // Track # etiketi kontrolü
        if (!lines.some(line => line.includes("Track #"))) {
            alert("Invalid data format: 'Track #' not found!");
            return;
        }

        // Başlıklar
        const headers = [
            "ESER / SES DOSYASI ADI", "SANATÇI", "ALBUM ADI", "YAPIM ŞİRKETİ",
            "ISRC", "UPC", "Eser Tarzı", "Yayın Tarihi", "SÖZ", "MÜZİK", 
            "DÜZENLEME", "KLİP YÖNETMENİ", "TÜRÜ", "ALBUM KAPAĞI (var/yok)", 
            "Yorumlar", "Ekran Görüntüsü", "Şarkı Sözleri", "Açıklama"
        ];
        const rows = [];

        // Albüm bilgileri
        let albumTitle = lines[0].trim();
        let artistName = lines[1].trim();
        let upc = null;
        let label = null;

        // Anahtar kelimelerle veri bulma
        const matchPatterns = {
            "Plak Şirketi": /Plak şirketi\t(.*)/,
            "UPC": /UPC\t(.*)/
        };

        // Track başlığı ve sütun indekslerini bulmak için değişkenler
        let isTrackSection = false;
        let trackHeaders = [];

        // Panodaki veriyi işleme
        lines.forEach((line, index) => {
            // Statik veriler (Plak Şirketi, UPC) için eşleştirme
            for (const [key, regex] of Object.entries(matchPatterns)) {
                const match = line.match(regex);
                if (match) {
                    if (key === "Plak Şirketi") label = match[1].trim();
                    if (key === "UPC") upc = match[1].trim();
                }
            }

            // Track verileri için başlıkları algılama
            if (line.startsWith("Track #")) {
                isTrackSection = true;
                trackHeaders = line.split("\t").map(header => header.trim());
            } else if (isTrackSection) {
                // Sütun başlıklarına göre dinamik veri çekme
                const values = line.split("\t");
                const trackRow = {};
                trackHeaders.forEach((header, i) => {
                    trackRow[header] = values[i]?.trim() || "";
                });

                // Zorunlu alanların kontrolü
                if (!trackRow["Track title"] || !trackRow["Artist"] || !trackRow["ISRC"]) {
                    console.warn("Skipping invalid track data due to missing required fields.");
                    return;
                }

                // Track Title düzenlemeleri
                let trackTitle = trackRow["Track title"]
                    .replace("Explicit", "") // Explicit'i kaldır
                    .replace(/\(.*\)/g, "")  // Parantezleri kaldır
                    .trim();

                // Feat. kontrolü
                const featMatch = trackTitle.match(/feat\. (.*)/i);
                if (featMatch) {
                    const featArtist = featMatch[1].trim();
                    trackTitle = trackTitle.replace(/feat\. (.*)/i, "").trim();
                    trackRow["Artist"] += ` feat. ${featArtist}`;
                }

                // Excel'e eklenecek veriler
                rows.push([
                    trackTitle, // ESER / SES DOSYASI ADI
                    trackRow["Artist"], // SANATÇI
                    albumTitle, // ALBUM ADI
                    label, // YAPIM ŞİRKETİ
                    trackRow["ISRC"], // ISRC
                    upc, // UPC
                    trackRow["Genre #1"], // Eser Tarzı
                    "", // Yayın Tarihi
                    trackRow["Authors"] || "", // SÖZ
                    trackRow["Composers"] || "", // MÜZİK
                    "", // DÜZENLEME
                    "", // KLİP YÖNETMENİ
                    "", // TÜRÜ
                    "", // ALBUM KAPAĞI (var/yok)
                    "", // Yorumlar
                    "", // Ekran Görüntüsü
                    "", // Şarkı Sözleri
                    ""  // Açıklama
                ]);
            }
        });

        if (rows.length === 0) {
            alert("No track data found!");
            return;
        }

        // Excel dosyası oluşturma
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        XLSX.utils.book_append_sheet(wb, ws, "Metadata");

        // Excel dosyasını indir
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
        const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
        saveAs(blob, "netd-bs-metadata.xlsx");
    } catch (err) {
        alert("Error reading clipboard or generating file: " + err.message);
    }
}

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

// "Backstage to Metadata" butonuna tıklama olayını dinle
document.getElementById("backstageButton").addEventListener("click", generateExcel);
