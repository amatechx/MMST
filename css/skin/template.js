// Data untuk generator judul
const titleData = {
    pop: {
        indonesia: [
            "Cinta", "Rindu", "Bahagia", "Mimpi", "Harapan", "Kenangan", "Kasih", "Sayang", "Hati", "Jiwa",
            "Setia", "Cerita", "Bintang", "Malam", "Indah", "Terakhir", "Janji", "Selamanya", "Waktu", "Kisah",
            "Asmara", "Pelangi", "Cahaya", "Rindu yang Hilang", "Hati yang Terluka", "Cinta yang Abadi", "Kenangan Terindah", "Harapan Baru", "Kisah yang Hilang", "Janji yang Terlupakan"
        ],
        inggris: [
            "Love", "Dream", "Heart", "Star", "Night", "Forever", "Time", "Story", "Beautiful", "Memory",
            "Soul", "Promise", "Hope", "Paradise", "Sunshine", "Rain", "Never", "Always", "Fire", "Ocean",
            "Eternal Love", "Shining Star", "Dreams of You", "Lost Memories", "Forever Together", "Heart of Gold", "Timeless Story", "Endless Journey", "Promise of Tomorrow", "Wings of Hope"
        ],
        spanyol: [
            "Amor", "Corazón", "Sueño", "Estrella", "Noche", "Vida", "Tiempo", "Siempre", "Alma", "Memoria"
        ],
        prancis: [
            "Amour", "Rêve", "Cœur", "Étoile", "Nuit", "Toujours", "Temps", "Histoire", "Âme", "Mémoire"
        ],
        jerman: [
            "Liebe", "Traum", "Herz", "Stern", "Nacht", "Immer", "Zeit", "Geschichte", "Seele", "Erinnerung"
        ],
        jepang: [
            "愛", "夢", "心", "星", "夜", "永遠", "時間", "物語", "魂", "記憶"
        ],
        korea: [
            "사랑", "꿈", "마음", "별", "밤", "영원히", "시간", "이야기", "아름다운", "기억"
        ],
        mandarin: [
            "爱", "梦", "心", "星", "夜", "永远", "时间", "故事", "灵魂", "记忆"
        ]
    },
    rock: {
        indonesia: [
            "Api", "Badai", "Petir", "Gelap", "Keras", "Bebas", "Liar", "Hancur", "Pemberontak", "Ekstrem",
            "Kegelapan", "Amarah", "Dendam", "Balas", "Teriakan", "Melawan", "Kuat", "Berani", "Kebebasan", "Gila",
            "Gelora Jiwa", "Api Perjuangan", "Kebebasan Abadi", "Teriakan Hati", "Kegelapan Malam", "Darah Pemberontak", "Suara Perlawanan", "Kisah Pemberontakan", "Nyala Api", "Semangat Hidup"
        ],
        inggris: [
            "Fire", "Storm", "Thunder", "Dark", "Hard", "Free", "Wild", "Broken", "Rebel", "Extreme",
            "Darkness", "Rage", "Revenge", "Scream", "Against", "Strong", "Brave", "Freedom", "Crazy", "Rock",
            "Burning Soul", "Rebel's Cry", "Dark Horizon", "Freedom's Flame", "Echoes of War", "Shattered Dreams", "Raging Thunder", "Unbroken Spirit", "Firestorm", "Against the Odds"
        ]
    },
    jazz: {
        indonesia: [
            "Malam", "Hujan", "Kota", "Jazz", "Biru", "Lampu", "Piano", "Suara", "Lembut", "Saxofon",
            "Gelap", "Kafe", "Tempo", "Improvisasi", "Melodi", "Harmoni", "Ritme", "Klasik", "Nostalgia", "Tenang",
            "Nada Malam", "Harmoni Kota", "Melodi Senja", "Suara Hati", "Irama Kehidupan", "Piano di Malam Hari", "Saxophone dan Hujan", "Kafe Nostalgia", "Senandung Malam", "Jazz di Kota"
        ],
        inggris: [
            "Night", "Rain", "City", "Jazz", "Blue", "Lights", "Piano", "Voice", "Soft", "Saxophone",
            "Dark", "Cafe", "Tempo", "Improvisation", "Melody", "Harmony", "Rhythm", "Classic", "Nostalgia", "Calm",
            "City Serenade", "Twilight Harmony", "Rainy Jazz", "Soulful Nights", "Melody of Life", "Piano Under the Stars", "Saxophone Dreams", "Cafe Blues", "Evening Ballad", "Jazz in the City"
        ]
    },
    hiphop: {
        indonesia: [
            "Flow", "Lirik", "Beat", "Jalanan", "Realita", "Kaya", "Uang", "Geng", "Bos", "Sukses",
            "Mimpi", "Hustle", "Perjuangan", "Ghetto", "Emas", "Berlian", "Kejam", "Barat", "Timur", "Selatan",
            // Indonesia
            "INDO_", "NKRI_", "BHINNEKA_", "GARUDA_", "MERAH_", "PUTIH_", "PANCASILA_", "NUSANTARA_", "JAYA_", "RAYA_",
            // Inggris
            "THE_", "COOL_", "AWESOME_", "GREAT_", "SUPER_", "MEGA_", "ULTRA_", "EPIC_", "LEGEND_", "MASTER_",
            // Spanyol  
            "EL_", "LA_", "LOS_", "LAS_", "MI_", "TU_", "SU_", "ESTE_", "ESA_", "AQUEL_",
            // Prancis
            "LE_", "LA_", "LES_", "MON_", "TON_", "SON_", "CE_", "CETTE_", "CES_", "VOTRE_",
            // Jerman
            "DER_", "DIE_", "DAS_", "MEIN_", "DEIN_", "SEIN_", "DIESE_", "JENE_", "WELCHE_", "SOLCHE_",
            // Jepang
            "私の_", "あなたの_", "この_", "その_", "あの_", "どの_", "何の_", "誰の_", "どこの_", "いつの_",
            // Korea
            "내_", "너의_", "이_", "그_", "저_", "어느_", "무슨_", "누구의_", "어디_", "언제_",
            // Mandarin
            "我的_", "你的_", "他的_", "这个_", "那个_", "哪个_", "什么_", "谁的_", "哪里_", "何时_",
            // Arab
            "ال_", "هذا_", "ذلك_", "تلك_", "هؤلاء_", "أولئك_", "الذي_", "التي_", "من_", "ما_",
            // Hindi
            "मेरा_", "तेरा_", "यह_", "वह_", "कौन_", "क्या_", "कहाँ_", "कब_", "कैसे_", "क्यों_",
            "Lirik Jalanan", "Suara Kota", "Ritme Kehidupan", "Cerita Anak Muda", "Flow Nusantara", "Beat Perjuangan", "Rap dari Timur", "Suara Perlawanan", "Kisah Jalanan", "Lirik dan Ritme"
        ],
        inggris: [
            "Flow", "Lyric", "Beat", "Street", "Reality", "Rich", "Money", "Gang", "Boss", "Success",
            "Dream", "Hustle", "Struggle", "Ghetto", "Gold", "Diamond", "Savage", "West", "East", "South",
            "Street Anthem", "Urban Flow", "Life's Beat", "Voice of the Streets", "Rhythm and Rhyme", "Hustle and Grind", "City Tales", "East Side Flow", "Struggle and Triumph", "Lyrical Journey"
        ]
    },
    edm: {
        indonesia: [
            "Drop", "Bass", "Party", "Malam", "Lampu", "Klub", "Dance", "Hentakan", "Neon", "Euphoria",
            "Ekstasi", "Energi", "Trance", "House", "Detik", "Beats", "Gelombang", "Festival", "Rave", "Dunia",
            "Lampu Neon", "Dentuman Malam", "Festival Cahaya", "Energi Positif", "Pesta di Kota", "Gemerlap Malam", "Bass dan Lampu", "Ritme Malam", "Euforia Cahaya", "Dentuman Bass"
        ],
        inggris: [
            "Drop", "Bass", "Party", "Night", "Lights", "Club", "Dance", "Beat", "Neon", "Euphoria",
            "Ecstasy", "Energy", "Trance", "House", "Second", "Beats", "Wave", "Festival", "Rave", "World",
            "Neon Dreams", "Bass Pulse", "Festival Lights", "Positive Vibes", "City Party", "Night Glow", "Bass and Lights", "Rhythm of the Night", "Euphoria Beats", "Bass Drop"
        ]
    }
};

