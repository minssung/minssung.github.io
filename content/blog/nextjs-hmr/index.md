---
path: '/nextjs-hmr'
date: 2025-02-02
title: 'Next.js를 다루며 - HMR'
thumbnail: './hmr-thumbnail.png'
tags: ['Next.js', 'React', 'HMR', 'Hot Reload', 'Fast Refresh']
---

![HMR](./hmr-thumbnail.png)

Next.js 프레임워크를 사용한지 어느덧 4년이 되어갑니다.

React는 2020년도에 초기 16.x 버전으로 사용하여 함수형 컴포넌트가 아닌 클래스형 컴포넌트를 사용했었고, (componentDidMount…) 2021년부터 사용한 Next.js는 v10으로 시작하여 어느덧 지금인 2025년에는 15버전이 릴리즈되었네요.

이러한 글을 쓰게된 계기는 Next.js를 지금껏 사용해오면서 그간 경험을 되돌아보고 최근에 학습이 필요하다고 느낀 부분을 보충 + 저와 같은 문제를 겪고계신 분들의 피해를 덜어드리고자 입니다.

이번 글은 여러 기능 중에서 HMR(Hot Module Replacement)에 대해 알아보고자 합니다.

아마 프론트 개발을 해보신 분이라면 HMR, Hot Reload, Fast Refresh 모두 한 번씩은 들어보셨을텐데요, 각자가 조금씩 다르다는 점을 알고게셨나요? 저는 코드 업데이트 기법으로 셋 다 동일하게 사용하고 이름만 다른줄 알았습니다..

먼저, 헷갈릴 수 있는 HMR, Hot Reload, Fast Refresh의 관계에 대한 정리로 시작해 보겠습니다.

### 목차

