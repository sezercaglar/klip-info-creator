// Google Apps Script URL'nizi buraya ekleyin
const API_URL = 'https://script.google.com/macros/s/AKfycbwkMVhA2OfLmscXrz7ITqSC14_8Ty6KTwis8lmIYsSJFlCKEDThd4EHxt2g7QdUQcfj/exec';

let etiketlerData = [];
let labelsData = [];

// Sayfa yüklendiğinde API'den verileri çekme
document.addEventListener('DOMContentLoaded', function () {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            etiketlerData = data['etiketler'];  // 'etiketler' sayfasındaki veriler
            labelsData = data['labels'];  // 'labels' sayfasındaki veriler
            console.log('API verileri başarıyla yüklendi');
        })
        .catch(error => console.error('Veriler yüklenirken hata oluştu:', error));
});

document.getElementById('processButton').addEventListener('click', function () {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var isSingle = document.getElementById('isSingleCheckbox').checked; // Checkbox'ın seçili olup olmadığını kontrol et
    var is4K = document.getElementById('is4KCheckbox').checked; // 4K olup olmadığını kontrol et
    var hasLyrics = document.getElementById('hasLyricsCheckbox').checked; // Sözlerin mevcut olup olmadığını kontrol et
	var fallbackGenre = "Pop";




    if (!file) {
        alert('Please upload an Excel file first.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });

        // İlk sayfayı al
        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];

        // Hücre adreslerine göre verileri al ve değişkenlere ata
        var trackTitle = worksheet['A2'] ? worksheet['A2'].v : 'Eser adı bulunamadı';
        var artist = worksheet['B2'] ? worksheet['B2'].v : 'Sanatçı bulunamadı';
        var albumTitle = worksheet['C2'] ? worksheet['C2'].v : 'Albüm adı bulunamadı';
        var label = worksheet['D2'] ? worksheet['D2'].v : 'Label bulunamadı';
        var isrc = worksheet['E2'] ? worksheet['E2'].v : 'ISRC bulunamadı';
        var upc = worksheet['F2'] ? worksheet['F2'].v : 'UPC bulunamadı';
        var genre = worksheet['G2'] ? worksheet['G2'].v : 'Tür bulunamadı';
        var releaseDate = worksheet['H2'] ? worksheet['H2'].v : 'Çıkış tarihi bulunamadı';
        var author = worksheet['I2'] ? worksheet['I2'].v : 'Yazar bulunamadı';
        var composer = worksheet['J2'] ? worksheet['J2'].v : 'Besteci bulunamadı';
        var arranger = worksheet['K2'] ? worksheet['K2'].v : 'Aranjör bulunamadı';
        var director = worksheet['L2'] ? worksheet['L2'].v : 'Yönetmen bulunamadı';
        var typeOfRelease = worksheet['M2'] ? worksheet['M2'].v : 'Yayın türü bulunamadı';
        var albumCoverStatus = worksheet['N2'] ? worksheet['N2'].v : 'Albüm kapağı durumu bulunamadı';
        var commentsStatus = worksheet['O2'] ? worksheet['O2'].v : 'Yorum durumu bulunamadı';
        var additionalDatas = worksheet['P2'] ? worksheet['P2'].v : 'Ek veriler bulunamadı';

        var formattedTrackTitle = formatTrackTitle(trackTitle);
        var formattedArtist = formatArtist(artist);
        var genreLabels = lookupGenreTags(genre);
        var matchedLabelTitle = lookupLabelTitle(label);
        var formattedISRC = formatISRC(isrc);
        var title = artist.concat(" - ", formattedTrackTitle);
        var artistForTags = replaceFeatAndAnd(artist);
        var mergedTagsForArtistAndTrackTitle = "," + artistForTags.concat(",", formattedTrackTitle);
        var fileNameFormat = removeTurkishCharsAndSpaces(formattedArtist).concat("-",removeTurkishCharsAndSpaces(formattedTrackTitle));
        var possesiveArtist = addPossessiveSuffix(formattedArtist);
        var description = generateDescription(possesiveArtist,label,albumTitle,formattedTrackTitle);
        var lyricsDescription = generateLyricsText(formattedTrackTitle);
        var kunye = generateKunye(author,composer,arranger,director,lyricsDescription);
		var playlistLinks = generateLinks(genre);
		var artistWithoutTurkishChars = removeTurkishChars(formattedArtist);
		var trackWithoutTurkishChars = removeTurkishChars(formattedTrackTitle);
		var mergedTags = getMergedTags(genre, fallbackGenre).concat(title, ",", formattedArtist, ",", formattedTrackTitle, ",", artistWithoutTurkishChars, ",", trackWithoutTurkishChars,",",artistWithoutTurkishChars, " - ", trackWithoutTurkishChars);
		var hashTags = generateHashtags(formattedArtist,formattedTrackTitle);
		var searchURLs = generateSearchUrls(formattedArtist,formattedTrackTitle);

        // Verileri HTML sayfasında göster
        var outputDiv = document.getElementById('output');
        outputDiv.innerHTML = `Label: ${matchedLabelTitle}

Genre: ${genre}
Usage Policy:

ISRC: ${formattedISRC}
UPC: ${upc}

${mergedTagsForArtistAndTrackTitle}
${fileNameFormat}

${formattedArtist}
${formattedTrackTitle}

Selamlar,

${title}
Yayın Tarihi: ${releaseDate}
      
YouTube: 

Sevgiler.

İzlesene: 

Netd: http://www.netd.com

------------
${description}

${kunye}

${playlistLinks}

${hashTags}

${mergedTags}

${searchURLs.googleUrl}
${searchURLs.youtubeUrlArtist}
${searchURLs.youtubeUrlCombined}
        `;

        // İşlenen veriyi txt dosyası olarak indir
        var textData = `Label: ${matchedLabelTitle}

Genre: ${genre}
Usage Policy:

ISRC: ${formattedISRC}
UPC: ${upc}

${mergedTagsForArtistAndTrackTitle}
${fileNameFormat}

${formattedArtist}
${formattedTrackTitle}

Selamlar,

${title}
Yayın Tarihi: ${releaseDate}
      
YouTube: 

Sevgiler.

İzlesene: 

Netd: http://www.netd.com

------------
${description}

${kunye}

${playlistLinks}

${hashTags}

${mergedTags}

${searchURLs.googleUrl}
${searchURLs.youtubeUrlArtist}
${searchURLs.youtubeUrlCombined}`;


        var blob = new Blob([textData], { type: 'text/plain' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'output.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    reader.readAsArrayBuffer(file);
});

function formatTrackTitle(value) {
    value = value.trim();
    value = value.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
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
    // "-" işaretlerini sil
    value = value.replace(/-/g, '');

    // ISRC'nin doğru formatta olup olmadığını kontrol et
    var isValid = /^[A-Z]{2}[A-Z0-9]{3}\d{2}\d{5}$/.test(value);

    if (!isValid) {
        return 'Invalid ISRC format';
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

    // "ft.", "feat", "Feat", "FEAT" ifadelerini "feat." olarak değiştir
    value = value.replace(/\b(ft\.?|feat\.?|feat\.?|FEAT\.?)\b/gi, 'feat.');

    // Her kelimenin ilk harfini büyük yap
    value = value.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');

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

    // Author ve Composer aynıysa
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

    // Arranger varsa
    if (arranger) {
        kunye += `Düzenleme: ${arranger}\n`;
    }

    // Director varsa
    if (director) {
        kunye += `Yönetmen: ${director}\n`;
    }

    // Eğer lyricsText doluysa, künyenin altına bir boşluk bırak ve lyricsText'i ekle
    if (lyricsText) {
        kunye += `\n${lyricsText}`;
    }

    return kunye.trim();  // Künye sonundaki gereksiz boşlukları veya yeni satırları temizler
}

function generateLyricsText(trackTitle) {
	
    var hasLyrics = document.getElementById('hasLyricsCheckbox').checked;

    if (hasLyrics) {
        return `"${trackTitle}" şarkı sözleri ile`;
    } else {
        return '';
    }
}

/* Bu fonksiyon ile playlist linklerini Veritabanında arar */
function lookupPlaylistURL(genre) {
    // Veritabanında genre'yi kullanarak playlistURL'yi bul
    const entry = etiketlerData.find(item => item.genre.toLowerCase() === genre.toLowerCase());
    return entry ? entry.playlistURL : '';
}
/* Bu fonksiyon ile playlist linkleri oluşturulur */
function generateLinks(genre) {
    // genre kullanarak playlistURL'yi bul
    const playlistURL = lookupPlaylistURL(genre);

    // Metni oluştur
    let links = `netd müzik'te bu ay http://bit.ly/nd-eniyi\nYeni Hit Şarkılar http://bit.ly/nd-yenihit`;

    if (playlistURL) {
        links += `\n${playlistURL}`;
    }

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
    // Hashtag için geçerli olmayan karakterleri temizle
    function sanitizeForHashtag(value) {
        return value.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/g, '').trim();
    }

    // Değerleri temizle ve hashtag formatına getir
    const cleanArtist = sanitizeForHashtag(artist);
    const cleanTrackTitle = sanitizeForHashtag(trackTitle);
    const combined = cleanArtist + cleanTrackTitle;

    // Hashtagleri oluştur
    const hashtagArtist = `#${cleanArtist}`;
    const hashtagTrackTitle = `#${cleanTrackTitle}`;
    const hashtagCombined = `#${combined}`;

    // Hashtagleri birleştirip döndür
    return `${hashtagArtist} ${hashtagTrackTitle} ${hashtagCombined}`;
}
function generateSearchUrls(artist, trackTitle) {
    // Google ve YouTube arama URL'lerinin temel formatları
    const googleSearchUrl = "https://www.google.com/search?q=";
    const youtubeSearchUrl = "https://www.youtube.com/results?search_query=";

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
        youtubeUrlCombined: youtubeUrlCombined
    };
}