// Data judul lagu trend di Soundcart dengan typo sengaja dan random strings
const trendingTitles = {
    indonesia: [
        "CINTAKUU", "RNDU KAMU", "HRTIKU SAKIT", "KASIHQQ", "MALEMM INI", 
        "TERKHIR KALI", "KEMBALII PDAKU", "AKUU PERGI", "JNJI PALSU", "KNGEN KAMU",
        "MIMPII INDH", "SLALU STIA", "KNAPA BGITU", "SMUA SLAH", "MEMRI KTIKA",
        "TNPA DIRIMUU", "MNCINTAI KMU", "PRKARA CINTAA", "SHRUSNYA AKU", "BRSAMA LAGI",
        "P3NANT1AN", "4KUUU", "T3RL4LU S4KIT", "B3RL4LU", "DJALAN S3NDIRI",
        "XXXCinta", "YYHarapan", "ZZPergiZ", "AAKasihAA", "MMMalam",
        "TERKHIIRxx", "JiwaKUUU", "XXRinduYY", "KKK3nanganZZ", "JJJanjiTT"
    ],
    inggris: [
        "LUV U", "NEVR AGAIN", "FORVER WTH U", "ALWYS HRE", "BEAUTFUL DAY", 
        "MEMRS OF US", "PRVATE EMTION", "NEVR LET GO", "SOUL SRCH", "PROMIS ME",
        "SUNSHNE DAY", "RAINIG TEARS", "OCEN DEEP", "FIRE N ICE", "TIMLESS LUV",
        "STARZ ABOV", "HRT BEAT", "DAYDRMR", "NIGHTCRWLR", "PRVATE HEVN",
        "L0V3", "DR34M", "H34RT", "ST4R", "N1GHT",
        "XXXLove", "YYBeautyYY", "ZZNeverZ", "AATimeAA", "MMMemoryMM",
        "FOREVRxx", "SoulKUUU", "XXHeartYY", "KKKPromiseZZ", "JJJRainTT"
    ],
    hiphop: [
        "FL0W M4$T3R", "R3AL G", "MON3Y MAKR", "HUSTLE H4RD", "TRAP L1F3",
        "XXGANG$TA", "YY$AVAGE", "ZZDR34MZ", "AACA$HAA", "MMGRINDMM",
        "STREETZ", "B0$$UP", "CA$H FL0W", "D1AM0ND$", "FLEXXX",
        "RIICH", "THR0N3", "V1B3Z", "LYRIC4L", "BIG B0$$",
        "KINGZZ", "QU33N", "EMPIR3", "CROWN3D", "G0LD",
        "PH4R40H", "R0Y4L", "L3G3ND", "ICE B0$$", "M4FI4",
        "C4RT3L", "DR4G0N", "PH03NIX", "EAGL3", "T1G3R",
        "LI0N", "W0LF", "SN4K3", "SC0RPI0N", "F4LC0N"
    ],
    edm: [
        "DR0P B4$$", "B34T DROP", "R4VE ON", "CLUB N1GHT", "EUPH0RIA",
        "XXBEATZZ", "YYTRANCE", "ZZFESTIVL", "AADANCEAA", "MMWAVEMM",
        "N30N LIGHTZ", "BPM180", "HOU$E", "TRANCE4U", "BEATS4LIFE",
        "BASSXX", "NIGHTCL8", "V1BE", "ENERGYY", "DR0PDR0P",
        "PULZ3", "FL0W3R", "0C34N", "W4V3Z", "ST4RZ",
        "M00N", "SUNR1S3", "SUNS3T", "UNIV3RS3", "G4L4XY",
        "C0SM0S", "PL4N3T", "M3T30R", "C0M3T", "ST4RDUST",
        "N3BUL4", "S0L4R", "LUN4R", "4UR0R4", "SP4C3"
    ]
};

// Style Soundcart populer (format judul)
const soundcartStyles = [
    { prefix: "XXX", suffix: "" },           // XXXJudul
    { prefix: "", suffix: "XXX" },           // JudulXXX 
    { prefix: "", suffix: "ZZ" },            // JudulZZ
    { prefix: "YY", suffix: "" },            // YYJudul
    { prefix: "", suffix: "YY" },            // JudulYY
    { prefix: "", suffix: "KUU" },           // JudulKUU
    { prefix: "", suffix: "QQ" },            // JudulQQ
    { prefix: "", suffix: "MM" },            // JudulMM
    { prefix: "MM", suffix: "" },            // MMJudul
    { prefix: "", suffix: "x" },             // Judulx
    { prefix: "", suffix: "xx" },            // Judulxx
    { prefix: "", suffix: "z" },             // Judulz
    { prefix: "", suffix: "4U" },            // Judul4U
    { prefix: "", suffix: "KUUH" },          // JudulKUUH
    { prefix: "", suffix: "QUE" },           // JudulQUE
    { prefix: "", suffix: "KUH" },           // JudulKUH
    { prefix: "", suffix: "QUEE" },          // JudulQUEE
    { prefix: "", suffix: "KUUW" },          // JudulKUUW
    { prefix: "", suffix: "QOEH" },          // JudulQOEH
    { prefix: "", suffix: "KOEH" },          // JudulKOEH
    { prefix: "", suffix: "Q" },             // JudulQ
    { prefix: "", suffix: "K" },             // JudulK
    { prefix: "", suffix: "H" },             // JudulH
    { prefix: "", suffix: "W" },             // JudulW
    { prefix: "", suffix: "QH" }             // JudulQH
];

// Random strings & typo generators
const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const vowels = "AEIOU";
const consonants = "BCDFGHJKLMNPQRSTVWXYZ";

