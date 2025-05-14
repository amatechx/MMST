import os
import time
import random
import json
import argparse
import logging
import threading
import concurrent.futures
import tkinter as tk
from tkinter import ttk, scrolledtext, filedialog, messagebox
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from typing import List, Dict, Any, Optional, Union

try:
    from fake_useragent import UserAgent
except ImportError:
    UserAgent = None

try:
    from selenium import webdriver
    from selenium.webdriver.chrome.service import Service
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.common.by import By
    from selenium.common.exceptions import WebDriverException, TimeoutException
except ImportError:
    webdriver = None

# Konfigurasi logging
LOG_FORMAT = "%(asctime)s [%(levelname)s] %(message)s"
logging.basicConfig(
    level=logging.INFO,
    format=LOG_FORMAT,
    handlers=[
        logging.FileHandler("scraper_log.txt", encoding="utf-8"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("StealthScraper")

# ==================================
# BAGIAN 1: PROXY MANAGER & SCRAPER
# ==================================

class ProxyScraper:
    """
    Scraper untuk mengambil daftar proxy dari berbagai sumber
    dan memformatnya untuk digunakan dengan Stealth Scraper.
    """
    
    def __init__(self, output_file="proxies.txt"):
        self.output_file = output_file
        self.proxies = []
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Referer": "https://www.google.com/"
        }
    
    def scrape_sslproxies(self, https_only=True, elite_only=False, limit=None):
        """Scrape daftar proxy dari sslproxies.org"""
        logger.info("Mengambil proxy dari sslproxies.org...")
        
        try:
            url = "https://www.sslproxies.org/"
            response = requests.get(url, headers=self.headers, timeout=10)
            
            if response.status_code != 200:
                logger.error(f"Gagal mengakses {url}. Status code: {response.status_code}")
                return
            
            # Parse HTML dengan BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Cari tabel proxy
            table = soup.find('table', {'class': 'table table-striped table-bordered'})
            if not table:
                logger.error("Tidak dapat menemukan tabel proxy pada halaman")
                return
            
            # Extract semua baris dari tabel
            rows = table.find_all('tr')
            
            # Skip header row
            for row in rows[1:]:
                cells = row.find_all('td')
                if len(cells) >= 8:  # Pastikan jumlah kolom sesuai
                    ip = cells[0].text.strip()
                    port = cells[1].text.strip()
                    country_code = cells[2].text.strip()
                    country = cells[3].text.strip()
                    anonymity = cells[4].text.strip()
                    google = cells[5].text.strip()
                    https = cells[6].text.strip()
                    last_checked = cells[7].text.strip()
                    
                    # Filter berdasarkan HTTPS
                    if https_only and https.lower() != "yes":
                        continue
                    
                    # Filter berdasarkan level anonymity
                    if elite_only and anonymity.lower() != "elite proxy":
                        continue
                    
                    # Format proxy string
                    protocol = "https" if https.lower() == "yes" else "http"
                    proxy_string = f"{protocol}://{ip}:{port}"
                    
                    # Tambahkan proxy ke daftar
                    self.proxies.append({
                        "proxy": proxy_string,
                        "country": country,
                        "anonymity": anonymity,
                        "https": https,
                        "last_checked": last_checked
                    })
            
            # Batasi jumlah proxy jika diperlukan
            if limit and len(self.proxies) > limit:
                self.proxies = self.proxies[:limit]
            
            logger.info(f"Berhasil mendapatkan {len(self.proxies)} proxy dari sslproxies.org")
            
        except Exception as e:
            logger.error(f"Error saat scraping sslproxies.org: {str(e)}")
    
    def check_proxies(self, test_url="https://www.google.com", timeout=5, max_workers=10, callback=None):
        """Verifikasi apakah proxy berfungsi dengan baik"""
        logger.info("Memeriksa status proxy...")
        working_proxies = []
        total = len(self.proxies)
        
        for i, proxy_data in enumerate(self.proxies):
            proxy = proxy_data["proxy"]
            
            try:
                logger.info(f"Memeriksa {proxy} ({i+1}/{total})...")
                if callback:
                    callback(f"Memeriksa {proxy} ({i+1}/{total})...", (i+1)/total*100)
                
                proxies = {
                    "http": proxy,
                    "https": proxy
                }
                
                response = requests.get(
                    test_url,
                    proxies=proxies,
                    timeout=timeout,
                    headers=self.headers
                )
                
                if response.status_code == 200:
                    logger.info(f"Proxy berfungsi: {proxy}")
                    working_proxies.append(proxy_data)
                else:
                    logger.warning(f"Proxy tidak berfungsi: {proxy} (Status: {response.status_code})")
            
            except Exception as e:
                logger.warning(f"Proxy tidak berfungsi: {proxy} (Error: {str(e)})")
        
        # Update daftar proxy dengan yang berfungsi saja
        self.proxies = working_proxies
        logger.info(f"Ditemukan {len(working_proxies)} proxy yang berfungsi dari {total} total")
    
    def save_to_file(self, format_type="standard"):
        """Simpan daftar proxy ke file"""
        if not self.proxies:
            logger.warning("Tidak ada proxy untuk disimpan")
            return False
        
        try:
            with open(self.output_file, "w") as f:
                # Tambahkan komentar dengan info
                f.write(f"# Proxy list dari sslproxies.org\n")
                f.write(f"# Diambil pada: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write(f"# Total proxy: {len(self.proxies)}\n\n")
                
                # Tulis setiap proxy
                for proxy_data in self.proxies:
                    if format_type == "standard":
                        f.write(f"{proxy_data['proxy']}\n")
                    else:  # format dengan komentar
                        f.write(f"{proxy_data['proxy']}  # {proxy_data['country']}, {proxy_data['anonymity']}, Last checked: {proxy_data['last_checked']}\n")
            
            logger.info(f"Berhasil menyimpan {len(self.proxies)} proxy ke {self.output_file}")
            return True
            
        except Exception as e:
            logger.error(f"Error saat menyimpan proxy ke file: {str(e)}")
            return False

class ProxyManager:
    """Class untuk mengelola rotating proxies dengan tracking proxy yang gagal"""
    
    def __init__(self, proxy_file: str = "proxies.txt"):
        self.proxy_file = proxy_file
        self.proxies = []
        self.failed_proxies = set()  # Track proxy yang gagal
        self.lock = threading.Lock()  # Thread-safe
        self.load_proxies()
    
    def load_proxies(self) -> None:
        """Load proxies dari file"""
        try:
            if os.path.exists(self.proxy_file):
                with open(self.proxy_file, "r") as f:
                    self.proxies = [line.strip() for line in f if line.strip() and not line.startswith("#")]
                logger.info(f"Berhasil memuat {len(self.proxies)} proxies")
            else:
                logger.warning(f"File proxy tidak ditemukan: {self.proxy_file}")
        except Exception as e:
            logger.error(f"Error saat memuat proxies: {str(e)}")
    
    def get_working_proxies(self, max_count: int = None) -> List[str]:
        """Dapatkan daftar proxy yang belum ditandai gagal"""
        with self.lock:
            working_proxies = [p for p in self.proxies if p not in self.failed_proxies]
            if max_count and len(working_proxies) > max_count:
                # Acak list dan ambil sebanyak max_count
                random.shuffle(working_proxies)
                return working_proxies[:max_count]
            return working_proxies
    
    def mark_failed(self, proxy: str) -> None:
        """Tandai proxy sebagai gagal"""
        with self.lock:
            self.failed_proxies.add(proxy)
            logger.debug(f"Proxy ditandai gagal: {proxy}")
    
    def get_stats(self) -> Dict[str, int]:
        """Dapatkan statistik proxy"""
        with self.lock:
            return {
                "total": len(self.proxies),
                "failed": len(self.failed_proxies),
                "working": len(self.proxies) - len(self.failed_proxies)
            }

# ==============================
# BAGIAN 2: STEALTH WEB SCRAPER
# ==============================

def random_delay(min_seconds: float = 2.0, max_seconds: float = 7.0) -> None:
    """Tambahkan delay random untuk mensimulasikan perilaku manusia"""
    delay = random.uniform(min_seconds, max_seconds)
    time.sleep(delay)

def get_realistic_user_agent(is_mobile: bool = False) -> str:
    """Dapatkan user agent yang realistis, dengan fallback jika terjadi error"""
    # Fallback user agents
    desktop_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
    ]
    
    mobile_agents = [
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/118.0 Firefox/118.0",
        "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36",
        "Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
    ]
    
    try:
        if UserAgent is not None:
            ua = UserAgent()
            if is_mobile:
                user_agent = ua.random_mobile
            else:
                user_agent = ua.random
            logger.debug(f"User Agent dari fake_useragent: {user_agent}")
            return user_agent
        else:
            raise ImportError("fake_useragent tidak tersedia")
    except Exception as e:
        logger.warning(f"Error saat mengambil user agent: {str(e)}, fallback ke default.")
        if is_mobile:
            return random.choice(mobile_agents)
        else:
            return random.choice(desktop_agents)

def create_driver(proxy: str = None, is_mobile: bool = False, headless: bool = False, page_load_timeout: int = 30) -> webdriver.Chrome:
    """Buat instance WebDriver dengan konfigurasi yang ditentukan dan fitur anti-deteksi"""
    if webdriver is None:
        raise ImportError("Selenium tidak tersedia. Pastikan untuk menginstal selenium: pip install selenium")
    
    chrome_options = Options()
    
    # User agent
    user_agent = get_realistic_user_agent(is_mobile=is_mobile)
    chrome_options.add_argument(f"--user-agent={user_agent}")
    
    # Set headless mode jika diperlukan
    if headless:
        chrome_options.add_argument("--headless=new")
        chrome_options.add_argument("--disable-gpu")
    
    # Tambahkan proxy jika tersedia
    if proxy:
        chrome_options.add_argument(f"--proxy-server={proxy}")
        logger.info(f"Menggunakan proxy: {proxy}")
    
    # Tambahkan argumen tambahan untuk menghindari deteksi
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--ignore-certificate-errors")
    chrome_options.add_argument("--disable-popup-blocking")
    chrome_options.add_argument("--disable-notifications")
    
    # Set accept-language
    chrome_options.add_argument("--lang=id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7")
    
    # Ekspor preferences
    prefs = {
        "profile.default_content_setting_values.notifications": 2,  # Block notifications
        "profile.default_content_setting_values.geolocation": 2,    # Block geolocation
        "profile.managed_default_content_settings.images": 1,       # Load images
        "profile.default_content_setting_values.cookies": 1,        # Accept cookies
        "intl.accept_languages": "id-ID,id,en-US,en"
    }
    chrome_options.add_experimental_option("prefs", prefs)
    
    # Menyembunyikan bahwa browser dikendalikan oleh otomasi
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)
    
    try:
        service = Service()
        driver = webdriver.Chrome(service=service, options=chrome_options)
        
        # Inject JavaScript untuk bypass deteksi bot (versi lebih lengkap)
        stealth_js = """
        // Sembunyikan bahwa browser dikendalikan oleh webdriver
        Object.defineProperty(navigator, 'webdriver', { 
            get: () => false 
        });
        
        // Simulasikan Chrome runtime
        window.navigator.chrome = { 
            runtime: {} 
        };
        
        // Tetapkan languages
        Object.defineProperty(navigator, 'languages', { 
            get: () => ['id-ID', 'id', 'en-US', 'en'] 
        });
        
        // Tetapkan plugin palsu
        Object.defineProperty(navigator, 'plugins', { 
            get: () => {
                // Plugin palsu
                return [
                    {
                        0: {type: "application/x-google-chrome-pdf", suffixes: "pdf", description: "Portable Document Format"},
                        description: "Portable Document Format",
                        filename: "internal-pdf-viewer",
                        length: 1,
                        name: "Chrome PDF Plugin"
                    },
                    {
                        0: {type: "application/pdf", suffixes: "pdf", description: "Portable Document Format"},
                        description: "Portable Document Format",
                        filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai",
                        length: 1,
                        name: "Chrome PDF Viewer"
                    },
                    {
                        0: {type: "application/x-nacl", suffixes: "", description: "Native Client Executable"},
                        1: {type: "application/x-pnacl", suffixes: "", description: "Portable Native Client Executable"},
                        description: "Native Client",
                        filename: "internal-nacl-plugin",
                        length: 2,
                        name: "Native Client"
                    }
                ];
            }
        });
        
        // Tetapkan perameter screen dan size yang realistis
        Object.defineProperty(window, 'outerWidth', { get: () => window.innerWidth });
        Object.defineProperty(window, 'outerHeight', { get: () => window.innerHeight });
        
        // Modifikasi fungsi getParameter dari WebGL
        const getParameter = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function(parameter) {
          // UNMASKED_VENDOR_WEBGL
          if (parameter === 37445) {
            return 'Intel Inc.';
          }
          // UNMASKED_RENDERER_WEBGL
          if (parameter === 37446) {
            return 'Intel Iris OpenGL Engine';
          }
          return getParameter.apply(this, arguments);
        };
        
        // Override permissions query function
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );
        """
        
        driver.execute_script(stealth_js)
        
        # Set timeout
        driver.set_page_load_timeout(page_load_timeout)
        
        return driver
    except Exception as e:
        logger.error(f"Error saat membuat WebDriver: {str(e)}")
        raise

def human_scroll(driver, steps: int = 5) -> None:
    """Melakukan scroll halaman dengan pola yang lebih mirip manusia"""
    try:
        # Dapatkan tinggi dokumen
        total_height = driver.execute_script("return document.body.scrollHeight")
        viewport_height = driver.execute_script("return window.innerHeight")
        
        # Tentukan jumlah scroll berdasarkan tinggi dokumen
        if steps == 0:
            steps = max(3, min(8, int(total_height / viewport_height)))
        
        logger.debug(f"Akan melakukan {steps} scroll steps")
        
        # Posisi scroll awal
        current_position = 0
        
        for i in range(steps):
            # Tentukan jarak scroll dengan sedikit randomness
            if i == steps - 1:  # Scroll terakhir, pastikan mencapai bagian bawah
                next_position = total_height
            else:
                # Variasi dalam jarak scroll untuk terlihat lebih manusiawi
                scroll_step = random.randint(int(viewport_height * 0.7), int(viewport_height * 0.9))
                next_position = min(total_height, current_position + scroll_step)
            
            # Scroll dengan kecepatan acak
            driver.execute_script(f"window.scrollTo({{top: {next_position}, behavior: 'smooth'}});")
            current_position = next_position
            
            # Delay random untuk mensimulasikan pembacaan
            read_time = random.uniform(1.0, 3.5)
            time.sleep(read_time)
            
            # Kadang-kadang scroll sedikit ke atas (seperti orang membaca ulang)
            if random.random() < 0.3 and i > 0:  # 30% kemungkinan
                backtrack = random.randint(100, 300)
                current_position = max(0, current_position - backtrack)
                driver.execute_script(f"window.scrollTo({{top: {current_position}, behavior: 'smooth'}});")
                time.sleep(random.uniform(0.8, 1.5))  # Waktu baca ulang
            
            # Kadang-kadang lakukan gerakan horizontal (seperti melihat sesuatu)
            if random.random() < 0.2:  # 20% kemungkinan
                h_shift = random.randint(-30, 30)
                driver.execute_script(f"window.scrollBy({h_shift}, 0);")
                time.sleep(random.uniform(0.3, 0.8))
        
        # Di akhir, kadang scroll kembali ke tengah halaman
        if random.random() < 0.4:  # 40% kemungkinan
            middle_position = total_height // 2
            driver.execute_script(f"window.scrollTo({{top: {middle_position}, behavior: 'smooth'}});")
            time.sleep(random.uniform(0.8, 1.5))
            
    except Exception as e:
        logger.warning(f"Error saat melakukan human scroll: {str(e)}")

def find_and_interact_with_content(driver) -> None:
    """Menemukan dan berinteraksi dengan konten halaman dengan cara yang alami"""
    try:
        # Cari elemen yang bisa diinteraksi
        elements_to_interact = []
        
        # Cari link
        links = driver.find_elements(By.TAG_NAME, "a")
        if links:
            # Pilih maksimal 5 link teratas
            elements_to_interact.extend(links[:min(5, len(links))])
        
        # Cari tombol
        buttons = driver.find_elements(By.TAG_NAME, "button")
        if buttons:
            elements_to_interact.extend(buttons[:min(3, len(buttons))])
            
        # Cari div yang mungkin konten iklan (div dengan class yang mengandung kata 'ad', 'banner', dll)
        potential_ads = []
        divs = driver.find_elements(By.TAG_NAME, "div")
        for div in divs:
            class_attr = div.get_attribute("class") or ""
            id_attr = div.get_attribute("id") or ""
            # Cek apakah ini elemen iklan 
            if any(ad_keyword in class_attr.lower() or ad_keyword in id_attr.lower() 
                  for ad_keyword in ["ad", "banner", "sponsor", "promo", "advert"]):
                potential_ads.append(div)
                
        # Tambahkan ke list interaksi
        if potential_ads:
            elements_to_interact.extend(potential_ads[:min(3, len(potential_ads))])
        
        # Jika ada elemen untuk diinteraksi
        if elements_to_interact:
            # Pilih 1-3 elemen secara acak
            num_to_interact = min(len(elements_to_interact), random.randint(1, 3))
            elements_to_focus = random.sample(elements_to_interact, num_to_interact)
            
            for element in elements_to_focus:
                try:
                    # Scroll ke elemen
                    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element)
                    time.sleep(random.uniform(1.0, 2.0))
                    
                    # Hover di atas elemen (dengan JavaScript)
                    driver.execute_script("""
                    var element = arguments[0];
                    var mouseoverEvent = new MouseEvent('mouseover', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    element.dispatchEvent(mouseoverEvent);
                    """, element)
                    
                    time.sleep(random.uniform(0.5, 1.5))
                    
                    # Kadang-kadang klik pada elemen (dengan kemungkinan rendah untuk menghindari navigasi keluar)
                    # Untuk iklan khususnya, ini bisa disesuaikan lebih hati-hati
                    if random.random() < 0.05:  # 5% kemungkinan
                        tag_name = element.tag_name.lower()
                        # Lebih mungkin mengklik pada iklan 
                        if tag_name != "a" and tag_name != "button":  # Jika bukan link atau tombol (kemungkinan iklan)
                            logger.info("Berinteraksi dengan elemen yang mungkin iklan")
                            
                            # Simulasi klik dengan JavaScript
                            driver.execute_script("""
                            var element = arguments[0];
                            var clickEvent = new MouseEvent('click', {
                              'view': window,
                              'bubbles': true,
                              'cancelable': true
                            });
                            element.dispatchEvent(clickEvent);
                            """, element)
                            
                            # Delay pendek
                            time.sleep(random.uniform(0.5, 1.0))
                            
                            # Kembali ke halaman awal jika berpindah halaman
                            if driver.current_url != element.parent.current_url:
                                driver.back()
                                time.sleep(random.uniform(1.0, 2.0))
                except Exception as e:
                    logger.warning(f"Error saat berinteraksi dengan elemen: {str(e)}")
                    continue
                
    except Exception as e:
        logger.warning(f"Error saat mencari dan berinteraksi dengan konten: {str(e)}")

