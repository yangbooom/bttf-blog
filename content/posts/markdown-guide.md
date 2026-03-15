---
title: "Markdown 렌더링 가이드"
date: 2026-03-13
tags: ["markdown", "guide"]
categories: ["general"]
---

이 글은 블로그의 Markdown 렌더링을 테스트하기 위한 가이드입니다.

## 텍스트 스타일

**볼드**, *이탤릭*, ~~취소선~~, `인라인 코드`

## 리스트

### 순서 없는 리스트

- 항목 1
- 항목 2
  - 하위 항목 A
  - 하위 항목 B
- 항목 3

### 순서 있는 리스트

1. 첫 번째
2. 두 번째
3. 세 번째

## 인용

> 좋은 디자인은 가능한 한 적게 디자인하는 것이다.
> — Dieter Rams

## 코드 블록

```javascript
const blog = {
  name: 'BTTF Blog',
  theme: 'os-shell',
  engine: 'Hugo',
  style: 'catppuccin-mocha'
};

console.log(`Welcome to ${blog.name}`);
```

## 표

| 기능 | 상태 |
|------|------|
| 메뉴바 | 완료 |
| 사이드바 | 완료 |
| 문서 뷰어 | 완료 |
| 독 | 완료 |
| 반응형 | 완료 |

## 수평선

---

## 링크와 이미지

[Hugo 공식 사이트](https://gohugo.io)로 이동하세요.