// Data untuk membuat nama acak berdasarkan negara
const nameData = {
    // Nama depan per negara
    firstName: {
        indonesia: ["Adi", "Budi", "Citra", "Dewi", "Eko", "Fitri", "Galih", "Hesti", "Indra", "Joko", 
                    "Kartika", "Lingga", "Maya", "Nugroho", "Olivia", "Putra", "Ratna", "Surya", "Tirta", "Utami",
                    "Rizky", "Andi", "Siti", "Nur", "Dian", "Fajar", "Hendra", "Lina", "Rina", "Yusuf", "Tono", "Wulan", "Rani", "Agus", "Bayu", "Cahya", "Dimas", "Eka", "Fikri"],
        amerika: ["James", "John", "Robert", "Michael", "William", "David", "Joseph", "Charles", "Thomas", "Daniel",
                 "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"],
        inggris: ["Oliver", "Harry", "George", "Noah", "Jack", "Leo", "Arthur", "Charlie", "Oscar", "Henry",
                 "Olivia", "Amelia", "Isla", "Ava", "Mia", "Isabella", "Sophia", "Rosie", "Lily", "Freya"],
        jepang: ["Haruto", "Yuto", "Sota", "Yuki", "Hayato", "Haruki", "Ryusei", "Koki", "Sora", "Sosuke",
                "Aoi", "Yui", "Hina", "Yuna", "Rio", "Mei", "Rin", "Koharu", "Miyu", "Akari",
                "Takumi", "Riku", "Hinata", "Ren", "Kaito", "Souta", "Haruna", "Airi", "Sakura", "Mio"],
        korea: ["Min-jun", "Ji-woo", "Seo-jun", "Do-yoon", "Joo-won", "Ha-jun", "Ye-jun", "Eun-woo", "Jun-seo", "Min-seok",
               "Seo-yeon", "Ji-yu", "Ha-eun", "Eun-seo", "Ye-eun", "Seo-ah", "Joo-eun", "Eun-ha", "Ji-eun", "Min-seo",
               "Hyun", "Jin", "Soo", "Min", "Hye", "Ji", "Eun", "Yoon", "Sun", "Young", "Hana", "Jae", "Seung", "Kyung", "Hyo", "Mi", "Chul", "Dong", "Kwon", "Sang"],
        spanyol: ["Alejandro", "Diego", "Mateo", "Santiago", "Matias", "Sebastian", "Gabriel", "Nicolas", "Samuel", "Martin",
                 "Sofia", "Isabella", "Valentina", "Camila", "Valeria", "Luciana", "Victoria", "Martina", "Gabriela", "Lucia"],
        prancis: ["Louis", "Gabriel", "Raphaël", "Jules", "Adam", "Lucas", "Léo", "Hugo", "Arthur", "Nathan",
                 "Emma", "Jade", "Louise", "Alice", "Chloé", "Lina", "Rose", "Anna", "Léa", "Mila"],
        jerman: ["Max", "Leon", "Paul", "Luka", "Finn", "Fynn", "Felix", "Jonas", "Luis", "Noah",
                "Emma", "Mia", "Hannah", "Emilia", "Lina", "Lea", "Leonie", "Charlotte", "Lilly", "Sophie"],
        australia: ["Jack", "Oliver", "William", "Noah", "Thomas", "Lucas", "James", "Liam", "Cooper", "Henry",
                  "Charlotte", "Olivia", "Amelia", "Mia", "Ava", "Isla", "Grace", "Ella", "Ivy", "Sophia"],
        kanada: ["Liam", "Noah", "William", "Benjamin", "Lucas", "Oliver", "Ethan", "Jacob", "Logan", "Mason",
                "Olivia", "Emma", "Charlotte", "Amelia", "Sophia", "Ava", "Emily", "Abigail", "Mia", "Elizabeth"]
    },
    // Nama belakang per negara
    lastName: {
        indonesia: ["Wijaya", "Kusuma", "Susanto", "Hidayat", "Gunawan", "Nugraha", "Permadi", "Santoso", "Wibowo", "Suryanto",
                   "Pranoto", "Saputra", "Utomo", "Firmansyah", "Setiawan", "Hartono", "Budiman", "Effendi", "Pratama", "Winata",
                   "Pratomo", "Saputro", "Wijaya", "Santika", "Rahman", "Putri", "Halim", "Suryadi", "Kurniawan", "Mahendra", "Sutrisno", "Halimah", "Sukma", "Ardiansyah", "Fauzi", "Hidayat", "Permana", "Sasmita", "Utari", "Wibisono"],
        amerika: ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
                 "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson"],
        inggris: ["Smith", "Jones", "Williams", "Taylor", "Davies", "Brown", "Wilson", "Evans", "Thomas", "Johnson",
                 "Roberts", "Walker", "Wright", "Thompson", "Robinson", "White", "Hall", "Wood", "Green", "Jackson",
                 "Taylor", "Anderson", "Harris", "Clark", "Lewis", "Walker", "Hall", "Allen", "Young", "King", "Wright", "Scott", "Green", "Adams", "Baker", "Nelson", "Carter", "Mitchell", "Perez", "Roberts"],
        jepang: ["佐藤", "鈴木", "高橋", "田中", "渡辺", "伊藤", "山本", "中村", "小林", "加藤",
                "橋本", "山田", "佐々木", "山口", "松本", "井上", "木村", "林", "清水", "斎藤",
                "山崎", "石川", "松田", "藤本", "岡田", "中田", "森田", "高木", "安藤", "福田", "川口", "大野", "小松", "杉山", "平田", "長谷川", "吉田", "田村", "中島", "山内"],
        korea: ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임",
               "한", "오", "서", "신", "권", "황", "안", "송", "유", "홍",
               "정", "최", "김", "박", "이", "윤", "장", "임", "한", "오", "서", "신", "권", "황", "안", "송", "유", "홍", "문", "조"],
        spanyol: ["García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín",
                 "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno", "Álvarez", "Romero", "Alonso", "Gutiérrez", "Navarro"],
        prancis: ["Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit", "Durand", "Leroy", "Moreau",
                 "Simon", "Laurent", "Lefèbvre", "Michel", "García", "David", "Bertrand", "Roux", "Vincent", "Fournier"],
        jerman: ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann",
                "Schäfer", "Koch", "Bauer", "Richter", "Klein", "Wolf", "Schröder", "Neumann", "Schwarz", "Zimmermann"],
        australia: ["Smith", "Jones", "Williams", "Brown", "Wilson", "Taylor", "Johnson", "White", "Martin", "Anderson",
                  "Thompson", "Thomas", "Walker", "Harris", "Lee", "Ryan", "Robinson", "Kelly", "King", "Wright"],
        kanada: ["Smith", "Brown", "Tremblay", "Martin", "Roy", "Wilson", "Johnson", "MacDonald", "Gagnon", "Taylor",
                "Williams", "Jones", "Lee", "White", "Côté", "Bouchard", "Gauthier", "Morin", "Lavoie", "Fortin"],
        india: ["सिंह", "कुमार", "पटेल", "गुप्ता", "शर्मा", "वर्मा", "यादव", "चौधरी", "जैन", "शाह",
                "मेहता", "भंडारी", "शर्मा", "कुमार", "पटेल", "गुप्ता", "शर्मा", "वर्मा", "यादव", "चौधरी"],
        malaysia: ["陈", "林", "张", "李", "陈", "黄", "蔡", "王", "卢", "许",
                  "张", "李", "陈", "黄", "蔡", "王", "卢", "许", "张", "李"],
        singapore: ["陈", "林", "张", "李", "陈", "黄", "蔡", "王", "卢", "许",
                  "张", "李", "陈", "黄", "蔡", "王", "卢", "许", "张", "李"],
        thailand: ["ชัย", "ทอง", "ชิน", "เหงียน", "ฟาน", "เหงียน", "ฟาน", "เหงียน", "ฟาน", "เหงียน",
                  "ชัย", "ทอง", "ชิน", "เหงียน", "ฟาน", "เหงียน", "ฟาน", "เหงียน", "ฟาน", "เหงียน"],
        vietnam: ["Nguyễn", "Lê", "Trần", "Phạm", "Hoàng", "Đỗ", "Nguyễn", "Lê", "Trần", "Phạm",
                  "Hoàng", "Đỗ", "Nguyễn", "Lê", "Trần", "Phạm", "Hoàng", "Đỗ", "Nguyễn", "Lê"],
        filipina: ["García", "Rodríguez", "Santos", "Reyes", "González", "Torres", "Rivera", "López", "Gómez", "Hernández",
                  "García", "Rodríguez", "Santos", "Reyes", "González", "Torres", "Rivera", "López", "Gómez", "Hernández"],
        brunei: ["Haji", "Mohd", "Abdul", "Bakri", "Jamil", "Ismail", "Kamil", "Jamil", "Ismail", "Kamil",
                 "Haji", "Mohd", "Abdul", "Bakri", "Jamil", "Ismail", "Kamil", "Jamil", "Ismail", "Kamil"],
        laos: ["ແສງ", "ພອງ", "ແສງ", "ພອງ", "ແສງ", "ພອງ", "ແສງ", "ພອງ", "ແສງ", "ພອງ",    
                "ແສງ", "ພອງ", "ແສງ", "ພອງ", "ແສງ", "ພອງ", "ແສງ", "ພອງ", "ແສງ", "ພອງ"],
        myanmar: ["ဟလာ", "သော်", "ဟလာ", "သော်", "ဟလာ", "သော်", "ဟလာ", "သော်", "ဟလာ", "သော်",
                 "ဟလာ", "သော်", "ဟလာ", "သော်", "ဟလာ", "သော်", "ဟလာ", "သော်", "ဟလာ", "သော်"],
        bhutan: ["དབང་འདུས", "རྡོ་རྗེ", "དབང་འདུས", "རྡོ་རྗེ", "དབང་འདུས", "རྡོ་རྗེ", "དབང་འདུས", "རྡོ་རྗེ", "དབང་འདུས", "རྡོ་རྗེ",
                 "དབང་འདུས", "རྡོ་རྗེ", "དབང་འདུས", "རྡོ་རྗེ", "དབང་འདུས", "རྡོ་རྗེ", "དབང་འདུས", "རྡོ་རྗེ", "དབང་འདུས", "རྡོ་རྗེ"],
        "sri lanka": ["පෙරේරා", "රාජපක්ෂ", "පෙරේරා", "රාජපක්ෂ", "පෙරේරා", "රාජපක්ෂ", "පෙරේරා", "රාජපක්ෂ", "පෙරේරා", "රාජපක්ෂ",
                    "පෙරේරා", "රාජපක්ෂ", "පෙරේරා", "රාජපක්ෂ", "පෙරේරා", "රාජපක්ෂ", "පෙරේරා", "රාජපක්ෂ", "පෙරේරා", "රාජපක්ෂ"],
        pakistan: ["خان", "احمد", "علی", "خالد", "اقبال", "خالد", "خان", "احمد", "علی", "خالد",
                   "اقبال", "خالد", "خان", "احمد", "علی", "خالد", "اقبال", "خالد", "خان", "احمد"],
        bangladesh: ["রহমান", "হোসেন", "খান", "ইসলাম", "চৌধুরী", "রহমান", "হোসেন", "খান", "ইসলাম", "চৌধুরী",
                     "রহমান", "হোসেন", "খান", "ইসলাম", "চৌধুরী", "রহমান", "হোসেন", "খান", "ইসলাম", "চৌধুরী"],
        nepal: ["शर्मा", "गुरुङ", "शर्मा", "गुरुङ", "शर्मा", "गुरुङ", "शर्मा", "गुरुङ", "शर्मा", "गुरुङ",
                "शर्मा", "गुरुङ", "शर्मा", "गुरुङ", "शर्मा", "गुरुङ", "शर्मा", "गुरुङ", "शर्मा", "गुरुङ"]
                

                }
};

// Menambahkan kata-kata yang lebih bervariasi untuk judul
const prefixWords = {
    indonesia: ["Saat", "Ketika", "Dalam", "Untuk", "Menuju", "Bersama", "Selalu", "Tak Pernah", "Selamanya", "Di Antara", "Tentang", "Kepada", "Melalui", "Sepanjang", "Melewati", "Hingga", "Sampai", "Menunggu", "Mencari", "Menemukan"],
    amerika: ["When", "In", "For", "With", "Always", "Never", "Forever", "Between", "Beyond", "After", "Through", "Until", "During", "Before", "Around", "Within", "Without", "Beside", "Among", "Towards"],
    jepang: ["時", "中で", "ために", "一緒に", "いつも", "決して", "永遠に", "間に", "超えて", "後で", "通じて", "まで", "前に", "周りに", "の中で", "なしで", "隣に", "の間で", "に向かって", "について"],
    inggris: ["When", "In", "For", "With", "Always", "Never", "Forever", "Between", "Beyond", "After", "Through", "Until", "During", "Before", "Around", "Within", "Without", "Beside", "Among", "Towards"],
    korea: ["때", "안에", "위해", "함께", "항상", "절대로", "영원히", "사이에", "너머", "후에", "통해", "까지", "동안", "전에", "주위에", "내에서", "없이", "옆에", "사이에서", "향해"],
    spanyol: ["Cuando", "En", "Para", "Con", "Siempre", "Nunca", "Por Siempre", "Entre", "Más Allá", "Después", "A Través", "Hasta", "Durante", "Antes", "Alrededor", "Dentro", "Sin", "Junto", "Entre", "Hacia"],
    prancis: ["Quand", "Dans", "Pour", "Avec", "Toujours", "Jamais", "Pour Toujours", "Entre", "Au-delà", "Après", "À travers", "Jusqu'à", "Pendant", "Avant", "Autour", "Dans", "Sans", "À côté", "Parmi", "Vers"],
    jerman: ["Wenn", "In", "Für", "Mit", "Immer", "Nie", "Für Immer", "Zwischen", "Jenseits", "Nach", "Durch", "Bis", "Während", "Vor", "Um", "Innerhalb", "Ohne", "Neben", "Unter", "Gegen"],
    australia: ["When", "In", "For", "With", "Always", "Never", "Forever", "Between", "Beyond", "After", "Through", "Until", "During", "Before", "Around", "Within", "Without", "Beside", "Among", "Towards"],
    kanada: ["When", "In", "For", "With", "Always", "Never", "Forever", "Between", "Beyond", "After", "Through", "Until", "During", "Before", "Around", "Within", "Without", "Beside", "Among", "Towards"],
    // Data untuk bahasa lainnya
};

