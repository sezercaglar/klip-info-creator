var _0x25f0dc=_0x1ced;(function(_0x549823,_0x8450ad){var _0x4a6a9b=_0x1ced,_0xbcfd0a=_0x549823();while(!![]){try{var _0x2307ea=-parseInt(_0x4a6a9b(0x20d))/0x1*(parseInt(_0x4a6a9b(0x1f6))/0x2)+-parseInt(_0x4a6a9b(0x1a3))/0x3+parseInt(_0x4a6a9b(0x1e9))/0x4+parseInt(_0x4a6a9b(0x1a2))/0x5*(parseInt(_0x4a6a9b(0x1b2))/0x6)+-parseInt(_0x4a6a9b(0x1c4))/0x7+parseInt(_0x4a6a9b(0x1df))/0x8+parseInt(_0x4a6a9b(0x1e8))/0x9;if(_0x2307ea===_0x8450ad)break;else _0xbcfd0a['push'](_0xbcfd0a['shift']());}catch(_0x4c7186){_0xbcfd0a['push'](_0xbcfd0a['shift']());}}}(_0x1eb3,0x93d3c));const API_URL=_0x25f0dc(0x1f8);let etiketlerData=[],labelsData=[],fallbackGenre='',rowIndex=0x2;document['addEventListener'](_0x25f0dc(0x1ff),function(){var _0x38b71b=_0x25f0dc;const _0x5e19f6=document[_0x38b71b(0x1ee)](_0x38b71b(0x1f3));_0x5e19f6[_0x38b71b(0x1dc)](_0x38b71b(0x204),function(){var _0x94cae0=_0x38b71b;fallbackGenre=_0x5e19f6[_0x94cae0(0x1a8)],console['log']('Seçilen\x20Fallback\x20Genre:',fallbackGenre);}),fetch(API_URL)[_0x38b71b(0x201)](_0x5d0b38=>_0x5d0b38[_0x38b71b(0x19e)]())['then'](_0x183df0=>{var _0x23353e=_0x38b71b;etiketlerData=_0x183df0[_0x23353e(0x1f4)],labelsData=_0x183df0[_0x23353e(0x1c5)],console['log'](_0x23353e(0x1ef));})[_0x38b71b(0x1c6)](_0x18dd64=>console['error'](_0x38b71b(0x1be),_0x18dd64));}),document[_0x25f0dc(0x1ee)]('increaseRowIndex')[_0x25f0dc(0x1dc)](_0x25f0dc(0x1b0),function(){var _0x4a26a7=_0x25f0dc;rowIndex++,document[_0x4a26a7(0x1ee)]('rowIndexDisplay')[_0x4a26a7(0x1e1)]=rowIndex;}),document[_0x25f0dc(0x1ee)](_0x25f0dc(0x1cf))[_0x25f0dc(0x1dc)]('click',function(){var _0x4423d2=_0x25f0dc;rowIndex>0x1&&(rowIndex--,document[_0x4423d2(0x1ee)](_0x4423d2(0x1db))[_0x4423d2(0x1e1)]=rowIndex);});function createOutputText(_0x543d63){var _0x32aeb4=_0x25f0dc;const _0x341348=rowIndex;var _0x24b94d=_0x543d63['A'+_0x341348]?_0x543d63['A'+_0x341348]['v']:_0x32aeb4(0x1c2),_0x368dfa=_0x543d63['B'+_0x341348]?_0x543d63['B'+_0x341348]['v']:_0x32aeb4(0x1d7),_0x8a6ea2=_0x543d63['C'+_0x341348]?_0x543d63['C'+_0x341348]['v']:_0x32aeb4(0x1ba),_0x5d2b6f=_0x543d63['D'+_0x341348]?_0x543d63['D'+_0x341348]['v']:'Label\x20bulunamadı',_0x2c256b=_0x543d63['E'+_0x341348]?_0x543d63['E'+_0x341348]['v']:_0x32aeb4(0x1ca),_0x5edd9f=_0x543d63['F'+_0x341348]?_0x543d63['F'+_0x341348]['v']:'UPC\x20bulunamadı',_0x232d7a=_0x543d63['G'+_0x341348]?_0x543d63['G'+_0x341348]['v']:'Tür\x20bulunamadı',_0x45d57b=_0x543d63['H'+_0x341348]?_0x543d63['H'+_0x341348]['v']:'Çıkış\x20tarihi\x20bulunamadı',_0x20a82a=_0x543d63['I'+_0x341348]?_0x543d63['I'+_0x341348]['v']:_0x32aeb4(0x1b1),_0x3afb46=_0x543d63['J'+_0x341348]?_0x543d63['J'+_0x341348]['v']:'Besteci\x20bulunamadı',_0x35f6c9=_0x543d63['K'+_0x341348]?_0x543d63['K'+_0x341348]['v']:_0x32aeb4(0x1e0),_0x4f1c9=_0x543d63['L'+_0x341348]?_0x543d63['L'+_0x341348]['v']:_0x32aeb4(0x1d4),_0x53a21f=_0x543d63['M'+_0x341348]?_0x543d63['M'+_0x341348]['v']:_0x32aeb4(0x1a7),_0x5dcef9=_0x543d63['N'+_0x341348]?_0x543d63['N'+_0x341348]['v']:_0x32aeb4(0x200),_0x5b75c3=_0x543d63['O'+_0x341348]?_0x543d63['O'+_0x341348]['v']:_0x32aeb4(0x20e),_0x57a3cb=_0x543d63['P'+_0x341348]?_0x543d63['P'+_0x341348]['v']:_0x32aeb4(0x1ad),_0xfafabe=formatTrackTitle(_0x24b94d),_0x29f1a5=formatArtist(_0x368dfa),_0x43085d=lookupGenreTags(_0x232d7a),_0x590992=lookupLabelTitle(_0x5d2b6f),_0x1a7c27=formatISRC(_0x2c256b),_0x4aad14=_0x29f1a5[_0x32aeb4(0x1b3)](_0x32aeb4(0x1e5),_0xfafabe),_0x44cacf=replaceFeatAndAnd(_0x368dfa),_0x471de2=','+_0x44cacf[_0x32aeb4(0x1b3)](',',_0xfafabe),_0x33c935=removeTurkishCharsAndSpaces(_0x29f1a5)[_0x32aeb4(0x1b3)]('-',removeTurkishCharsAndSpaces(_0xfafabe)),_0x24f790=addPossessiveSuffix(_0x29f1a5),_0xf4f1b3=generateDescription(_0x24f790,_0x5d2b6f,_0x8a6ea2,_0xfafabe),_0x51671d=generateLyricsText(_0xfafabe),_0x13b8ef=generateKunye(_0x20a82a,_0x3afb46,_0x35f6c9,_0x4f1c9,_0x51671d),_0x2327db=generateLinks(_0x232d7a),_0x23b95a=removeTurkishChars(_0x29f1a5),_0x1211db=removeTurkishChars(_0xfafabe),_0x39629a=getMergedTags(_0x232d7a,fallbackGenre)[_0x32aeb4(0x1b3)](_0x4aad14,',',_0x29f1a5,',',_0xfafabe,',',_0x23b95a,',',_0x1211db,',',_0x23b95a,_0x32aeb4(0x1e5),_0x1211db),_0x2ccd58=generateHashtags(_0x29f1a5,_0xfafabe),_0x272020=generateSearchUrls(_0x29f1a5,_0xfafabe),_0x53985d=_0x32aeb4(0x1d8)+_0x590992+_0x32aeb4(0x1ac)+_0x232d7a+'\x0aUsage\x20Policy:\x0a\x0aISRC:\x20'+_0x1a7c27+_0x32aeb4(0x1f9)+_0x5edd9f+'\x0a\x0a'+_0x471de2+'\x0a'+_0x33c935+'\x0a\x0a'+_0x29f1a5+'\x0a'+_0xfafabe+'\x0a\x0aSelamlar,\x0a\x0a'+_0x4aad14+_0x32aeb4(0x1ed)+_0x45d57b+'\x0a\x20\x20\x20\x20\x20\x20\x0aYouTube:\x20\x0a\x0aSevgiler.\x0a\x0aİzlesene:\x20\x0a\x0aNetd:\x20http://www.netd.com\x0a\x0a------------\x0a'+_0xf4f1b3+'\x0a\x0a'+_0x13b8ef+'\x0a\x0a'+_0x2327db+'\x0a\x0a'+_0x2ccd58+'\x0a\x0a'+_0x39629a+'\x0a\x0a'+_0x272020['googleUrl']+'\x0a'+_0x272020[_0x32aeb4(0x1d6)]+'\x0a'+_0x272020[_0x32aeb4(0x1dd)];return _0x53985d;}document[_0x25f0dc(0x1ee)](_0x25f0dc(0x1d9))[_0x25f0dc(0x1dc)](_0x25f0dc(0x1b0),function(){var _0x1efab0=_0x25f0dc,_0x55e665=document['getElementById'](_0x1efab0(0x1a9)),_0x2f4fa8=_0x55e665[_0x1efab0(0x1de)][0x0];if(!_0x2f4fa8){alert('Please\x20upload\x20an\x20Excel\x20file\x20first.');return;}var _0x4e17df=new FileReader();_0x4e17df[_0x1efab0(0x1e2)]=function(_0x13a2cf){var _0x267aba=_0x1efab0,_0x781b58=new Uint8Array(_0x13a2cf[_0x267aba(0x1b8)][_0x267aba(0x1ce)]),_0x3edf0c=XLSX[_0x267aba(0x1a0)](_0x781b58,{'type':_0x267aba(0x1f2)}),_0x4c24f4=_0x3edf0c[_0x267aba(0x1b4)][0x0],_0x478347=_0x3edf0c[_0x267aba(0x20b)][_0x4c24f4],_0x2e64e5=createOutputText(_0x478347),_0x7f2123=document[_0x267aba(0x1ee)]('output');_0x7f2123[_0x267aba(0x1e4)]=_0x2e64e5;},_0x4e17df[_0x1efab0(0x1eb)](_0x2f4fa8);}),document[_0x25f0dc(0x1ee)](_0x25f0dc(0x203))[_0x25f0dc(0x1dc)](_0x25f0dc(0x1b0),function(){var _0x63c1e9=_0x25f0dc,_0xeb964a=document[_0x63c1e9(0x1ee)]('fileInput'),_0x267aa6=_0xeb964a[_0x63c1e9(0x1de)][0x0];if(!_0x267aa6){alert(_0x63c1e9(0x1cc));return;}var _0x383330=new FileReader();_0x383330[_0x63c1e9(0x1e2)]=function(_0x41d1b9){var _0x228b24=_0x63c1e9,_0x4f9122=new Uint8Array(_0x41d1b9[_0x228b24(0x1b8)][_0x228b24(0x1ce)]),_0x2c50dc=XLSX['read'](_0x4f9122,{'type':_0x228b24(0x1f2)}),_0x14924b=_0x2c50dc[_0x228b24(0x1b4)][0x0],_0x5a9b39=_0x2c50dc[_0x228b24(0x20b)][_0x14924b],_0x3aea76=createOutputText(_0x5a9b39),_0x2b8801=new Blob([_0x3aea76],{'type':'text/plain'}),_0x171e36=window[_0x228b24(0x1a1)][_0x228b24(0x202)](_0x2b8801),_0x1587f8=document[_0x228b24(0x1d3)]('a');_0x1587f8[_0x228b24(0x1bf)]=_0x171e36,_0x1587f8[_0x228b24(0x1f7)]=_0x228b24(0x1ab),document[_0x228b24(0x1ae)][_0x228b24(0x20c)](_0x1587f8),_0x1587f8[_0x228b24(0x1b0)](),document[_0x228b24(0x1ae)]['removeChild'](_0x1587f8),window[_0x228b24(0x1a1)][_0x228b24(0x1a6)](_0x171e36);},_0x383330[_0x63c1e9(0x1eb)](_0x267aa6);});function formatTrackTitle(_0x1e45f4){var _0x59b362=_0x25f0dc;return _0x1e45f4=_0x1e45f4[_0x59b362(0x208)](),_0x1e45f4=_0x1e45f4[_0x59b362(0x206)]('\x20')['map'](function(_0xea0077){var _0x118955=_0x59b362;return _0xea0077[_0x118955(0x205)](0x0)[_0x118955(0x1fa)]()+_0xea0077[_0x118955(0x1ea)](0x1)[_0x118955(0x1fb)]();})[_0x59b362(0x1af)]('\x20'),_0x1e45f4;}function lookupGenreTags(_0x53faff){var _0x149f3c=_0x25f0dc;const _0x236750=etiketlerData[_0x149f3c(0x19f)](_0x1937c5=>_0x1937c5[_0x149f3c(0x1e6)]['toLowerCase']()===_0x53faff[_0x149f3c(0x1fb)]());return _0x236750?_0x236750['merge-tags']:_0x149f3c(0x1d0);}function lookupLabelTitle(_0x55cd09){var _0x28355c=_0x25f0dc;const _0x1fd650=labelsData['find'](_0xe098d3=>_0xe098d3['descriptionTitle']['toLowerCase']()===_0x55cd09[_0x28355c(0x1fb)]());return _0x1fd650?_0x1fd650[_0x28355c(0x1f1)]:_0x28355c(0x1b6);}function searchByLabel(_0x3b1780){var _0x5b3033=_0x25f0dc;const _0x5a0da5=labelsData[_0x5b3033(0x1c1)](_0xf9f2dc=>_0xf9f2dc[_0x5b3033(0x1f1)][_0x5b3033(0x1fb)]()['includes'](_0x3b1780[_0x5b3033(0x1fb)]()));return _0x5a0da5[_0x5b3033(0x1cd)]>0x0?_0x5a0da5:_0x5b3033(0x1b6);}function formatISRC(_0x1990d4){var _0x59307b=_0x25f0dc;_0x1990d4=_0x1990d4[_0x59307b(0x1d2)](/-/g,'');var _0x41cafb=/^[A-Z]{2}[A-Z0-9]{3}\d{2}\d{5}$/['test'](_0x1990d4);if(!_0x41cafb)return _0x59307b(0x20a);return _0x1990d4;}function _0x1eb3(){var _0x3976a8=['Söz:\x20','Please\x20upload\x20an\x20Excel\x20file\x20first.','length','result','decreaseRowIndex','Etiket\x20bulunamadı','\x27un','replace','createElement','Yönetmen\x20bulunamadı','checked','youtubeUrlArtist','Sanatçı\x20bulunamadı','Label:\x20','additionalButton','\x22\x20isimli\x20tekli\x20çalışması,\x204K\x20çözünürlüğünde\x20video\x20klibiyle\x20netd\x20müzik\x27te.','rowIndexDisplay','addEventListener','youtubeUrlCombined','files','8267080OcAHaQ','Aranjör\x20bulunamadı','textContent','onload','\x22\x20albümünde\x20yer\x20alan\x20\x22','innerHTML','\x20-\x20','genre','\x27in','6484725mSgIjK','1784708KHjOle','slice','readAsArrayBuffer','\x27ın','\x0aYayın\x20Tarihi:\x20','getElementById','API\x20verileri\x20başarıyla\x20yüklendi','aeıioöuü','labelTitle','array','fallbackGenreSelect','etiketler','Müzik:\x20','4NBDLsT','download','https://script.google.com/macros/s/AKfycbwkMVhA2OfLmscXrz7ITqSC14_8Ty6KTwis8lmIYsSJFlCKEDThd4EHxt2g7QdUQcfj/exec','\x0aUPC:\x20','toUpperCase','toLowerCase','\x22\x20şarkı\x20sözleri\x20ile','\x20etiketiyle\x20yayınlanan\x20\x22','https://www.youtube.com/results?search_query=','DOMContentLoaded','Albüm\x20kapağı\x20durumu\x20bulunamadı','then','createObjectURL','processButton','change','charAt','split','netd\x20müzik\x27te\x20bu\x20ay\x20http://bit.ly/nd-eniyi\x0aYeni\x20Hit\x20Şarkılar\x20http://bit.ly/nd-yenihit','trim','\x27nin','Invalid\x20ISRC\x20format','Sheets','appendChild','383573ejGPZc','Yorum\x20durumu\x20bulunamadı','Söz\x20&\x20Müzik:\x20','json','find','read','URL','409895KMsFXN','2996214NMtLbw','\x22\x20isimli\x20tekli\x20çalışması,\x20video\x20klibiyle\x20netd\x20müzik\x27te.','https://www.google.com/search?q=','revokeObjectURL','Yayın\x20türü\x20bulunamadı','value','fileInput','isSingleCheckbox','klipInfo.txt','\x0a\x0aGenre:\x20','Ek\x20veriler\x20bulunamadı','body','join','click','Yazar\x20bulunamadı','30VHwDBK','concat','SheetNames','\x27ün','Label\x20bulunamadı','Düzenleme:\x20','target','map','Albüm\x20adı\x20bulunamadı','feat.','\x22\x20isimli\x20şarkısı,\x20video\x20klibiyle\x20netd\x20müzik\x27te.','is4KCheckbox','Veriler\x20yüklenirken\x20hata\x20oluştu:','href','merge-tags','filter','Eser\x20adı\x20bulunamadı','\x27nun','1670186QipSiH','labels','catch','\x22\x20isimli\x20şarkısı,\x204K\x20çözünürlüğünde\x20video\x20klibiyle\x20netd\x20müzik\x27te.','playlistURL','\x27nın','ISRC\x20bulunamadı'];_0x1eb3=function(){return _0x3976a8;};return _0x1eb3();}function replaceFeatAndAnd(_0x1269fe){var _0x40fdc5=_0x25f0dc;return _0x1269fe[_0x40fdc5(0x1d2)](/\b(feat\.?|&|and)\b/gi,',');}function removeTurkishCharsAndSpaces(_0x4ce48f){var _0x39b536=_0x25f0dc;const _0x2ac8ce={'ç':'c','Ç':'C','ğ':'g','Ğ':'G','ı':'i','I':'I','ö':'o','Ö':'O','ş':'s','Ş':'S','ü':'u','Ü':'U'};return _0x4ce48f=_0x4ce48f[_0x39b536(0x1d2)](/[çğıöşüÇĞIÖŞÜ]/g,function(_0x5c6fc7){return _0x2ac8ce[_0x5c6fc7];}),_0x4ce48f=_0x4ce48f[_0x39b536(0x1d2)](/\s+/g,''),_0x4ce48f;}function formatArtist(_0x28835b){var _0x273657=_0x25f0dc;return _0x28835b=_0x28835b[_0x273657(0x208)](),_0x28835b=_0x28835b[_0x273657(0x1d2)](/\b(ft\.?|feat\.?|feat\.?|FEAT\.?)\b/gi,_0x273657(0x1bb)),_0x28835b=_0x28835b[_0x273657(0x206)]('\x20')[_0x273657(0x1b9)](function(_0x485f67){var _0x12fe67=_0x273657;return _0x485f67[_0x12fe67(0x205)](0x0)[_0x12fe67(0x1fa)]()+_0x485f67['slice'](0x1)[_0x12fe67(0x1fb)]();})[_0x273657(0x1af)]('\x20'),_0x28835b;}function addPossessiveSuffix(_0x41826d){var _0x1449d7=_0x25f0dc;const _0x4f3251=_0x41826d[_0x1449d7(0x1ea)](-0x1)['toLowerCase'](),_0xe87eef=_0x1449d7(0x1f0);let _0x3834a3='';for(let _0x5a533b=_0x41826d[_0x1449d7(0x1cd)]-0x1;_0x5a533b>=0x0;_0x5a533b--){if(_0xe87eef['includes'](_0x41826d[_0x5a533b][_0x1449d7(0x1fb)]())){_0x3834a3=_0x41826d[_0x5a533b][_0x1449d7(0x1fb)]();break;}}if(_0xe87eef['includes'](_0x4f3251)){if(_0x4f3251==='e'||_0x4f3251==='i')return _0x41826d+_0x1449d7(0x209);else{if(_0x4f3251==='a'||_0x4f3251==='ı')return _0x41826d+_0x1449d7(0x1c9);else{if(_0x4f3251==='o'||_0x4f3251==='u')return _0x41826d+_0x1449d7(0x1c3);else{if(_0x4f3251==='ö'||_0x4f3251==='ü')return _0x41826d+'\x27nün';}}}}else{if(_0x3834a3==='o'||_0x3834a3==='u')return _0x41826d+_0x1449d7(0x1d1);else{if(_0x3834a3==='a'||_0x3834a3==='ı')return _0x41826d+_0x1449d7(0x1ec);else{if(_0x3834a3==='e'||_0x3834a3==='i'||_0x3834a3==='ö')return _0x41826d+_0x1449d7(0x1e7);else{if(_0x3834a3==='ü')return _0x41826d+_0x1449d7(0x1b5);}}}}return _0x41826d+_0x1449d7(0x209);}function generateDescription(_0x11992e,_0x128daa,_0x475de7,_0x2b71f4){var _0x1b1efb=_0x25f0dc,_0x29d94a=document[_0x1b1efb(0x1ee)](_0x1b1efb(0x1aa))[_0x1b1efb(0x1d5)],_0x20967e=document[_0x1b1efb(0x1ee)](_0x1b1efb(0x1bd))[_0x1b1efb(0x1d5)];return!_0x29d94a?!_0x20967e?_0x11992e+',\x20'+_0x128daa+_0x1b1efb(0x1fd)+_0x475de7+_0x1b1efb(0x1e3)+_0x2b71f4+_0x1b1efb(0x1bc):_0x11992e+',\x20'+_0x128daa+_0x1b1efb(0x1fd)+_0x475de7+_0x1b1efb(0x1e3)+_0x2b71f4+_0x1b1efb(0x1c7):_0x20967e?_0x11992e+',\x20'+_0x128daa+_0x1b1efb(0x1fd)+_0x2b71f4+_0x1b1efb(0x1da):_0x11992e+',\x20'+_0x128daa+'\x20etiketiyle\x20yayınlanan\x20\x22'+_0x2b71f4+_0x1b1efb(0x1a4);}function generateKunye(_0x3243eb,_0x11f6b6,_0x3e092a,_0x246862,_0x58c484){var _0x51242b=_0x25f0dc;let _0x3754b1='';return _0x3243eb&&_0x11f6b6&&_0x3243eb===_0x11f6b6?_0x3754b1+=_0x51242b(0x19d)+_0x3243eb+'\x0a':(_0x3243eb&&(_0x3754b1+=_0x51242b(0x1cb)+_0x3243eb+'\x0a'),_0x11f6b6&&(_0x3754b1+=_0x51242b(0x1f5)+_0x11f6b6+'\x0a')),_0x3e092a&&(_0x3754b1+=_0x51242b(0x1b7)+_0x3e092a+'\x0a'),_0x246862&&(_0x3754b1+='Yönetmen:\x20'+_0x246862+'\x0a'),_0x58c484&&(_0x3754b1+='\x0a'+_0x58c484),_0x3754b1[_0x51242b(0x208)]();}function generateLyricsText(_0x5139f3){var _0x5bdba7=_0x25f0dc,_0x1dcf0c=document[_0x5bdba7(0x1ee)]('hasLyricsCheckbox')['checked'];return _0x1dcf0c?'\x22'+_0x5139f3+_0x5bdba7(0x1fc):'';}function lookupPlaylistURL(_0x194ad6){var _0x48d8b4=_0x25f0dc;const _0x410212=etiketlerData[_0x48d8b4(0x19f)](_0x212e66=>_0x212e66[_0x48d8b4(0x1e6)]['toLowerCase']()===_0x194ad6['toLowerCase']());return _0x410212?_0x410212[_0x48d8b4(0x1c8)]:'';}function generateLinks(_0x512a46){var _0x439f54=_0x25f0dc;const _0x500b04=lookupPlaylistURL(_0x512a46);let _0x44d20a=_0x439f54(0x207);return _0x500b04&&(_0x44d20a+='\x0a'+_0x500b04),_0x44d20a;}function _0x1ced(_0x2a7d11,_0x4be4d7){var _0x1eb3f5=_0x1eb3();return _0x1ced=function(_0x1ceda1,_0x731045){_0x1ceda1=_0x1ceda1-0x19d;var _0x20bbd8=_0x1eb3f5[_0x1ceda1];return _0x20bbd8;},_0x1ced(_0x2a7d11,_0x4be4d7);}function getMergedTags(_0x1b95a1,_0x14868b){var _0x3b609e=_0x25f0dc;let _0x18cc15=etiketlerData[_0x3b609e(0x19f)](_0x183fef=>_0x183fef[_0x3b609e(0x1e6)][_0x3b609e(0x1fb)]()===_0x1b95a1[_0x3b609e(0x1fb)]()&&_0x183fef['merge-tags']);return!_0x18cc15&&_0x14868b&&(_0x18cc15=etiketlerData[_0x3b609e(0x19f)](_0xb7eae5=>_0xb7eae5['genre'][_0x3b609e(0x1fb)]()===_0x14868b[_0x3b609e(0x1fb)]()&&_0xb7eae5['merge-tags'])),_0x18cc15&&_0x18cc15[_0x3b609e(0x1c0)]?_0x18cc15[_0x3b609e(0x1c0)]:'Etiket\x20bulunamadı';}function removeTurkishChars(_0x427125){const _0x1e8e22={'ç':'c','Ç':'C','ğ':'g','Ğ':'G','ı':'i','I':'I','ö':'o','Ö':'O','ş':'s','Ş':'S','ü':'u','Ü':'U'};return _0x427125=_0x427125['replace'](/[çğıöşüÇĞIÖŞÜ]/g,function(_0x1f20c9){return _0x1e8e22[_0x1f20c9];}),_0x427125;}function generateHashtags(_0x55f222,_0xc05754){function _0x357edc(_0x2bc985){var _0x183aed=_0x1ced;return _0x2bc985['replace'](/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/g,'')[_0x183aed(0x208)]();}const _0x1e337d=_0x357edc(_0x55f222),_0x2eb5b9=_0x357edc(_0xc05754),_0x148933=_0x1e337d+_0x2eb5b9,_0x573a3e='#'+_0x1e337d,_0x310343='#'+_0x2eb5b9,_0x2ba0b4='#'+_0x148933;return _0x573a3e+'\x20'+_0x310343+'\x20'+_0x2ba0b4;}function generateSearchUrls(_0x3e1269,_0x21e1e0){var _0x32c603=_0x25f0dc;const _0x5c90bb=_0x32c603(0x1a5),_0x2028be=_0x32c603(0x1fe),_0x4f6d65=encodeURIComponent(_0x3e1269[_0x32c603(0x208)]()),_0xb9372=encodeURIComponent(_0x21e1e0[_0x32c603(0x208)]()),_0x4f9cdb=encodeURIComponent((_0x3e1269+'\x20-\x20'+_0x21e1e0)[_0x32c603(0x208)]()),_0x179022=''+_0x5c90bb+_0x4f9cdb,_0x3d9ee8=''+_0x2028be+_0x4f6d65,_0xd0992c=''+_0x2028be+_0x4f9cdb;return{'googleUrl':_0x179022,'youtubeUrlArtist':_0x3d9ee8,'youtubeUrlCombined':_0xd0992c};}
