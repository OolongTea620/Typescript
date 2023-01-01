# Typescript (.with Nest.js)
타입스크립트 학습 

목적 
1.  Typescript 학습
2.  Nest.js 학습

## 2. Nest.js 학습
### 1. 프로젝트 셋팅
순서
```
1. install deps
2. Set Up TypeScript complier settings
3. Create a Nest module and controller
4. start app
```
#### 1. install deps
1. npm  설정
```
> npm i
```
npm dependencies
```json
...
"dependencies": {
    "@nestjs/common": "^7.6.17",
    "@nestjs/core": "^7.6.17",
    "@nestjs/platform-express": "^7.6.17",
    "reflect-metadata": "^0.1.13",
    "typescript": "^4.3.2"
}
```
#### 2. tsconfig.json 파일 생성  
목적 : typescript complier setting
```json
// {root}/tsconfig.json
"dependencies": {
    "@nestjs/common": "^7.6.17",
    "@nestjs/core": "^7.6.17",
    "@nestjs/platform-express": "^7.6.17",
    "reflect-metadata": "^0.1.13",
    "typescript": "^4.3.2"
}
```
#### 3. create nest module and constroller
```
...(생략)...
```
#### 4. run app
```zsh 
npx ts-node-dev src/main.ts //main.ts 실행
```
### 2. 파일명 컨벤션
- 한 파일안에는 한 클래스가 있어야 한다. (몇 가지 예외 상황있음)
- 클래스명은 구현하고자 하는것을 나타내야 한다.
- 클래스명과 파일명은 항상 **동일해야**한다.
- Filename template : *name.type_of_thing.ts*


### (추가) nest-cli 사용하기
#### 1. nest-cli 설치하기
```zsh
npm install -g @nestjs/cli  // npm 패키지를 글로벌로 설치
```
#### 2. nest-cli로 프로젝트 만들기
```zsh
nest new [프로젝트명]
```
#### 3. Module 생성 cli
```zsh
nest generate module [모듈명] // nest 프로젝트 안에
```
{projectRoot}/src에 *모듈명* 파일이 생성되고    
그 안에 모듈명.modules.ts 파일 생성

```zsh
project명
└── 모듈명
    └── 모듈명.module.ts
```
#### 4. Controller 생성 cli
```zsh
nest generate controller [설명 1]/[설명 2] --flat
```
*설명*     
설명 1 : place the file in the folder in written [설명 1]   
설명 2 : Call the class "messages"  
--flat: Do not generate a folder for the element.


```zsh
project명
└── 모듈명
    ├── [설명 1].controller.spec.ts
    ├── [설명 1].controller.ts
    └── 모듈명.module.ts
```

```typescript
// module/모듈명.controller.ts
import { Controller } from '@nestjs/common';

@Controller('messages')
export class 설명2Controller {

}
```
### 2.Controller + route 설정
