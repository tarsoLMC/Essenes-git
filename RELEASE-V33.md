# Essenes — visual, navegação e desempenho V33

Base: `_public_html (5).zip`, enviado em 03/11/2026. Referências visuais fornecidas pelo proprietário: https://gorgonoid.com/consultoria/ e https://gorgonoid.com/pro/.

## Visual

A página inicial recebeu uma composição editorial com verde profundo, tons claros, tipografia serifada, fotografias com molduras orgânicas e hierarquia mais clara entre informação, leitura e contato. As páginas de conteúdo, privacidade e Roda da Vida acompanham a linguagem visual. A consulta à Portaria nº 702/2018 permanece disponível e ganhou um acesso visível na seção de dúvidas.

## Interações adaptadas das referências

- Entradas de blocos e cartões durante a leitura, com pequenos intervalos entre os elementos. O conteúdo continua visível se o JavaScript não estiver disponível.
- Brilho breve nos botões principais e resposta visual ao toque.
- Temas e conteúdos em carrosséis manuais no celular, com rolagem nativa, ajuste ao cartão, indicação de posição, setas e navegação por teclado.
- Cabeçalho com mudança discreta ao rolar, indicador de leitura e botão para voltar ao topo.
- Barra inferior para acessar a Roda e conversar com Alexandre. Ela aparece depois da abertura e recolhe ao abrir o menu ou alcançar o rodapé.
- Perguntas frequentes com uma resposta aberta por grupo e entrada suave do texto.
- Transições direcionais entre perguntas, animação curta da nota selecionada e entrada dos avisos da Roda.
- Botões Voltar e Próxima área fixos durante o questionário no celular. Eles ficam fora do bloco animado para manter sua posição estável.

As implementações são próprias, em CSS e JavaScript. Não foram incorporados textos, fotografias, depoimentos, ferramentas de rastreamento ou sistemas comerciais das referências. Os efeitos respeitam a preferência do sistema por movimento reduzido.

## Carregamento

| Arquivo da página principal | ZIP recebido | V33 |
| --- | --- | --- |
| CSS | 103.274 bytes | 40.279 bytes |
| JavaScript | 21.443 bytes | 6.909 bytes |

Redução aproximada de 61% no CSS e 68% no JavaScript principal, antes da compressão HTTP. Esses valores medem os arquivos; não representam uma medição de tempo de carregamento ou de Core Web Vitals.

As fotografias possuem versões menores selecionadas pelo navegador. Fontes locais foram mantidas; o fundo cósmico e as animações contínuas da versão anterior deixaram de ser carregados. Os dois scripts da Roda são entregues em um único arquivo. CSS e JavaScript possuem nomes identificados pelo conteúdo para combinar cache prolongado com atualização dos arquivos. As regras de cache e compressão dependem dos módulos da hospedagem e precisam ser verificadas após a publicação.

## Verificação

- 12 páginas HTML, links internos, âncoras, imagens responsivas, fontes e arquivos gerados verificados.
- Núcleo das 12 perguntas e da pontuação preservado byte a byte.
- Testes do gráfico confirmaram a correspondência entre notas e setores, incluindo 0 e 10, resultado parcial, exportação SVG e compartilhamento opcional.
- Questionário completo executado no navegador após a inclusão dos botões fixos: 12 etapas, aviso de conclusão, resultado e 12 notas no gráfico.
- Testados menu, carrossel, início e fim da rolagem, perguntas frequentes e barra de ações.
- Prévia no Chrome para desktop e em quadros com larguras de 360, 390 e 768 pixels; Home e páginas internas revisadas. Os quadros simulam larguras, sem substituir testes físicos em Safari/iPhone e Samsung.

## Manutenção

Os arquivos prontos acompanham o ZIP. A hospedagem não precisa de Node.js. Após editar `assets/css/site.css`, `assets/css/wheel.css` ou os scripts de origem, execute `npm install` e `npm run build` na pasta `tools` antes de reenviar o pacote. O gerador atualiza as referências dos arquivos nos HTMLs.

Não houve publicação na Hostinger nem alteração de DNS ou e-mail.