const suffixWords = {
    indonesia: ["Yang Hilang", "Di Hatimu", "Terakhir", "Tak Terlupakan", "Abadi", "Yang Baru", "Untukmu", "Terdalam", "Sejati", "Tak Berujung"],
    inggris: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    jepang: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    korea: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    spanyol: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    prancis: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    jerman: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    australia: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    kanada: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],  
    india: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    malaysia: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    singapore: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    thailand: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    vietnam: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    filipina: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    brunei: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    laos: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    myanmar: ["Lost", "In Your Heart", "Last", "Unforgettable", "Forever", "New", "For You", "Deepest", "True", "Endless"],
    // Data untuk bahasa lainnya
};

// Pemetaan negara ke bahasa judul
const countryToLanguage = {
    "indonesia": "indonesia",
    "inggris": "inggris",
    "amerika": "inggris",
    "jepang": "jepang",
    "korea": "korea",
    "spanyol": "spanyol",
    "prancis": "prancis",
    "jerman": "jerman",
    "mandarin": "mandarin",
    "australia": "inggris",
    "kanada": "inggris",
    "india": "india",
    "malaysia": "malaysia",
    "singapore": "singapore",
    "thailand": "thailand",
    "vietnam": "vietnam",
    "filipina": "filipina",
    "brunei": "brunei",
    "laos": "laos",
    "myanmar": "myanmar",
    "brunei": "brunei",
    "laos": "laos",
    "myanmar": "myanmar",
    "india": "india",
    "pakistan": "pakistan",
    "bangladesh": "bangladesh",
    "nepal": "nepal",
    "bhutan": "bhutan",
    "sri lanka": "sri lanka"
    

};

// DOM Elements
const genreSelect = document.getElementById("genre");
const countrySelect = document.getElementById("country");
const quantityInput = document.getElementById("quantity");
const useTypoCheckbox = document.getElementById("use-typo");
const useTrendingCheckbox = document.getElementById("use-trending");
const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");
const previewElement = document.getElementById("preview");

// Variabel untuk menyimpan hasil generate
let generatedSongs = [];

// Set untuk menyimpan nama-nama artis dan penulis lagu yang sudah digunakan
let usedArtistNames = new Set();
let usedSongwriterNames = new Set();

// Event Listeners
generateBtn.addEventListener("click", generateTitles);
downloadBtn.addEventListener("click", downloadZip);

// Function untuk mereset set nama yang digunakan
function resetUsedNames() {
    usedArtistNames.clear();
    usedSongwriterNames.clear();
}

// Function untuk membuat random string dengan panjang tertentu
function generateRandomString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

// Function untuk membuat typo dalam kata
function createTypo(word) {
    if (!word || word.length <= 2) return word;
    
    const typoType = Math.floor(Math.random() * 5);
    let result = word;
    
    switch (typoType) {
        case 0: // Hilangkan huruf vokal acak
            const vowelPositions = [];
            for (let i = 0; i < word.length; i++) {
                if (vowels.includes(word[i].toUpperCase())) {
                    vowelPositions.push(i);
                }
            }
            
            if (vowelPositions.length > 0) {
                const posToRemove = vowelPositions[Math.floor(Math.random() * vowelPositions.length)];
                result = word.substring(0, posToRemove) + word.substring(posToRemove + 1);
            }
            break;
            
        case 1: // Ganda huruf acak
            const posToDouble = Math.floor(Math.random() * (word.length - 1)) + 1;
            result = word.substring(0, posToDouble) + word[posToDouble] + word.substring(posToDouble);
            break;
            
        case 2: // Ganti huruf dengan huruf samping di keyboard
            const keyboardNeighbors = {
                'a': 'sq', 'b': 'vn', 'c': 'xv', 'd': 'sf', 'e': 'wr', 'f': 'dg', 'g': 'fh',
                'h': 'gj', 'i': 'uo', 'j': 'hk', 'k': 'jl', 'l': 'k', 'm': 'n', 'n': 'bm',
                'o': 'ip', 'p': 'o', 'q': 'wa', 'r': 'et', 's': 'ad', 't': 'ry', 'u': 'yi',
                'v': 'cb', 'w': 'qe', 'x': 'zc', 'y': 'tu', 'z': 'x'

            };
            
            const posToReplace = Math.floor(Math.random() * word.length);
            const charToReplace = word[posToReplace].toLowerCase();
            
            if (keyboardNeighbors[charToReplace]) {
                const neighbors = keyboardNeighbors[charToReplace];
                const replacement = neighbors[Math.floor(Math.random() * neighbors.length)];
                result = word.substring(0, posToReplace) + replacement + word.substring(posToReplace + 1);
            }
            break;
            
        case 3: // Tambahkan huruf random
            const posToAdd = Math.floor(Math.random() * (word.length + 1));
            const charToAdd = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            result = word.substring(0, posToAdd) + charToAdd + word.substring(posToAdd);
            break;
            
        case 4: // Tukar posisi 2 huruf berdampingan
            if (word.length >= 3) {
                const posToSwap = Math.floor(Math.random() * (word.length - 1));
                result = word.substring(0, posToSwap) + 
                         word[posToSwap+1] + word[posToSwap] + 
                         word.substring(posToSwap + 2);
            }
            break;
    }
    
    return result;
}

