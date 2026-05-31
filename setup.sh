#!/bin/bash
# Quick Start Script untuk Portfolio Shafira (Linux/Mac)

echo ""
echo "========================================"
echo "  PORTFOLIO SHAFIRA - Quick Start Setup"
echo "========================================"
echo ""

# Check jika npm sudah install
if ! command -v npm &> /dev/null; then
    echo "[ERROR] Node.js belum terinstall!"
    echo "Download di: https://nodejs.org/"
    exit 1
fi

echo "[1/4] Mengecek dependencies..."
if [ ! -d "node_modules" ]; then
    echo "[2/4] Menginstall npm packages..."
    npm install
else
    echo "[2/4] Dependencies sudah terinstall, skip..."
fi

echo ""
echo "[3/4] Mengecek file konfigurasi..."
if [ ! -f ".env" ]; then
    echo "[WARNING] File .env tidak ditemukan"
    echo "Membuat .env dari template..."
    cp .env.example .env
    echo "File .env sudah dibuat. Silakan ubah DB credentials di .env"
fi

echo ""
echo "[4/4] Setup selesai!"
echo ""
echo "========================================"
echo "  SIAP UNTUK DEVELOPMENT"
echo "========================================"
echo ""
echo "Jalankan command ini di terminal untuk start server:"
echo "  npm run dev"
echo ""
echo "Atau untuk production:"
echo "  npm start"
echo ""
echo "Server akan berjalan di: http://localhost:3000"
echo ""
