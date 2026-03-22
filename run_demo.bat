# CleanPro Services Demo Website Runner

@echo off
echo Starting CleanPro Services Demo Website...
echo.
echo If Python is installed, the website will be available at: http://localhost:8000
echo Otherwise, open index.html directly in your browser.
echo.
echo Press Ctrl+C to stop the server.
echo.

python -m http.server 8000

pause