// Fungsi helper untuk menambahkan prefix atau suffix
function addPrefixOrSuffix(title, language) {
    // Periksa apakah judul hanya satu kata tanpa spasi
    const isSingleWord = !title.includes(" ");
    
    // Jika judul hanya satu kata, selalu tambahkan prefix atau suffix
    if (isSingleWord) {
        // Jika ada prefix atau suffix tersedia, gunakan itu
        if (prefixWords[language] || suffixWords[language]) {
            // Pilih acak antara prefix atau suffix
            if (Math.random() > 0.5 && prefixWords[language]) {
                // Filter prefix yang mengandung "beat"
                const filteredPrefix = prefixWords[language].filter(word => !word.toLowerCase().includes("beat"));
                if (filteredPrefix.length > 0) {
                    title = filteredPrefix[Math.floor(Math.random() * filteredPrefix.length)] + " " + title;
                }
            } else if (suffixWords[language]) {
                // Filter suffix yang mengandung "beat"
                const filteredSuffix = suffixWords[language].filter(word => !word.toLowerCase().includes("beat"));
                if (filteredSuffix.length > 0) {
                    title = title + " " + filteredSuffix[Math.floor(Math.random() * filteredSuffix.length)];
                }
            }
        } else {
            // Jika tidak ada prefix/suffix untuk bahasa ini, tambahkan kata generik
            const genericWords = {
                "indonesia": ["City", "Kota", "Dunia", "Hati", "Jiwa"],
                "inggris": ["City", "World", "Heart", "Life", "Soul"],
                "spanyol": ["Ciudad", "Mundo", "Vida", "Alma", "Corazón"],
                "prancis": ["Ville", "Monde", "Vie", "Âme", "Cœur"],
                "jerman": ["Stadt", "Welt", "Leben", "Seele", "Herz"],
                "jepang": ["都市", "世界", "人生", "魂", "心"],
                "korea": ["도시", "세상", "인생", "영혼", "마음"],
                "mandarin": ["城市", "世界", "人生", "灵魂", "心"],
                "australia": ["City", "World", "Life", "Soul", "Heart", "Outback", "Desert", "Coast", "Beach", "Ocean", "Bush", "Land", "Wild", "Sun", "Nature"],
                "kanada": ["Ville", "Monde", "Vie", "Âme", "Cœur", "Nord", "Neige", "Forêt", "Lac", "Montagne", "Érable", "Rivière", "Glace", "Vent", "Bois"],
                "india": ["शहर", "दुनिया", "जीवन", "आत्मा", "दिल", "भावना", "दैवी", "पवित्र", "मंदिर", "नदी", "नृत्य", "रंग", "मसाला", "प्यार", "सपना"],
                "malaysia": ["Bandar", "Dunia", "Kehidupan", "Jiwa", "Hati", "Tropika", "Pulau", "Taman", "Hujan", "Pantai", "Hutan", "Laut", "Pasir", "Palma", "Langit"],
                "singapore": ["城市", "世界", "生活", "灵魂", "心", "都市", "现代", "未来", "光", "花园", "港口", "夜", "梦", "星", "湾"],
                "thailand": ["เมือง", "โลก", "ชีวิต", "จิตวิญญาณ", "หัวใจ", "วัด", "แม่น้ำ", "รอยยิ้ม", "สวน", "ชายหาด", "เกาะ", "เต้นรำ", "วิญญาณ", "พระอาทิตย์", "ความฝัน"],
                "vietnam": ["Thành phố", "Thế giới", "Cuộc sống", "Tâm hồn", "Trái tim", "Sông", "Núi", "Hòa bình", "Lúa", "Bờ biển", "Làng", "Bình minh", "Mưa", "Gió", "Giấc mơ"],
                "filipina": ["Lungsod", "Mundo", "Buhay", "Kaluluwa", "Puso", "Isla", "Dagat", "Karagatan", "Araw", "Perlas", "Sayaw", "Awit", "Pag-ibig", "Pag-asa", "Pangarap"],
                "brunei": ["Bandar", "Dunia", "Kehidupan", "Jiwa", "Hati", "Istana", "Sungai", "Emas", "Damai", "Taman", "Hutan", "Mimpi", "Diraja", "Fajar", "Langit"],
                "laos": ["ເມືອງ", "ໂລກ", "ຊີວິດ", "ຈິດໃຈ", "ຫົວໃຈ", "ແມ່ນ້ຳ", "ພູເຂົາ", "ວັດ", "ສັນຕິພາບ", "ປ່າໄມ້", "ບ້ານ", "ວິນຍານ", "ຕາເວັນຂຶ້ນ", "ເດືອນ", "ຄວາມຝັນ"],
                "myanmar": ["မြို့", "ကမ္ဘာ", "ဘဝ", "စိတ်", "နှလုံး", "ဘုရား", "မြစ်", "ရွှေ", "ငြိမ်းချမ်း", "အရုဏ်", "ဝိညာဉ်", "မြေ", "သန့်ရှင်း", "အလင်း", "အိပ်မက်"],
                "pakistan": ["شہر", "دنیا", "زندگی", "روح", "دل", "پہاڑ", "دریا", "صحرا", "وادی", "سحر", "روح", "زمین", "امن", "آسمان", "خواب"],
                "bangladesh": ["শহর", "বিশ্ব", "জীবন", "আত্মা", "হৃদয়", "নদী", "সবুজ", "গ্রাম", "বৃষ্টি", "বদ্বীপ", "আত্মা", "দেশ", "ভোর", "আশা", "স্বপ্ন"],
                "nepal": ["शहर", "संसार", "जीवन", "आत्मा", "मुटु", "पर्वत", "शिखर", "उपत्यका", "मन्दिर", "हिउँ", "आत्मा", "शान्ति", "पवित्र", "आकाश", "सपना"],
                "bhutan": ["གྲོང་ཁྱེར", "འཛམ་གླིང", "མི་ཚེ", "སེམས", "སྙིང", "འབྲུག", "རི", "ལྷ་ཁང", "ཞི་བདེ", "ལུང་པ", "སེམས་ཉིད", "དམ་པ", "རླུང", "ནམ་མཁའ", "རྨི་ལམ"],
                "sri lanka": ["නගරය", "ලෝකය", "ජීවිතය", "ආත්මය", "හදවත", "දිවයින", "පන්සල", "සාගරය", "මුතු", "තේ", "ආත්මය", "ශුද්ධ", "අරුණ", "හිරු", "සිහිනය"]
                
            };
            
            const defaultLang = genericWords[language] ? language : "inggris";
            const words = genericWords[defaultLang];
            title = title + " " + words[Math.floor(Math.random() * words.length)];
        }
        return title;
    }
    
    // Untuk judul yang sudah memiliki lebih dari satu kata,
    // gunakan logika yang sudah ada (70% kemungkinan tambah prefix/suffix)
    if (Math.random() > 0.3) {
        if (Math.random() > 0.5 && prefixWords[language]) {
            // Filter prefix yang mengandung "beat"
            const filteredPrefix = prefixWords[language].filter(word => !word.toLowerCase().includes("beat"));
            if (filteredPrefix.length > 0) {
                title = filteredPrefix[Math.floor(Math.random() * filteredPrefix.length)] + " " + title;
            }
        } else if (suffixWords[language]) {
            // Filter suffix yang mengandung "beat"
            const filteredSuffix = suffixWords[language].filter(word => !word.toLowerCase().includes("beat"));
            if (filteredSuffix.length > 0) {
                title = title + " " + filteredSuffix[Math.floor(Math.random() * filteredSuffix.length)];
            }
        }
    }
    
    return title;
}

// Fungsi untuk menghasilkan judul acak
function getRandomTitle(genre, country) {
    // Dapatkan bahasa berdasarkan negara
    const language = countryToLanguage[country] || "inggris";
    
    // Periksa apakah user ingin menggunakan Top 100 Hit (trending titles)
    const useTrending = useTrendingCheckbox.checked;
    
    // Jika user memilih menggunakan Top 100 Hit, maka prioritaskan menggunakan judul trending
    if (useTrending && Math.random() < 0.7) { // 70% kemungkinan menggunakan Top 100 Hit jika dicentang
        let title = getTrendingTitle(country, genre);
        // Filter kata "Beat" dari judul
        while (title.toLowerCase().includes("beat")) {
            title = getTrendingTitle(country, genre);
        }
        return title;
    }
    
    // Periksa apakah user ingin menggunakan typo atau tidak
    const useTypo = useTypoCheckbox.checked;
    
    // Jika user memilih menggunakan typo, maka ada kemungkinan menggunakan judul trend Soundcart
    if (useTypo && Math.random() < 0.35) {
        let title = getTrendingSoundcartTitle(country, genre);
        // Filter kata "Beat" dari judul
        while (title.toLowerCase().includes("beat")) {
            title = getTrendingSoundcartTitle(country, genre);
        }
        return title;
    }
    
    if (!titleData[genre] || !titleData[genre][language]) {
        // Fallback ke bahasa inggris jika tidak ada data untuk bahasa tertentu
        const fallbackWords = titleData.pop.inggris.filter(word => !word.toLowerCase().includes("beat"));
        return fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    }
    
    // Filter kata dasar yang mengandung "beat"
    const filteredBaseWords = titleData[genre][language].filter(word => !word.toLowerCase().includes("beat"));
    
    // Jika semua kata tersaring, gunakan default
    if (filteredBaseWords.length === 0) {
        const fallbackWords = titleData.pop[language] ? 
            titleData.pop[language].filter(word => !word.toLowerCase().includes("beat")) : 
            titleData.pop.inggris.filter(word => !word.toLowerCase().includes("beat"));
        
        if (fallbackWords.length === 0) {
            return "Judul"; // Ultimate fallback jika semua kata tersaring
        }
        
        let title = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
        return addPrefixOrSuffix(title, language);
    }
    
    let title = filteredBaseWords[Math.floor(Math.random() * filteredBaseWords.length)];
    return addPrefixOrSuffix(title, language);
}