- [HMR, Hot Reload, Fast Refresh](#hmr-hot-reload-fast-refresh)
- [이들의 사례](#이들의-사례)
- [내가 겪은 HMR 문제](#내가-겪은-hmr-문제)
- [문제 해결](#문제-해결)

---

### HMR, Hot Reload, Fast Refresh <a id="hmr-hot-reload-fast-refresh"></a>

개념적으로 보면 코드 업데이트를 위한 여러 기술들이 있는데, 이 중에서 <b>HMR(Hot Moudle Replacement)</b>가 가장 기본적인 메커니즘입니다. 이를 바탕으로, **Hot Reload**와 **Fast Refresh**는 **HMR**의 개념을 활용하거나 확장한 방식이라고 볼 수 있습니다.

다만, 엄격한 계층 구조라기보다는 <b>“HMR 기반 코드 업데이트”</b>라는 범주안에 속한 방식으로 이해할 수 있습니다. 

예를 들어 트리 구조로 표현하면 다음과 같이 나타낼 수 있습니다.

```plaintext
코드 업데이트 기법
│
├─ 전체 페이지 새로고침 (Full Reload)
│
└─ 모듈 단위 업데이트
    │
    └─ Hot Module Replacement (HMR)
         ├─ 기본 HMR
         ├─ Hot Reload
         │   └─ (HMR을 이용하지만, 구현에 따라 상태 보존이 미흡할 수도 있음)
         └─ Fast Refresh
             └─ (React/React Native에 특화되어, HMR을 개선하여 상태 보존 및 에러 회복 기능 강화)

```

이 구조에서 보듯이 Hot Reload와 Fast Refresh 모두 HMR의 개념을 활용하는 것으로 볼 수 있습니다.

### 이들의 사례 <a id="이들의-사례"></a>

#### HMR(Hot Module Replacement)

현재 가장 많이 사용되고 있는 번들러 Webpack에서 HMR을 지원하고 있습니다. Webpack의 플러그인 중에서 `webpack-dev-server`가 있는데, 보통 React를 CRA(Creat-React-App)로 설치할 경우 내부적으로 같이 설치됩니다. (React만 따로 설치하면 Webpack 구성이 안되어 있습니다.)

혹시나 CRA로 설치된 리액트 프로젝트에서 직접 Webpack 구성을 확인해보려 하신다면, 일반적으로는 볼 수 없을겁니다. 왜냐면 CRA는 기본 제공되는 라이브러리들을 모두 숨김 처리해두었기 때문이죠.

그래서 제가 __“webpack-dev-server는 어떻게 보는가?”__ 에 대한 결과만 사진으로 보여드리겠습니다! 이 방법은 실제 웹팩 설정을 수정할 게 아니라면 할 필요가 전혀 없기 때문에…

![hmr-cra-default](./hmr-cra-default.png)

CRA로 React 앱을 설치하면 세팅되는 디렉토리 구조입니다. 여기서 Webpack 세팅을 보고싶다! 하면 터미널에 `npm run eject` 스크립트를 입력하면 꽁꽁 숨어있던 Webpack이 모습을 드러냅니다.

![hmr-cra-eject](./hmr-cra-eject.png)

root에 config 디렉토리가 추가되고, package.json에 명시된 dependencies에는 온갖 라이브러리가 노출되게 되는데 빨간줄로 표시된 부분을 보시면 `webpack-dev-server`가 포함되어 있습니다.

그런데 Next.js는 어떨까요? 마지막에 Fast Refresh에서 함께 설명하겠습니다.

#### Hot Reload

Hot Reload는 HMR을 활용하는 초기 방식들로, HMR을 이용하되 상태 보존이 미흡할 수 있습니다.
React 개발 환경에서 과거에 사용되던 [react-hot-loader](https://github.com/gaearon/react-hot-loader)가 대표적인 예시입니다.

이는 HMR 기능을 활용해 컴포넌트 변경 시 전체 리로드 없이 업데이트를 시도했지만, 때때로 컴포넌트의 내부 상태가 초기화되는 등의 한계가 있었습니다. 위 링크의 깃헙 페이지 마지막 커밋 날짜를 보면 3년 전으로, 현재는 사용하지 않는 것으로 볼 수 있겠네요.

#### Fast Refresh

Fast Refresh는 React와 React Native에 특화된 HMR 방식으로, Hot Reload를 개선하여 상태 보존 및 에러 회복 기능을 강화한 방식입니다. 에러 회복 기능이란? 아래 GIF를 보면 알 수 있습니다.

![hmr-fast-refresh](./hmr-fast-refresh.gif)
<div id="caption">Fast Refresh를 통한 에러 회복</div>

코드를 수정하고 저장함과 동시에 에러가 발생하면, 위 화면처럼 **react error overlay**가 뜨면서 에러가 발생한 부분을 표시해줍니다. 여기서 에러를 수정하면, 자동으로 해당 컴포넌트만 리로드되어 수정된 내용이 반영됩니다.

Next.js에서 사용되는 Fast Refresh 기능은 React의 React Refresh 기술을 기반으로 하되, Next.js 프레임워크에 최적화된 방식으로 통합된 하이브리드 구현체입니다.

주요 차이점은 다음과 같습니다.

| 기능 | React Refresh | Next.js Fast Refresh |
|:---|:---|:---|
| 적용 범위 | 모든 React 앱 | Next.js 앱 전용 |
| 설정 방식 | 수동 구성 필요 | 자동 활성화 |
| 파일 처리 | 기본 JS/CSS만 지원 | MDX, SCSS 등 확장 지원 |
| 환경 구성 | 직접 구현 | .env 파일 핫 리로드 |
| 에러 핸들링 | 기본 오버레이 | 향상된 디버깅 툴 |

또한, Next.js에서 웹팩을 수정하는 것이 CRA보다 훨씬 간편합니다. `next.config.js` 파일에 설정을 추가하면 되는데 간단한 코드 예시를 보여드리겠습니다.

```javascript
// next.config.js
module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config
  },
}
```

위 코드는 [Next.js 웹팩 커스텀 공식문서](https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config)에서 가져온 예시이며, 공식문서에 자세한 설명이 있으니 필요하다면 참고하시면 좋을 것 같습니다.

Next.js 12.3 버전 이후로는 .env 파일 변경 시에도 핫 리로드가 가능하도록 확장되었으며, 이는 Next.js만의 독자적인 구현체입니다. 따라서 **React의 핵심 기술을 기반으로 하되, Next.js의 아키텍처에 맞춘 추가 최적화가 적용된 기능**이라고 할 수 있습니다.

### 내가 겪은 HMR 문제 <a id="내가-겪은-hmr-문제"></a>

실무에서 겪은 문제로 Fast Refresh가 제대로 동작하지 않아 생산성에 큰 오류가 생긴 상태입니다. 지금은.. 코드 한 번 수정하면 해당 컴포넌트만 리렌더링되는 것이 아니라 페이지가 새로고침되어버리는 크나큰 이슈에 시달리는 상태 - -

이 문제는 코드상으로 크리티컬 한 것이 아니라 개발 편의를 누리지 못하는 문제여서 에러가 아니라 경고 레벨의 로그를 남기고 있는데요. 먼저 웹 브라우저의 콘솔 창을 열어보면 다음과 같은 경고 메시지를 볼 수 있습니다.

![hmr-problem1](./hmr-problem1.png)

이 경고가 뜨면 웹이 새로고침되듯 Full Reload가 됩니다.
전체 리로드 한다 해도 초기 진입 시간이 짧다면 문제가 없지만, 저희 프로젝트의 경우 진입과 동시에 캐싱하지 않고 신규 데이터를 불러오는 상황이라 초기 진입 시간이 길어집니다. (비즈니스 상 이유로 캐싱을 사용하지 않고 있습니다.)

그래서 매번 코드를 수정할 때마다 짧게는 5초, 길게는 10초 이상의 시간이 소요되곤 합니다.

![hmr-problem2](./hmr-problem2.png)

이전 사진은 웹 브라우저 상의 로그였다면, 이번에는 터미널 상의 로그입니다. 친절하게도 해결방법이 나와있는 링크를 제공해주고 있네요. __얼른 노란화면 그만보고 해결하러 떠나야겠습니다.__

### 문제 해결 <a id="문제-해결"></a>

해결하기 위해 가장 먼저 Next.js의 공식문서를 확인해보았습니다. [Next.js - Fast Refresh](https://nextjs.org/docs/architecture/fast-refresh)에 따르면, Fast Refresh는 Next.js 9.4 버전부터 기본적으로 활성화되어 있으며, 특별한 설정이 필요하지 않다고 합니다.

문서에서 소개하는 제한 사항은 다음과 같습니다.

- 비 React 파일 수정 (예: `utils.js`, 'config.js' 등)
- React 컴포넌트 외부에서 상태를 변경하는 경우 (예: `useState`를 사용하지 않는 경우)
- HMR이 불가능한 구조 (예: 익명 화살표 함수 사용 시)

위에서 세 번째 제한 사항이 문제의 원인이라고 판단하여, 해당 부분을 수정하였습니다.

```tsx
// Before
export default () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

// After
const App = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => setCount(count + 1)
  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

export default App
```

이렇게 수정하니, Full Reload가 발생하지 않더군요. 이제는 코드 수정 시 페이지가 새로고침되지 않고, 수정된 컴포넌트만 리마운트되는 것을 확인할 수 있었습니다.

번외로 공식 문서를 보다가 발견한 신박한 기능이 있어서 공유드립니다.
Fast Refresh가 정상적으로 돌면 코드 수정에도 컴포넌트의 상태가 유지되게 되는데, 만약 애니메이션 등의 상태를 유지하고 싶지 않다면 `// @refresh reset` 주석을 추가하면 된다고 합니다.

이로써 모두 해결한 것 같지만.. **진정한 Fast Refresh는 코드가 수정된 컴포넌트의 상태 또한 보존되어야 합니다.(즉, 리마운트되면 안됨)** 이 부분은 아직 해결하지 못한 상태이며, 이번에 학습한 내용을 바탕으로 추가적인 조사와 수정을 진행해보려 합니다.

---

#### 참고 자료
- https://blog.logrocket.com/7-common-next-js-hmr-issues/
- https://dev.to/writech/how-to-enable-hot-reloading-for-env-files-in-nextjs-3026