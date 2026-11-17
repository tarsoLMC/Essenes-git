# Essenes V35 — abertura da marca e textura na home

A página inicial recebe uma abertura com **Essenes — Constelação Familiar Sistêmica** e a frase **Um novo olhar para a sua história.** A marca mantém a tipografia e o símbolo existentes, com verde profundo, marfim, dourado discreto e fundo com textura de tecido. As letras aparecem uma a uma em sequência rápida.

## Comportamento

- Abertura em cada carregamento da home, inclusive ao recarregar ou retornar pelo histórico do navegador.
- Duração normal de aproximadamente 2,2 segundos; botão Entrar no site e Escape antecipam a saída.
- Com movimento reduzido, a marca aparece completa e estática por aproximadamente 0,9 segundo.
- Se a aba está oculta, a apresentação aguarda o primeiro plano.
- Sem JavaScript, a abertura fica oculta e o conteúdo continua disponível.
- Não aparece nas páginas de conteúdo nem na Roda da Vida.

Os blocos da home recebem textura leve de papel, com o cabeçalho em marfim opaco para manter a leitura limpa durante a rolagem. Não foram acrescentadas imagens externas, bibliotecas ou serviços.

## Preservação e testes

As 11 páginas internas, incluindo roda-da-vida.html, e os arquivos da pontuação e interface da Roda permanecem byte a byte iguais à V34. Os arquivos CSS e JavaScript comuns mantêm seus nomes e conteúdo; apenas a home usa um novo CSS e o controlador de abertura inserido no HTML.

Conferidas 12 páginas HTML, 354 links internos, imagens, âncoras e arquivos locais. O controlador foi testado para repetição, retorno pelo histórico, botão, Escape, âncoras, movimento reduzido e aba oculta. Na prévia do navegador, quadros de 320 e 390 px registraram a abertura, as letras em sequência e o encerramento em aproximadamente 2,2 segundos. Recarregar a home repetiu a abertura. Aparência em desktop, menu de celular e acesso à Roda da Vida também conferidos. A conferência em larguras móveis não substitui teste em aparelhos físicos.

## Manutenção

O componente está em tools/home-intro.html, com os textos definidos em tools/build-assets.cjs. O comportamento está em assets/js/home-intro.js e os estilos em assets/css/home-v35.css. Ao editar essas fontes, execute npm install e npm run build dentro de tools e envie os arquivos reconstruídos juntos. O controlador é inserido no HTML da home pelo processo de construção, sem uma requisição adicional de script.

Este ZIP contém o site completo, pronto para public_html. Não é necessário Node.js na Hostinger. Faça backup, substitua os arquivos correspondentes e limpe o cache após instalar. Esta entrega ainda não foi publicada.
