# 👾 Nextjs + Typescript로 포켓몬 도감 만들기
#### Next.js 를 이용해 나만의 포켓몬 도감을 만들어 보기


### 필수 구현 사항 <br/>

📌 App router 기반, typescript 사용, tailwindcss 사용을 베이스로 한 Nextjs 14 버전으로 프로젝트가 구성<br/>
📌 Layout 에서 Title, description 에 대한 Metadata 를 설정하고, 어플리케이션 전체에 적용될 UI 구현<br/>
📌 151번까지의 포켓몬 리스트를 보여주는 페이지 구현(client component)<br/>
📌 특정 포켓몬의 디테일을 보여주는 페이지 구현. 다이나믹 페이지로 구성하며, 서버 컴포넌트로 작성하기.<br/>
📌 포켓몬 리스트와 상세페이지에서 항상 포켓몬들의 이미지 보여주기. Nextjs 가 제공하는 <Image> 를 이용하기<br/>
📌 포켓몬 데이터에 대한 타입, 컴포넌트들의 props 에 대한 타입 등 어플리케이션 전체에 적절한 타입 명시<br/>

### 선택 구현 사항 <br/>

📌 효율적인 포켓몬 데이터 관리를 위해 tanstack query를 도입해 캐시처리 <br/>
📌 포켓몬 디테일 페이지에 각기 다른 metadata title 설정하기. 다이나믹 페이지에 대해서 metadata 적용 <br/>
📌 api 를 변경해 151번 이상 포켓몬들도 도감에서 보여주기 (무한스크롤) <br/>
🚧 api handler 코드의 axios에 대한 적절한 타입들 지정 <br/>
