@echo off
setlocal
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm not found. Install Node.js first: https://nodejs.org/
  pause
  exit /b 1
)

echo [INFO] Installing dependencies...
call npm install
if errorlevel 1 (
  echo [ERROR] npm install failed.
  pause
  exit /b 1
)

echo [INFO] Building Windows installer + portable EXE...
call npm run build:win
if errorlevel 1 (
  echo [ERROR] Windows build failed.
  echo [HINT] On Linux/macOS, use GitHub Actions workflow or install wine.
  pause
  exit /b 1
)

echo [DONE] Build complete. Check dist folder.
pause
