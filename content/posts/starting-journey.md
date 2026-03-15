---
title: 블로그를 시작하며
date: 2026-03-15
tags:
  - hardware
  - meetup
  - nucode
  - nu40
  - numakers
categories:
  - hardware
---

> 아무 이야기를 하지 않으면 아무도 듣지 않는다.

최근에 이 문구가 자꾸 머릿속을 맴돈다. 그래서 쓰기로 했다.

## 시작

[nucode](https://nuworks.io) 대표님의 소개로 하드웨어 관련 technical writing을 시작한다. NU40 DK을 기반으로 무언가를 만드는 것부터 출발하지만, 이 블로그에는 그 외에도 내가 만들고 싶은 것들을 기록해 나갈 예정이다.

파프리카데이터랩, 왈라, 그리고 격동하는 AI 시대를 살아가는 지금 내가 하는 것들을 기록하고자 한다.

## Nucode Technical Writers 밋업

3월 7일에 밋업을 진행했다. 
사실상 생각만 하고 있던 글쓰기를 시작하게 해주었던.
너무 다양한 분야의 사람들이 와서 참 좋았다. 무엇을 만들까 — 만들게 너무 많아서 사실 탈이었다.

#### 만들고 싶은 것들
1. **무선 스플릿 키보드**
2. **보드게임 시뮬레이터** — 하드웨어 기반
3. **NUDK40 시뮬레이터**
4. **Flipper Zero 확장 kit**


**무선 스플릿 키보드**는, 실존하는 제품들이 너무 비싸거나 미려하지 않았다.

**NUDK40 시뮬레이터**는, 아두이노 에뮬레이터 [Velxio](https://velxio.dev/) 를 보고 생각한 아이디어인데, 
지금 생각은 [Renode](https://renode.io), 특히 아래 레포에서 나온 `nrf52840` 활용해서 가상 Nudk40 을 에뮬레이션 하는 것이다.

{{< github repo="antmicro/renode-zephyr-nrf52840" description="Renode simulation of Zephyr RTOS on nRF52840" >}}

[Flipper Zero](https://flipper.net)는... 두근두근한 마음으로 구입한 지 어언 2년... 도저히 사용처를 못 찾고 있다.
그나마 출입카드와 리모컨 정도.

아직 고르지 못하여, 실행하지 못하고 있는 중이다.
같은 writer 그룹에게 무엇이 좋아 보이는지 여쭤봐야겠다.

다음 글에서는 주제가 정해져 있기를.