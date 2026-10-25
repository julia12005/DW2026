@echo off
cd /d "%~dp0"
if not exist node_modules (
 echo Execute instalar.cmd primeiro.
 pause
 exit /b 1
)
call npm run serve
pause
