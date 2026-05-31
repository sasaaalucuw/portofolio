@echo off
REM Quick Start Script untuk Portfolio Shafira

echo.
echo ========================================
echo   PORTFOLIO SHAFIRA - Quick Start Setup
echo ========================================
echo.

REM Check jika npm sudah install
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js belum terinstall!
    echo Download di: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Mengecek dependencies...
if not exist "node_modules" (
    echo [2/4] Menginstall npm packages...
    call npm install
) else (
    echo [2/4] Dependencies sudah terinstall, skip...
)

echo.
echo [3/4] Mengecek file konfigurasi...
if not exist ".env" (
    echo [WARNING] File .env tidak ditemukan
    echo Membuat .env dari template...
    copy .env.example .env
    echo File .env sudah dibuat. Silakan ubah DB credentials di .env
)

echo.
echo [4/4] Setup selesai!
echo.
echo ========================================
echo   SIAP UNTUK DEVELOPMENT
echo ========================================
echo.
echo Jalankan command ini di terminal untuk start server:
echo   npm run dev
echo.
echo Atau untuk production:
echo   npm start
echo.
echo Server akan berjalan di: http://localhost:3000
echo.
pause