def extract_page_data(driver) -> Dict[str, Any]:
    """Ekstrak berbagai data dari halaman untuk disimpan"""
    data = {}
    
    try:
        # Dapatkan basic data
        data["title"] = driver.title
        data["url"] = driver.current_url
        
        # Coba dapatkan metadata
        meta_data = {}
        meta_elements = driver.find_elements(By.TAG_NAME, "meta")
        for meta in meta_elements:
            name = meta.get_attribute("name") or meta.get_attribute("property")
            content = meta.get_attribute("content")
            if name and content:
                meta_data[name] = content
        data["meta"] = meta_data
        
        # Coba dapatkan headers dari JavaScript
        try:
            headers_data = driver.execute_script("""
                var req = new XMLHttpRequest();
                req.open('GET', document.location.href, false);
                req.send(null);
                var headers = {};
                var responseHeaders = req.getAllResponseHeaders().split("\\r\\n");
                for (var i = 0; i < responseHeaders.length; i++) {
                    if (responseHeaders[i] !== "") {
                        var header = responseHeaders[i].split(": ");
                        headers[header[0]] = header[1];
                    }
                }
                return headers;
            """)
            data["headers"] = headers_data
        except:
            pass
        
        # Check for redirects
        if driver.current_url != data.get("original_url", driver.current_url):
            data["redirected"] = True
            data["original_url"] = data.get("original_url", driver.current_url)
        
        # Hitung elemen penting
        data["links_count"] = len(driver.find_elements(By.TAG_NAME, "a"))
        data["images_count"] = len(driver.find_elements(By.TAG_NAME, "img"))
        data["forms_count"] = len(driver.find_elements(By.TAG_NAME, "form"))
        
    except Exception as e:
        logger.warning(f"Error saat ekstrak data halaman: {str(e)}")
    
    return data 

