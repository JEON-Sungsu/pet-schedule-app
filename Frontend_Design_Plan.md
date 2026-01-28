# Bow Schedule - 프론트엔드 설계 및 구현 계획

> 반려동물 스케줄 관리 모바일 앱 - React Native 학습 프로젝트

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [아키텍처 설계](#아키텍처-설계)
- [화면 설계](#화면-설계)
- [구현 계획](#구현-계획)
- [CI/CD 전략](#cicd-전략)
- [확장성 고려사항](#확장성-고려사항)

---

## 프로젝트 개요

### 목적

**핵심 학습 목표 3가지:**

1. **FCM 푸시 알림** - 서버(이미 구현됨)와 클라이언트 연동 경험
2. **EAS CI/CD** - 실제 App Store / Google Play 배포 경험
3. **React Native 정석 구조** - Feature-Based Architecture 학습

### 개발 일정

- **기간**: 4-5주
- **투입 시간**: 주 10시간 → **총 40-50시간**

### 프로젝트 특성

| 항목      | 내용                                |
| --------- | ----------------------------------- |
| 타입      | 학습용 사이드 프로젝트              |
| 개발 인원 | 1명                                 |
| 플랫폼    | iOS & Android                       |
| 서버      | 별도 구현 완료 (FCM 발송 기능 포함) |

### 핵심 기능 (MVP)

1. **소셜 로그인** - Google + Apple (2개)
2. **반려동물 관리** - CRUD
3. **스케줄 관리** - CRUD + 반복 일정
4. **FCM 푸시 알림** - 서버 연동
5. **프로필/설정** - 기본 기능

### 미래 확장 계획 (MVP 이후)

- 추가 소셜 로그인 (Kakao, Naver)
- 커뮤니티 기능
- 마켓플레이스

---

## 기술 스택

### Core

| 분야       | 기술         | 버전   | 선택 이유                 |
| ---------- | ------------ | ------ | ------------------------- |
| Framework  | React Native | 0.81+  | 크로스 플랫폼, 정석 학습  |
| Build Tool | Expo         | SDK 54 | EAS 배포, 빠른 개발       |
| Language   | TypeScript   | 5.9+   | 타입 안정성, strict mode  |
| Routing    | Expo Router  | 6.x    | File-based routing (정석) |

### State Management

| 분야         | 기술           | 용도                         |
| ------------ | -------------- | ---------------------------- |
| Server State | React Query v5 | API 데이터 캐싱, 동기화      |
| Client State | Zustand        | 전역 상태 (user, auth token) |

> **Note**: Context는 테마가 필요할 때만 추가

### Navigation

| 분야       | 기술                 | 설명                  |
| ---------- | -------------------- | --------------------- |
| Router     | Expo Router          | File-based routing    |
| Navigation | React Navigation 7.x | Stack, Tab 네비게이션 |

### UI/Styling

| 분야      | 기술                    | 설명              |
| --------- | ----------------------- | ----------------- |
| Styling   | React Native StyleSheet | 기본 스타일링     |
| Animation | react-native-reanimated | 60fps 애니메이션  |
| Icons     | @expo/vector-icons      | 아이콘 라이브러리 |
| Calendar  | react-native-calendars  | 캘린더 뷰         |

### Authentication

| 분야   | 기술                                         | 우선순위       |
| ------ | -------------------------------------------- | -------------- |
| Google | @react-native-google-signin/google-signin    | MVP            |
| Apple  | @invertase/react-native-apple-authentication | MVP (iOS 필수) |

> **Scope 축소**: Kakao, Naver는 MVP 이후 추가

### Push Notifications (핵심 학습 목표)

| 분야        | 기술                             | 설명                     |
| ----------- | -------------------------------- | ------------------------ |
| FCM         | @react-native-firebase/messaging | Firebase Cloud Messaging |
| Permissions | expo-notifications               | 알림 권한 관리           |

### Data & Storage

| 분야           | 기술              | 용도            |
| -------------- | ----------------- | --------------- |
| Secure Storage | expo-secure-store | 토큰 저장       |
| Cache          | React Query       | API 데이터 캐싱 |

> **Scope 축소**: WatermelonDB/MMKV 제외 (불필요)

### Networking

| 분야         | 기술               | 설명                      |
| ------------ | ------------------ | ------------------------- |
| HTTP Client  | Axios              | API 통신                  |
| Interceptors | Axios Interceptors | 토큰 자동 첨부, 에러 처리 |

### Development Tools

| 분야       | 기술                 | 용도        |
| ---------- | -------------------- | ----------- |
| Linting    | ESLint + Expo config | 코드 품질   |
| Formatting | Prettier             | 코드 포맷팅 |

> **Scope 축소**: Husky, Detox E2E 제외 (시간 부족)

### CI/CD & Deployment (핵심 학습 목표)

| 분야   | 기술       | 설명             |
| ------ | ---------- | ---------------- |
| Build  | EAS Build  | 클라우드 빌드    |
| Submit | EAS Submit | 스토어 제출      |
| OTA    | EAS Update | 코드 푸시 (선택) |

> **Scope 축소**: Sentry, Firebase Analytics는 배포 후 추가

---

## 아키텍처 설계

### 아키텍처 패턴

**Clean Architecture + Feature-Based Structure**

```
Presentation Layer (UI - Screens, Components)
       ↓
Business Logic Layer (Hooks, Services)
       ↓
Data Layer (API Client, Storage)
```

### 프로젝트 구조

```
pet-schedule-app/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                   # 인증 화면 그룹
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── onboarding.tsx
│   │
│   ├── (main)/                   # 메인 탭 그룹
│   │   ├── _layout.tsx           # Tab Navigator
│   │   ├── index.tsx             # Home (Pet List)
│   │   ├── schedules.tsx         # Schedule List
│   │   └── profile.tsx           # Profile
│   │
│   ├── pets/
│   │   ├── [id].tsx              # Pet Detail
│   │   └── add.tsx               # Add Pet
│   │
│   ├── schedules/
│   │   ├── [id].tsx              # Schedule Detail
│   │   ├── create.tsx            # Create Schedule
│   │   └── calendar.tsx          # Calendar View
│   │
│   └── _layout.tsx               # Root Layout
│
├── src/
│   ├── features/                 # Feature 모듈
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── GoogleLoginButton.tsx
│   │   │   │   └── AppleLoginButton.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useLogin.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── pets/
│   │   │   ├── components/
│   │   │   │   ├── PetCard.tsx
│   │   │   │   ├── PetForm.tsx
│   │   │   │   └── EmptyPetState.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── usePets.ts
│   │   │   │   ├── usePet.ts
│   │   │   │   └── usePetMutations.ts
│   │   │   ├── services/
│   │   │   │   └── petService.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── schedules/
│   │   │   ├── components/
│   │   │   │   ├── ScheduleCard.tsx
│   │   │   │   ├── ScheduleForm.tsx
│   │   │   │   └── CalendarView.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useSchedules.ts
│   │   │   │   └── useScheduleMutations.ts
│   │   │   ├── services/
│   │   │   │   └── scheduleService.ts
│   │   │   └── types.ts
│   │   │
│   │   └── notifications/
│   │       ├── hooks/
│   │       │   ├── useFCM.ts
│   │       │   └── usePushPermission.ts
│   │       ├── services/
│   │       │   └── fcmService.ts
│   │       └── types.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── ErrorView.tsx
│   │   ├── hooks/
│   │   │   └── useDebounce.ts
│   │   └── utils/
│   │       ├── date.ts
│   │       └── validation.ts
│   │
│   ├── core/
│   │   ├── api/
│   │   │   ├── client.ts         # Axios 인스턴스
│   │   │   └── interceptors.ts   # 토큰 첨부, 에러 처리
│   │   └── storage/
│   │       └── secureStorage.ts  # expo-secure-store 래퍼
│   │
│   ├── stores/
│   │   └── authStore.ts          # Zustand auth store
│   │
│   └── constants/
│       ├── colors.ts
│       ├── config.ts             # API URL 등
│       └── queryKeys.ts          # React Query keys
│
├── assets/
│   └── images/
│
├── app.json                      # Expo 설정
├── eas.json                      # EAS 빌드 설정
├── tsconfig.json
└── package.json
```

### 데이터 흐름

```
[User Interaction]
        ↓
[Screen (app/)]
        ↓
[Custom Hook (features/*/hooks)]
        ↓
[Service Layer (features/*/services)]
        ↓
[API Client (core/api)]
        ↓
[Backend API]
        ↓
[React Query Cache]  ←→  [Zustand Store]
        ↓
[Component Re-render]
```

### State Management 전략

**1. Zustand (Client State)**

```typescript
// stores/authStore.ts
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
```

**2. React Query (Server State)**

```typescript
// features/pets/hooks/usePets.ts
export const usePets = () => {
  return useQuery({
    queryKey: queryKeys.pets.all,
    queryFn: petService.getPets,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// features/pets/hooks/usePetMutations.ts
export const useCreatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: petService.createPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pets.all });
    },
  });
};
```

---

## 화면 설계

### 화면 구조

```
App
├── Auth Flow
│   ├── SplashScreen (자동 전환)
│   ├── OnboardingScreen (최초 1회)
│   └── LoginScreen
│
└── Main Flow (Bottom Tabs)
    ├── Home Tab
    │   ├── PetListScreen
    │   ├── PetDetailScreen
    │   └── AddPetScreen
    │
    ├── Schedule Tab
    │   ├── ScheduleListScreen
    │   ├── CalendarViewScreen
    │   ├── CreateScheduleScreen
    │   └── ScheduleDetailScreen
    │
    └── Profile Tab
        ├── ProfileScreen
        └── SettingsScreen
```

### 화면별 상세 설계

#### 1. Authentication Flow

**LoginScreen**

```
┌─────────────────────────┐
│                         │
│      🐾 Bow Schedule    │
│                         │
│  반려동물과 함께하는    │
│  스마트한 일정 관리     │
│                         │
│  ┌───────────────────┐  │
│  │  🔵 Google 로그인 │  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │  🍎 Apple 로그인  │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

- Google, Apple 2개 소셜 로그인
- 각 플랫폼 브랜드 컬러
- 로딩 인디케이터

#### 2. Home Tab (Pet Management)

**PetListScreen**

```
┌─────────────────────────┐
│ 🏠 내 반려동물      [+] │
│─────────────────────────│
│  ┌───────────────────┐  │
│  │ 🐕 멍멍이         │  │
│  │ 3살 · 골든리트리버│  │
│  │ 다가오는 일정: 2개│  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │ 🐈 야옹이         │  │
│  │ 5살 · 페르시안    │  │
│  │ 다가오는 일정: 1개│  │
│  └───────────────────┘  │
│                         │
│  다가오는 일정          │
│  ─────────────────────  │
│  • 오늘 14:00 산책      │
│  • 내일 09:00 병원      │
│                         │
└─────────────────────────┘
```

**AddPetScreen**

```
┌─────────────────────────┐
│ ←  반려동물 등록         │
│─────────────────────────│
│  ┌─────────────────┐    │
│  │   사진 추가     │    │
│  └─────────────────┘    │
│                         │
│  이름                   │
│  ┌─────────────────┐    │
│  │                 │    │
│  └─────────────────┘    │
│                         │
│  종류                   │
│  ┌─────────────────┐    │
│  │ 강아지 ▼        │    │
│  └─────────────────┘    │
│                         │
│  생년월일               │
│  ┌─────────────────┐    │
│  │ 2021-05-15      │    │
│  └─────────────────┘    │
│                         │
│     [등록하기]          │
└─────────────────────────┘
```

#### 3. Schedule Tab

**ScheduleListScreen**

```
┌─────────────────────────┐
│ 📅 일정           [+] [📆]│
│─────────────────────────│
│  [오늘] [내일] [이번주]  │
│─────────────────────────│
│  오늘, 5월 15일          │
│                         │
│  08:00                  │
│  ┌─────────────────────┐│
│  │ 🍖 사료주기         ││
│  │ 멍멍이 · 매일       ││
│  └─────────────────────┘│
│                         │
│  14:00                  │
│  ┌─────────────────────┐│
│  │ 🚶 산책하기         ││
│  │ 멍멍이 · 매일       ││
│  └─────────────────────┘│
│                         │
└─────────────────────────┘
```

**CreateScheduleScreen**

```
┌─────────────────────────┐
│ ←  일정 추가             │
│─────────────────────────│
│  반려동물                │
│  ┌─────────────────┐    │
│  │ 멍멍이 ▼        │    │
│  └─────────────────┘    │
│                         │
│  일정 종류              │
│  🚶 산책  🏥 병원  💊 약 │
│  🍖 식사  🛁 목욕  ➕기타│
│                         │
│  시간                   │
│  ┌─────────────────┐    │
│  │   14  :  00     │    │
│  └─────────────────┘    │
│                         │
│  반복                   │
│  ○ 한 번만  ● 매일      │
│  ○ 매주    ○ 매월       │
│                         │
│     [등록하기]          │
└─────────────────────────┘
```

#### 4. Profile Tab

**ProfileScreen**

```
┌─────────────────────────┐
│ 👤 프로필                │
│─────────────────────────│
│     ┌─────────┐          │
│     │  User   │          │
│     │  Photo  │          │
│     └─────────┘          │
│     홍길동               │
│     user@example.com    │
│                         │
│  설정                   │
│  ─────────────────────  │
│  🔔 알림 설정           │
│  📱 앱 정보             │
│                         │
│  계정                   │
│  ─────────────────────  │
│  🚪 로그아웃            │
│                         │
└─────────────────────────┘
```

### 디자인 시스템

**Colors**

```typescript
export const colors = {
  primary: {
    main: '#4A90E2',
    light: '#7AB8F5',
    dark: '#2E5F9E',
  },
  secondary: {
    main: '#50C878',
    light: '#7FD99B',
    dark: '#3A9B5C',
  },
  neutral: {
    white: '#FFFFFF',
    gray100: '#F7F7F7',
    gray200: '#E5E5E5',
    gray500: '#737373',
    gray800: '#262626',
    black: '#000000',
  },
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  },
};
```

**Spacing (8px Grid)**

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

---

## 구현 계획

### 5주 개발 로드맵 (총 44-50시간)

#### Phase 1: Foundation (8시간)

**목표**: 프로젝트 구조 + Core 설정

| Task                                        | 예상 시간 |
| ------------------------------------------- | --------- |
| 프로젝트 구조 생성 (Feature-based)          | 2h        |
| Core API client 설정 (Axios + Interceptors) | 2h        |
| Secure storage 래퍼 구현                    | 1h        |
| Zustand auth store 설정                     | 1h        |
| 공통 컴포넌트 (Button, Input, Card)         | 2h        |

**산출물**:

- `src/core/api/client.ts`
- `src/core/storage/secureStorage.ts`
- `src/stores/authStore.ts`
- `src/shared/components/*`

#### Phase 2: Auth + Pets (12시간)

**목표**: 인증 + 반려동물 CRUD

| Task                           | 예상 시간 |
| ------------------------------ | --------- |
| Google Sign-In 구현            | 3h        |
| Apple Sign-In 구현             | 3h        |
| Auth flow (Login → Main)       | 2h        |
| Pet CRUD hooks + service       | 2h        |
| Pet 화면들 (List, Detail, Add) | 2h        |

**산출물**:

- `src/features/auth/*`
- `src/features/pets/*`
- `app/(auth)/*`, `app/pets/*`

#### Phase 3: Schedules (8시간)

**목표**: 스케줄 CRUD + 캘린더

| Task                                   | 예상 시간 |
| -------------------------------------- | --------- |
| Schedule CRUD hooks + service          | 2h        |
| Schedule 화면들 (List, Detail, Create) | 3h        |
| 반복 일정 로직                         | 2h        |
| Calendar View (react-native-calendars) | 1h        |

**산출물**:

- `src/features/schedules/*`
- `app/schedules/*`

#### Phase 4: FCM 푸시 알림 (6시간) ⭐

**목표**: FCM 클라이언트 연동

| Task                         | 예상 시간 |
| ---------------------------- | --------- |
| Firebase 프로젝트 연동       | 1h        |
| FCM 토큰 발급 + 서버 전송    | 2h        |
| 포그라운드/백그라운드 핸들링 | 2h        |
| 알림 탭 → 딥링크 처리        | 1h        |

**핵심 구현**:

```typescript
// src/features/notifications/services/fcmService.ts
import messaging from '@react-native-firebase/messaging';

export const fcmService = {
  async requestPermission() {
    const status = await messaging().requestPermission();
    return status === messaging.AuthorizationStatus.AUTHORIZED;
  },

  async getToken() {
    return await messaging().getToken();
  },

  async registerToken(token: string) {
    // 서버에 토큰 등록
    await apiClient.post('/users/fcm-token', { token });
  },

  onMessage(callback: (message: FirebaseMessagingTypes.RemoteMessage) => void) {
    return messaging().onMessage(callback);
  },

  onBackgroundMessage(
    handler: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>
  ) {
    messaging().setBackgroundMessageHandler(handler);
  },
};
```

**산출물**:

- `src/features/notifications/*`
- Firebase 설정 파일들

#### Phase 5: EAS CI/CD + 배포 (10시간) ⭐

**목표**: 실제 스토어 배포

| Task                           | 예상 시간 |
| ------------------------------ | --------- |
| eas.json 설정                  | 1h        |
| iOS 인증서 + 프로비저닝        | 2h        |
| Android 키스토어 + 서명        | 1h        |
| EAS Build 테스트 (dev/preview) | 2h        |
| TestFlight 업로드              | 2h        |
| Google Play Internal Testing   | 2h        |

**EAS 설정**:

```json
// eas.json
{
  "cli": { "version": ">= 5.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": { "simulator": true }
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@email.com",
        "ascAppId": "YOUR_APP_ID"
      },
      "android": {
        "serviceAccountKeyPath": "./pc-api-key.json",
        "track": "internal"
      }
    }
  }
}
```

**산출물**:

- `eas.json`
- TestFlight 빌드
- Play Console 내부 테스트 빌드

### 주차별 마일스톤

| Week | Phase                  | 목표                     | 시간 |
| ---- | ---------------------- | ------------------------ | ---- |
| 1    | Foundation + Auth 시작 | 구조 완성, Google 로그인 | 10h  |
| 2    | Auth 완료 + Pets       | Apple 로그인, Pet CRUD   | 10h  |
| 3    | Schedules              | 스케줄 CRUD, 캘린더      | 8h   |
| 4    | FCM                    | 푸시 알림 연동           | 6h   |
| 5    | CI/CD + 배포           | EAS, 스토어 배포         | 10h  |

### 리스크 관리

| 리스크                | 확률 | 영향 | 완화 전략                                |
| --------------------- | ---- | ---- | ---------------------------------------- |
| 소셜 로그인 설정 복잡 | 중   | 중   | 공식 문서 우선, 한 번에 하나씩           |
| FCM iOS 설정          | 중   | 높   | Firebase 공식 가이드, 실 디바이스 테스트 |
| EAS 빌드 실패         | 중   | 중   | preview 빌드로 먼저 검증                 |
| 시간 부족             | 높   | 높   | 버퍼 5시간 확보, MVP 기능만              |

---

## CI/CD 전략

### EAS Build Profiles

**Development**

```bash
# 개발용 (Expo Dev Client)
eas build --profile development --platform ios
eas build --profile development --platform android
```

**Preview**

```bash
# QA/테스트용 (Internal Distribution)
eas build --profile preview --platform all
```

**Production**

```bash
# 스토어 배포용
eas build --profile production --platform all
eas submit --platform all
```

### 배포 플로우

```
Development → Preview → Production
    ↓            ↓           ↓
  개발자       테스터      스토어
```

### OTA Update (선택)

```bash
# JS 코드만 변경된 경우 (스토어 심사 없이)
eas update --branch production --message "Bug fix"
```

---

## 확장성 고려사항

### 미래 기능 추가 시

**추가 소셜 로그인**

```
src/features/auth/components/
├── GoogleLoginButton.tsx  (현재)
├── AppleLoginButton.tsx   (현재)
├── KakaoLoginButton.tsx   (미래)
└── NaverLoginButton.tsx   (미래)
```

**커뮤니티 기능**

```
src/features/
├── auth/
├── pets/
├── schedules/
├── notifications/
└── community/           (미래)
    ├── components/
    ├── hooks/
    ├── services/
    └── types.ts
```

### Feature Flag (필요시)

```typescript
// src/constants/featureFlags.ts
export const featureFlags = {
  kakaoLogin: false,
  naverLogin: false,
  community: false,
};
```

---

## 체크리스트

### 사전 준비

- [ ] Node.js 18+ 설치
- [ ] Expo 계정 생성
- [ ] Firebase 프로젝트 생성
- [ ] Apple Developer 계정 ($99/year)
- [ ] Google Play Console 계정 ($25)

### Phase별 완료 체크

**Phase 1: Foundation**

- [ ] 프로젝트 구조 생성
- [ ] API client 설정
- [ ] Auth store 설정
- [ ] 공통 컴포넌트 완성

**Phase 2: Auth + Pets**

- [ ] Google 로그인 동작
- [ ] Apple 로그인 동작
- [ ] Pet CRUD 동작

**Phase 3: Schedules**

- [ ] Schedule CRUD 동작
- [ ] 반복 일정 동작
- [ ] 캘린더 뷰 동작

**Phase 4: FCM**

- [ ] FCM 토큰 발급
- [ ] 서버에 토큰 전송
- [ ] 푸시 수신 (포그라운드)
- [ ] 푸시 수신 (백그라운드)

**Phase 5: CI/CD**

- [ ] EAS Build 성공
- [ ] TestFlight 업로드
- [ ] Play Console 업로드

---

**문서 버전**: 2.0.0
**최종 수정일**: 2025-01-28
**주요 변경**: 학습 목표 중심 아키텍처 간소화
