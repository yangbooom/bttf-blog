---
title: 통속의 뇌 001
date: 2026-03-15
tags:
  - simulation
  - eon-systems
  - brain
  - connectome
  - drosophila
  - mujoco
categories:
  - Fun
---

매트릭스, 통속의 뇌. 늘 재미있는 컨셉이라고 생각했다.

[C. elegans](https://en.wikipedia.org/wiki/Caenorhabditis_elegans) (예쁜꼬마선충)을 시뮬레이션한 프로젝트를 본 적이 있다. 302개 뉴런을 통째로 시뮬레이션하는 것. 멋지긴 하지만, 단순한 생물이니 그러려니 했다.

그런데 [Eon Systems](https://eon.systems/)라는 회사에서 **초파리 뇌**를 시뮬레이션해서 컴퓨터 안에서 움직이게 시켰더니, 그 가상 초파리가 실제 초파리처럼 움직이는 것이 아닌가.

코오... 도대체 어떻게 하는 것일까.

### 비밀은 Connectome

찾아보니 깃헙 레포와 organization에서 많은 힌트를 얻을 수 있었다.

{{< github repo="eonsystemspbc/fly-brain" description="Drosophila brain simulation with spiking neural networks" >}}

그 기저에는 초파리의 뇌를 모두 데이터화하는 (Connectome이라고 하는) 엄청난 노가다 작업이 뒷받침되어 있었다. 성체 초파리의 경우 약 14만 개의 뉴런과 수천만 개의 시냅스가 매핑되어 있다. 

또 하나 재미있었던 건 [MuJoCo](https://mujoco.org/) 모델이다. 물리 시뮬레이션용으로 사용한 것으로 보이는데, fly body까지 모델링해 놓았다. 

### 그런데, 파리는 너무 징그럽다

초파리 애벌레는 어렸을 때 귀여웠던 것 같다. 조그마하니.

그래서 결심했다. 
초파리 유충에 대해서 Eon Systems의 방법론을 재현해 보고자 한다. 이름하여 Oraclarva 프로젝트.

다행히도 유충에 대한 데이터도 상당히 잘 갖춰져 있다. L1 유충의 완전한 뇌 커넥톰이 2023년에 발표되었고 (3,016 뉴런, 548,000 시냅스), 운동 회로, 행동 패턴에 대한 연구도 축적되어 있다.

해야 할 일은 대략 이렇다:

1. **커넥톰 데이터** 확보 — 유충 뇌의 뉴런·시냅스 연결 지도
2. **스파이킹 뉴럴 네트워크** 구현 — LIF 모델 기반 뇌 시뮬레이션
3. **MuJoCo 바디 모델** — 유충의 물리적 몸체 시뮬레이션
4. **감각-운동 루프** 연결 — 뇌가 몸을 제어하고, 몸이 뇌에 피드백

### 참고 논문 & 자료

#### 뇌 지도 (Connectome)

**Winding et al. 2023** — *Science*
초파리 L1 유충의 완전한 뇌 커넥톰. 3,016 뉴런, 548,000 시냅스.
곤충 뇌 전체가 시냅스 수준에서 매핑된 건 이게 처음이다.
https://doi.org/10.1126/science.add9330

**Eichler et al. 2017** — *Nature*
L1 유충 버섯체(mushroom body) 완전 커넥톰. 223 케니언 세포.
학습과 기억의 핵심 회로.
https://doi.org/10.1038/nature23455

**Ohyama et al. 2015** — *Nature*
다중감각 행동 선택 회로. 유충이 자극에 따라 행동을 결정하는 경로.
https://doi.org/10.1038/nature14297

#### 뇌 시뮬레이션

**Shiu et al. 2024** — *Nature*
성체 초파리 뇌의 LIF(Leaky Integrate-and-Fire) 시뮬레이션.
유충에 적용할 모델의 원본 레퍼런스.
https://doi.org/10.1038/s41586-024-07763-9

#### 몸 시뮬레이션 & 생체역학

**Sun et al. 2022** — *BMC Biology*
유충 crawling의 신경역학 모델. 근육 힘 134µN, 속도 0.64mm/s, SLS 모델 등 실측 파라미터.
MuJoCo 바디 모델의 핵심 레퍼런스.
https://doi.org/10.1186/s12915-022-01336-w

**Wang-Chen et al. 2024** — *Nature Methods*
NeuroMechFly v2. 성체 초파리 MuJoCo 시뮬레이션. "유충판" 아키텍처 참고.
https://doi.org/10.1038/s41592-024-02497-y

#### VNC & CPG (운동 회로)

**Fushiki et al. 2016** — *eLife*
유충 crawling 파 전파 회로. A27h(흥분)-Eve(억제) 인터뉴런이 후방→전방 파를 만든다.
VNC 스파이킹 회로의 직접적인 근거.
https://doi.org/10.7554/eLife.13253

**Pulver et al. 2015**
VNC를 뇌에서 분리해도 운동 패턴이 발생한다 → CPG가 뇌가 아니라 VNC에 있다는 증거.

#### 관련 프로젝트

{{< github repo="nawrotlab/larvaworld" description="초파리 유충 행동 시뮬레이션 (Box2D 기반)" >}}

{{< github repo="eonsystemspbc/flybody" description="성체 초파리 해부학적 MuJoCo 모델 (Eon Systems fork)" >}}

{{< github repo="TuragaLab/flybody" description="성체 초파리 해부학적 MuJoCo 모델 (원본)" >}}

---

다음 글에서는 커넥톰 데이터를 실제로 불러와서 뜯어보는 것부터 시작한다.
