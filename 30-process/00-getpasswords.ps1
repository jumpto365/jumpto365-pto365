<#---
title: Get Passwords
output: oldpasswords.json
---
#>

#

param ($appname = "jumpto365-pto365")

if ($null -eq $env:WORKDIR ) {
    $env:WORKDIR = join-path $psscriptroot ".." ".koksmat" "workdir"
}
$workdir = $env:WORKDIR

if (-not (Test-Path $workdir)) {
    New-Item -Path $workdir -ItemType Directory | Out-Null
}

$workdir = Resolve-Path $workdir

$podName = (kubectl get pods -o name | grep pod/$appname).Replace("pod/", "")


kubectl cp "$($podName.Trim()):/data/passwords.json"  $workdir/oldpasswords.json 
   