# Especificação de Estilo — Geração do UML para Draw.io

## 1. Objetivo

Este arquivo define exclusivamente as regras visuais e de organização utilizadas para transformar um `UML.md` em um arquivo `.drawio`.

As informações presentes no `UML.md` devem ser preservadas. As regras deste documento controlam principalmente:

- aparência dos blocos;
- cores;
- espaçamento;
- posicionamento;
- roteamento das conexões;
- legibilidade geral do diagrama.

O formato de saída padrão é **Draw.io / diagrams.net (`.drawio`)**.

---

## 2. Formato dos blocos

Cada classe deve ser representada por um bloco retangular.

### Regras

- Os blocos devem ser **retângulos**.
- Não utilizar cantos arredondados.
- Não utilizar curvas ou formas decorativas na borda.
- `rounded=0`.
- A borda deve ser simples e bem definida.
- O tamanho do bloco deve se adaptar ao conteúdo, respeitando limites razoáveis.
- Classes com mais conteúdo podem ser maiores que classes simples.
- Evitar blocos excessivamente altos ou largos quando for possível resumir o conteúdo sem perder informação importante.

### Estrutura visual sugerida

Cada bloco deve seguir aproximadamente:

```text
+--------------------------------------+
| NomeDaClasse                         |
+--------------------------------------+
| Variáveis                            |
| + propriedade                        |
| - campoPrivado                       |
| + outraPropriedade                   |
+--------------------------------------+
| Funções                              |
| + Metodo()                           |
| + OutroMetodo()                      |
| - MetodoInterno()                    |
+--------------------------------------+
```

As seções devem ser visualmente separadas por linhas horizontais.

---

## 3. Cores dos blocos

Os blocos devem utilizar cores diferentes para facilitar a leitura do diagrama.

### Regra principal

**Dois blocos vizinhos nunca devem possuir a mesma cor.**

A definição de "vizinho" considera principalmente:

- blocos imediatamente adjacentes horizontalmente;
- blocos imediatamente adjacentes verticalmente;
- blocos que possuem conexão direta entre si.

### Regras adicionais

- Utilizar uma paleta com várias cores suaves.
- Evitar cores excessivamente saturadas.
- O texto deve permanecer com alto contraste em relação ao fundo.
- A cor deve ser aplicada ao preenchimento do bloco.
- A cor não deve dificultar a leitura das variáveis ou funções.
- Quando duas classes possuem uma conexão direta, suas cores devem ser diferentes.
- O algoritmo de coloração deve tentar minimizar repetições próximas.

### Paleta

A implementação pode escolher a paleta visual, desde que:

1. as cores sejam visualmente distintas;
2. classes conectadas não tenham a mesma cor;
3. classes vizinhas não tenham a mesma cor;
4. o resultado permaneça profissional e legível.

---

## 4. Espaçamento entre blocos

O espaçamento é uma das prioridades do diagrama.

### Regras

- Manter distância suficiente entre os blocos.
- Não encostar blocos uns nos outros.
- Evitar que uma conexão precise passar pelo espaço interno de outro bloco.
- Reservar corredores livres para as conexões.
- Quanto maior o número de conexões de uma classe, maior deve ser a preocupação com espaço ao redor dela.

### Prioridade

A legibilidade das conexões tem prioridade sobre a compactação do diagrama.

É preferível:

```text
[Classe A]          [Classe B]


        ───────────────→


[Classe C]          [Classe D]
```

a:

```text
[Classe A][Classe B]
     ↘  ↑  ↙
[Classe C][Classe D]
```

Não tentar deixar o diagrama pequeno sacrificando a clareza.

---

## 5. Regra crítica: conexões não podem passar sobre blocos

Esta é uma das principais regras deste documento.

### Regra obrigatória

**Nenhuma seta ou linha de conexão deve atravessar o interior de um bloco de classe.**

Isso vale para:

- linhas horizontais;
- linhas verticais;
- segmentos intermediários;
- setas;
- conexões ortogonais;
- conexões com múltiplas curvas/segmentos.

A conexão deve sempre passar por áreas livres do diagrama.

### Exemplo correto

```text
[Classe A]                    [Classe B]
     |                             |
     |                             |
     +-----------------------------+
```

### Exemplo proibido

```text
[Classe A] -----------[Classe B]
             ^
             |
        linha passa
        pelo bloco
```

### Estratégia de roteamento

Preferir conexões:

- ortogonais;
- com segmentos horizontais e verticais;
- com corredores livres;
- com pontos intermediários calculados pelo gerador.

O roteamento deve considerar os retângulos das classes como obstáculos.

Antes de finalizar o arquivo, o gerador deve evitar rotas que intersectem os limites internos dos blocos.

---

