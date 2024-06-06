# Projeto de Visualização 3D com Three.js

Este projeto demonstra uma cena 3D básica utilizando a biblioteca Three.js. A cena inclui uma skybox com textura, controles orbitais para navegação e responsividade a redimensionamento de janela.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado os seguintes softwares:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/<seu-usuario>/immersive-background.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd immersive-background
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

## Estrutura do Projeto

- `index.html`: Contém a estrutura HTML básica com um canvas para renderização da cena.
- `style.css`: Contém estilos básicos para o projeto.
- `main.js`: Contém o código principal para configuração e animação da cena 3D.

## Executando o Projeto

1. Inicie um servidor de desenvolvimento local:

   ```bash
   npm start ou npm run dev
   ```

2. Abra seu navegador e navegue para `http://localhost:3000` para ver a aplicação em execução.

## Código Principal

### Cena

A cena é criada e um skybox é adicionado utilizando uma esfera com uma textura aplicada.

```javascript
const scene = new THREE.Scene();
THREE.ColorManagement.enabled = false

const skyGeo = new THREE.SphereGeometry(45, 40, 40);
const texture = new THREE.TextureLoader().load('symmetrical_garden_02.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });

const skyBox = new THREE.Mesh(skyGeo, material);
skyBox.userData = 'no-occlusion';
scene.add(skyBox);
```

### Camera

A câmera é configurada com uma perspectiva e adicionada à cena.

```javascript
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 1000);
camera.position.z = 8.5;
scene.add(camera);
```

### Renderizador

O renderizador é configurado para renderizar a cena no canvas.

```javascript
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
document.body.appendChild(renderer.domElement);
renderer.setSize(size.width, size.height);
```

### Controles Orbitais

Os controles orbitais são habilitados para permitir a navegação na cena.

```javascript
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
```

### Animação

A função de animação atualiza os controles e renderiza a cena em cada frame.

```javascript
const clock = new THREE.Clock();

const animation = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}

animation();
```

### Responsividade

A aplicação é configurada para ajustar o tamanho do renderizador e da câmera quando a janela é redimensionada.

```javascript
window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
