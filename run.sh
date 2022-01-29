npm run build
pm2 stop controll
pm2 delete controll
pm2 start npm --name "controll" -- start
