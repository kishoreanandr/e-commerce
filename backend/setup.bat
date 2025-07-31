@echo off
echo === Milestone 1 Setup Script ===
echo.

echo Step 1: Creating virtual environment...
python -m venv venv

echo.
echo Step 2: Activating virtual environment...
call venv\Scripts\activate

echo.
echo Step 3: Installing dependencies...
pip install -r requirements.txt

echo.
echo === Setup Complete! ===
echo.
echo Next steps:
echo 1. Update config.py with your MySQL password
echo 2. Make sure MySQL Server is running
echo 3. Run: python database_setup.py
echo.
pause 