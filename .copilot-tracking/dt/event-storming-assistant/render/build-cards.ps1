$ErrorActionPreference = 'Continue'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..\..')).Path
$skillRoot = Join-Path $env:USERPROFILE '.vscode\extensions\ise-hve-essentials.hve-core-all-3.3.101\.github\skills\experimental'
$cardSkill = Join-Path $skillRoot 'customer-card-render'
$pptSkill = Join-Path $skillRoot 'powerpoint'
$projDir = Join-Path $repoRoot '.copilot-tracking\dt\event-storming-assistant'

Write-Output "repoRoot   = $repoRoot"
Write-Output "cardSkill  = $cardSkill"
Write-Output "projDir    = $projDir"

$genScript = Join-Path $cardSkill 'scripts\generate_cards.py'
$canonical = Join-Path $projDir 'canonical'
$contentOut = Join-Path $projDir 'render\content'

Write-Output "`n=== Step 1: generate_cards.py ==="
& uv run --project $cardSkill python $genScript --canonical-dir $canonical --output-dir $contentOut 2>&1 | ForEach-Object { Write-Output $_ }
Write-Output "exit code: $LASTEXITCODE"

Write-Output "`n=== Generated files ==="
Get-ChildItem -Recurse $contentOut -ErrorAction SilentlyContinue | ForEach-Object { Write-Output $_.FullName }

Write-Output "`n=== Step 2: Invoke-PptxPipeline.ps1 ==="
$pipeline = Join-Path $pptSkill 'scripts\Invoke-PptxPipeline.ps1'
$stylePath = Join-Path $contentOut 'global\style.yaml'
$outputPptx = Join-Path $projDir 'render\output\customer-cards.pptx'

if (-not (Test-Path $pipeline)) {
    Write-Output "PIPELINE NOT FOUND: $pipeline"
    return
}
if (-not (Test-Path $stylePath)) {
    Write-Output "STYLE NOT FOUND: $stylePath"
    Get-ChildItem -Recurse $contentOut -ErrorAction SilentlyContinue | ForEach-Object { Write-Output $_.FullName }
    return
}

& $pipeline -Action Build -ContentDir $contentOut -StylePath $stylePath -OutputPath $outputPptx 2>&1 | ForEach-Object { Write-Output $_ }
Write-Output "exit code: $LASTEXITCODE"