def scrape_target(
    url: str, 
    proxy: str = None, 
    output_folder: str = "results", 
    is_mobile: bool = False, 
    headless: bool = False,
    callback = None
) -> bool:
    """Proses target URL dengan scraping"""
    driver = None
    start_time = datetime.now()
    timestamp = start_time.strftime("%Y%m%d_%H%M%S")
    device_type = "mobile" if is_mobile else "desktop"
    
    # Buat folder output jika belum ada
    os.makedirs(output_folder, exist_ok=True)
    
    try:
        logger.info(f"Membuat driver {device_type} untuk {url}")
        if callback:
            callback(f"Membuat driver {device_type} untuk {url}", 10)
        
        driver = create_driver(proxy=proxy, is_mobile=is_mobile, headless=headless)
        
        # Buka URL target
        logger.info(f"Mengakses {url}")
        if callback:
            callback(f"Mengakses {url}", 20)
            
        # Simpan URL asli sebelum redirect
        original_url = url
        
        # Load halaman
        driver.get(url)
        
        # Delay random setelah load halaman (simulasi waktu loading)
        random_delay(1.5, 4.0)
        
        # Simpan URL setelah redirect
        final_url = driver.current_url
        
        # Tidak perlu menyimpan screenshot lagi
        if callback:
            callback("View halaman...", 40)
            
        # Scroll dengan pola mirip manusia
        logger.info("Mensimulasikan scrolling manusia...")
        if callback:
            callback("Mensimulasikan scrolling manusia...", 60)
            
        human_scroll(driver, steps=random.randint(3, 7))
        
        # Interaksi dengan konten halaman
        logger.info("Berinteraksi dengan konten halaman...")
        if callback:
            callback("Berinteraksi dengan konten halaman...", 80)
        
        # Gunakan fungsi baru untuk berinteraksi dengan konten
        find_and_interact_with_content(driver)
        
        # Ekstrak data dari halaman
        page_data = extract_page_data(driver)
        
        # Siapkan data hasil (tetapi tidak menyimpannya)
        result_data = {
            "url": url,
            "original_url": original_url,
            "final_url": final_url,
            "redirect_detected": original_url != final_url,
            "title": driver.title,
            "timestamp": timestamp,
            "device_type": device_type,
            "proxy": proxy,
            "execution_time_seconds": (datetime.now() - start_time).total_seconds(),
            "page_data": page_data
        }
        
        logger.info(f"Berhasil memproses {url}")
        
        if callback:
            callback("View selesai!", 100)
            
        # Bersihkan memori untuk menghemat resource
        driver.execute_script("window.localStorage.clear();")
        driver.execute_script("window.sessionStorage.clear();")
        driver.delete_all_cookies()
        
        return True
        
    except TimeoutException:
        logger.error(f"Timeout saat mengakses {url}")
        if callback:
            callback(f"Timeout saat mengakses {url}", 100)
        return False
    except WebDriverException as e:
        logger.error(f"WebDriver error: {str(e)}")
        if callback:
            callback(f"WebDriver error: {str(e)}", 100)
        return False
    except Exception as e:
        logger.error(f"Error tidak terduga: {str(e)}")
        if callback:
            callback(f"Error tidak terduga: {str(e)}", 100)
        return False
    finally:
        # Selalu tutup driver jika ada
        if driver:
            try:
                driver.quit()
            except:
                pass
        
        logger.info(f"Total waktu eksekusi: {(datetime.now() - start_time).total_seconds()} detik")

