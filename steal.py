import os
import time
import random
import requests
from bs4 import BeautifulSoup
import pandas as pd
import argparse
from datetime import datetime

class ProxyScraper:
    """
    Scraper untuk mengambil daftar proxy dari berbagai sumber
    dan memformatnya untuk digunakan dengan Super Scraper.
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
        print("[*] Mengambil proxy dari sslproxies.org...")
        
        try:
            url = "https://www.sslproxies.org/"
            response = requests.get(url, headers=self.headers, timeout=10)
            
            if response.status_code != 200:
                print(f"[!] Error: Gagal mengakses {url}. Status code: {response.status_code}")
                return
            
            # Parse HTML dengan BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Cari tabel proxy
            table = soup.find('table', {'class': 'table table-striped table-bordered'})
            if not table:
                print("[!] Error: Tidak dapat menemukan tabel proxy pada halaman")
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
            
            print(f"[+] Berhasil mendapatkan {len(self.proxies)} proxy dari sslproxies.org")
            
        except Exception as e:
            print(f"[!] Error saat scraping sslproxies.org: {str(e)}")
    
    def check_proxies(self, test_url="https://www.google.com", timeout=5, max_workers=10):
        """Verifikasi apakah proxy berfungsi dengan baik"""
        print("[*] Memeriksa status proxy...")
        working_proxies = []
        
        for i, proxy_data in enumerate(self.proxies):
            proxy = proxy_data["proxy"]
            
            try:
                print(f"[*] Memeriksa {proxy} ({i+1}/{len(self.proxies)})...")
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
                    print(f"[+] Proxy berfungsi: {proxy}")
                    working_proxies.append(proxy_data)
                else:
                    print(f"[-] Proxy tidak berfungsi: {proxy} (Status: {response.status_code})")
            
            except Exception as e:
                print(f"[-] Proxy tidak berfungsi: {proxy} (Error: {str(e)})")
        
        # Update daftar proxy dengan yang berfungsi saja
        self.proxies = working_proxies
        print(f"[+] Ditemukan {len(working_proxies)} proxy yang berfungsi dari {len(self.proxies)} total")
    
    def save_to_file(self, format_type="standard"):
        """Simpan daftar proxy ke file"""
        if not self.proxies:
            print("[!] Tidak ada proxy untuk disimpan")
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
            
            print(f"[+] Berhasil menyimpan {len(self.proxies)} proxy ke {self.output_file}")
            return True
            
        except Exception as e:
            print(f"[!] Error saat menyimpan proxy ke file: {str(e)}")
            return False
    
    def save_to_csv(self, csv_file="proxies.csv"):
        """Simpan daftar proxy ke file CSV"""
        if not self.proxies:
            print("[!] Tidak ada proxy untuk disimpan")
            return False
        
        try:
            df = pd.DataFrame(self.proxies)
            df.to_csv(csv_file, index=False)
            print(f"[+] Berhasil menyimpan {len(self.proxies)} proxy ke {csv_file}")
            return True
            
        except Exception as e:
            print(f"[!] Error saat menyimpan proxy ke CSV: {str(e)}")
            return False

def main():
    parser = argparse.ArgumentParser(description="SSL Proxy Scraper untuk Super Scraper")
    parser.add_argument("--output", type=str, default="proxies.txt", help="File output untuk menyimpan daftar proxy")
    parser.add_argument("--limit", type=int, help="Jumlah maksimum proxy yang diambil")
    parser.add_argument("--verify", action="store_true", help="Verifikasi proxy (lebih lambat)")
    parser.add_argument("--https-only", action="store_true", help="Hanya ambil proxy HTTPS")
    parser.add_argument("--elite-only", action="store_true", help="Hanya ambil proxy Elite/Highly Anonymous")
    parser.add_argument("--csv", action="store_true", help="Simpan juga ke format CSV")
    parser.add_argument("--comments", action="store_true", help="Tambahkan komentar info negara dan anonymity di file output")
    args = parser.parse_args()
    
    # Buat banner
    print("""
╔═══════════════════════════════════════════════════╗
║                                                   ║
║   ██████╗ ██████╗  ██████╗ ██╗  ██╗██╗   ██╗     ║
║   ██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝╚██╗ ██╔╝     ║
║   ██████╔╝██████╔╝██║   ██║ ╚███╔╝  ╚████╔╝      ║
║   ██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗   ╚██╔╝       ║
║   ██║     ██║  ██║╚██████╔╝██╔╝ ██╗   ██║        ║
║   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝        ║
║                                                   ║
║           SSL Proxy Scraper - Super Scraper       ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
    """)
    
    scraper = ProxyScraper(output_file=args.output)
    
    # Scrape proxy dari sslproxies.org
    scraper.scrape_sslproxies(
        https_only=args.https_only,
        elite_only=args.elite_only,
        limit=args.limit
    )
    
    # Verifikasi proxy jika diminta
    if args.verify and scraper.proxies:
        scraper.check_proxies()
    
    # Simpan ke file
    if scraper.proxies:
        format_type = "comments" if args.comments else "standard"
        scraper.save_to_file(format_type=format_type)
        
        # Simpan ke CSV jika diminta
        if args.csv:
            csv_file = os.path.splitext(args.output)[0] + ".csv"
            scraper.save_to_csv(csv_file=csv_file)
    
    print("[+] Proses selesai!")

if __name__ == "__main__":
    main() 
