@echo off
cd /d "%~dp0"
call npm run build
if errorlevel 1 (
 echo Falha ao compilar. Leia o erro acima.
 pause
 exit /b 1
)
echo Compilacao concluida. A pasta dist contem a versao de publicacao.
pause
