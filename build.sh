#!/bin/sh
echo "Building Avalon Version Alpha 0.1.1";
cd ./controller;
echo "Building Controller";
npm run build;

cd ../server;
echo "Building Server";
npm run build;
echo "Restart server";
pm2 restart avalon-server;

echo "DONE!";