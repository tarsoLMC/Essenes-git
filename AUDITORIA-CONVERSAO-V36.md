# Essenes — auditoria de conversão e implementação V36

## 1. O que foi analisado

A análise parte do pacote Essenes V35, com 12 páginas HTML, e resulta na V36, com 13 páginas HTML e uma medição própria opcional à navegação. Foram examinados a oferta, os botões, a sequência da home, a identificação do profissional, o percurso até o contato, a Roda da Vida, a experiência em telas pequenas e a entrega dos arquivos.

A pesquisa de usabilidade orientou as prioridades. As mudanças foram implementadas no código e conferidas em prévia de navegador e testes locais. Não foi feito experimento com visitantes reais nem auditoria de uma instalação publicada na Hostinger. Assim, os benefícios esperados abaixo são hipóteses fundamentadas, não percentuais comprovados de aumento de agendamentos.

## 2. Diagnóstico comercial

O site já tinha identidade visual, textos explicativos, contato por WhatsApp e uma ferramenta de reflexão funcional. O maior problema encontrado foi a distribuição dessas peças: o visitante recebia muita explicação e vários convites genéricos antes de encontrar uma resposta simples para “o que é oferecido, com quem vou falar e o que faço agora?”.

Havia quatro obstáculos especialmente concretos:

1. A home tinha 14 seções, incluindo blocos conceituais extensos que já podiam ser explorados nos guias internos.
2. O item Contato levava à área de dúvidas da home, não a uma página com canais e opções de primeiro contato.
3. Muitos botões diziam apenas para falar pelo WhatsApp. Isso identificava o aplicativo, mas pouco explicava a finalidade da conversa.
4. Temas e guias dependiam de rolagem horizontal no celular; as opções fora da tela podiam passar despercebidas.

A proposta implementada organiza a jornada em três decisões: entender a oferta, ganhar segurança para perguntar e iniciar um contato com intenção clara. A Roda da Vida permanece como caminho opcional de reflexão; não é um requisito para consultar o atendimento.

## 3. Pesquisa aplicada ao Essenes

### Clareza da oferta e das ações

O Nielsen Norman Group recomenda que a home explique o propósito do site e dê rótulos específicos às ações. A aplicação aqui foi identificar o serviço e o formato online na primeira tela, mostrar o responsável e trocar o convite principal por “Consultar valores e horários”. Isso ajuda o visitante a prever o próximo passo. Não significa que esse texto, isoladamente, tenha uma taxa de conversão comprovada para o Essenes.

