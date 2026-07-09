@echo off
set ASTRO_TELEMETRY_DISABLED=1
node_modules\.bin\astro.cmd dev --host 127.0.0.1 --port 4321
