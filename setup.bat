@echo off
echo ========================================
echo AI Employee Performance Analytics Setup
echo ========================================
echo.

echo Installing root dependencies...
call npm install
echo.

echo Installing backend dependencies...
cd backend
call npm install
cd ..
echo.

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Configure backend/.env with your credentials
echo 2. Configure frontend/.env with API URL
echo 3. Run 'npm run dev' to start both servers
echo.
pause