def scrape_target_with_multiple_proxies(
    url: str, 
    proxy_manager: ProxyManager = None, 
    max_retries: int = 5, 
    output_folder: str = "results", 
    is_mobile: bool = False, 
    headless: bool = False,
    callback = None
) -> bool:
    """Proses target URL dengan mencoba beberapa proxy secara berurutan jika terjadi kegagalan"""
    if not proxy_manager or proxy_manager.get_stats()["working"] == 0:
        # Jika tidak ada proxy, gunakan tanpa proxy
        logger.info("Tidak ada proxy tersedia, mencoba tanpa proxy")
        if callback:
            callback("Tidak ada proxy tersedia, mencoba tanpa proxy", 0)
        return scrape_target(url, proxy=None, output_folder=output_folder, is_mobile=is_mobile, headless=headless, callback=callback)
    
    # Dapatkan daftar proxy yang belum ditandai gagal
    proxies_to_try = proxy_manager.get_working_proxies(max_count=max_retries)
    
    if not proxies_to_try:
        logger.warning("Tidak ada proxy yang tersedia/berfungsi")
        if callback:
            callback("Tidak ada proxy yang tersedia/berfungsi", 0)
        return scrape_target(url, proxy=None, output_folder=output_folder, is_mobile=is_mobile, headless=headless, callback=callback)
    
    logger.info(f"Akan mencoba {len(proxies_to_try)} proxies untuk URL: {url}")
    if callback:
        callback(f"Akan mencoba {len(proxies_to_try)} proxies untuk URL: {url}", 0)
    
    success = False
    for i, proxy in enumerate(proxies_to_try):
        logger.info(f"Mencoba proxy #{i+1}/{len(proxies_to_try)}: {proxy}")
        if callback:
            # Update progress - each proxy try is a percentage of the total progress
            progress = (i / len(proxies_to_try)) * 100
            callback(f"Mencoba proxy #{i+1}/{len(proxies_to_try)}: {proxy}", progress)
            
        try:
            success = scrape_target(
                url, 
                proxy=proxy, 
                output_folder=output_folder, 
                is_mobile=is_mobile, 
                headless=headless,
                callback=lambda msg, prog: callback(msg, progress + (prog / len(proxies_to_try))) if callback else None
            )
            
            if success:
                logger.info(f"Berhasil dengan proxy: {proxy}")
                if callback:
                    callback(f"Berhasil dengan proxy: {proxy}", 100)
                return True
            else:
                logger.warning(f"Gagal dengan proxy: {proxy}")
                proxy_manager.mark_failed(proxy)
        except Exception as e:
            logger.error(f"Error dengan proxy {proxy}: {str(e)}")
            proxy_manager.mark_failed(proxy)
    
    # Jika semua proxy gagal, coba tanpa proxy
    logger.info("Semua proxy gagal, mencoba tanpa proxy...")
    if callback:
        callback("Semua proxy gagal, mencoba tanpa proxy...", 90)
        
    return scrape_target(url, proxy=None, output_folder=output_folder, is_mobile=is_mobile, headless=headless, callback=callback)

def scrape_urls_parallel(
    urls: List[str], 
    proxy_manager: ProxyManager, 
    max_workers: int = 4, 
    max_retries: int = 5,
    output_folder: str = "results", 
    is_mobile: bool = False, 
    headless: bool = False,
    callback = None
) -> Dict[str, bool]:
    """Scrape multiple URLs secara paralel menggunakan thread pool"""
    results = {}
    
    # Buat folder output
    os.makedirs(output_folder, exist_ok=True)
    
    def worker(url, worker_idx):
        """Worker function untuk thread pool"""
        logger.info(f"Memulai scraping URL: {url}")
        if callback:
            callback(f"Worker {worker_idx+1}: Memulai scraping URL: {url}", 0, worker_idx)
            
        success = scrape_target_with_multiple_proxies(
            url=url,
            proxy_manager=proxy_manager,
            max_retries=max_retries,
            output_folder=output_folder,
            is_mobile=is_mobile,
            headless=headless,
            callback=lambda msg, prog: callback(f"Worker {worker_idx+1}: {msg}", prog, worker_idx) if callback else None
        )
        return url, success
    
    # Gunakan ThreadPoolExecutor untuk paralelisasi
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        # Submit semua jobs
        futures = []
        for i, url in enumerate(urls):
            future = executor.submit(worker, url, i % max_workers)
            futures.append((future, url, i % max_workers))
        
        # Dapatkan hasil saat selesai
        for future, url, worker_idx in futures:
            try:
                url, success = future.result()
                results[url] = success
                logger.info(f"Selesai scraping URL: {url}, berhasil: {success}")
                if callback:
                    callback(f"Worker {worker_idx+1}: Selesai scraping {url}, berhasil: {success}", 100, worker_idx)
            except Exception as e:
                logger.error(f"Error saat scraping {url}: {str(e)}")
                results[url] = False
                if callback:
                    callback(f"Worker {worker_idx+1}: Error saat scraping {url}: {str(e)}", 100, worker_idx)
    
    return results 

# ============================
# BAGIAN 3: GUI & CLI INTERFACE
# ============================

