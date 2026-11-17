<?php
declare(strict_types=1);
const ESSENES_METRIC_EVENTS = ['page_view','home_view','contact_view','contact_customized','whatsapp_click'];
function essenes_metrics_path(): string { return __DIR__ . '/metricas-privadas/contagens.php'; }
function essenes_metrics_read(): array {
    $path=essenes_metrics_path();
    if (!is_file($path)) return [];
    $handle=@fopen($path,'rb');
    if (!$handle) return [];
    flock($handle,LOCK_SH);$text=stream_get_contents($handle);flock($handle,LOCK_UN);fclose($handle);
    $data=json_decode(substr((string)$text,strlen("<?php exit; ?>\n")),true);
    return is_array($data)?$data:[];
}
function essenes_metrics_increment(string $event): bool {
    if (!in_array($event,ESSENES_METRIC_EVENTS,true)) return false;
    $handle=@fopen(essenes_metrics_path(),'c+');
    if (!$handle) return false;
    if (!flock($handle,LOCK_EX)) { fclose($handle);return false; }
    $text=stream_get_contents($handle);
    $data=json_decode(substr((string)$text,strlen("<?php exit; ?>\n")),true);
    if (!is_array($data)) $data=[];
    $today=(new DateTimeImmutable('now',new DateTimeZone('America/Sao_Paulo')))->format('Y-m-d');
    $data[$today][$event]=(int)($data[$today][$event]??0)+1;
    $cutoff=(new DateTimeImmutable('-89 days',new DateTimeZone('America/Sao_Paulo')))->format('Y-m-d');
    foreach($data as $day=>$counts) if($day<$cutoff) unset($data[$day]);
    ksort($data);
    $output="<?php exit; ?>\n".json_encode($data,JSON_UNESCAPED_SLASHES|JSON_THROW_ON_ERROR);
    rewind($handle);$ok=ftruncate($handle,0)&&fwrite($handle,$output)===strlen($output);fflush($handle);flock($handle,LOCK_UN);fclose($handle);
    return $ok;
}
