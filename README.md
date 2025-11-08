# Layover Local · Prototype (Vite + React)
실행 방법:

```bash
npm i
npm run dev
# http://localhost:5173
```

배포(Vercel):
1) 이 폴더를 GitHub에 푸시
2) Vercel에서 New Project → 이 저장소 선택 → Framework: Vite 자동 인식
3) Build Command: `npm run build`, Output: `dist`

참고: Tailwind는 CDN을 사용(개발용). 프로덕션 전환 시 정식 설정 권장.