class StealthScraperGUI:
    """Class untuk GUI Tkinter dari Stealth Scraper"""
    
    def __init__(self, root):
        self.root = root
        self.root.title("🥷 Stealth Scraper Ninja")
        self.root.geometry("900x700")
        self.root.minsize(800, 600)
        
        # Mode gelap default
        self.dark_mode = tk.BooleanVar(value=True)
        
        # Setup style dan tema
        self.style = ttk.Style()
        self.setup_theme()
        
        # Variabel untuk GUI
        self.url_var = tk.StringVar()
        self.url_file_var = tk.StringVar()
        self.proxy_file_var = tk.StringVar(value="proxies.txt")
        self.output_folder_var = tk.StringVar(value="results")
        self.max_retries_var = tk.IntVar(value=5)
        self.workers_var = tk.IntVar(value=1)
        self.is_mobile_var = tk.BooleanVar(value=False)
        self.is_headless_var = tk.BooleanVar(value=False)
        self.use_proxy_var = tk.BooleanVar(value=True)
        
        # Status aktif
        self.is_scraping = False
        self.is_checking_proxies = False
        
        # Buat widgets
        self.create_widgets()
        
        # Konfig grid
        self.root.grid_columnconfigure(0, weight=1)
        self.root.grid_rowconfigure(4, weight=1)
        
    def setup_theme(self):
        """Setup tema gelap atau terang"""
        if self.dark_mode.get():
            # Tema Gelap - Palette yang lebih modern & elegan
            self.root.configure(bg="#121212")
            
            # Colors - Palette baru yang lebih nyaman di mata
            bg_color = "#121212"        # Background utama lebih gelap
            fg_color = "#e1e1e1"        # Text color lebih lembut
            accent_color = "#bb86fc"    # Warna aksen ungu (Material Design)
            sec_accent = "#03dac6"      # Warna aksen sekunder (teal)
            panel_bg = "#1e1e1e"        # Panel background
            btn_bg = "#2d2d2d"          # Button background
            hover_bg = "#3d3d3d"        # Hover state 
            input_bg = "#1e1e1e"        # Input fields
            error_color = "#cf6679"     # Error/stop color (soft red)
            
            # Konfigurasi style ttk
            self.style.theme_use("clam")
            
            # Configure ttk widgets
            self.style.configure("TFrame", background=panel_bg)
            self.style.configure("TLabelframe", background=panel_bg, foreground=fg_color)
            self.style.configure("TLabelframe.Label", background=panel_bg, foreground=accent_color, font=("Segoe UI", 9, "bold"))
            self.style.configure("TLabel", background=panel_bg, foreground=fg_color, font=("Segoe UI", 9))
            self.style.configure("Header.TLabel", background=panel_bg, foreground=accent_color, font=("Segoe UI", 16, "bold"))
            
            # Buttons
            self.style.configure("TButton", background=btn_bg, foreground=fg_color, font=("Segoe UI", 9), borderwidth=0, focusthickness=0)
            self.style.map("TButton", 
                           background=[("active", hover_bg), ("disabled", "#1a1a1a")],
                           foreground=[("disabled", "#555555")])
                           
            # Action button styles
            self.style.configure("Start.TButton", background="#7c4dff", foreground="white", font=("Segoe UI", 10, "bold"))
            self.style.map("Start.TButton", background=[("active", "#9d74ff"), ("disabled", "#1a1a1a")])
            
            self.style.configure("Stop.TButton", background=error_color, foreground="white", font=("Segoe UI", 10, "bold"))
            self.style.map("Stop.TButton", background=[("active", "#ff5c8d"), ("disabled", "#1a1a1a")])
            
            self.style.configure("Proxy.TButton", background=sec_accent, foreground="#121212", font=("Segoe UI", 10, "bold"))
            self.style.map("Proxy.TButton", background=[("active", "#5effe3"), ("disabled", "#1a1a1a")])
            
            # Notebook
            self.style.configure("TNotebook", background=bg_color, borderwidth=0)
            self.style.configure("TNotebook.Tab", background="#2d2d2d", foreground=fg_color, padding=[12, 4], borderwidth=0)
            self.style.map("TNotebook.Tab", 
                          background=[("selected", "#2d2d2d"), ("active", "#3d3d3d")],
                          foreground=[("selected", accent_color), ("active", "white")])
            
            # Entry dan Spinbox
            self.style.configure("TEntry", fieldbackground=input_bg, foreground=fg_color, borderwidth=1)
            self.style.configure("TSpinbox", fieldbackground=input_bg, foreground=fg_color, borderwidth=1, arrowsize=12)
            self.style.map("TEntry", fieldbackground=[("disabled", "#1a1a1a")], foreground=[("disabled", "#555555")])
            self.style.map("TSpinbox", fieldbackground=[("disabled", "#1a1a1a")], foreground=[("disabled", "#555555")])
            
            # Checkbutton
            self.style.configure("TCheckbutton", background=panel_bg, foreground=fg_color, font=("Segoe UI", 9))
            self.style.map("TCheckbutton", background=[("active", panel_bg)])
            
            # Progressbar
            self.style.configure("TProgressbar", 
                                troughcolor="#1a1a1a", 
                                background=accent_color,
                                borderwidth=0,
                                thickness=8)
        else:
            # Tema Terang (default dari sistem)
            self.root.configure(bg="")
            self.style.theme_use("clam")
            
            # Basic styles
            self.style.configure("TFrame", background="")
            self.style.configure("TLabelframe", background="")
            self.style.configure("TLabelframe.Label", background="", font=("Segoe UI", 9, "bold"))
            self.style.configure("TLabel", background="", foreground="", font=("Segoe UI", 9))
            self.style.configure("Header.TLabel", foreground="#6200ee", font=("Segoe UI", 14, "bold"))
            
            # Buttons
            self.style.configure("TButton", font=("Segoe UI", 9))
            
            # Action button styles
            self.style.configure("Start.TButton", background="#6200ee", foreground="white", font=("Segoe UI", 10, "bold"))
            self.style.map("Start.TButton", background=[("active", "#7722ff"), ("disabled", "#cccccc")])
            
            self.style.configure("Stop.TButton", background="#b00020", foreground="white", font=("Segoe UI", 10, "bold"))
            self.style.map("Stop.TButton", background=[("active", "#e01030"), ("disabled", "#cccccc")])
            
            self.style.configure("Proxy.TButton", background="#018786", foreground="white", font=("Segoe UI", 10, "bold"))
            self.style.map("Proxy.TButton", background=[("active", "#03a9a7"), ("disabled", "#cccccc")])
    
    def toggle_theme(self):
        """Ganti antara tema gelap dan terang"""
        self.dark_mode.set(not self.dark_mode.get())
        self.setup_theme()
        # Update log text area saat berganti tema
        if self.dark_mode.get():
            self.log_text.config(bg="#1e1e2e", fg="#e1e1e1", insertbackground="#e1e1e1")
        else:
            self.log_text.config(bg="white", fg="black", insertbackground="black")
        
        # Update teks tombol theme
        for child in self.theme_button.winfo_children():
            child.destroy()
        self.theme_button.config(text="🌙 Mode Terang" if self.dark_mode.get() else "🌑 Mode Gelap")
    
    def create_widgets(self):
        # Frame Utama
        main_frame = ttk.Frame(self.root, padding=10)
        main_frame.grid(row=0, column=0, sticky="nsew")
        main_frame.grid_columnconfigure(0, weight=1)
        
        # Header dengan toggle tema
        header_frame = ttk.Frame(main_frame)
        header_frame.grid(row=0, column=0, sticky="ew", pady=(0, 10))
        header_frame.grid_columnconfigure(0, weight=1)
        
        header_label = ttk.Label(header_frame, text="🥷 Stealth Scraper Ninja", style="Header.TLabel")
        header_label.grid(row=0, column=0, sticky="w")
        
        self.theme_button = ttk.Button(
            header_frame, 
            text="🌙 Mode Terang" if self.dark_mode.get() else "🌑 Mode Gelap",
            command=self.toggle_theme
        )
        self.theme_button.grid(row=0, column=1, sticky="e")
        
        # Tabs
        tab_control = ttk.Notebook(main_frame)
        tab_control.grid(row=1, column=0, sticky="nsew")
        
        # Tab 1: Scraper Settings
        scraper_tab = ttk.Frame(tab_control, padding=15)
        tab_control.add(scraper_tab, text="Scraper")
        self.setup_scraper_tab(scraper_tab)
        
        # Tab 2: Proxy Settings
        proxy_tab = ttk.Frame(tab_control, padding=15)
        tab_control.add(proxy_tab, text="Proxy Manager")
        self.setup_proxy_tab(proxy_tab)
        
        # Tab 3: Advanced Settings
        advanced_tab = ttk.Frame(tab_control, padding=15)
        tab_control.add(advanced_tab, text="Advanced")
        self.setup_advanced_tab(advanced_tab)
        
        # Worker progress frames
        self.worker_frames = []
        self.worker_progress = []
        self.worker_labels = []
        
        workers_frame = ttk.LabelFrame(main_frame, text="Worker Status", padding=15)
        workers_frame.grid(row=2, column=0, sticky="nsew", pady=10)
        workers_frame.grid_columnconfigure(0, weight=1)
        
        # Buat 4 worker frames (maksimum)
        for i in range(4):
            frame = ttk.Frame(workers_frame)
            frame.grid(row=i, column=0, sticky="ew", pady=4)
            frame.grid_columnconfigure(1, weight=1)
            
            label = ttk.Label(frame, text=f"Worker {i+1}: Idle")
            label.grid(row=0, column=0, sticky="w", padx=(0, 10))
            
            progress = ttk.Progressbar(frame, orient="horizontal", length=100, mode="determinate")
            progress.grid(row=0, column=1, sticky="ew")
            
            self.worker_frames.append(frame)
            self.worker_progress.append(progress)
            self.worker_labels.append(label)
        
        # Log Frame
        log_frame = ttk.LabelFrame(main_frame, text="Log", padding=15)
        log_frame.grid(row=3, column=0, sticky="nsew", pady=10)
        log_frame.grid_columnconfigure(0, weight=1)
        log_frame.grid_rowconfigure(0, weight=1)
        
        # Log Text Widget
        self.log_text = scrolledtext.ScrolledText(log_frame, height=10, wrap=tk.WORD)
        if self.dark_mode.get():
            self.log_text.config(bg="#1e1e2e", fg="#e1e1e1", insertbackground="#e1e1e1")
        self.log_text.grid(row=0, column=0, sticky="nsew")
        self.log_text.config(state=tk.DISABLED)
        
        # Action Buttons Frame
        action_frame = ttk.Frame(main_frame, padding=10)
        action_frame.grid(row=4, column=0, sticky="ew")
        action_frame.grid_columnconfigure(0, weight=1)
        action_frame.grid_columnconfigure(1, weight=1)
        action_frame.grid_columnconfigure(2, weight=1)
        
        # Buttons
        self.start_button = ttk.Button(
            action_frame, 
            text="🚀 Start Scraping", 
            command=self.start_scraping,
            style="Start.TButton"
        )
        self.start_button.grid(row=0, column=0, sticky="ew", padx=5)
        
        self.get_proxies_button = ttk.Button(
            action_frame, 
            text="🌐 Get Fresh Proxies", 
            command=self.get_fresh_proxies,
            style="Proxy.TButton"
        )
        self.get_proxies_button.grid(row=0, column=1, sticky="ew", padx=5)
        
        self.stop_button = ttk.Button(
            action_frame, 
            text="🛑 Stop", 
            command=self.stop_operations,
            state=tk.DISABLED,
            style="Stop.TButton"
        )
        self.stop_button.grid(row=0, column=2, sticky="ew", padx=5)
        
    def setup_scraper_tab(self, parent):
        parent.grid_columnconfigure(1, weight=1)
        
        # URL Input
        ttk.Label(parent, text="URL Target:").grid(row=0, column=0, sticky="w", pady=5)
        ttk.Entry(parent, textvariable=self.url_var, width=50).grid(row=0, column=1, sticky="ew", padx=(10, 0), pady=5)
        
        # URL File Input
        ttk.Label(parent, text="URL File:").grid(row=1, column=0, sticky="w", pady=5)
        url_file_frame = ttk.Frame(parent)
        url_file_frame.grid(row=1, column=1, sticky="ew", padx=(10, 0), pady=5)
        url_file_frame.grid_columnconfigure(0, weight=1)
        
        ttk.Entry(url_file_frame, textvariable=self.url_file_var).grid(row=0, column=0, sticky="ew")
        ttk.Button(url_file_frame, text="Browse", command=lambda: self.browse_file(self.url_file_var)).grid(row=0, column=1, padx=(5, 0))
        
        # Output Folder Input
        ttk.Label(parent, text="Output Folder:").grid(row=2, column=0, sticky="w", pady=5)
        output_folder_frame = ttk.Frame(parent)
        output_folder_frame.grid(row=2, column=1, sticky="ew", padx=(10, 0), pady=5)
        output_folder_frame.grid_columnconfigure(0, weight=1)
        
        ttk.Entry(output_folder_frame, textvariable=self.output_folder_var).grid(row=0, column=0, sticky="ew")
        ttk.Button(output_folder_frame, text="Browse", command=lambda: self.browse_folder(self.output_folder_var)).grid(row=0, column=1, padx=(5, 0))
        
        # Mobile & Headless Checkboxes
        options_frame = ttk.Frame(parent)
        options_frame.grid(row=3, column=0, columnspan=2, sticky="w", pady=10)
        
        ttk.Checkbutton(options_frame, text="Mobile Mode", variable=self.is_mobile_var).grid(row=0, column=0, padx=(0, 20))
        ttk.Checkbutton(options_frame, text="Headless Mode", variable=self.is_headless_var).grid(row=0, column=1)
        
    def setup_proxy_tab(self, parent):
        parent.grid_columnconfigure(1, weight=1)
        
        # Proxy File Input
        ttk.Label(parent, text="Proxy File:").grid(row=0, column=0, sticky="w", pady=5)
        proxy_file_frame = ttk.Frame(parent)
        proxy_file_frame.grid(row=0, column=1, sticky="ew", padx=(10, 0), pady=5)
        proxy_file_frame.grid_columnconfigure(0, weight=1)
        
        ttk.Entry(proxy_file_frame, textvariable=self.proxy_file_var).grid(row=0, column=0, sticky="ew")
        ttk.Button(proxy_file_frame, text="Browse", command=lambda: self.browse_file(self.proxy_file_var)).grid(row=0, column=1, padx=(5, 0))
        
        # Use Proxy Checkbox
        ttk.Checkbutton(parent, text="Use Proxy", variable=self.use_proxy_var).grid(row=1, column=0, columnspan=2, sticky="w", pady=5)
        
        # Max Retries
        ttk.Label(parent, text="Max Retries:").grid(row=2, column=0, sticky="w", pady=5)
        ttk.Spinbox(parent, from_=1, to=20, textvariable=self.max_retries_var, width=5).grid(row=2, column=1, sticky="w", padx=(10, 0), pady=5)
        
        # Proxy Testing Frame
        test_frame = ttk.LabelFrame(parent, text="Proxy Testing", padding=10)
        test_frame.grid(row=3, column=0, columnspan=2, sticky="ew", pady=10)
        test_frame.grid_columnconfigure(0, weight=1)
        test_frame.grid_columnconfigure(1, weight=1)
        
        ttk.Button(test_frame, text="Test Current Proxies", command=self.test_proxies).grid(row=0, column=0, sticky="ew", padx=5)
        ttk.Button(test_frame, text="Load Proxies", command=self.load_proxies).grid(row=0, column=1, sticky="ew", padx=5)
        
    def setup_advanced_tab(self, parent):
        parent.grid_columnconfigure(1, weight=1)
        
        # Parallel Workers
        ttk.Label(parent, text="Parallel Workers:").grid(row=0, column=0, sticky="w", pady=5)
        ttk.Spinbox(parent, from_=1, to=8, textvariable=self.workers_var, width=5).grid(row=0, column=1, sticky="w", padx=(10, 0), pady=5)
        
        # Information text
        info_text = (
            "Parallel mode akan menjalankan beberapa scraper secara bersamaan.\n"
            "Gunakan nilai 1 untuk mode sequential (1 URL setelah yang lain).\n"
            "Nilai yang disarankan: 2-4 workers untuk performa terbaik.\n\n"
            "Penggunaan worker lebih banyak akan mempercepat proses, tetapi\n"
            "juga akan menggunakan lebih banyak resource dan meningkatkan\n"
            "kemungkinan terdeteksi sebagai bot."
        )
        
        info_label = ttk.Label(parent, text=info_text, wraplength=400, justify="left")
        info_label.grid(row=1, column=0, columnspan=2, sticky="w", pady=10)
        
    def browse_file(self, var):
        filename = filedialog.askopenfilename(
            title="Pilih File",
            filetypes=(("Text Files", "*.txt"), ("All Files", "*.*"))
        )
        if filename:
            var.set(filename)
            
    def browse_folder(self, var):
        folder = filedialog.askdirectory(title="Pilih Folder")
        if folder:
            var.set(folder)
            
    def add_log(self, message):
        self.log_text.config(state=tk.NORMAL)
        self.log_text.insert(tk.END, f"{datetime.now().strftime('%H:%M:%S')} - {message}\n")
        self.log_text.see(tk.END)
        self.log_text.config(state=tk.DISABLED)
        
    def update_worker_status(self, message, progress, worker_idx=0):
        if worker_idx < len(self.worker_labels):
            self.worker_labels[worker_idx].config(text=f"Worker {worker_idx+1}: {message}")
            self.worker_progress[worker_idx].config(value=progress)
            self.root.update_idletasks()
            
    def start_scraping(self):
        if self.is_scraping:
            return
            
        # Validate inputs
        if not self.url_var.get() and not self.url_file_var.get():
            messagebox.showerror("Error", "Mohon masukkan URL target atau file URL")
            return
            
        self.is_scraping = True
        self.toggle_buttons()
        
        # Reset progress bars
        for progress in self.worker_progress:
            progress.config(value=0)
            
        # Get URLs
        urls = []
        if self.url_var.get():
            urls.append(self.url_var.get())
            
        if self.url_file_var.get() and os.path.exists(self.url_file_var.get()):
            with open(self.url_file_var.get(), "r") as f:
                for line in f:
                    url = line.strip()
                    if url and not url.startswith("#"):
                        urls.append(url)
        
        if not urls:
            self.add_log("Tidak ada URL untuk di-scrape")
            self.is_scraping = False
            self.toggle_buttons()
            return
            
        self.add_log(f"Memulai scraping untuk {len(urls)} URL...")
        
        # Setup proxy manager if needed
        proxy_manager = None
        if self.use_proxy_var.get():
            proxy_manager = ProxyManager(proxy_file=self.proxy_file_var.get())
            stats = proxy_manager.get_stats()
            self.add_log(f"Proxy stats: Total: {stats['total']}, Working: {stats['working']}")
            
        # Start in a separate thread to not block GUI
        threading.Thread(
            target=self.run_scraping, 
            args=(urls, proxy_manager),
            daemon=True
        ).start()
        
    def run_scraping(self, urls, proxy_manager):
        try:
            # Set up worker UI based on number of workers
            workers = self.workers_var.get()
            for i, frame in enumerate(self.worker_frames):
                if i < workers:
                    frame.grid()  # Show
                else:
                    frame.grid_remove()  # Hide
            
            # Set up callback for progress updates
            def progress_callback(message, progress, worker_idx=0):
                self.update_worker_status(message, progress, worker_idx)
                self.add_log(message)
            
            # Run scraping
            if workers > 1 and len(urls) > 1:
                # Parallel mode
                self.add_log(f"Running in parallel mode with {workers} workers")
                results = scrape_urls_parallel(
                    urls=urls,
                    proxy_manager=proxy_manager,
                    max_workers=workers,
                    max_retries=self.max_retries_var.get(),
                    output_folder=self.output_folder_var.get(),
                    is_mobile=self.is_mobile_var.get(),
                    headless=self.is_headless_var.get(),
                    callback=progress_callback
                )
            else:
                # Sequential mode
                self.add_log("Running in sequential mode")
                results = {}
                
                for i, url in enumerate(urls):
                    self.add_log(f"Scraping URL {i+1}/{len(urls)}: {url}")
                    
                    if proxy_manager:
                        success = scrape_target_with_multiple_proxies(
                            url=url,
                            proxy_manager=proxy_manager,
                            max_retries=self.max_retries_var.get(),
                            output_folder=self.output_folder_var.get(),
                            is_mobile=self.is_mobile_var.get(),
                            headless=self.is_headless_var.get(),
                            callback=progress_callback
                        )
                    else:
                        # Tanpa proxy
                        success = scrape_target(
                            url=url, 
                            proxy=None, 
                            output_folder=self.output_folder_var.get(),
                            is_mobile=self.is_mobile_var.get(),
                            headless=self.is_headless_var.get(),
                            callback=progress_callback
                        )
                    
                    results[url] = success
            
            # Show results
            success_count = sum(1 for success in results.values() if success)
            self.add_log(f"Selesai! {success_count}/{len(urls)} URLs berhasil di-scrape")
            
            # Show completion message
            messagebox.showinfo("Scraping Selesai", f"{success_count} dari {len(urls)} URLs berhasil di-scrape")
            
        except Exception as e:
            self.add_log(f"Error: {str(e)}")
            messagebox.showerror("Error", f"Terjadi kesalahan: {str(e)}")
        finally:
            self.is_scraping = False
            self.toggle_buttons()
    
    def get_fresh_proxies(self):
        if self.is_checking_proxies:
            return
            
        self.is_checking_proxies = True
        self.toggle_buttons()
        
        # Reset progress
        self.worker_progress[0].config(value=0)
        self.worker_labels[0].config(text="Worker 1: Getting fresh proxies...")
        
        # Start in a separate thread
        threading.Thread(
            target=self.run_proxy_scraper,
            daemon=True
        ).start()
        
    def run_proxy_scraper(self):
        try:
            self.add_log("Memulai scraping proxy dari sslproxies.org...")
            
            # Create proxy scraper
            scraper = ProxyScraper(output_file=self.proxy_file_var.get())
            
            # Progress update function
            def update_progress(message, progress):
                self.update_worker_status(message, progress)
                self.add_log(message)
            
            # Scrape proxies
            self.add_log("Mendapatkan daftar proxy...")
            update_progress("Mendapatkan daftar proxy...", 20)
            scraper.scrape_sslproxies(https_only=True, elite_only=True)
            
            if not scraper.proxies:
                self.add_log("Tidak ada proxy yang ditemukan")
                messagebox.showerror("Error", "Tidak ada proxy yang ditemukan")
                return
                
            self.add_log(f"Ditemukan {len(scraper.proxies)} proxy, menguji...")
            update_progress(f"Menguji {len(scraper.proxies)} proxy...", 40)
            
            # Check proxies
            scraper.check_proxies(callback=update_progress)
            
            # Save to file
            update_progress("Menyimpan proxy yang berfungsi...", 90)
            scraper.save_to_file()
            
            # Show completion
            count = len(scraper.proxies)
            self.add_log(f"Selesai! {count} proxy telah disimpan ke {self.proxy_file_var.get()}")
            update_progress("Selesai!", 100)
            
            messagebox.showinfo("Proxy Scraping Selesai", f"{count} proxy telah disimpan ke {self.proxy_file_var.get()}")
            
        except Exception as e:
            self.add_log(f"Error: {str(e)}")
            messagebox.showerror("Error", f"Terjadi kesalahan: {str(e)}")
        finally:
            self.is_checking_proxies = False
            self.toggle_buttons()
    
    def load_proxies(self):
        try:
            proxy_file = self.proxy_file_var.get()
            if not os.path.exists(proxy_file):
                messagebox.showerror("Error", f"File proxy tidak ditemukan: {proxy_file}")
                return
                
            with open(proxy_file, "r") as f:
                proxies = [line.strip() for line in f if line.strip() and not line.startswith("#")]
                
            self.add_log(f"Berhasil memuat {len(proxies)} proxies dari {proxy_file}")
            messagebox.showinfo("Proxies Loaded", f"Berhasil memuat {len(proxies)} proxies dari {proxy_file}")
            
        except Exception as e:
            self.add_log(f"Error: {str(e)}")
            messagebox.showerror("Error", f"Terjadi kesalahan: {str(e)}")
    
    def test_proxies(self):
        if self.is_checking_proxies:
            return
            
        proxy_file = self.proxy_file_var.get()
        if not os.path.exists(proxy_file):
            messagebox.showerror("Error", f"File proxy tidak ditemukan: {proxy_file}")
            return
            
        self.is_checking_proxies = True
        self.toggle_buttons()
        
        # Reset progress
        self.worker_progress[0].config(value=0)
        self.worker_labels[0].config(text="Worker 1: Testing proxies...")
        
        # Start in a separate thread
        threading.Thread(
            target=self.run_proxy_test,
            args=(proxy_file,),
            daemon=True
        ).start()
        
    def run_proxy_test(self, proxy_file):
        try:
            self.add_log(f"Memuat proxies dari {proxy_file}...")
            
            # Load proxies
            with open(proxy_file, "r") as f:
                lines = [line.strip() for line in f if line.strip() and not line.startswith("#")]
                
            if not lines:
                self.add_log("Tidak ada proxy yang ditemukan di file")
                messagebox.showinfo("Proxy Test", "Tidak ada proxy yang ditemukan di file")
                return
                
            self.add_log(f"Menguji {len(lines)} proxies...")
            
            # Create data structures for each proxy
            proxies = []
            for line in lines:
                proxy = line.split("#")[0].strip()  # Remove comments
                proxies.append({
                    "proxy": proxy,
                    "country": "Unknown",
                    "anonymity": "Unknown",
                    "https": "Unknown",
                    "last_checked": "Now"
                })
                
            # Test proxies with ProxyScraper
            tester = ProxyScraper()
            tester.proxies = proxies
            
            # Progress update function
            def update_progress(message, progress):
                self.update_worker_status(message, progress)
                self.add_log(message)
                
            tester.check_proxies(callback=update_progress)
            
            # Save to file
            tester.output_file = proxy_file
            tester.save_to_file()
            
            # Show completion
            count = len(tester.proxies)
            self.add_log(f"Pengujian selesai! {count}/{len(lines)} proxy berfungsi")
            self.update_worker_status("Pengujian selesai!", 100)
            
            messagebox.showinfo(
                "Proxy Test Selesai", 
                f"Pengujian selesai!\n{count} dari {len(lines)} proxy berfungsi.\nHasil telah disimpan ke {proxy_file}"
            )
            
        except Exception as e:
            self.add_log(f"Error: {str(e)}")
            messagebox.showerror("Error", f"Terjadi kesalahan: {str(e)}")
        finally:
            self.is_checking_proxies = False
            self.toggle_buttons()
    
    def stop_operations(self):
        # Currently there's no clean way to stop ongoing operations
        # This is a signal for future implementation
        messagebox.showinfo(
            "Stop Requested", 
            "Permintaan berhenti telah diterima. Operasi sedang berjalan akan selesai segera."
        )
    
    def toggle_buttons(self):
        if self.is_scraping or self.is_checking_proxies:
            self.start_button.config(state=tk.DISABLED)
            self.get_proxies_button.config(state=tk.DISABLED)
            self.stop_button.config(state=tk.NORMAL)
        else:
            self.start_button.config(state=tk.NORMAL)
            self.get_proxies_button.config(state=tk.NORMAL)
            self.stop_button.config(state=tk.DISABLED)

