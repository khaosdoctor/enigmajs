# Enigma JS - O simulador Enigma I

> Uma implementação em JavaScript da máquina Enigma I.

Consulte esta documentação em [English](README.md) | [Português](README.pt.md)

Isso faz parte da minha série de vídeos na máquina Enigma. Você pode assistir aos vídeos no meu [canal do YouTube](https://youtube.lsantos.dev) (em português).

## [História](https://www.cryptomuseum.com/crypto/enigma/hist.htm)

O Enigma I foi uma máquina de cifragem alemã usada pelos militares durante a Segunda Guerra Mundial. Foi usada para criptografar mensagens enviadas pela Wehrmacht alemã (o exército). A Enigma I foi usada de 1923 a 1942. Apesar de outras implementações desse tipo de máquina serem encontradas na história (como a máquina de cifragem holandesa de Theo Van Hengel de 1915), a Enigma é considerada a primeira máquina de cifra baseada em rotor a ser amplamente bem sucedida como uma máquina comercial e um dispositivo militar.

Os primeiros protótipos foram criados por Arthur Scherbius, engenheiro elétrico alemão, em 1918, mas a primeira versão comercial só foi utilizada em 1923. A Enigma não era uma máquina única, mas uma série de dispositivos baseados em rotores; você pode conferir todos os modelos [aqui](https://www.cryptomuseum.com/crypto/enigma/tree.htm).

Dispositivos baseados em rotor usam um conjunto de rotores para criptografar e descriptografar mensagens. O Enigma I tem um conjunto de cinco rotores, cada um com 26 posições, das quais você pode escolher 3. Os rotores são colocados em uma ordem específica e cada um tem uma posição inicial específica. Os rotores são conectados a um teclado e a um lampboard. O teclado é usado para digitar a mensagem a ser criptografada e o lampboard é usado para exibir a mensagem criptografada. Os rotores são conectados uns aos outros e ao teclado e lampboard. Quando uma tecla é pressionada, o sinal passa pelos rotores e é refletido na roda refletora. Os rotores são conectados de forma que o sinal seja refletido em uma posição diferente da que foi enviada. É assim que a mensagem é criptografada.

Além dos rotores, o Enigma I possui um quadro de tomadas. O plugboard é um conjunto de 13 pares de letras. O plugboard é usado para conectar duas letras para formar um par de comutação. Isso é útil porque o Enigma I tem um número limitado de rotores e a mesma letra pode ser criptografada de diferentes maneiras. Esta é uma das partes mais importantes da máquina porque é ela que cria as diferentes combinações. Apesar de ter todos os 13 pares, você pode optar por não ligar uma letra na outra, o que significa que a letra não será trocada.

Cada vez que o teclado é pressionado, o sinal passa pelo plugboard, é deslocado ou não, então gira os rotores uma posição para frente, passa por todos os rotores, é refletido na roda refletora, passa por todos os rotores novamente, é deslocado novamente no quadro de tomadas e, finalmente, passa pelo quadro de lâmpadas. É assim que a mensagem é criptografada.

Para obter mais informações sobre o Enigma I, consulte o site do Crypto Museum [aqui](https://www.cryptomuseum.com/crypto/enigma/i/index.htm).

## Como usar

A Enigma pode ser usado para criptografar e descriptografar mensagens na mesma máquina. Mas antes que uma mensagem possa ser escrita, há alguns conceitos pelos quais você precisa passar primeiro.

### Conceitos

- **Roda de entrada (Eintrittswalze ou ETW)**: É o ponto de entrada do sinal para os rotores
- **Plugboard (Steckerbrett)**: É um conjunto de 13 pares de letras que serão trocadas entre si, o que significa que se um A estiver conectado a um B, uma vez que um A entrar, ele sairá como B. Você pode conectar uma chave ou não, se a chave não estiver conectada não haverá substituição.
- **Rotores**: Cada rotor é um disco circular como uma roda dentada com números (ou letras) de 1 a 26 ao seu redor. Por dentro, cada ponto de entrada é conectado a uma saída codificada diferente do outro lado. Há uma pequena janela na máquina onde você pode ver a posição atual do rotor.
- **Chave Diária (Grundstellung)**: É a posição inicial em que os rotores são colocados. Antes de 1940, esta era enviada junto com os livros de códigos para as configurações, após 1940, a chave diária era definida por mensagem.
- **Configuração do anel (Ringstellung)**: Cada rotor também vem com um mecanismo de deslocamento especial que permite girar o alfabeto, criando um deslocamento adicional na cifra. Essa configuração foi chamada de configuração do anel.
- **Refletor (Umkehrwalze ou UKW)**: É a etapa final da criptografia, ele conecta duas letras de forma fixa, e é o que permite que a mesma máquina seja usada para criptografar e descriptografar mensagens.

Mais informações sobre como o Enigma funciona podem ser encontradas:

- https://www.cryptomuseum.com/crypto/enigma/working.htm
- https://www.cryptomuseum.com/crypto/enigma/wiring.htm

### Livros de código

O exército enviava livros de códigos mensais para todos os soldados, esses livros de códigos tinham a configuração diária básica de uma máquina Enigma, todos os códigos eram reiniciados à meia-noite. Você pode conferir um exemplo deste livro de códigos [aqui](https://pastebin.com/pkJBjDEv).

![](./assets/codebook.png)

- **Tag**: O dia
- **Walzenlage**: A seleção do rotor para o dia, a partirm do rotor mais à esquerda para o rotor mais à direita
- **Ringstellung**: Explicado acima
- **Steckerverbindungen**: Os pares do plugboard, a qualquer momento, apenas 10 pares seriam conectados
- **Kenngruppen**: O grupo de controle, utilizado para permitir que as mensagens produzidas em dias diferentes sejam lidas sem a necessidade de todas as configurações a todo momento.

### Criptografando uma mensagem

Vamos criptografar a seguinte mensagem: `ENIGMAISCOOL` que tem 12 caracteres.

Existem duas maneiras de criptografar uma mensagem usando o enigma (vamos usar somente a depois de 1940), mas ambas começam definindo as configurações corretas de acordo com o livro de códigos. Vamos exemplificar pegando o dia 17 de dezembro do livro de códigos acima e colocando-o no enigma.

Começamos com as configurações do rotor e do anel:

![](./assets/settings.gif)

Nossos rotores são III, V, II. E as configurações do anel são 11 (K), 2 (B) e 25 (Y).

Agora, configuramos o plugboard:

![](./assets/plugboard.gif)

#### Configurando o cabeçalho

Toda mensagem vinha com um cabeçalho, este cabeçalho tinha as seguintes informações:

```
horas = total de páginas = página atual = caracteres na mensagem = chave de configuração =
```

Antes de 1940, a chave era digitada duas vezes, pois a configuração já estava no livro de códigos. Para definir uma configuração válida, escolhemos aleatoriamente três letras, digamos `JGH` e definimos as posições do rotor para estas letras:

![](./assets/setting-initial.png)

Agora escolhemos aleatoriamente outras três letras que serão nossa chave, digamos `WXA` e digitamos no teclado, obteremos um novo conjunto de três letras, que são `BIT`:

![](./assets/key-set.gif)

Esta é a chave que usaremos em nosso cabeçalho, que será:

```
1840 = 1tl = 1tl = 12 = JGH BIT =
```

Em seguida, escolhemos um dos grupos de três letras no Kenngruppen (no livro de códigos) para o nosso dia. Então vamos escolher `CGC` e duas outras letras aleatoriamente, como `OS` então `OSCGC`, este é o grupo de controle para nossa mensagem, é a primeira parte da mensagem que __não__ será criptografada:

```
1840 = 1tl = 1tl = 12 = JGH BIT =

OSCGC
```

O último passo é definir os rotores para nossa chave (`WXA`) e criptografar nossa mensagem:

![](./assets/encrypting.gif)

A mensagem final será:

```
1840 = 1tl = 1tl = 12 = JGH BIT =

OSCGC CBNEK JAJIH ZX
```

A Enigma agrupou as letras em grupos de cinco letras, então é mais difícil entender a mensagem.

### Descriptografando uma mensagem

Então, agora que recebemos a mensagem acima, a primeira coisa é olhar para o primeiro grupo de cinco letras, ignoramos as duas primeiras letras e olhamos para o Kenngruppen para encontrar o dia em que a mensagem foi enviada, então configuramos a máquina de acordo.

Em seguida, colocamos a configuração inicial, que está no cabeçalho: `JGH`

![](./assets/decoding-set-setting.gif)

Depois disso, digitamos a chave que foi enviada: `BIT` e devemos receber `WXA` de volta.

![](./assets/decoding-set-key.gif)

Agora definimos a chave como a posição do rotor e digitamos a mensagem sem o primeiro bloco:

![](./assets/decoding.gif)

Agora temos a mensagem final: `ENIGM AISCO OL` e só precisamos juntá-la: `ENIGMAISCOOL`

## Leitura adicional

Se você quiser continuar lendo, preparei [esta grande lista de links](https://lsantos.dev/yt-enigma-referencias) que você pode dar uma olhada.

O livro do professor David Kahn [The Codebreakers](https://www.amazon.com/Codebreakers-Comprehensive-History-Communication-Internet/dp/0684831309/ref=sr_1_1?keywords=the+codebreakers&qid=1669233736&sr=8-1) é uma ótima leitura se você quiser saber mais sobre o Enigma e as pessoas que o quebraram.

O professor @mikepound tem uma implementação super legal da mesma máquina em Java, você pode dar uma olhada [aqui](https://github.com/mikepound/enigma).

## Contribuição e Desenvolvimento

Para contribuir com o projeto, envie um PR. Este projeto é construído usando Vue.js + Vite e TypeScript. Todo o código é comentado para que as partes principais da lógica não sejam perdidas.

Para executar localmente, primeiro instale todos os pacotes com `npm install` e execute `npm run dev`, isso deve ativar um servidor vite local.