// Menambahkan trend di Soundcart untuk judul lagu
function getTrendingSoundcartTitle(country, genre) {
    // Dapatkan bahasa berdasarkan negara
    const language = countryToLanguage[country] || "inggris";
    const defaultLanguage = language === 'indonesia' ? 'indonesia' : 'inggris';
    
    // Pastikan user ingin menggunakan typo
    const useTypo = useTypoCheckbox.checked;
    
    // Jika tidak ingin menggunakan typo, kembalikan judul normal
    if (!useTypo) {
        const baseWords = titleData[genre] && titleData[genre][defaultLanguage] ? 
            titleData[genre][defaultLanguage] : titleData.pop[defaultLanguage];
        
        // Filter kata-kata yang mengandung "beat"
        const filteredWords = baseWords.filter(word => !word.toLowerCase().includes("beat"));
        if (filteredWords.length === 0) {
            return "Judul Musik"; // Ultimate fallback
        }
        
        // Ambil kata acak dan pastikan ada kata kedua
        let title = filteredWords[Math.floor(Math.random() * filteredWords.length)];
        
        // Pastikan judul memiliki minimal dua kata
        return ensureMultipleWords(title, defaultLanguage);
    }
    
    // 40% kemungkinan menggunakan judul yang sedang trend dari genre spesifik jika tersedia
    if (Math.random() < 0.4) {
        // Jika genre hiphop/edm memiliki judul trend khusus, gunakan itu
        if ((genre === 'hiphop' || genre === 'edm') && trendingTitles[genre]) {
            // Filter judul yang mengandung "beat"
            const filteredTitles = trendingTitles[genre].filter(title => 
                !title.toLowerCase().includes("beat"));
            
            if (filteredTitles.length > 0) {
                let title = filteredTitles[Math.floor(Math.random() * filteredTitles.length)];
                
                // Pastikan judul memiliki minimal dua kata atau tambahkan kata kedua
                if (!title.includes(" ")) {
                    return addSecondWordToTrendingTitle(title, defaultLanguage);
                }
                
                return title;
            }
        }
        
        // Jika tidak, gunakan dari bahasa yang sesuai
        if (trendingTitles[defaultLanguage]) {
            // Filter judul yang mengandung "beat"
            const filteredTitles = trendingTitles[defaultLanguage].filter(title => 
                !title.toLowerCase().includes("beat"));
            
            if (filteredTitles.length > 0) {
                let title = filteredTitles[Math.floor(Math.random() * filteredTitles.length)];
                
                // Pastikan judul memiliki minimal dua kata atau tambahkan kata kedua
                if (!title.includes(" ")) {
                    return addSecondWordToTrendingTitle(title, defaultLanguage);
                }
                
                return title;
            }
        }
    }
    
    // Generate judul baru dengan random string & typo
    let baseWords = [];
    
    // Pilih kata berdasarkan genre jika tersedia, jika tidak gunakan pop
    if (titleData[genre] && titleData[genre][defaultLanguage]) {
        baseWords = titleData[genre][defaultLanguage];
    } else {
        baseWords = titleData.pop[defaultLanguage];
    }
    
    // Filter kata-kata yang mengandung "beat"
    baseWords = baseWords.filter(word => !word.toLowerCase().includes("beat"));
    if (baseWords.length === 0) {
        return "Judul Musik"; // Ultimate fallback
    }
    
    let title = baseWords[Math.floor(Math.random() * baseWords.length)];
    
    // 70% kemungkinan membuat typo
    if (Math.random() < 0.7) {
        title = createTypo(title);
        
        // 40% kemungkinan tambahkan typo kedua
        if (Math.random() < 0.4) {
            title = createTypo(title);
        }
    }
    
    // Pastikan typo tidak membuat judul mengandung kata "beat"
    if (title.toLowerCase().includes("beat")) {
        // Coba lagi dengan judul berbeda
        return getTrendingSoundcartTitle(country, genre);
    }
    
    // 60% kemungkinan menggunakan style Soundcart populer
    if (Math.random() < 0.6) {
        const style = soundcartStyles[Math.floor(Math.random() * soundcartStyles.length)];
        title = style.prefix + title + style.suffix;
    } 
    // 40% kemungkinan tambahkan random string
    else if (Math.random() < 0.7) {
        const randomStrLength = Math.floor(Math.random() * 4) + 1; // 1-4 karakter
        const randomStr = generateRandomString(randomStrLength);
        
        if (Math.random() < 0.5) {
            title = randomStr + title;
        } else {
            title += randomStr;
        }
    }
    
    // 50% kemungkinan semua huruf kapital
    if (Math.random() < 0.5) {
        title = title.toUpperCase();
    }
    
    // 35% kemungkinan ganti beberapa huruf vokal/karakter dengan angka dan simbol
    if (Math.random() < 0.35) {
        title = title.replace(/a/gi, () => Math.random() < 0.7 ? '4' : 'a')
                     .replace(/e/gi, () => Math.random() < 0.7 ? '3' : 'e')
                     .replace(/i/gi, () => Math.random() < 0.7 ? '1' : 'i')
                     .replace(/o/gi, () => Math.random() < 0.7 ? '0' : 'o')
                     .replace(/s/gi, () => Math.random() < 0.3 ? '$' : 's');
        
        // 20% kemungkinan tambahan simbol $, !, #
        if (Math.random() < 0.2) {
            const symbols = ['$', '!', '#', '*', '+'];
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            
            if (Math.random() < 0.5) {
                title = randomSymbol + title;
            } else {
                title += randomSymbol;
            }
        }
    }
    
    // Final check untuk kata "beat"
    if (title.toLowerCase().includes("beat")) {
        // Ganti "beat" dengan "rhym" jika muncul
        title = title.replace(/beat/gi, "rhym");
    }
    
    // Pastikan hasil akhir memiliki minimal 2 kata
    if (!title.includes(" ")) {
        return addSecondWordToTrendingTitle(title, defaultLanguage);
    }
    
    return title;
}

// Fungsi helper untuk memastikan trending title selalu memiliki minimal dua kata
function addSecondWordToTrendingTitle(title, language) {
    // Kata-kata trend yang bisa ditambahkan sebagai kata kedua
    const trendingSecondWords = {
        "indonesia": ["CITY", "HITZ", "VIBE", "ZONE", "ERA", "FEELZ", "MOOD", "WORLD", "LIFE", "STYLE"],
        "inggris": ["CITY", "VIBES", "ZONE", "ERA", "FEELZ", "MOOD", "WORLD", "LIFE", "TYPE", "STYLE"]
    };
    
    const defaultLang = trendingSecondWords[language] ? language : "inggris";
    const secondWord = trendingSecondWords[defaultLang][Math.floor(Math.random() * trendingSecondWords[defaultLang].length)];
    
    // Gabungkan dengan spasi atau simbol
    const connectors = [" ", " ", " ", "-", "_", ".", "~"];
    const connector = connectors[Math.floor(Math.random() * connectors.length)];
    
    return title + connector + secondWord;
}

// Fungsi untuk memastikan judul memiliki minimal dua kata
function ensureMultipleWords(title, language) {
    // Jika sudah memiliki spasi, berarti sudah lebih dari satu kata
    if (title.includes(" ")) {
        return title;
    }
    
    // Kata-kata yang bisa ditambahkan sebagai kata kedua
    const secondWords = {
        "indonesia": ["City", "Kota", "Dunia", "Hati", "Jiwa", "Life", "Story", "Melody"],
        "inggris": ["City", "World", "Heart", "Life", "Soul", "Story", "Melody", "Tune"],
        "spanyol": ["Ciudad", "Mundo", "Vida", "Alma", "Historia", "Melodía"],
        "prancis": ["Ville", "Monde", "Vie", "Âme", "Histoire", "Mélodie"],
        "jerman": ["Stadt", "Welt", "Leben", "Seele", "Geschichte", "Melodie"],
        "jepang": ["都市", "世界", "人生", "魂", "物語", "メロディー"],
        "korea": ["도시", "세상", "인생", "영혼", "이야기", "멜로디"],
        "mandarin": ["城市", "世界", "人生", "灵魂", "故事", "旋律"]
    };
    
    const defaultLang = secondWords[language] ? language : "inggris";
    const secondWord = secondWords[defaultLang][Math.floor(Math.random() * secondWords[defaultLang].length)];
    
    return title + " " + secondWord;
}

// Fungsi untuk menghasilkan nama artis acak berdasarkan negara
function getRandomArtist(country) {
    if (!nameData.firstName[country] || !nameData.lastName[country]) {
        // Fallback ke Indonesia jika negara tidak ditemukan
        country = "indonesia";
    }
    
    const firstNames = nameData.firstName[country];
    const lastNames = nameData.lastName[country];
    
    // Tambahkan jumlah maksimum percobaan untuk menghindari infinite loop
    const maxAttempts = 1000;
    let attempts = 0;
    let name = "";
    
    // Coba generate nama sampai mendapatkan nama unik atau mencapai batas percobaan
    do {
        // Pilih nama depan dan belakang acak
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        // 30% kemungkinan hanya menggunakan nama depan (untuk nama panggung)
        if (Math.random() < 0.3) {
            // Nama panggung/artistik (misalnya: Adele, Madonna, dll)
            name = firstName;
        } else {
            // Format nama sesuai negara
            if (country === "jepang" || country === "korea") {
                name = lastName + " " + firstName; // Format Asia Timur: family name dulu
            } else {
                name = firstName + " " + lastName; // Format Barat: given name dulu
            }
        }
        
        // Jika set nama sudah terlalu besar (hampir exhausted), tambahkan random suffix
        if (attempts > maxAttempts / 2 && !usedArtistNames.has(name)) {
            name = name + " " + Math.floor(Math.random() * 1000);
        }
        
        // Jika percobaan terlalu banyak, tambahkan UUID untuk memastikan keunikan
        if (attempts > maxAttempts * 0.9) {
            name = name + " " + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
            break;
        }
        
        attempts++;
    } while (usedArtistNames.has(name) && attempts < maxAttempts);
    
    // Tandai nama ini sebagai sudah digunakan
    usedArtistNames.add(name);
    
    return name;
}

// Fungsi untuk menghasilkan nama penulis lagu acak
function getRandomSongwriter(country) {
    if (!nameData.firstName[country] || !nameData.lastName[country]) {
        // Fallback ke Indonesia jika negara tidak ditemukan
        country = "indonesia";
    }
    
    const firstNames = nameData.firstName[country];
    const lastNames = nameData.lastName[country];
    
    // Tambahkan jumlah maksimum percobaan untuk menghindari infinite loop
    const maxAttempts = 1000;
    let attempts = 0;
    let name = "";
    
    // Coba generate nama sampai mendapatkan nama unik atau mencapai batas percobaan
    do {
        // Pilih nama depan dan belakang acak
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        // 30% kemungkinan hanya menggunakan nama depan (untuk nama panggung)
        if (Math.random() < 0.3) {
            // Nama panggung/artistik (misalnya: Adele, Madonna, dll)
            name = firstName;
        } else {
            // Format nama sesuai negara
            if (country === "jepang" || country === "korea") {
                name = lastName + " " + firstName; // Format Asia Timur: family name dulu
            } else {
                name = firstName + " " + lastName; // Format Barat: given name dulu
            }
        }
        
        // Jika set nama sudah terlalu besar (hampir exhausted), tambahkan random suffix
        if (attempts > maxAttempts / 2 && !usedSongwriterNames.has(name)) {
            name = name + " " + Math.floor(Math.random() * 1000);
        }
        
        // Jika percobaan terlalu banyak, tambahkan UUID untuk memastikan keunikan
        if (attempts > maxAttempts * 0.9) {
            name = name + " " + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
            break;
        }
        
        attempts++;
    } while (usedSongwriterNames.has(name) && attempts < maxAttempts);
    
    // Tandai nama ini sebagai sudah digunakan
    usedSongwriterNames.add(name);
    
    return name;
}

