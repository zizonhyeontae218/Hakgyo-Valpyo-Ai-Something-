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
- Linux/macOS에서는 `wine` 미설치 시 로컬 빌드가 실패할 수 있음

### 릴리즈 만들기(권장)
1. 버전 갱신
   ```bash
   npm version patch
   ```
2. 태그 푸시
   ```bash
   git push --follow-tags
   ```
3. GitHub Actions의 `Build Windows Release` 워크플로우가 Windows 러너에서 실행됨
4. Artifacts에서 설치파일(`*Setup*.exe`)과 포터블(`*Portable*.exe`) 다운로드


### Windows에서 바로 실행(.bat)
- `run-windows.bat` 더블클릭: 의존성 설치 후 앱 실행
- `build-windows.bat` 더블클릭: 설치형(NSIS)+포터블 EXE 빌드 시도
