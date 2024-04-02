<#---
title: Web deploy to production
tag: webdeployproduction
api: post
---

#>

$appname = "pto365"
$imagename = "pto365"
$dnsname = "pto365.home.nexi-intra.com"
$inputFile = join-path  $env:KITCHENROOT $imagename  ".koksmat", "koksmat.json"
$port = "4335"
if (!(Test-Path -Path $inputFile) ) {
  Throw "Cannot find file at expected path: $inputFile"
} 
$json = Get-Content -Path $inputFile | ConvertFrom-Json
$version = "v$($json.version.major).$($json.version.minor).$($json.version.patch).$($json.version.build)"

<#
The we build the deployment file
#>

$image = "ghcr.io/jumpto365/$($imagename)-web:$($version)"

$config = @"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-$appname
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: default
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: $appname
spec:
  selector:
    matchLabels:
      app: $appname
  replicas: 1
  template:
    metadata:
      labels:
        app: $appname
    spec: 
      containers:
      - name: $appname
        image: $image
        ports:
          - containerPort: $port
        env:
        - name: KEY
          value: VALUE2
        - name: DATAPATH
          value: /data          
        volumeMounts:
        - mountPath: /data
          name: data          
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: pvc-$appname       
---
apiVersion: v1
kind: Service
metadata:
  name: $appname
  labels:
    app: $appname
    service: $appname
spec:
  ports:
  - name: http
    port: 5301
    targetPort: $port
  selector:
    app: $appname
---    
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: $appname
spec:
  rules:
  - host: $dnsname
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: $appname
            port:
              number: 5301
    

"@

write-host "Applying config" -ForegroundColor Green

write-host $config -ForegroundColor Gray

$config |  kubectl apply -f -