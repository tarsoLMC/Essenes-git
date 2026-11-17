> **V36:** a home e o contato foram revistos para conversão. A apresentação da marca continua, com contato direto disponível. A medição própria é descrita em `AUDITORIA-CONVERSAO-V36.md` e `RELEASE-V36.md`. As notas abaixo documentam versões anteriores.

> **V35:** a home recebeu abertura própria e textura. A apresentação aparece em cada acesso à página inicial, com letras em sequência ou versão estática se houver movimento reduzido. As páginas internas foram preservadas. Consulte `RELEASE-V35.md`; as informações abaixo registram a integração anterior.

# Efeitos visuais — Essenes V34 e Grupo Saluvia V29

Os arquivos `assets/css/efeitos.css` e `assets/js/efeitos.js` são próprios e compartilhados pelos dois projetos. A identidade é selecionada pelo atributo `data-fx-theme` do elemento `body`.

## O que foi integrado

- Cabeçalho translúcido com desfoque e cor adequada a cada marca.
- Reflexo discreto nos cartões e inclinação leve na fotografia, apenas com mouse e ponteiro preciso.
- Resposta breve ao toque em botões e cartões.
- Borda luminosa em um botão de destaque por site: duas voltas, pausa fora da tela e quando a aba fica oculta.
- Entrada suave de componentes internos do Saluvia. O Essenes mantém as entradas já existentes.
- Respeito à preferência do sistema por movimento reduzido; nessa condição, os novos efeitos animados ficam desativados.

No celular, o reflexo e o acompanhamento do ponteiro são desativados. O conteúdo permanece visível sem JavaScript. Não foram adicionados rastreadores, fontes, bibliotecas, vídeos ou serviços de terceiros.

## Manutenção

Os efeitos já estão incluídos nos arquivos otimizados que as páginas carregam. Não acrescente novas tags de CSS ou script: isso duplicaria a execução.

Após editar os arquivos-fonte, execute `npm install` e `npm run build` dentro de `tools`. Envie os arquivos gerados e os HTML atualizados (Essenes) ou `includes/assets-manifest.php` (Saluvia) no mesmo envio. Node.js só é necessário para reconstrução local, não na hospedagem.

Para acrescentar uma borda em outro botão, use `data-fx-orbit`. Para uma entrada discreta adicional, use `data-fx-reveal`. Evite muitos destaques simultâneos.

Existe suporte opcional a `iframe[data-fx-src]` para carregar um vídeo perto da área visível, mas nenhum vídeo foi acrescentado nesta versão. Essa integração deve manter título acessível, proporção definida e a política de privacidade do site.

## Referência visual

As técnicas foram adaptadas a partir dos HTML enviados como referência, preservando as marcas Essenes e Saluvia. Um HTML baixado permite observar CSS e JavaScript presentes nele, mas não comprova o código de backend nem a infraestrutura do site de origem.

## Verificação desta entrega

- 12 páginas HTML do Essenes: links internos, arquivos, imagens, âncoras e manifestos conferidos.
- 50 rotas do Saluvia renderizadas com PHP 8.3, incluindo 34 produtos; links e arquivos locais conferidos.
- Aparência dos dois sites revisada no navegador em quadros de 390 e 360 px, sem transbordamento horizontal nos quadros testados.
- Comportamento dos efeitos com ponteiro preciso, toque, movimento reduzido e aba oculta verificado em teste local.
- Arquivos da Roda da Vida, dados de produtos, catálogo e lógica da cotação preservados em relação aos ZIPs anteriores.

Os ZIPs são pacotes completos para instalação. Esta entrega não publica alterações na Hostinger.