Fonte: [Homepage Design: 5 Fundamental Principles](https://www.nngroup.com/articles/homepage-design-principles/).

### Contato sem barreiras desnecessárias

A pesquisa de contato do NN/G reforça a presença de telefone e e-mail, com formulários como alternativa e não como substituição. O estudo original é de sites corporativos; sua aplicação ao Essenes é uma inferência de usabilidade. Foi criada uma página de contato com WhatsApp e e-mail já no início, telefone explícito e composição opcional de mensagem. Não há cadastro ou preenchimento obrigatório.

Fonte: [‘Contact Us’ Page Guidelines](https://www.nngroup.com/articles/contact-us-pages/).

### Formulário curto e compreensível

O W3C orienta pedir apenas o necessário, associar rótulos aos controles, agrupar opções e fornecer instruções claras. O novo contato usa três assuntos, primeiro nome opcional e preferência de período opcional. A mensagem fica visível antes da abertura do WhatsApp. Há limpeza de campos e cópia, com alternativa quando a área de transferência não está disponível.

Fonte: [Forms Tutorial — W3C WAI](https://www.w3.org/WAI/tutorials/forms/).

### Velocidade percebida e desempenho

A orientação do web.dev para LCP destaca a descoberta e a prioridade do conteúdo principal, especialmente imagens. O Essenes já tinha WebP, variantes responsivas, dimensões de imagens e pré-carregamento da fotografia principal. Essas práticas foram preservadas. A home passou de sete para três elementos de imagem no conteúdo principal, reduzindo recursos secundários. Isso não equivale a uma medição de LCP nem comprova aumento de conversão.

Fontes: [Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp) e [The business impact of Core Web Vitals](https://web.dev/case-studies/vitals-business-impact).

### Abertura da marca: decisão com custo conhecido

As diretrizes clássicas de home do NN/G alertam que telas intermediárias podem atrasar o acesso ao conteúdo. Essa referência é antiga e não constitui um teste do Essenes, mas identifica um risco aplicável à abertura repetida. A apresentação foi preservada conforme o pedido anterior. Agora existe contato direto nela, além do botão de entrada e da saída por Escape. A abertura não é apresentada como um recurso que, por si só, aumenta vendas.

Fonte: [113 Design Guidelines for Homepage Usability](https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/).

## 4. Mudanças implementadas e finalidade

| Prioridade | Achado | Implementação V36 | Finalidade esperada |
|---|---|---|---|
| Alta | Oferta precisava ser compreendida mais rapidamente | Serviço e formato online, nome do responsável e convite para valores/horários na primeira tela | Reduzir a dúvida inicial sobre o que está sendo oferecido |
| Alta | Ação principal pouco específica | Botões principais com finalidade explícita | Tornar previsível o que acontece após o clique |
| Alta | Contato levava às dúvidas | Nova contato.html; navegação atualizada | Encontrar os canais no local esperado |
| Alta | Contato direto poderia ficar abaixo do formulário no celular | WhatsApp e e-mail no começo da página | Permitir conversa imediata sem preencher campos |
| Alta | Visitantes chegam com intenções diferentes | Assuntos: valores/horários, dúvida sobre sessão e Roda da Vida | Preparar uma conversa mais útil sem exigir um relato pessoal |
| Alta | Home longa e repetitiva | Jornada reduzida de 14 para 9 seções | Ajudar o visitante a chegar à decisão com menos repetição |
| Alta | Parte das opções ficava fora da tela | Temas e guias em grade, empilhados no celular | Tornar os caminhos importantes visíveis |
| Média | Profissional precisava aparecer cedo na decisão | Nome e formação declarada próximos da oferta; apresentação completa mantida | Dar contexto sobre quem conduz o atendimento |
| Média | Dúvidas comerciais misturadas com teoria | FAQ prioriza valor, horário, formato, preparação e limites | Responder perguntas que antecedem o contato |
| Média | Roda surgia antes de explicar o atendimento | Convite reposicionado após processo e apresentação | Preservar a ferramenta sem torná-la um desvio obrigatório |
| Média | Mensagem podia ser aberta sem revisão clara | Prévia da mensagem, campos opcionais e limpeza imediata | Dar controle ao visitante sobre o primeiro contato |
| Média | Não havia contagem própria de procura | Endpoint e painel protegido com totais diários | Observar eventos de interesse sem confundi-los com agendamentos |
| Técnica | Nova página precisava integrar a estrutura do site | Canonical, metadados, sitemap, links e cache de arquivos versionados | Manter navegação e entrega consistentes |

## 5. Como funciona o novo contato

O visitante pode ir direto ao WhatsApp ou preparar sua mensagem. Os assuntos disponíveis não exigem informações sobre conflitos, saúde ou histórico familiar. O primeiro nome e a preferência de período são opcionais. A preferência não representa uma reserva.

Ao mudar uma opção, a prévia e o link são atualizados. “Limpar campos” remove imediatamente nome e período da mensagem. Caracteres especiais são tratados como texto e codificados no link. O site não guarda o conteúdo do formulário em arquivo, cookie ou armazenamento local.

O texto passa a ser disponibilizado ao WhatsApp ao abrir o link; o envio ao terapeuta depende da confirmação do visitante no aplicativo. Não há envio automático de notas da Roda da Vida. Sem JavaScript, os canais diretos continuam disponíveis e o formulário de preparação fica oculto.

O texto não inventa preço, resposta imediata ou disponibilidade. Como essas informações não estavam definidas no material disponível, a implementação facilita a consulta em vez de publicar valores ou horários fictícios.

## 6. Medição própria já entregue

O pacote contém um coletor em PHP e um painel com acesso privado gerado. Não exige conta de analytics, banco de dados ou chave de plataforma externa. Os eventos são enviados ao próprio site em HTTPS. Os arquivos precisam estar numa hospedagem com PHP e permissão de gravação para o próprio site; o código foi validado com PHP 8.3.

| Contagem | O que representa | O que não comprova |
|---|---|---|
| Páginas vistas | Eventos de visualização nas páginas instrumentadas | Visitantes únicos |
| Acessos à home | Visualizações da página inicial | Pessoas diferentes |
| Acessos ao contato | Entradas na página de contato | Pedido enviado |
| Preparações personalizadas | Primeira interação com campos por carregamento | Interesse qualificado confirmado |
| Cliques no WhatsApp | Acionamentos de links para o número do Essenes | Mensagem efetivamente enviada ou sessão agendada |

A Roda da Vida não recebeu instrumentação: seu HTML e seus arquivos de funcionamento continuam iguais à V35. Assim, os cliques feitos dentro dela não fazem parte dessas contagens. Isso preserva o questionário e seus controles de compartilhamento.

O arquivo de métricas conserva apenas data e totais por evento por até 90 dias. Não registra nomes, mensagens, notas, URL, IP ou identificadores de visitantes nessa contagem. A hospedagem pode manter registros operacionais próprios. O painel informa as limitações de robôs, bloqueadores, repetições e falhas de rede.

O acesso privado está em um arquivo separado da entrega. A chave não foi incluída em páginas públicas ou neste relatório. O ZIP contém somente seu hash de verificação. O painel não tem vínculo no menu público, responde sem dados quando a chave é inválida e marca sua resposta para não indexação. Os dados ficam em diretório protegido e em arquivo PHP que não os exibe quando acessado diretamente.

## 7. Comparação estrutural

| Item | V35 | V36 |
|---|---:|---:|
| Páginas HTML | 12 | 13 |
| Seções da home | 14 | 9 |
| Elementos de imagem no conteúdo principal da home | 7 | 3 |
| HTML da home, sem compressão | 47.676 bytes | 36.772 bytes |
| Página dedicada de contato | Não | Sim |
| Mensagem de contato configurável e revisável | Não | Sim |
| Contagens próprias e painel privado | Não | Sim |

As quantidades acima vêm dos arquivos, não de tráfego real. O novo CSS da home é maior que o anterior, pois inclui o contato e os ajustes de conversão; reduzir o HTML não prova que todas as métricas de carregamento melhoraram. Não foi atribuída uma nota de Lighthouse ou um valor de LCP que não tenham sido medidos.

## 8. Conferências realizadas

- 13 páginas HTML, 354 links internos, imagens, âncoras, manifestos e arquivos locais.
- Mensagem padrão sem campos, assuntos por URL, caracteres especiais, limite do nome e opções de período.
- Limpeza síncrona dos campos, cópia e alternativa de seleção quando copiar não está disponível.
- Abertura da home, repetição, movimento reduzido, retorno pelo histórico e saída por teclado.
- Navegação pelo menu móvel até o contato; botão direto de WhatsApp presente na primeira tela do contato.
- Prévia em quadros de 320 e 390 px, sem rolagem lateral nas áreas verificadas, além de visualização em desktop. Não é teste em aparelhos físicos.
- Endpoint e painel: 15 verificações com PHP 8.3, incluindo autorização, contagem, rejeição de dados extras, origem, retenção e proteção da leitura direta dos dados.
- Cliente de métricas: payloads com apenas o nome do evento, sem conteúdo dos campos ou identificadores.
- Roda da Vida, seu núcleo de pontuação e sua interface preservados byte a byte.

Os testes de PHP geraram contagens fictícias apenas para verificação; elas foram removidas antes do empacotamento. Não foram enviadas mensagens reais ao terapeuta.

## 9. Alcance e limite da entrega

As mudanças estão implementadas no pacote. Não dependem de novos depoimentos, fotografias, textos, contas de calendário ou configuração de analytics pelo proprietário. A identidade e os contatos existentes foram aproveitados. Não foram criados depoimentos, certificados, resultados clínicos, escassez de agenda ou garantias de melhora.

A entrega não está publicada na Hostinger. Sem tráfego de produção e confirmação dos agendamentos fora do site, não é possível afirmar que a V36 aumentou a conversão em determinado percentual. Ela reduz obstáculos concretos e acrescenta meios de observar a procura; a medição não transforma um clique em agendamento confirmado.
