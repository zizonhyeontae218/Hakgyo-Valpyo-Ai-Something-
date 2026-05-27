# Hakgyo-Valpyo-Ai-Something-

## 발표 실행기(Electron)

### 실행
```bash
npm install
npm start
```

### 동작
- 창 2개 실행
  - HTML Viewer
  - Presenter Script
- 2모니터면 각 창을 다른 화면에 배치, 1모니터면 좌/우 분할 배치
- Script 창의 이전/다음 버튼으로 Viewer 창 슬라이드 이동(좌/우 화살표 입력처럼 전달)
- Viewer 창에 `.html/.htm` 파일 드래그 앤 드롭으로 로드

### 배포(Windows)
```bash
npm run build:win
```
- 설치형(NSIS) + 포터블 EXE 산출물 생성
