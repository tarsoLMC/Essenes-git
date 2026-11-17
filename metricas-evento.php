<?php
declare(strict_types=1);
header('Cache-Control: no-store');header('X-Content-Type-Options: nosniff');
if (($_SERVER['REQUEST_METHOD']??'')!=='POST') { http_response_code(405);header('Allow: POST');exit; }
$origin=$_SERVER['HTTP_ORIGIN']??'';
if ($origin!=='') {
    $host=strtolower((string)parse_url($origin,PHP_URL_HOST));
    if (!in_array($host,['essenes.com.br','www.essenes.com.br'],true)) { http_response_code(403);exit; }
}
$body=file_get_contents('php://input',false,null,0,256);
$payload=json_decode((string)$body,true);
if (!is_array($payload)||array_keys($payload)!==['event']||!is_string($payload['event'])) { http_response_code(400);exit; }
require_once __DIR__.'/metricas-lib.php';
if (!in_array($payload['event'],ESSENES_METRIC_EVENTS,true)) { http_response_code(400);exit; }
http_response_code(essenes_metrics_increment($payload['event'])?204:503);