## 6. Posicionamento das classes

O posicionamento deve considerar as relações entre as classes.

### Regras

- Classes fortemente relacionadas devem ficar relativamente próximas.
- Classes sem relação direta podem ficar mais afastadas.
- Evitar colocar uma classe entre duas classes que possuem uma conexão direta.
- Evitar longas linhas atravessando todo o diagrama quando uma organização melhor puder reduzir a distância.
- Evitar concentração excessiva de classes em uma mesma região.

### Objetivo

O layout deve favorecer uma leitura semelhante a:

```text
           [Classe Principal]
              /                       /                        ↓              ↓
      [Serviço A]      [Serviço B]
          /   \            |
         ↓     ↓           ↓
     [Repo A] [Repo B] [Database]
```

em vez de uma grade arbitrária em que as conexões cruzam vários blocos.

---

## 7. Cruzamento de conexões

Cruzamentos devem ser reduzidos ao mínimo possível.

### Prioridade

1. Não atravessar blocos.
2. Evitar cruzamentos.
3. Evitar linhas muito longas.
4. Manter classes relacionadas próximas.
5. Manter o diagrama compacto somente depois das regras acima.

Quando não for possível eliminar todos os cruzamentos, o gerador deve escolher o layout que produza o menor número possível de cruzamentos e preserve a legibilidade.

---

## 8. Conexões

As conexões devem utilizar setas claras e discretas.

### Regras

- Utilizar linhas suficientemente visíveis.
- A ponta da seta deve indicar claramente o destino.
- Preferir `edgeStyle=orthogonalEdgeStyle` ou equivalente.
- Evitar curvas desnecessárias.
- Evitar setas passando por cima de classes.
- Evitar que várias setas compartilhem exatamente o mesmo caminho quando isso prejudicar a leitura.
- Manter uma pequena distância visual entre linhas paralelas quando necessário.

---

## 9. Tipografia

O texto deve ser simples e legível.

### Nome da classe

- Deve possuir maior destaque.
- Utilizar fonte em negrito.
- Deve ficar na parte superior do bloco.

### Seções

Utilizar:

- `Variáveis`
- `Funções`

As seções devem possuir destaque moderado.

### Membros

Manter os indicadores de visibilidade presentes no `UML.md`:

```text
+ público
- privado
# protegido
```

Não alterar a informação original apenas por motivos estéticos.

---

## 10. Conteúdo excessivo

Quando uma classe possuir uma quantidade muito grande de membros, o gerador pode resumir visualmente o conteúdo para evitar blocos gigantes.

Exemplo:

```text
Variáveis
+ campoA
+ campoB
- campoC
... (17 ocultos)

Funções
+ MetodoA()
+ MetodoB()
+ MetodoC()
... (25 ocultos)
```

### Prioridade de exibição

Quando for necessário resumir:

1. membros públicos;
2. construtores;
3. membros relevantes para compreensão da classe;
4. demais membros.

O resumo visual não deve alterar o conteúdo original do `UML.md`.

---

## 11. Organização geral

O diagrama deve ser visualmente limpo, profissional e fácil de navegar.

Prioridades, em ordem:

1. **Nenhuma seta atravessando blocos.**
2. **Boa separação entre os blocos.**
3. **Redução de cruzamentos.**
4. **Classes relacionadas próximas.**
5. **Cores distintas entre vizinhos.**
6. **Blocos retangulares sem cantos arredondados.**
7. **Boa legibilidade do texto.**
8. **Compactação do diagrama.**

A compactação nunca deve prejudicar os itens anteriores.

---

## 12. Compatibilidade com Draw.io

O arquivo gerado deve ser um XML válido compatível com diagrams.net / Draw.io.

Antes de entregar o arquivo:

- validar o XML;
- garantir que atributos XML estejam corretamente escapados;
- garantir que todas as referências `source` e `target` das conexões existam;
- garantir que o arquivo possa ser aberto pelo aplicativo desktop do Draw.io;
- evitar estruturas XML desnecessárias que aumentem o tamanho do arquivo.

---

## 13. O que não deve ser alterado por este arquivo

Este documento é uma especificação de **estilo e layout**.

Ele não deve alterar:

- nomes das classes;
- nomes das variáveis;
- nomes das funções;
- visibilidade;
- conexões identificadas no `UML.md`;
- informações semânticas do UML.

Mudanças nesses elementos pertencem à geração/análise do UML e não à camada de estilo.

---

## 14. Princípio geral

O resultado final deve parecer um diagrama UML organizado, e não uma simples lista de caixas conectadas.

A regra mais importante é:

> **Legibilidade das relações entre as classes é mais importante que economizar espaço.**

Quando houver conflito entre um layout compacto e um layout legível, escolher o layout legível.
