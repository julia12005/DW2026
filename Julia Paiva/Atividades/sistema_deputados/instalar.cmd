@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Instale Node.js LTS e reabra esta pasta.
 pause
 exit /b 1
)
call npm install
if errorlevel 1 (
 echo Instalacao falhou. Leia o erro acima.
 pause
 exit /b 1
)
echo Instalacao concluida. Execute iniciar.cmd.
pause