def main():
    parser = argparse.ArgumentParser(description="Stealth Scraper Ninja - Target Scraper untuk URL dengan UI")
    parser.add_argument("--cli", action="store_true", help="Jalankan dalam mode CLI tanpa GUI")
    parser.add_argument("--url", type=str, help="URL target untuk di-scrape")
    parser.add_argument("--url-file", type=str, help="File berisi daftar URL (satu URL per baris)")
    parser.add_argument("--mobile", action="store_true", help="Simulasikan device mobile")
    parser.add_argument("--headless", action="store_true", help="Jalankan browser dalam mode headless")
    parser.add_argument("--proxy-file", type=str, default="proxies.txt", help="File berisi daftar proxy")
    parser.add_argument("--output", type=str, default="results", help="Folder untuk menyimpan hasil")
    parser.add_argument("--no-proxy", action="store_true", help="Jangan gunakan proxy")
    parser.add_argument("--max-retries", type=int, default=5, help="Jumlah maksimum proxy yang akan dicoba per URL")
    parser.add_argument("--parallel", type=int, default=1, help="Jumlah thread paralel (1 = sequential)")
    parser.add_argument("--get-proxies", action="store_true", help="Ambil daftar proxy segar dan keluar")
    args = parser.parse_args()
    
    # Banner
    banner = """
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   ███████╗████████╗███████╗ █████╗ ██      ████████╗██╗  ██╗   ║
║   ██╔════╝╚══██╔══╝██╔════╝██╔══██╗██      ╚══██╔══╝██║  ██║   ║
║   ███████╗   ██║   █████╗  ███████║██         ██║   ███████║   ║
║   ╚════██║   ██║   ██╔══╝  ██╔══██║██         ██║   ██╔══██║   ║
║   ███████║   ██║   ███████╗██║  ██║███████╗   ██║   ██║  ██║   ║
║   ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝   ║
║                                                            ║
║              🥷 Super Stealth Target Scraper 🥷            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    """
    print(banner)
    
    # Jika mode CLI
    if args.cli:
        # Jika opsi --get-proxies diberikan
        if args.get_proxies:
            scraper = ProxyScraper(output_file=args.proxy_file)
            print("[*] Mendapatkan daftar proxy...")
            scraper.scrape_sslproxies(https_only=True, elite_only=True)
            
            if not scraper.proxies:
                print("[!] Tidak ada proxy yang ditemukan")
                return
            
            print(f"[*] Ditemukan {len(scraper.proxies)} proxy, menguji...")
            scraper.check_proxies()
            
            if not scraper.proxies:
                print("[!] Tidak ada proxy yang berfungsi")
                return
            
            print(f"[*] Menyimpan {len(scraper.proxies)} proxy yang berfungsi...")
            scraper.save_to_file()
            print(f"[+] Selesai! {len(scraper.proxies)} proxy telah disimpan ke {args.proxy_file}")
            return
        
        # Jika mode scraping normal
        logger.info("Memulai Stealth Scraper dalam mode CLI...")
        
        # Periksa argumen yang diberikan
        if not args.url and not args.url_file:
            parser.error("Harus menentukan --url atau --url-file")
        
        # Inisialisasi proxy manager
        proxy_manager = None
        if not args.no_proxy:
            proxy_manager = ProxyManager(proxy_file=args.proxy_file)
            stats = proxy_manager.get_stats()
            logger.info(f"Statistik proxy: {stats}")
        
        # Load URLs
        urls = []
        if args.url:
            urls.append(args.url)
        
        if args.url_file:
            if not os.path.exists(args.url_file):
                logger.error(f"File URL tidak ditemukan: {args.url_file}")
                return
            
            with open(args.url_file, "r") as f:
                for line in f:
                    url = line.strip()
                    if url and not url.startswith("#"):
                        urls.append(url)
        
        logger.info(f"Total URL yang akan di-scrape: {len(urls)}")
        
        # Jalankan scraping
        if args.parallel > 1 and len(urls) > 1:
            # Mode parallel
            logger.info(f"Menjalankan scraping dalam mode paralel dengan {args.parallel} workers")
            results = scrape_urls_parallel(
                urls=urls,
                proxy_manager=proxy_manager,
                max_workers=args.parallel,
                max_retries=args.max_retries,
                output_folder=args.output,
                is_mobile=args.mobile,
                headless=args.headless
            )
            
            # Tampilkan ringkasan hasil
            success_count = sum(1 for success in results.values() if success)
            logger.info(f"Ringkasan hasil: {success_count}/{len(urls)} berhasil")
            
        else:
            # Mode sequential
            logger.info("Menjalankan scraping secara sequential")
            success_count = 0
            
            for i, url in enumerate(urls):
                logger.info(f"Scraping URL {i+1}/{len(urls)}: {url}")
                
                if proxy_manager:
                    success = scrape_target_with_multiple_proxies(
                        url=url,
                        proxy_manager=proxy_manager,
                        max_retries=args.max_retries,
                        output_folder=args.output,
                        is_mobile=args.mobile,
                        headless=args.headless
                    )
                else:
                    # Tanpa proxy
                    success = scrape_target(
                        url=url, 
                        proxy=None, 
                        output_folder=args.output,
                        is_mobile=args.mobile,
                        headless=args.headless
                    )
                
                if success:
                    success_count += 1
                    
            # Tampilkan ringkasan hasil
            logger.info(f"Ringkasan hasil: {success_count}/{len(urls)} berhasil")
        
        logger.info("Scraping selesai!")
        
    # Jika mode GUI
    else:
        # Jalankan GUI
        try:
            root = tk.Tk()
            app = StealthScraperGUI(root)
            
            # Set icon jika tersedia
            try:
                root.iconbitmap("icon.ico")
            except:
                pass
            
            # Prefill arguments if provided
            if args.url:
                app.url_var.set(args.url)
            if args.url_file:
                app.url_file_var.set(args.url_file)
            if args.proxy_file:
                app.proxy_file_var.set(args.proxy_file)
            if args.output:
                app.output_folder_var.set(args.output)
            if args.mobile:
                app.is_mobile_var.set(True)
            if args.headless:
                app.is_headless_var.set(True)
            if args.no_proxy:
                app.use_proxy_var.set(False)
            if args.max_retries:
                app.max_retries_var.set(args.max_retries)
            if args.parallel:
                app.workers_var.set(args.parallel)
            
            # Start GUI
            root.mainloop()
            
        except Exception as e:
            logger.error(f"Error saat menjalankan GUI: {str(e)}")
            print(f"[!] Error saat menjalankan GUI: {str(e)}")
            print("[*] Menjalankan dalam mode CLI sebagai fallback...")
            
            # Fallback ke CLI mode jika GUI gagal
            args.cli = True
            main()

if __name__ == "__main__":
    main() 
