<#---
title: Rotate Passwords
input: oldpasswords.json
output: passwords.json
tag: rotate-password
api: post
---
#>
param (   
  
    $maxKeys = 3,
    $length = 6,
    $months = 3

)


function Get-RandomPassword {
    param (
        [Parameter(Mandatory)]
        [int] $length
    )
    
    #$charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{]+-[*=@:)}$^%;(_!&amp;#?>/|.'.ToCharArray()
    $charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.ToCharArray()
    
    $rng = New-Object System.Security.Cryptography.RNGCryptoServiceProvider
    $bytes = New-Object byte[]($length)
    
    $rng.GetBytes($bytes)
    
    $result = New-Object char[]($length)
    
    for ($i = 0 ; $i -lt $length ; $i++) {
        $result[$i] = $charSet[$bytes[$i] % $charSet.Length]
    }
    
    return (-join $result)
}

# $oldKeys = "2022-06-30=TIIBxB|2024-06-30=1AMehr|2024-06-30=6eITaT",
if ($null -eq $env:WORKDIR ) {
    $env:WORKDIR = join-path $psscriptroot ".." ".koksmat" "workdir"
}
$workdir = $env:WORKDIR

if (-not (Test-Path $workdir)) {
    New-Item -Path $workdir -ItemType Directory | Out-Null
}

$workdir = Resolve-Path $workdir

$oldKeys = Get-Content (Join-Path $workdir  "oldpasswords.json") | ConvertFrom-Json

$now = Get-Date
$newDate = $now.AddMonths($months).ToString("yyyy-MM-dd")

$newKey = Get-RandomPassword $length

$pairs = $oldKeys.passwords -split '\|' 

$newKeys = @()
$newKeys += "$newDate=$newKey"
$oldKeysCount = 0
foreach ($pair in $pairs) {
    $key, $value = $pair -split '='
    $date = [datetime]::Parse($key)
    if ($date -gt $now) {
        $newKeys += "$key=$value"
        $oldKeysCount++
    }
}

if ($oldKeysCount -ge $maxKeys) {
    Throw "New key cannot be added. Max keys reached"
}
$newKeys += "$newDate=$newKey" 

#[datetime]::Parse("2020-01-01")



@{passwords = $newKeys -join '|' } | Convertto-json |  Out-File -FilePath (Join-Path $workdir "passwords.json") -Encoding utf8 -Force
