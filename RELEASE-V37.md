# Essenes V37 — resultado compacto e convite discreto

Pacote completo para substituir os arquivos correspondentes do Essenes na Hostinger. Esta entrega ainda não foi publicada no site de produção.

## Mudanças

- O resultado aparece diretamente após a última resposta, sem a tela intermediária de confirmação.
- Roda limitada a 420 px no computador e 320 px no celular, dentro da largura disponível. A ampliação continua disponível, com rolagem dentro do próprio gráfico.
- Resumo mais curto, áreas por bloco e revisão das 12 respostas em detalhes expansíveis.
- Conversa com o terapeuta em um bloco menor, com botão de WhatsApp e personalização opcional da mensagem.
- Convite em formato de mensagem no canto após 3 segundos de visualização do resultado. É um cartão não modal, sem fundo escurecido, sem bloquear a roda e sem mover o foco automaticamente.
- Identificação “Um convite do site para você”, sem simulação de pessoa online, digitação ou conversa ao vivo.
- Botão de fechar; depois de fechado, só reabre se a pessoa tocar no botão “Conversar sobre minha roda”. Não reaparece sozinho na mesma avaliação.
- O convite não aparece durante a edição ou antes do resultado. Uma nova avaliação reinicia o convite; uma aba oculta não dispara a mensagem em segundo plano.
- Botão desse convite abre uma mensagem geral no WhatsApp, sem notas. O botão principal permite incluir as notas apenas quando a pessoa marca essa opção, com prévia do texto. Nenhuma mensagem é enviada automaticamente.
- Entrada suave curta, desativada para quem prefere movimento reduzido; botões de fechar e de ação com área de toque de pelo menos 44 px.

## Verificação

- Fluxo completo conferido no navegador em computador e em prévias de 390 e 320 px, incluindo resultado completo, parcial e nota zero.
- Testes de tempo com relógio controlado: oculto até 2.999 ms, visível em 3.000 ms; fechamento, reabertura, foco, edição, reinício, aba oculta e confirmação de reinício.
- Conferidos links do WhatsApp e consentimento de compartilhamento: as notas não entram no convite e só entram no botão principal após escolha explícita.
- Validados os arquivos referenciados e as âncoras internas das 13 páginas.
- Núcleo de perguntas, pontuação, geração de SVG e exportação mantido byte a byte. Home, páginas de conteúdo, formulário de contato, painel e acesso privado V36 preservados.

A verificação em largura móvel usa navegador com uma janela de teste estreita; não substitui teste em um aparelho físico específico. Os relatórios V36 são históricos: a afirmação de que a interface da roda não mudou se refere à V36, anterior a esta atualização.

## Instalação

Siga `00_INSTALAR_ESSENES.txt`. Envie o pacote completo e limpe o cache da Hostinger. Os arquivos de CSS e JavaScript da roda têm novos nomes para evitar o uso de versões antigas em cache. Não altere o acesso privado V36 e não apague contagens existentes.
