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

### 3. Validator Pipe 자동 설정
#### 1. Tell Nest to user global validation

#### 2. Create a class that describes the different properties that the request body should have Data transfer object DTO
npm class-validator class-transformer 설치

```
npm install class-validator class-transformer
```
#### 3. Add validation rules to the class
#### 4. Apply that classes to the request handler

### 4. Services 와 Repositories 생성

|                      Services                       |                              Repositories                              |
| :-------------------------------------------------: | :--------------------------------------------------------------------: |
|                        class                        |                                 class                                  |
|          1 place to put any business logic          |                  1 place to put storage-related logic                  |
| Uses one or more repositories to find or store data | Usually ends up being a TypeORM entity, a Monogoose schema, or similar |

#### 1. Repository 생성

#### 2. Service 생성, Repository와 연결

#### 3. Controller Test

#### 4. Reporting Errors with Exceptions

#### 5. (추가)Inversion of Control Principle
Classes should not create instances of its dependencies on its own  

나쁜 예 
```typescript
export class MessagesController {
    messagesService: MessagesService;
    constructor () {
        // 이런 예시 
        this.messagesService = new MessagesService();
    }

}
```
좀 더 나은 예
```typescript
export class MessagesController {
    messagesService: MessagesService;
    
    constructor (service: MessageService) {
        this.messagesService = service;
    }
}
```
이유 : 해당 요청마다 계속해서 객체를 새로 생성하면 메모리 누수가 발생하기 쉽다. 그것을 방지해준다.

더 좋은 예시    
MessagesController receives its dependency, and it doesn't specifically require "MessagesRepository"

```typescript
interface Service {
    findOne (id: string);
    findAll ();
    create (contetent: string);
} // interface 정의를 하면 구현 여부에 상관없이 일단 참조가 가능하다.
export class MessagesController {
    messagesService: Service;
    
    constructor (service: Service) {
        this.messagesService = service;
    }
}
```

### 의존성 주입 (Dependency Injection)과 DI구현
의존성 주입     
하나의 객체가 다른 객체의 의존성을 제공하는 테크닉.     
객체의 생성과 사용의 관심을 분리한다.   
가독성과 코드 재사용을 높혀준다.

순서
1. At startupm register all classes with the container
2. Container will figure out what each dependency each class has
3. We then ask the container to create an intance of a class for us
4. Container create all required dependencies and gives us the instance
5. Container will hold onto the created dependency instances and reuse them if needed

1 ~ 2 : Use the Injectable decorator on each class on each class and add them to the modules list of providers
```typescript
import { Injectable } from '@nestjs/common';

@Injectable() // Marking this class for registration inside of the dye container, that register process
export class MessagesService {
    ...
}

...
// messages.module.ts 파일에 다음과 같이 등록
@Module({
  controllers: [MessagesController],
  providers :[MessagesService, MessagesRepository], // 여기
})
```
3 ~ 4 : Happens automatically - Nest will try to create controller instances for us 

특징

module providers는 하나의 클래스로 의존성 주입을 한다.
결과적으로 여러개를 의존성 주입 받더라도 같은 메모리 주소를 참조한다.
