@echo off
setlocal
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm not found. Install Node.js first: https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo [INFO] Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
  )
)

echo [INFO] Starting presentation runner...
call npm start
if errorlevel 1 (
  echo [ERROR] App start failed.
  pause
  exit /b 1
)
