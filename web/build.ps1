$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

moon build web/wasm --target js --release
Copy-Item -Force '_build/js/release/build/web/wasm/wasm.js' 'web/moonsatkit.js'

Write-Host 'MoonSatKit browser adapter updated: web/moonsatkit.js'