// Fungsi untuk menghasilkan judul-judul musik
function generateTitles() {
    const genre = genreSelect.value;
    const country = countrySelect.value;
    let quantity = parseInt(quantityInput.value);
    
    // Validasi input
    if (isNaN(quantity) || quantity < 1) quantity = 1;
    
    // Tambahkan peringatan jika jumlah terlalu besar
    if (quantity > 10000) {
        const confirmGenerate = confirm(`Anda mencoba menghasilkan ${quantity} judul. Jumlah yang sangat besar dapat menyebabkan browser lambat atau crash. Lanjutkan?`);
        if (!confirmGenerate) {
            return;
        }
    }
    
    // Reset collections
    generatedSongs = [];
    resetUsedNames();
    previewElement.innerHTML = "";
    
    // Tampilkan pesan proses jika jumlah besar
    if (quantity > 1000) {
        previewElement.innerHTML = `<p class="processing-message">Menghasilkan ${quantity} judul, mohon tunggu...</p>`;
    }
    
    // Tampilkan loading indicator
    const loadingIndicator = document.getElementById("loading-indicator");
    const loadingProgress = document.getElementById("loading-progress");
    loadingIndicator.style.display = "flex";
    
    // Gunakan setTimeout untuk memberi waktu browser merender UI sebelum proses berat dimulai
    setTimeout(() => {
        // Gunakan chunking untuk proses besar agar UI tetap responsif
        const chunkSize = 1000; // Proses 1000 item sekaligus
        let processed = 0;
        
        function processChunk() {
            const start = processed;
            const end = Math.min(processed + chunkSize, quantity);
            
            for (let i = start; i < end; i++) {
                const title = getRandomTitle(genre, country);
                const artist = getRandomArtist(country);
                const songwriter = getRandomSongwriter(country);
                
                // Simpan data untuk download nanti
                generatedSongs.push({
                    title,
                    artist,
                    songwriter
                });
                
                // Tampilkan preview (maksimal 10)
                if (i < 10) {
                    const songItem = document.createElement("div");
                    songItem.className = "song-item";
                    songItem.innerHTML = `
                        <div class="song-title">${title}</div>
                        <div class="song-artist">Artis: ${artist}</div>
                        <div class="song-writer">Penulis: ${songwriter}</div>
                    `;
                    previewElement.appendChild(songItem);
                }
                
                // Update progress
                processed++;
                if (processed % (chunkSize / 10) === 0 || processed === quantity) {
                    const percent = Math.round((processed / quantity) * 100);
                    loadingProgress.textContent = `${percent}%`;
                }
            }
            
            // Update progress
            const percent = Math.round((processed / quantity) * 100);
            loadingProgress.textContent = `${percent}%`;
            
            // Jika masih ada yang perlu diproses, jadwalkan chunk berikutnya
            if (processed < quantity) {
                setTimeout(processChunk, 0); // Beri waktu UI update
            } else {
                // Selesai
                loadingIndicator.style.display = "none";
                
                // Jika lebih dari 10 judul
                if (quantity > 10) {
                    const moreInfo = document.createElement("div");
                    moreInfo.className = "more-info";
                    moreInfo.textContent = `...dan ${quantity - 10} judul lainnya`;
                    previewElement.appendChild(moreInfo);
                }
                
                // Aktifkan tombol download
                downloadBtn.disabled = false;
            }
        }
        
        // Mulai proses chunking
        processChunk();
    }, 100); // Tunggu 100ms untuk UI render
}

