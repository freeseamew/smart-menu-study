## 일반 실행방법

1) npm 모듈 설치

: 다운받은 파일을 압축풀고 해당 폴더에서 npm 설치

```html
npm i
```

2) 개발 서버 실행

```html
DISABLE_WEBSOCKETS=true meteor run
```

---

## **build**

: 서버에서 실행될 코드 모음 만들기

- os와 함께 meteor 에서 지원하고 있는 nodejs 버전 확인이 필요
- meteor 현재 지원 nodejs 버전 확인([https://docs.meteor.com/changelog.html](https://docs.meteor.com/changelog.html))

1) nvm 설치 

nvm을 이용하면 nodejs버전을 자유롭게 변경하면서 사용할 수 있음.

nvm 사이트를 참고하여 각 os에 맞는 nvm을 설치

[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

- 윈도우

```html
https://github.com/coreybutler/nvm-windows/releases
```

- 맥

```html
brew install nvm
```

- 리눅스

```html
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

또는 

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

2) nvm을 os에 등록

다음으로 터미널의 버전에 따라 다음 내용으로 파일을 만들고 실행을 시켜 주어야 정상적으로 nvm 이 등록 됨. 

참고로 예제의 경우는 .zshrc로 파일을 만들고 진행됨.

```html
vi ~/.bashrc

또는
vi ~/.bash_profile

또는
vi ~/.zshrc
```

작성내용 (만약 작성내용이 적용되지 않으면 해당 파일에 내용을 추가해야함)

```html
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

또는 필요에 따라서 아래와 같이 설정해야 할 수 도 있음

```html
export NVM_DIR="/home/smartadmin/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

그리고 다음을 실행해 nvm을 등록해야 합니다. 예제의 경우 zsh사용함

```html
bash: source ~/.bashrc

zsh: source ~/.zshrc
```

정상적으로 실치가 되었다면 nvm 을 통해서 원하는 node를 선택하고 설치할 수 있음. 

```html
nvm --version

// node 설치
nvm install 14

// 버전선택
nvm use 14
```

현재 meteor에서 지원하고 있는 버전은 nodejs v14.19.3 이므로 이 버전을 설치하고 use로 사용하게 설정

**3) 빌드 파일 만들기**

실행방법

```html
meteor build /빌드경로 --architecture os버전
```

빌드 실행 예시

```html
meteor build /path/to/build --architecture os.linux.x86_64
```

참고로 다음과 같은 os별  빌드가 가능

```html
os.osx.x86_64
os.linux.x86_64
os.linux.x86_32
os.windows.x86_32
os.windows.x86_64
```

---

## 몽**고디비 설치**

예제의 경우 우분투 v20 버전에서 모고디비를 설치함.

os버전에 따라서 설치 방법이 다를 수 있음을 참고 바람.

1) public key를 가져오기

```html
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

2) 설치를 MongoDB를 위한 List 파일을 만들기

```html
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

3) 로컬 패키지 데이터베이스 불러오기

```html
sudo apt-get update
```

4) MongoDB 패키지 설치하기

```html
sudo apt-get install -y mongodb-org
```

5) MongoDB 실행/관리용 init 시스템 확인

```html
ps --no-headers -o comm 1
```

응답에 따라 해당 시스템을 사용하면 됨.

systemd - systemd (systemctl) 사용

init - System V Init (service) 사용

6) MongoDB 실행하기

```html
// MongoDB 서버 시작
systemctl start mongod

// 명령어를 이용해 설공적 실행 확인
sudo systemctl status mongod

//필요에 따라 다음 명령어를 실행하여 MongoDB가 시스템 재부팅 후 시작되도록 설정할 수 있음.
sudo systemctl enable mongod

// 필요에 따라 다음 명령어를 실행하여 MongoDB 프로세스를 중지할 수 있음.
sudo systemctl stop mongod

//필요에 따라 다음 명령어를 실행하여 MongoDB를 다시 시작할 수 있음.
sudo systemctl restart mongod
```

**mongodb 실행안될경우**

다음 파이 삭제 후 재실행

```html
/tmp/mongodb-27017.sock 
```

---

## **권한 설정**

앱을 실행할 유저를 만들고 폴더에 권한 부여

```html
user 생성
sudo adduser 유저이름

user 목록 보기
grep /bin/bash /etc/passwd

폴더 권한 설정
user chown 으로 권한 설정
ex)chown -R 유저이름 폴더명/

현재 로그인유저 변경
su 유저명
```

---

## 서버에 **nodejs 설치**

서버역시도 nvm을 이용해 필요한 nodejs 버전을 맞추는 것이 좋음

설치는 개발os와 마찬가지로 다음 nvm 사이트를 참고하여 설치

[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

설치

```html
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

또는

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

nvm 등록

```html
bash: source ~/.bashrc
```

다음으로 다음 명령어를 이용해 원하는 노드버전을 설치하고 사용 선택

```html
// node 설치
nvm install 14.19.3

// 버전선택
nvm use 14.19.3
```

---

## **meteor 실행**

빌드된 파일을 서버로 옮기고 실행하는 과정 

1) 폴더 만들기

```html
// work 폴더 생성
mkdir /work

// work로 이동
cd /work/

// 이미지 업로드 폴더와, 프로젝트 폴더 생서
mkdir fileUploads
mdkir smakrt-menu

// 생성한 앱 실행유저에게 해당폴더 권한 부여
sudo chown -R 유저이름 /work/

// 앱실행유저로 변경
su 유저이름
```

2) 복사 후 압축 풀기

```html
// 파일을 다운로드 받은 후 /work/smart-menu 로 복사
cp 파일명 /work/smart-menu

cd /work/smart-menu/

// 압축풀기
tar xzf 압축파일명
```

3) nvm으로 node 버전 맞추기

```html
nvm use 14.19.3
```

4) npm 설치

```html
cd /work/smart-menu/bundle/programs/server

npm i
```

5) 환경변수파일(.env)파일을 만들거나 생성

.env 파일

```html
ADMIN_PASSWORD = "원하는 비밀번호"
FILE_LOCATION = "/work/fileUploads"
```

6) 만들어진 .env 파일을 배치

참골 .env라는 파일은 숨겨진 파일로 일반적으로는 나타나지 않고 ls -al을 통해서 보면 보이게 됨.

```html
cp .env /work/smart-menu/bundle/
```

7) 실행

```html
cd /work/smart-menu/bundle/

PORT=3000 MONGO_URL=mongodb://localhost:27017/myapp ROOT_URL=http://localhost:3000  node main.js
```

---

## **pm2와 같이 실행**

pm2 설치

```html
npm i pm2 -g
```

실행방법

```html
MONGO_URL=mongodb://localhost:27017/test PORT=3000 ROOT_URL=http://localhost:3000 pm2 -i 0 start main.js --watch
```

기타 pm2 명령어

```html
-- 모니터링
pm2 monit

-- 프로세스 확인
pm2 list

-- pm2 프로세스 삭제
pm2 delete all

```