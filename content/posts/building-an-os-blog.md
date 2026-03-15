---
title: "OS 스타일 블로그 만들기"
date: 2026-03-14
tags: ["hugo", "design", "css"]
categories: ["dev"]
---

Hugo와 순수 CSS/JS만으로 OS처럼 보이는 블로그를 만드는 방법을 소개합니다.

## 핵심 개념

블로그의 각 요소를 OS 은유로 매핑합니다:

| 블로그 개념 | UI 은유 |
|---|---|
| 글(Post) | 파일 |
| 카테고리 | 폴더 |
| 글 목록 | 디렉터리 리스트 |
| 글 페이지 | 문서 뷰어 |
| 메뉴 | 파일 탭 |

## 디자인 원칙

1. **JS 최소화** — 시계, 사이드바 토글 정도만
2. **SEO 유지** — 정적 HTML 기반
3. **다크 모드** — Catppuccin Mocha 컬러 팔레트
4. **반응형** — 모바일에서도 사용 가능

## 폴더 구조

```
themes/os-shell/
├── layouts/
│   ├── _default/
│   │   ├── baseof.html    # OS desktop shell
│   │   ├── list.html      # Directory listing
│   │   └── single.html    # Document viewer
│   ├── index.html         # Home (recent files)
│   └── partials/
│       ├── menubar.html   # macOS-style menu bar
│       ├── sidebar.html   # File explorer
│       └── dock.html      # Bottom dock
└── static/
    ├── css/main.css
    └── js/app.js
```