// Fungsi untuk mengunduh file ZIP
async function downloadZip() {
    if (generatedSongs.length === 0) {
        alert("Silakan generate judul terlebih dahulu!");
        return;
    }
    
    // Peringatan jika jumlah file sangat besar
    if (generatedSongs.length > 10000) {
        const confirmDownload = confirm(`Anda akan mengunduh ${generatedSongs.length} file. Proses ini dapat memakan waktu lama dan mungkin membebani browser. Lanjutkan?`);
        if (!confirmDownload) {
            return;
        }
    }
    
    // Tampilkan loading indicator
    const loadingIndicator = document.getElementById("loading-indicator");
    const loadingProgress = document.getElementById("loading-progress");
    const loadingText = document.querySelector(".loading-text");
    loadingIndicator.style.display = "flex";
    loadingText.textContent = "Membuat ZIP...";
    loadingProgress.textContent = "0%";
    
    // Gunakan setTimeout untuk memberi waktu browser merender UI sebelum proses berat dimulai
    setTimeout(async () => {
        try {
            const zip = new JSZip();
            
            // Membuat file untuk judul
            let titleContent = "";
            generatedSongs.forEach(song => {
                titleContent += song.title + "\n";
            });
            zip.file("judul_musik.txt", titleContent);
            loadingProgress.textContent = "25%";
            
            // Membuat file untuk artis
            let artistContent = "";
            generatedSongs.forEach(song => {
                artistContent += song.artist + "\n";
            });
            zip.file("artis.txt", artistContent);
            loadingProgress.textContent = "50%";
            
            // Membuat file untuk penulis lagu
            let songwriterContent = "";
            generatedSongs.forEach(song => {
                songwriterContent += song.songwriter + "\n";
            });
            zip.file("penulis_lagu.txt", songwriterContent);
            loadingProgress.textContent = "75%";
            
            // Untuk file detail individu, gunakan chunking untuk file yang banyak
            if (generatedSongs.length > 1000) {
                loadingText.textContent = "Membuat file detail...";
                
                const chunkSize = 1000;
                let processed = 0;
                
                const totalChunks = Math.ceil(generatedSongs.length / chunkSize);
                let currentChunk = 0;
                
                while (processed < generatedSongs.length) {
                    const end = Math.min(processed + chunkSize, generatedSongs.length);
                    
                    for (let i = processed; i < end; i++) {
                        const song = generatedSongs[i];
                        const detail = `Judul: ${song.title}\nArtis: ${song.artist}\nPenulis: ${song.songwriter}`;
                        zip.file(`lagu_${i + 1}.txt`, detail);
                    }
                    
                    processed = end;
                    currentChunk++;
                    
                    // Update progress (75% - 90%)
                    const percent = 75 + Math.round((currentChunk / totalChunks) * 15);
                    loadingProgress.textContent = `${percent}%`;
                    
                    // Beri kesempatan UI untuk update
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
            } else {
                // Untuk jumlah kecil, bisa langsung proses sekaligus
                generatedSongs.forEach((song, index) => {
                    const detail = `Judul: ${song.title}\nArtis: ${song.artist}\nPenulis: ${song.songwriter}`;
                    zip.file(`lagu_${index + 1}.txt`, detail);
                });
                loadingProgress.textContent = "90%";
            }
            
            // Generate ZIP dan download
            loadingText.textContent = "Menghasilkan file ZIP...";
            const content = await zip.generateAsync({ 
                type: "blob",
                compression: "DEFLATE",
                compressionOptions: {
                    level: 6 // Level kompresi sedang (1-9)
                }
            }, metadata => {
                loadingProgress.textContent = `${90 + Math.round(metadata.percent / 10)}%`;
            });
            
            loadingProgress.textContent = "100%";
            saveAs(content, "generated_music_titles.zip");
            
            // Sembunyikan loading indicator setelah selesai
            setTimeout(() => {
                loadingIndicator.style.display = "none";
                
                // Tampilkan kembali preview jika sebelumnya diganti dengan pesan proses
                if (generatedSongs.length > 1000) {
                    // Regenerate preview
                    previewElement.innerHTML = "";
                    for (let i = 0; i < Math.min(10, generatedSongs.length); i++) {
                        const song = generatedSongs[i];
                        const songItem = document.createElement("div");
                        songItem.className = "song-item";
                        songItem.innerHTML = `
                            <div class="song-title">${song.title}</div>
                            <div class="song-artist">Artis: ${song.artist}</div>
                            <div class="song-writer">Penulis: ${song.songwriter}</div>
                        `;
                        previewElement.appendChild(songItem);
                    }
                    
                    if (generatedSongs.length > 10) {
                        const moreInfo = document.createElement("div");
                        moreInfo.className = "more-info";
                        moreInfo.textContent = `...dan ${generatedSongs.length - 10} judul lainnya`;
                        previewElement.appendChild(moreInfo);
                    }
                }
            }, 1000); // Tampilkan 100% selama 1 detik sebelum hilang
        } catch (error) {
            loadingIndicator.style.display = "none";
            alert("Terjadi kesalahan saat membuat ZIP: " + error.message);
            console.error("Error creating ZIP: ", error);
        }
    }, 100); // Tunggu 100ms untuk UI render
}

// Inisialisasi halaman
function initPage() {
    // Tambahkan placeholder saat halaman dimuat
    previewElement.innerHTML = `<p class="empty-message">Hasil judul akan muncul di sini...</p>`;
}

// Panggil fungsi inisialisasi
initPage();

// Fungsi untuk mendapatkan judul dari Top 100 Hit
function getTrendingTitle(country, genre) {
    // Dapatkan bahasa berdasarkan negara
    const language = countryToLanguage[country] || "inggris";
    const defaultLanguage = language === 'indonesia' ? 'indonesia' : 'inggris';
    
    // Data judul-judul Top 100 Hit berdasarkan genre dan bahasa
    const top100Titles = {
        pop: {
            indonesia: [
                "Rindu Selamanya", "Cinta Abadi", "Hati yang Terluka", "Kenangan Indah", 
                "Bintang di Langit Malam", "Kasih Tak Sampai", "Mimpi dan Harapan",
                "Waktu yang Terbuang", "Selamanya Denganmu", "Cinta Sejati"
            ],
            inggris: [
                "Forever Love", "Heart of Gold", "Beautiful Memory", "Stars in the Sky",
                "Memories of Us", "Lost in Time", "Soul Connection", "Promise of Love",
                "Dreams Come True", "Eternal Flame"
            ]
        },
        rock: {
            indonesia: [
                "Api Membara", "Gelora Jiwa", "Bebas Melawan", "Semangat Membara",
                "Kerasnya Hidup", "Darah Muda", "Teriakan Pemberontak", "Menghadapi Dunia",
                "Panggung Kehidupan", "Dentuman Keras", "Bara Api Dendam", "Perjuangan Hidup",
                "Suara Kebebasan", "Amarah Membara", "Semangat Juang", "Berontak Melawan",
                "Jiwa Merdeka", "Gelora Masa Muda", "Teriakan Hati", "Kobaran Semangat",
                "Darah Pemberontak", "Nyala Api Jiwa", "Kerasnya Dunia", "Suara Revolusi",
                "Gelombang Perubahan", "Semangat Pantang Menyerah", "Bara Dendam",
                "Pemberontakan Jiwa", "Teriakan Kemenangan", "Gelora Perjuangan"
            ],
            inggris: [
                "Fire Within", "Rebel Heart", "Thunderstruck Soul", "Freedom Fighters",
                "Against the World", "Burning Desire", "Darkness Falls", "Breaking Free",
                "Wild Spirits", "Raging Storm", "Flames of Vengeance", "Life's Battle",
                "Voice of Freedom", "Burning Rage", "Fighting Spirit", "Rebel Rising",
                "Free Soul", "Youth's Fire", "Heart's Cry", "Blazing Spirit",
                "Rebel Blood", "Soul on Fire", "Hard World", "Revolution's Voice",
                "Waves of Change", "Never Surrender", "Vengeance Flames",
                "Soul Rebellion", "Victory Cry", "Battle Glory"
            ]
        },
        jazz: {
            indonesia: [
                "Malam di Kafe", "Alunan Saxophone", "Harmoni Malam", "Klasik Abadi",
                "Biru Langit", "Melodi Hujan", "Gemerlap Kota", "Suara Malam",
                "Nostalgia Piano", "Jiwa Malam", "Senja di Piano", "Irama Malam",
                "Klasik Senja", "Melodi Senja", "Alunan Malam", "Ritme Kota",
                "Harmoni Senja", "Saxophone Senja", "Piano Hujan", "Kafe Malam",
                "Nostalgia Senja", "Melodi Klasik", "Suara Saxophone", "Irama Senja",
                "Nada Malam", "Harmoni Senja", "Alunan Piano", "Senja Bercerita",
                "Malam Sunyi", "Ritme Klasik"
            ],
            inggris: [
                "Blue Moon", "Midnight Jazz", "Saxophone Dreams", "City Lights",
                "Rainy Day Blues", "Classic Harmony", "Piano Nostalgia", "Soul Voice",
                "Cafe Memories", "Night Voice", "Sunset at Piano", "Night Rhythm",
                "Classic Evening", "Twilight Melody", "Night Tunes", "City Rhythm",
                "Night Harmony", "Sunset Saxophone", "Rain Piano", "Cafe Night",
                "Evening Nostalgia", "Classic Melody", "Saxophone Voice", "Evening Rhythm",
                "Night Notes", "Twilight Harmony", "Piano Tunes", "Evening Tales",
                "Silent Night", "Classic Rhythm"
            ]
        },
        hiphop: {
            indonesia: [
                "Jalanan Kota", "Realita Kehidupan", "Perjuangan dan Mimpi", "Cerita dari Timur",
                "Gaya Hidup", "Dunia Baru", "Generasi Kita", "Suara Rakyat",
                "Flow dari Timur", "Lirik dan Ritme", "Kisah Jalanan", "Suara Kota",
                "Rap Nusantara", "Cerita Hidup", "Irama Jalanan", "Rap dari Timur",
                "Suara Anak Muda", "Ritme Kota", "Flow Nusantara", "Lirik Kehidupan",
                "Rap Perjuangan", "Suara Generasi", "Irama Timur", "Cerita Rakyat",
                "Flow Jalanan", "Rap Kota", "Lirik dari Hati", "Cerita Anak Jalanan",
                "Suara Perjuangan", "Ritme Kehidupan"
            ],
            inggris: [
                "Street Life", "Reality Check", "Hustle Hard", "City Dreams",
                "Rise Up", "East Side Story", "Our Generation", "Voice of the People",
                "Rhythm and Flow", "Lyrical Path", "Street Tales", "City Voice",
                "Urban Tales", "Life Story", "Street Rhythm", "Eastern Flow",
                "Youth Voice", "City Beat", "Flow Nation", "Life Lyrics",
                "Struggle Path", "Generation Voice", "Eastern Rhythm", "People's Story",
                "Street Flow", "City Tales", "Heart Lyrics", "Street Kids Story",
                "Struggle Voice", "Life Rhythm"
            ]
        },
        edm: {
            indonesia: [
                "Malam Gemerlap", "Dentuman Bass", "Festival Musim Panas", "Energi Positif",
                "Lampu Disko", "Dunia Malam", "Ekstasi Cahaya", "Kehidupan Pesta",
                "Neon dan Bass", "Gemerlap Kota", "Malam Berdentum", "Irama Disko",
                "Festival Cahaya", "Energi Malam", "Lampu Gemerlap", "Dunia Disko",
                "Malam Bersinar", "Pesta Cahaya", "Neon Malam", "Dentuman Keras",
                "Festival Sinar", "Energi Disko", "Lampu Malam", "Dunia Gemerlap",
                "Ekstasi Cahaya", "Pesta Bass", "Neon Festival", "Malam Berkilau",
                "Cahaya Gemerlap", "Dentuman Malam"
            ],
            inggris: [
                "Neon Lights", "Bass Drop", "Summer Festival", "Positive Energy",
                "Disco Lights", "Night Life", "Light Ecstasy", "Party Life",
                "Neon Bass", "City Lights", "Night Bass", "Disco Rhythm",
                "Light Festival", "Night Energy", "Glowing Lights", "Disco World",
                "Night Glow", "Light Party", "Neon Night", "Hard Drop",
                "Glow Festival", "Disco Energy", "Night Lights", "Glowing World",
                "Light Ecstasy", "Bass Party", "Neon Festival", "Night Shine",
                "Glowing Bright", "Night Drop"
            ]
        }
    };
    
    // Coba ambil judul dari genre spesifik
    if (top100Titles[genre] && top100Titles[genre][defaultLanguage]) {
        const titles = top100Titles[genre][defaultLanguage].filter(title => !title.toLowerCase().includes("beat"));
        if (titles.length > 0) {
            return titles[Math.floor(Math.random() * titles.length)];
        }
    }
    
    // Jika tidak ada, gunakan judul dari trendingTitles
    // Tapi filter untuk mendapatkan yang "lebih bersih" (yang memiliki spasi)
    if (trendingTitles[defaultLanguage]) {
        const titles = trendingTitles[defaultLanguage]
            .filter(title => title.includes(" ") && !title.toLowerCase().includes("beat"));
        
        if (titles.length > 0) {
            return titles[Math.floor(Math.random() * titles.length)];
        }
    }
    
    // Jika masih tidak ada, gunakan nama generik dari genre
    const genreNames = {
        pop: "Pop",
        rock: "Rock",
        jazz: "Jazz",
        hiphop: "Hip Hop",
        edm: "EDM",
        rnb: "R&B",
        country: "Country",
        folk: "Folk",
        classical: "Classical",
        blues: "Blues",
        metal: "Metal",
        reggae: "Reggae",
        punk: "Punk",
        indie: "Indie",
        kpop: "K-Pop",
        dangdut: "Dangdut"
    };
    
    // Ambil nama genre dan tambahkan kata kedua yang populer
    const genreName = genreNames[genre] || "Music";
    const topWords = defaultLanguage === 'indonesia' ? 
        ["Hits", "Terbaik", "Popular", "Terhits", "Chart"] : 
        ["Hits", "Top", "Popular", "Chart", "List"];
    
    return genreName + " " + topWords[Math.floor(Math.random() * topWords.length)];
}