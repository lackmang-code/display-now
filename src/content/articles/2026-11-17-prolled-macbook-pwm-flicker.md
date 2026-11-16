---
title: "애플 맥북 프로 PROLED의 PWM 디밍과 플리커"
searchTitle: "맥북 프로 PROLED XDR 터치 탠덤 OLED PWM 디밍 플리커 240 Hz 진폭 56% 변조 깊이 듀티 사이클 DC 디밍 두통 눈 피로 편두통 팬텀 어레이 사카드 IEEE 1789 디스플레이 펄스 스무딩"
summary: "터치 맥북 프로 PROLED의 PWM 디밍을 Notebookcheck가 240 Hz, 진폭 56%로 측정했고 일부 구매자가 눈 피로와 두통을 보고했습니다. 플리커의 주파수와 변조 깊이가 두통과 어떤 관계로 연구돼 왔는지, 이 측정값이 그 연구에서 어디에 놓이는지 정리했습니다."
section: issue
reporter: DESK
publishedAt: 2026-11-17
collectWeekStart: '2026-11-09'
readingMinutes: 12
tags: [금주의핫이슈, 애플, 맥북프로, PROLED, 탠덤OLED, PWM디밍, 플리커, 변조깊이, 두통, 팬텀어레이, IEEE1789]
sources:
  - type: article
    title: "Notebookcheck, Amazing OLED panel - Apple MacBook Pro 14 PROLED XDR Review (Andreas Osthoff, 2026-11-05. 제품은 Apple Deutschland 제공. MacBook Pro 14 M5 Pro OLED, 14.2인치 3092×1986(259 PPI), 120 Hz. PWM 240 Hz, 진폭 56%, 밝기 99% 이하에서 검출, 99% 위에서는 없음. 모든 밝기에서 DC 디밍도 관찰. 비교표: Asus ProArt P14 960 Hz·30%, MacBook Pro 14 2024 M4 Pro Mini-LED 14,880 Hz·90%, HP ZBook Ultra G1a 14 492.6 Hz·43%, HP OmniBook Ultra 14 927.13 Hz·25%, Dell XPS 14 240.62 Hz·29%. 시험 기기의 52%는 PWM 미사용, PWM 검출 시 평균 7,544 Hz(최소 5, 최대 343,500). 측정 장비는 페이지에 없으나 오실로스코프 화면에 RIGOL MSO5102 표기. PWM 측정 화면 5장(0·25·50·75·100%)을 잘라 사용)"
    url: "https://www.notebookcheck.net/Amazing-OLED-panel-Apple-MacBook-Pro-14-PROLED-XDR-Review.1438048.0.html"
  - type: article
    title: "AppleInsider, If you're getting dizzy using PROLED MacBook Pro, you are not alone (Mike Wuerthele, 2026-11-10. 일부 신규 구매자의 눈 피로·두통. 240 Hz, 진폭 56%, 아이폰과 같다는 서술은 필자의 것. 지니어스 바 불만과 소매점 반품률이 평소보다 약간 높다는 서술은 건수·통계 없음. 필자가 의사가 아니라고 밝히고 신경과 전문의 상담을 언급. 디스플레이 펄스 스무딩은 아이패드 미니와 아이폰에 있고 macOS에는 없다고 서술. 애플의 입장·답변은 기사에 없음)"
    url: "https://appleinsider.com/articles/26/11/10/if-youre-getting-dizzy-using-proled-macbook-pro-you-are-not-alone"
  - type: article
    title: "OLED-Info, Some users Apple's new OLED MacBook Pro report eye strain and dizziness, blame the display's 240 Hz PWM dimming (2026-11-13. 유료 기사라 공개된 앞부분만 확인. 불만이 Reddit에서 처음 제기됐고 증상이 장시간 텍스트 읽기, 특히 다크 모드와 관련되며 일부는 이전 Mini-LED 맥북 프로로 돌아갔다는 서술. 사용자 수 없음)"
    url: "https://www.oled-info.com/some-users-apples-new-oled-macbook-pro-report-eye-strain-and-dizziness-blame"
  - type: disclosure
    title: "Apple, MacBook Pro 기술 사양 한국어·영어 페이지 (내장 디스플레이: ProMotion 최대 120 Hz 가변 재생률, 최소 밝기 1 cd/m²(애플 표기 nit). 디밍 방식·PWM·깜빡임 문구 없음) 및 Apple 뉴스룸 한국, PROLED XDR 디스플레이 탑재 MacBook Pro 발표 (2026-10-28. 14·16 모델, 탠덤 OLED, Mac 최초 터치 지원, 고객 도착 11월 6일. 패널 공급사 언급 없음)"
    url: "https://www.apple.com/kr/macbook-pro/specs/"
  - type: paper
    title: "Veitch J.A., Miller N.J., Effects of Temporal Light Modulation on Individuals Sensitive to Pattern Glare (LEUKOS 20(3):310-346, 2024, doi:10.1080/15502724.2023.2299210. 미국 PNNL·캐나다 NRC 소속. 서론: 시간 광변조 서술, 약 80 Hz 아래 플리커로 관찰, 자기식 안정기 형광등 100·120 Hz와 두통·눈 피로(Wilkins 외 1989), 두통 경향이 있는 사람에게서 두드러짐, 가시성 지표가 건강 결과를 예측하는지는 알려지지 않음(CIE 2017), Sekulovski 외 2020·Zhao 외 2020·Veitch 2019·Küller & Laike 1998 요약. 26명 재분석)"
    url: "https://www.energy.gov/sites/default/files/2024-05/ssl-veitch-miller-2024-leukos_tlm.pdf"
  - type: paper
    title: "Miller N.J., Irvin L.C., Royer M.P., Strachan C.D., Visibility and annoyance of the phantom array effect varies with age and history of migraine (Lighting Research & Technology 56(7):676-706, 2024, doi:10.1177/14771535241288783, PNNL. 55명(편두통 25명) 85가지 시간 광변조 파형, 검은 배경의 LED. 편두통군 가시성 높음(p=0.019), 실험 후 4 h 내 불쾌감·이상 반응 64% 대 19%, 두통 41% 대 8%. 변조 100% 직사각파는 1,200 Hz 미만에서 감지자 전원에게 보이고 평균 불쾌도 4 초과(0~8). 한계: 어떤 자극이 증상을 일으키는지 구분하도록 설계되지 않았고 참가자에게 증상 가능성을 미리 알림. 디스플레이 실험이 아님)"
    url: "https://www.energy.gov/sites/default/files/2024-11/ssl-miller-etal-2024-lrt_pae.pdf"
  - type: paper
    title: "Patterson Gentile C., Aguirre G.K., A neural correlate of visual discomfort from flicker (Journal of Vision 20(7):11, 2020, doi:10.1167/jov.20.7.11. 편두통 환자 10명·두통 없는 10명, 1.625~30 Hz 플리커, 불쾌 점수와 초기 시각 피질 ssVEP 진폭의 직선 관계(14개 조건 R²=0.83), 불쾌 정점 LMS 18.6 Hz·L-M 10.3 Hz·S 9.1 Hz. 저자들은 인과를 단정하지 않는다고 명시. 240 Hz는 시험하지 않음)"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7424114/"
  - type: paper
    title: "Davis J., Hsieh Y.-H., Lee H.-C., Humans perceive flicker artifacts at 500 Hz (Scientific Reports 5:7861, 2015, doi:10.1038/srep07861. 20~29세 10명, DLP 프로젝터. 균일 변조는 약 65 Hz에서 감도 0, 공간 가장자리가 있으면 전원이 200 Hz 이상에서 보고 일부는 800 Hz 이상, 중앙값은 500 Hz 초과에서 사라짐. 사카드 가설. OLED PWM 실험이 아님. 그림 1을 CC BY 4.0에 따라 출처를 밝히고 사용)"
    url: "https://www.nature.com/articles/srep07861"
  - type: paper
    title: "Kim M., Assessment of the effect on the human body of the flicker of OLED displays of smartphones (Journal of Information Display 22(4):269-274, 2021, doi:10.1080/15980316.2021.1950854. 저자 Minhyuk Kim은 삼성디스플레이 엔지니어. IEEE PAR1789 기준 서술, 스마트폰 OLED 240 Hz PWM을 CA-210·PDA100A·오실로스코프로 측정, 거리가 가까울수록 240 Hz 성분이 크고 5 cm 이상에서는 잡음과 구별되지 않음, 평균 시청 거리 33.95 cm 인용. 노트북 화면은 다루지 않음)"
    url: "https://www.tandfonline.com/doi/full/10.1080/15980316.2021.1950854"
  - type: paper
    title: "Yang Q., Wang H., Jiang H., A Mura Optimization Scheme Based on AMOLED DC Dimming (SID 2025 Digest, P-61, p.1674. Yungu (Gu'an) Technology, 비전옥스 계열. 하이브리드 디밍에서 저휘도는 구동 TFT 불균일 때문에 PWM을 쓴다는 설명, 3,840 Hz(120 Hz×32) 고주파 PWM, 풀 DC의 장단점. 제조사 측 연구자의 포스터)"
    url: "https://sid.org/Portals/sid/Files/SID-Digest/docs/P-61.pdf"
  - type: paper
    title: "Kim Y.-D. 외, Digital PWM Driving MicroLED Pixel Circuit using a-ITZO TFTs (SID 2025 Digest, P-71, p.1711. ETRI·한양대. 주소 P-225.pdf로 받았으나 본문 쪽 번호는 P-71이다. 마이크로LED의 PAM 적용 어려움, 아날로그 PWM과 디지털 PWM 구분, 이진 가중치 서브프레임. 제조사 아닌 연구기관 논문, 시뮬레이션과 제작 소자 포함)"
    url: "https://sid.org/Portals/sid/Files/SID-Digest/docs/P-225.pdf"
  - type: paper
    title: "Jung J.-W. 외, A High-Performance Micro Light-Emitting Diode Pixel Circuit Based on LTPO TFTs using a Pseudo Digital Driving Method (SID 2025 Digest, P-225 Late-News Poster, p.1485. Samsung Electronics·성균관대. 주소 P-71.pdf로 받았으나 본문 쪽 번호는 P-225이다. 마이크로LED 화소 회로가 PAM의 파장 이동 때문에 PWM을 쓴다는 서술, 시뮬레이션 기반 8비트 계조)"
    url: "https://sid.org/Portals/sid/Files/SID-Digest/docs/P-71.pdf"
  - type: paper
    title: "IEEE 1789-2015, IEEE Recommended Practices for Modulating Current in High-Brightness LEDs for Mitigating Health Risks to Viewers (2015-06-05 발행, 현재 Inactive-Reserved, 상태 변경일 2026-03-26. 표준 페이지에는 수치가 없어 Kim 2021이 인용한 형태로 사용)"
    url: "https://standards.ieee.org/ieee/1789/4479/"
  - type: paper
    title: "Karanovic O., Thabet M., Wilson H.R., Wilkinson F., Detection and discrimination of flicker contrast in migraine (Cephalalgia 31(6):723-736, 2011, doi:10.1177/0333102411398401. 편두통 환자 14명·대조군 14명, 10 Hz 플리커의 대비 처리와 불편 점수. 디스플레이 PWM 연구가 아님)"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3571449/"
  - type: article
    title: "Notebookcheck, Apple iPad Pro 13 (2024) review (2024-07-17. 탠덤 OLED. PWM 240 Hz, 진폭 25.86%)"
    url: "https://www.notebookcheck.net/Apple-iPad-Pro-13-2024-review-A-tablet-that-knows-almost-only-superlatives.863481.0.html"
  - type: article
    title: "Notebookcheck, iPhone 12 Pro: Pulse Width Modulation for the OLED Display (Daniel Schmidt, 2020-11-18. 최소 밝기~21%에서 223~250 Hz, 22~50%에서 60 Hz, 50% 초과에서 80~277.8 Hz. 결론 문장 「some strain may still occur」)"
    url: "https://www.notebookcheck.net/iPhone-12-Pro-Pulse-Width-Modulation-for-the-OLED-Display.505060.0.html"
  - type: article
    title: "MacRumors, iPhone 17 Models Include Toggle to Disable Screen Flickering (PWM) (Juli Clover, 2025-09-10. iOS 26 릴리스 후보에서 발견된 「Display Pulse Smoothing」, 애플 설명 문구 「Disables pulse width modulation to provide a different way to dim the OLED display」「Disabling PWM may affect low brightness display performance under certain conditions」) 및 Notebookcheck, Turning off PWM flickering on the iPhone 17 is possible but unlikely to bring benefits (Manuel Masiero, 2025-10-05. 25% 이하 밝기에서만 작동, 디밍 주파수 불변)"
    url: "https://www.macrumors.com/2025/09/09/iphone-17-pro-pwm-toggle/"
  - type: patent
    title: "Apple Inc., PWM driving scheme and bezel reduction (US 9,953,581 B2, 2016 출원. Google Patents 초록만 읽음, 청구항 미열람. 맥북 프로와의 관계는 알 수 없음)"
    url: "https://patents.google.com/patent/US9953581B2/en"
  - type: patent
    title: "Apple Inc., Electronic devices with low refresh rate display pixels (US 11,257,426 B2. Google Patents 초록만 읽음, 청구항 미열람. 맥북 프로와의 관계는 알 수 없음)"
    url: "https://patents.google.com/patent/US11257426B2/en"
  - type: patent
    title: "Apple Inc., Display flicker reduction systems and methods (US 10,424,244 B2, 2017 출원. Google Patents 초록만 읽음, 청구항 미열람. 맥북 프로와의 관계는 알 수 없음)"
    url: "https://patents.google.com/patent/US10424244B2/en"
  - type: article
    title: "OLED-Info, TCL CSOT shows a 360Hz 16-inch inkjet printed OLED laptop panel (2026-11-14. DTC 2026 11월 13일 우한. 16인치 2560×1440, 360 Hz, 500 nits. 「가장 높은 주사율」은 CSOT 주장. 본문 앞부분만 확인)"
    url: "https://www.oled-info.com/tcl-csot-shows-360hz-16-inch-inkjet-printed-oled-laptop-panel-surpassing"
  - type: article
    title: "OLED-Info, TCL CSOT shows four-subpixel dual-mode OLED prototypes (2026-11-14. 10.95인치 3종, RGBB 청색 인광, 소비전력 20% 감소는 CSOT 주장. 본문 앞부분만 확인)"
    url: "https://www.oled-info.com/tcl-csot-shows-four-subpixel-dual-mode-oled-prototypes-including-rgbb-panel"
  - type: article
    title: "OLED-Info, TCL CSOT shows world's first OLED smartphone displays with blue PSF emitters (2026-11-15. 6.36인치, 같은 밝기에서 전력 30% 적음은 CSOT 주장. 독립 측정 없음. 본문 앞부분만 확인)"
    url: "https://www.oled-info.com/tcl-csot-shows-what-it-calls-worlds-first-blue-phosphorescent-smartphone-oled"
  - type: article
    title: "디일렉, 올해 스마트폰 OLED 출하량 역성장…폴더블은 23% 증가 (2026-11-10. 카운터포인트리서치 전망, 2026년 8억2900만 장, 2025년 8억9400만 장, 폴더블·롤러블 +23%, 리지드 −24%, 플렉시블 −3%. 전문 확인)"
    url: "https://www.thelec.kr/news/articleView.html?idxno=65213"
  - type: article
    title: "OLED-Info, Counterpoint: smartphone OLED panel shipments to decline 3% in 2026, while foldable OLED shipments to grow 23% (2026-11-10. 제목·리드의 「almost 3%」는 같은 기사의 894M→829M 수치(−7.3%)와 맞지 않음. 본문 앞부분만 확인)"
    url: "https://www.oled-info.com/counterpoint-smartphone-oled-panel-shipments-decline-3-2026-while-foldable-oled"
  - type: article
    title: "OLED-Info, Sigmaintell: Samsung Display and LG Display to raise OLED monitor panel prices in 2027 (2026-11-13. 인상 폭과 두 회사의 확인은 공개된 부분에 없음. 본문 앞부분만 확인)"
    url: "https://www.oled-info.com/sigmaintell-samsung-display-and-lg-display-raise-oled-monitor-panel-prices-2027"
  - type: article
    title: "OLED-Info, Prevalent Display sues Samsung over four former Innolux AMOLED patents (2026-11-15. 텍사스 동부 연방지방법원, 미국 특허 4건, 이노룩스 2015·2016년 출원, 2026년 4월 양도. 본문 앞부분만 확인)"
    url: "https://www.oled-info.com/prevalent-display-sues-samsung-over-four-former-innolux-oled-patents-names"
  - type: article
    title: "OLED-Info, After settling with Samsung, Pictiva Displays sues BOE for OLED patent infringement (2026-11-14. 2026-11-04 제소, 텍사스 동부 연방지방법원, 미국 특허 5건. 본문 앞부분만 확인)"
    url: "https://www.oled-info.com/days-after-settling-samsung-pictiva-displays-sues-boe-oled-patent-infringement"
  - type: article
    title: "디일렉, LGD, 차세대 OLED 기술 「FLiPP」 사내 첫 공개 (2026-11-12. 사내 기술 워크숍 「테크 X」 11일~13일 파주 중심. 전문 확인)"
    url: "https://www.thelec.kr/news/articleView.html?idxno=65314"
  - type: article
    title: "디일렉, 삼성D, 차량용 OLED 사이버 보안 인증 2종 획득 (2026-11-10. ISO/SAE 21434, ENX VCS. 인증기관 DQS. 전문 확인)"
    url: "https://www.thelec.kr/news/articleView.html?idxno=65207"
  - type: article
    title: "Notebookcheck, Turning off PWM flickering on the iPhone 17 is possible but unlikely to bring benefits (Manuel Masiero, 2025-10-05. 「It only works up to 25% screen brightness」「the dimming frequency doesn't change」「it seems to offer little help to PWM-sensitive users」)"
    url: "https://www.notebookcheck.net/Turning-off-PWM-flickering-on-the-iPhone-17-is-possible-but-unlikely-to-bring-benefits.1130779.0.html"
  - type: article
    title: "MacRumors Forums, RIP MacBook Pro PROLED for PWM Sensitive Eyes - apple cmon! (작성자 erkanasu, 2026-11-05 시작. Notebookcheck 리뷰 수치 요약, 설문 「Does the MacBook Pro PROLED display cause you eye strain or discomfort?」에 11월 14일 확인 시점 120명 응답, 예 41명 34.2%·아니오 79명 65.8%, 12페이지. 응답자 자격은 확인할 수 없고 자발적 표본)"
    url: "https://forums.macrumors.com/threads/rip-macbook-pro-proled-for-pwm-sensitive-eyes-apple-cmon.2493735/"
  - type: article
    title: "MacRumors Forums, Eye strain while using iPhone X and up (작성자 Kitkad, 2017-11-06 시작, 548페이지. 첫 글은 화면을 볼 때 눈이 당기고 시선을 옮기면 흐릿해지는 증상을 적었고 PWM을 원인으로 지목하지 않음. 사용자 자기보고)"
    url: "https://forums.macrumors.com/threads/eye-strain-while-using-iphone-x-and-up.2085427/"
  - type: article
    title: "DXOMARK, Flicker, the display affliction (날짜 표기 없음. Westar TRD-200 플리커미터, 암실 0.1 lx 미만. 갤럭시 S20 울트라 241 Hz, 노트20 울트라 240 Hz, 화웨이 P40 프로 362 Hz, 원플러스 8 프로 481 Hz, 오포 파인드 X2 프로 483 Hz, 샤오미 Mi 10T 프로(LCD) 2,360 Hz. 동공 반응 설명은 출처가 없어 인용하지 않음)"
    url: "https://www.dxomark.com/flicker-the-display-affliction/"
---

11월 9일부터 15일까지 디스플레이 업계 소식 가운데 기술 쪽의 중심은 애플 터치 맥북 프로의 화면 구동 방식에 대한 불편 보고였습니다. 이 꼭지는 그 보도를 단서로 삼아, 확인된 수치와 보도 수준의 말을 나눠 놓고 플리커의 연구 근거까지 정리합니다.

## 11월 9일부터 15일까지, 언론이 다룬 이슈들

첫째, 애플의 터치 맥북 프로에 대한 불편 보고가 이어졌습니다. OLED-Info는 11월 13일 일부 사용자가 눈 피로와 어지럼증을 호소하며 화면의 240 Hz PWM 디밍을 지목한다고 전했고, AppleInsider는 11월 10일 기사에서 일부 신규 구매자의 눈 피로와 두통을 전했습니다. 애플의 공식 입장은 확인되지 않았고, 아래 본문에서 다룹니다.

둘째, TCL CSOT가 11월 13일 중국 우한에서 연 DTC 2026에서 OLED 시제품을 공개했습니다. OLED-Info에 따르면 16인치 2560×1440 잉크젯 프린팅 OLED 노트북 패널의 주사율은 360 Hz이고, CSOT는 잉크젯 방식 노트북 디스플레이 중 가장 높은 주사율이라고 밝혔습니다. 비교 대상은 삼성디스플레이가 2026년 8월 공개한 300 Hz 패널입니다. 10.95인치 태블릿용 시제품 3종은 기본 RGB에 서브픽셀 하나를 더한 구성이며, 그중 RGBB는 청색 서브픽셀 둘 가운데 하나가 인광 이미터이고 같은 밝기에서 소비전력이 20% 줄어든다고 CSOT가 밝혔습니다. 청색에 인광 증감 형광(PSF) 방식을 쓴 6.36인치 스마트폰 디스플레이는 표준 형광 청색 대비 같은 밝기에서 전력이 30% 적다고 CSOT가 밝혔습니다. 이 수치는 모두 회사가 제시한 것이고 독립 측정은 기사에 없습니다.

셋째, 시장 전망과 가격 보도가 나왔습니다. Counterpoint Research의 11월 10일 전망에 따르면 2026년 글로벌 스마트폰 OLED 패널 출하량은 8억2900만 장으로 2025년의 8억9400만 장보다 줄고, 폴더블·롤러블 OLED는 23% 늘 전망입니다. 두 출하량으로 계산한 감소율은 7.3%이며 디일렉도 약 7%로 적었는데, OLED-Info 기사의 제목과 리드는 「almost 3%」라고 적어 이 수치와 맞지 않습니다. 같은 전망에서 리지드 OLED는 24%, 플렉시블 OLED는 3% 감소합니다. 또 OLED-Info는 11월 13일 시장조사업체 Sigmaintell의 분석을 인용해 삼성디스플레이와 LG디스플레이가 2027년 OLED 모니터 패널 가격을 올릴 계획이며 메모리 가격 급등으로 출하 목표도 낮췄다고 전했습니다. 기사의 공개된 부분에는 인상 폭과 두 회사의 공식 확인이 없습니다.

넷째, OLED 특허 소송이 두 건 보도됐습니다. OLED-Info가 11월 15일 전한 바로는 미국의 특허관리 회사 Prevalent Display가 삼성디스플레이 등을 텍사스 동부 연방지방법원에 제소했습니다. 대상은 이노룩스가 2015년과 2016년에 출원하고 2026년 4월 Prevalent에 양도된 미국 특허 4건입니다. Pictiva Displays는 11월 4일 BOE를 같은 법원에 제소했고, 대상은 OSRAM의 OLED 특허 포트폴리오에서 나온 미국 특허 5건입니다. Pictiva와 삼성의 분쟁은 제9호에서 다룬 소재의 후속입니다.

다섯째, 국내 패널 업체의 기술 소식이 있었습니다. 디일렉에 따르면 LG디스플레이는 11일부터 13일까지 파주 사업장을 중심으로 사내 기술 워크숍 「테크 X」를 열고 FMM을 쓰지 않는 패터닝 기술 FLiPP를 사내에 처음 공개했습니다. FLiPP는 제2호와 제10호에서 다룬 소재라 다시 펴지 않습니다. 삼성디스플레이는 11월 10일 차량용 OLED로 사이버 보안 국제 인증 2종(ISO/SAE 21434, ENX VCS)을 취득했다고 디일렉이 전했습니다.

11월 9일부터 15일까지 대표 이슈는 「애플 맥북 프로 PROLED의 PWM 디밍과 플리커」입니다.

애플이 11월 6일부터 고객에게 인도한 터치 맥북 프로(14·16인치, 탠덤 OLED 「PROLED XDR」)에 대해, 일부 구매자가 눈 피로와 두통을 보고한다는 보도가 11월 5일부터 13일 사이에 이어졌습니다. 이 글은 애플이 공개한 것과 보도된 측정값을 나누고, LCD와 OLED가 화면을 어둡게 하는 방법과 PWM 디밍이 무엇인지를 설명한 뒤, 플리커(flicker)가 두통과 어떤 관계로 연구돼 왔는지를 주파수 중심으로 정리합니다.

## 애플이 공개한 사양과 보도된 측정값

애플의 한국어·영어 사양 페이지에서 내장 디스플레이에 대한 항목은 ProMotion 최대 120 Hz 가변 재생률과 최소 밝기 1 cd/m²(애플 표기 nit)입니다. 디밍(dimming) 방식, 펄스 폭 변조(PWM, pulse-width modulation), 깜빡임에 관한 문구는 없습니다. 10월 28일 발표문도 탠덤 OLED이고 Mac 최초로 터치를 지원한다는 것까지만 밝혔습니다. 이번 보도에 대한 애플의 공식 입장은 확인되지 않았습니다.

측정값은 Notebookcheck가 11월 5일 낸 MacBook Pro 14 M5 Pro OLED 리뷰에 있습니다. 이 기기는 14.2인치, 3092×1986 해상도(259 PPI), 120 Hz입니다. Notebookcheck는 PWM을 240 Hz, 진폭(amplitude) 56%로 측정했고, 밝기 설정 99% 이하에서 검출됐으며 그 위에서는 PWM이 없다고 적었습니다. 같은 리뷰는 모든 밝기에서 직류 디밍(DC dimming)도 관찰된다고 서술하면서, 주파수가 낮아 민감한 사용자에게는 문제일 수 있다고 평했습니다. 이 페이지에는 측정 장비와 방법이 적혀 있지 않습니다.

Notebookcheck는 같은 리뷰에 밝기 설정별 오실로스코프 화면을 실었습니다(RIGOL MSO5102, 가로축 2.00 ms/div, 100%만 1.00 ms/div). 밝기 100%에서는 신호가 평탄합니다. 25%, 50%, 75%에서는 단순한 사각파처럼 완전히 꺼지는 모양이 아니라 높은 수준의 신호에서 주기적으로 아래로 내려가는 감소가 반복되며, 화면에 표시된 주파수(Freq1)는 25%에서 242.78 Hz, 50%와 75%에서 239.88 Hz입니다. 50%와 75%의 화면에서는 깊은 감소와 얕은 감소가 번갈아 나타납니다. 최소 밝기(0%)에서는 진폭이 작은 잔물결만 보이며 주파수는 표시되지 않았습니다. 화면의 세로축은 광검출기 출력 전압이고 이 화면에서 밝기 값 자체는 확인할 수 없습니다.

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/notebookcheck-mbp14-pwm-waveforms.webp" alt="맥북 프로 14 PROLED의 밝기 설정별 오실로스코프 화면 다섯 장. 100%는 평탄하고, 75%와 50%는 약 240 Hz로 깊이가 다른 감소가 번갈아 반복되며, 25%는 완만한 감소가 반복되고, 0%는 진폭이 작은 잔물결이다." />
  <figcaption>맥북 프로 14 PROLED의 밝기 설정별 PWM 측정 화면(광검출기와 RIGOL MSO5102 오실로스코프). 출처: Notebookcheck, Apple MacBook Pro 14 PROLED XDR Review(2026-11-05). 원본 화면을 잘라 밝기 설정 표기를 붙였다. 100%는 가로축 눈금이 1.00 ms/div, 나머지는 2.00 ms/div다. 저작권은 Notebookcheck에 있다.</figcaption>
</figure>

불편 보고는 두 매체가 전합니다. OLED-Info는 11월 13일 기사에서 불만이 Reddit에서 처음 제기됐고, 증상이 장시간 텍스트 읽기, 특히 다크 모드에서 나타나며 일부는 이전 Mini-LED 맥북 프로로 돌아갔다고 적었습니다. AppleInsider는 11월 10일 기사에서 일부 신규 구매자에게 눈 피로와 두통이 생기고, 지니어스 바에 불만이 접수되며 소매점 반품률이 평소보다 약간 높다고 서술했습니다. 두 기사 모두 사용자 수나 반품 건수는 제시하지 않았습니다. AppleInsider의 필자는 의사가 아니라고 밝혔고, 원인을 PWM으로 보는 것은 필자의 판단입니다.

## 화면은 어떻게 어두워지는가: LCD, OLED, PWM 디밍

화면을 어둡게 하는 방식부터 플리커가 두통과 연관된다고 보는 이유까지를 DISPLAY NOW 영상(5분 44초)으로 먼저 보실 수 있습니다. 글은 같은 흐름을 근거와 함께 더 자세히 따라갑니다.

<div class="yt-clip" data-yt="xJ9qIbUoVA4" data-poster="/videos/pwm-flicker-0m08.webp" data-title="OLED 맥북 프로 두통 논란, PWM 디밍이 뭐길래?"></div>

디스플레이가 계조(gray level)를 만드는 방식은 크게 둘입니다. 하나는 발광 소자에 흐르는 전류의 크기를 바꾸는 방식이고, 다른 하나는 일정한 전류로 발광하는 시간의 길이를 바꾸는 방식입니다. 전자를 펄스 진폭 변조(pulse amplitude modulation, PAM), 후자를 펄스 폭 변조(pulse width modulation, PWM)라고 부릅니다. 화면 전체를 어둡게 하는 디밍(dimming)도 이 두 방식으로 할 수 있고, LCD와 OLED는 구조가 달라 방법이 다릅니다.

액정 디스플레이(LCD)에서는 화소의 계조와 화면 전체의 밝기를 서로 다른 부품이 정합니다. 계조는 화소의 액정이 투과시키는 빛의 양으로 정해지고, 화면 전체의 밝기는 뒤에서 비추는 백라이트의 밝기로 정해집니다. 그래서 화면을 어둡게 할 때는 백라이트의 밝기를 바꾸면 됩니다. 백라이트의 밝기를 PWM으로 조절하는 제품도 있으며, Notebookcheck가 측정한 2024년형 미니LED 맥북 프로 14의 PWM 주파수가 14,880 Hz인 것이 그 예입니다.

자발광 소자인 OLED는 LCD처럼 백라이트 하나로 화면 전체의 밝기를 바꿀 수 없으므로, 화소에 주는 전압으로 밝기를 바꿉니다. 화소마다의 계조는 구동 TFT의 게이트에 쓰는 데이터 전압(감마 전압)이 정하고, 이 전압이 OLED를 흐르는 전류를, 전류가 밝기를 정합니다. SID 2025 P-61 포스터는 이 방식을 직류 디밍 또는 감마 디밍이라고 부르며, 프레임 동안 전류가 일정하므로 광출력이 시간에 따라 변하지 않는다고 설명합니다.

일반적인 구동 원리로는, 이 방식으로 화면 전체의 밝기를 바꾸려면 밝기 단계마다 계조 0~255에 줄 전압을 정한 감마 조합(gamma set)이 따로 필요합니다. 이 조합들을 구동 IC의 메모리에 저장해 두었다가 사용자가 밝기를 바꾸면 그 단계의 조합을 불러와 화소 데이터에 적용합니다. 밝기를 아주 낮추면 인접한 계조 사이의 전압 차이가 작아지므로, 화소 사이의 작은 편차가 휘도 얼룩(mura)으로 보이기 쉽습니다. 이 문단과 앞의 LCD 문단은 업계에서 통용되는 구동 원리를 정리한 것이며, 이 글이 직접 읽은 논문의 서술이 아닙니다. 공개 특허에 밝기 단계별 감마 곡선을 구동 IC에 저장하는 방식을 종래 기술로 서술한 예와 백라이트를 최대로 두고 화소 계조로 밝기를 조절하는 구조를 서술한 예가 보이지만, 검색 결과의 요약으로만 확인했고 원문은 읽지 않았습니다.

PWM 디밍은 밝기를 낮출 때 빛의 세기 대신 빛이 켜져 있는 시간을 줄이는 방식입니다. 한 번 켜졌다 꺼지는 것을 펄스(pulse)라고 하며, 펄스의 폭이 켜진 시간이고 1초에 펄스가 몇 번 오는지가 PWM 주파수(Hz)입니다. SID 2025 P-61 포스터는 OLED가 켜진 시간이 길수록 총 발광 시간이 길어져 밝아지고, 꺼진 시간이 길수록 어두워진다고 서술합니다. OLED 패널에서는 이를 발광 제어(EM) 신호로 구현하며, 포스터의 표 2는 밝기 구간(Band)마다 프레임당 EM 펄스 수와 EM 듀티를 정해 둔 예를 보여 줍니다. 하이브리드 디밍 예에서 600 cd/m²는 펄스 1개에 듀티 99.06%이고, 89.8 cd/m²부터는 펄스 32개에 듀티가 90.47%, 32.19%, 10.31%로 낮아집니다. 이 표에서는 화면의 밝기 구간이 펄스 수와 듀티로 정해지고, 구간 안의 화소별 계조는 구동 TFT의 게이트 전압으로 정해지는 것으로 읽히지만, 포스터는 이 역할 분담을 한 문장으로 정의하지는 않습니다.

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/dimming-schematic.svg" alt="디밍 방식의 개념도. 왼쪽 DC 디밍은 휘도가 시간에 따라 일정한 낮은 수준이고, 오른쪽 PWM 디밍은 주기 T마다 켜짐과 꺼짐이 반복되며 켜진 시간의 비율이 듀티 사이클이다. 개념 설명용 그림이며 실제 측정 파형이 아니다." />
  <figcaption>DC 디밍과 PWM 디밍의 개념도. 개념 설명용이며 맥북 프로의 실제 측정 파형이 아니다.</figcaption>
</figure>

마이크로LED에서는 PWM이 화소 단위의 계조 생성 방식입니다. SID 2025 Digest의 ETRI·한양대 논문은 마이크로LED의 외부 양자 효율(EQE)과 파장이 전류 밀도에 따라 달라져 PAM을 적용하기 어렵고, 그래서 전류를 일정하게 두고 펄스 폭으로 밝기를 조절하는 PWM 화소 회로를 연구했다고 서술합니다. 같은 논문은 PWM을 둘로 나눕니다. 아날로그 PWM은 램프 신호와 아날로그 데이터 전압을 비교해 발광 시간을 정하고, 디지털 PWM은 한 프레임을 이진 가중치의 서브프레임으로 나눠 켜고 끄는 조합으로 계조를 만듭니다(그림의 3번). 디지털 방식은 서브프레임마다 데이터를 다시 써야 해서 더 빠른 동작과 전력이 필요하다고 합니다. SID 2025 Digest에 실린 Samsung Electronics·성균관대 논문도 마이크로LED 화소 회로에서 PAM은 파장 이동으로 화질이 왜곡될 수 있어 PWM을 쓴다고 서술합니다.

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/pwm-gray-three-methods.svg" alt="한 프레임의 시간-휘도 도식 세 장. 1번 아날로그 구동은 데이터 전압이 정한 전류 수준이 프레임 내내 일정하고 계조에 따라 수준만 다르다. 2번 OLED PWM 디밍은 120 Hz 한 프레임(8.33 ms)에서 펄스 1개 듀티 99.06%와 펄스 32개 듀티 32.19%를 비교한다. 3번 디지털 PWM은 가중치 8T, 4T, 2T, 1T의 서브프레임 중 8T와 2T가 켜져 15단계 중 10을 만든다." />
  <figcaption>계조를 만드는 세 방식의 시간-휘도 도식. 1번과 3번은 개념 설명용이고, 2번의 펄스 수와 듀티는 SID 2025 P-61 표 2의 값이다. 3번의 4개 서브프레임과 15단계는 설명을 위해 줄인 예이며 실제 회로는 SID 2025 Digest의 두 논문에 서술된 8비트 계조 등이다.</figcaption>
</figure>

OLED 패널의 PWM 디밍과 마이크로LED의 PWM 계조는 같은 낱말을 쓰지만 대상이 다릅니다. 전자는 화면 전체 또는 밝기 구간의 평균 밝기를 낮추려고 발광을 프레임 안에서 끊고, 화소 계조는 별도로 전류 크기로 만듭니다. 후자는 화소의 계조 자체를 발광 시간으로 만듭니다. DLP와 LCOS의 서브필드 구동은 이 기사의 조사 범위에서 원문을 읽지 못해 다루지 않습니다.

Notebookcheck 측정 화면에서 깊은 감소와 얕은 감소가 번갈아 나타나는 이유를 설명한 자료는 찾지 못했습니다. 이 모양이 패널의 구동 방식에서 오는지 측정 방법에서 오는지는 이 기사에서 판단하지 않습니다.

## OLED가 저휘도에서 PWM 디밍을 쓰는 이유

비전옥스 계열 Yungu의 연구자들이 SID 2025 Digest(P-61)에 낸 포스터는 현재 OLED 패널이 보통 하이브리드 디밍을 쓴다고 설명합니다. 고휘도 구간은 직류 디밍으로 전력을 줄이고, 저휘도 구간은 PWM 디밍으로 화면 균일성을 확보한다는 것입니다. 이유는 저휘도·저계조에서 구동 TFT의 일관성이 나빠 무라(mura)가 생기기 때문이며, 발광 제어 신호에 소등 구간을 넣어 TFT의 동작 구간을 바꿔 이를 피한다고 합니다.

같은 포스터에 따르면 구동 IC가 초기에는 펄스를 2개나 4개만 지원하다가 16개, 32개, 64개까지 지원하게 됐고, 120 Hz×32는 3,840 Hz에 해당합니다. 저휘도까지 직류 디밍(풀 DC)을 쓰면 전력은 50~80 mW 줄지만 발광 듀티가 99%로 높아져 구동 TFT의 누설 전류가 늘고 저계조 저휘도의 균일성이 낮아진다고 합니다. 저자들은 전압 설정과 보정 알고리즘으로 풀 DC에서도 PWM 수준의 무라를 달성했다고 주장합니다. 제조사 측 연구자의 포스터이므로, 이 방식이 맥북 프로 패널에 쓰였는지는 해당 자료로 알 수 없습니다.

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/hybrid-dimming-pulses.svg" alt="하이브리드 디밍에서 120 Hz 한 프레임(8.33 ms) 안의 발광 제어 펄스를 휘도 구간별로 그린 파형. 600 cd/m²는 펄스 1개 듀티 99.06%, 89.8 cd/m²는 32개 90.47%, 30 cd/m²는 32개 32.19%, 7과 2 cd/m²는 32개 10.31%다." />
  <figcaption>하이브리드 디밍의 한 프레임(120 Hz, 8.33 ms) 안 발광 제어 펄스. 펄스 수와 듀티는 SID 2025 P-61 표 2의 휘도 구간별 값이고, 휘도는 포스터의 nit 표기를 cd/m²로 옮겼다. 비전옥스 계열 연구자의 예이며 맥북 프로 패널의 값이 아니다.</figcaption>
</figure>

Notebookcheck의 2019년 해설은 다른 이유를 듭니다. AMOLED에 공급 전압을 낮추면 밝기와 함께 색이 달라질 수 있다는 것입니다. 이유 설명이 둘이며, 어느 쪽이 지배적인지는 두 자료만으로 가릴 수 없습니다.

## 플리커의 물리량은 주파수, 변조 깊이, 듀티 사이클입니다

플리커는 광출력의 시간에 따른 변동(temporal light modulation)입니다. 변동의 빠르기는 주파수(Hz), 변동의 크기는 변조 깊이(modulation depth)로 나타냅니다. IEEE 1789 계열 문서와 이를 인용한 Kim(2021)은 변조 깊이를 퍼센트 플리커(percent flicker)로 쓰며 식은 100×(Lmax−Lmin)/(Lmax+Lmin)입니다. Lmax와 Lmin은 측정한 휘도의 최댓값과 최솟값입니다. PWM에서는 한 주기 중 발광하는 시간의 비율인 듀티 사이클(duty cycle)이 밝기를 정하고, 듀티 사이클이 낮을수록 꺼져 있는 시간이 깁니다.

Notebookcheck는 맥북 프로에서 측정한 진폭을 「Amplitude(%)」로 표기합니다. 이 글에서 Notebookcheck의 진폭, 연구의 변조 깊이, 퍼센트 플리커는 모두 변동의 크기를 뜻하는 말로 쓰지만, 정의가 같은지는 해당 페이지에서 확인되지 않습니다. 맥북 프로의 56%는 Notebookcheck가 잰 진폭이며, 아래의 연구들이 쓴 변조 깊이와 같은 값이라고 볼 근거는 없습니다.

## 주파수별 플리커 지각과 두통 보고

주파수에 따라 알려진 것을 정리하면 아래와 같습니다. 모든 항목은 아래 본문에서 근거를 설명합니다.

| 주파수 대역 | 알려진 것 | 근거 |
|---|---|---|
| 약 80 Hz 아래 | 밝기 차이가 플리커로 관찰됨 | Veitch & Miller(2024) |
| 1.6~30 Hz | 불쾌 점수가 시각 피질 반응 진폭에 비례, 정점 약 9~19 Hz | Patterson Gentile & Aguirre(2020) |
| 100·120 Hz(자기식 안정기 형광등) | 두통·눈 피로와 연관 보고, 두통 경향자에게서 두드러짐 | Wilkins 외(1989), Veitch & Miller(2024)가 소개 |
| 200~800 Hz 이상 | 공간 가장자리가 있는 변조에서 플리커 아티팩트 지각, 중앙값 500 Hz 초과에서 사라짐 | Davis 외(2015) |
| 1,200 Hz 미만 | 변조 100% 직사각파의 팬텀 어레이가 감지자 전원에게 보임 | Miller 외(2024) |
| 1,250 Hz 이상 | IEEE 1789의 저위험 주파수 수준(Kim 2021 인용) | IEEE 1789-2015 |

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/frequency-map.svg" alt="로그 주파수 축에 연구별 구간을 나타낸 그림. 일반적인 가시 플리커는 약 80 Hz 아래, 불쾌 평점 정점은 약 9~19 Hz, 자기식 안정기 형광등은 100·120 Hz, 가장자리와 사카드가 있는 변조의 가시 구간은 200~800 Hz, 팬텀 어레이 불쾌도 4.7 이상 구간은 120~1,200 Hz, 디스플레이 PWM 예는 240 Hz, 3,840 Hz, 14,880 Hz, IEEE 1789 저위험 주파수는 1,250 Hz 이상이다." />
  <figcaption>주파수별 연구 결과의 구간도. 각 구간은 본문에 인용한 연구의 값이며 실험 조건이 서로 다르다. 240 Hz는 맥북 프로 측정값, 3,840 Hz는 SID 2025 포스터가 언급한 고주파 PWM 예(120 Hz×32), 14,880 Hz는 Mini-LED 맥북 프로 측정값이다.</figcaption>
</figure>

IEEE 1789-2015는 LED 조명의 건강 위험 완화를 위한 권고입니다. 변조 깊이의 저위험 한계는 0.08×주파수(%), 영향 없음 수준은 0.0333×주파수(%)이고, 90 Hz 이하에서는 5% 이하를 권고합니다(Kim 2021 인용). 이 식에 따르면 240 Hz의 저위험 한계는 19.2%입니다. Notebookcheck가 맥북 프로에서 측정한 진폭 56%는 이보다 큽니다. 다만 Notebookcheck의 진폭과 퍼센트 플리커가 같은 정의인지, 측정 조건(거리·휘도)이 같은지는 확인되지 않았습니다. 또한 이 표준은 조명용이고 현재 「Inactive-Reserved」 상태(2026년 3월 26일 변경)이며, Veitch & Miller(2024)는 무해한 기존 광원이 고위험 영역에 들어가고 파형과 듀티를 반영하지 않는다는 점에서 논란이 있다고 서술합니다.

## 플리커는 왜 두통과 연관되는가

플리커에서 두통까지 이어지는 연구 근거를 순서대로 놓으면 아래와 같으며, 연결마다 증거의 수준이 다릅니다.

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/evidence-chain.svg" alt="빛의 시간 변조에서 두통까지 다섯 단계의 근거 연결도. 시간 광변조에서 사카드 중 팬텀 어레이로의 연결은 보고됨, 팬텀 어레이에서 시각 피질 반응으로의 연결은 가설, 시각 피질 반응과 불쾌의 관계는 연관이며 인과는 확립되지 않음, 불쾌에서 두통으로의 연결은 노출 후 보고됨으로 표시돼 있다." />
  <figcaption>근거 연결도. 각 화살표는 본문의 연구에 해당하며 증거의 수준이 다르다. 시각 피질 반응과 불쾌의 관계는 1.6~30 Hz 실험이고, 두통 비율은 PNNL 2024의 조명 실험이다.</figcaption>
</figure>

가장 직접적인 신경 생리 자료는 Patterson Gentile과 Aguirre(2020, Journal of Vision)입니다. 편두통 환자 10명과 두통이 없는 10명에게 지름 50°의 균일한 필드를 1.625~30 Hz로 높은 대비에서 깜빡이게 하고, 불쾌 점수와 초기 시각 피질의 정상상태 시각 유발 전위(ssVEP, steady-state visually evoked potential) 진폭을 함께 기록했습니다. 두 값은 14개 조건에서 직선 관계였고(R²=0.83), 불쾌 정점은 밝기(LMS) 경로에서 18.6 Hz, 적록(L-M) 경로에서 10.3 Hz, 청황(S) 경로에서 9.1 Hz였습니다. 편두통군과 대조군의 신경 반응 차이는 발견되지 않았는데, 표본이 작아 큰 차이만 검출할 수 있었다고 저자들은 적었습니다.

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/gentile-peak-frequency.svg" alt="세 가지 시각 경로(LMS, L-M, S)에서 불쾌 평점의 정점 주파수와 시각 피질 ssVEP 반응의 정점 주파수를 95% 신뢰구간과 함께 보여 주는 점 그래프. 불쾌 정점은 LMS 18.6 Hz, L-M 10.3 Hz, S 9.1 Hz이고 ssVEP 정점은 21.8 Hz, 13.0 Hz, 7.8 Hz다." />
  <figcaption>불쾌 평점과 ssVEP의 정점 주파수(95% 신뢰구간). 값은 Patterson Gentile & Aguirre(2020, Journal of Vision)의 표 2. 실험 주파수는 1.625~30 Hz이며 240 Hz는 시험하지 않았다.</figcaption>
</figure>

이 결과는 불편이 시각 피질의 과활동(overactivation)과 관련된다는 시각 스트레스(visual stress) 이론을 지지합니다. 저자들은 인과를 단정하지 않고, 멜라놉신 신경절 세포 경로는 플리커의 속도에 비해 너무 느려 설명에 맞지 않는다고 서술했습니다. 반응이 클수록 불쾌한 이유에 대해서는 자연 환경의 통계에서 벗어난 자극이라는 해석을 제시합니다. 이 실험의 플리커는 30 Hz 이하이며 240 Hz는 시험하지 않았고, 측정한 것은 두통이 아니라 불쾌 평점입니다.

## 높은 주파수의 변조는 왜 보이는가

임계 융합 주파수(critical flicker fusion frequency)의 통념은 50~90 Hz입니다. Davis 외(2015, Scientific Reports)는 20~29세 10명에게 DLP 프로젝터로 변조광을 보이고, 균일한 면에서는 감도가 약 65 Hz에서 0이 되지만 공간 가장자리가 있으면 전원이 200 Hz 이상에서 플리커 아티팩트를 보고 일부는 800 Hz 이상에서도 보았다고 보고했습니다. 중앙값은 500 Hz를 넘어야 사라졌습니다. 저자들은 가장자리를 가로지르는 빠른 안구 운동(사카드, saccade)을 원인으로 가설했습니다.

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/davis2015-flicker-sensitivity.webp" alt="두 개의 선 그래프. 위는 균일한 면의 시간 변조에서 가로축 변조 주파수(로그)에 따른 변조 대비의 변화로, 10명의 곡선과 중앙값이 약 63 Hz 부근에서 급격히 1에 도달한다. 아래는 공간 가장자리가 있을 때로, 곡선이 훨씬 높은 주파수까지 이어지고 중앙값은 약 500 Hz 부근에서 1에 도달한다. 세로축은 위쪽이 낮은 변조 대비다." />
  <figcaption>시간 변조의 가시 임계 곡선(10명, 굵은 선은 중앙값). 위는 공간적으로 균일한 면, 아래는 공간 가장자리가 있는 경우. 세로축은 변조 대비이며 위쪽이 낮은 대비(높은 감도)다. 출처: Davis J., Hsieh Y.-H., Lee H.-C., Scientific Reports 5:7861 (2015), 그림 1, CC BY 4.0. 형식만 변환했다.</figcaption>
</figure>

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/phantom-array-schematic.svg" alt="팬텀 어레이의 개념도. 시선을 고정하면 펄스광이 하나의 상으로 보이고, 사카드 중에는 펄스마다 망막의 다른 위치에 상이 맺혀 반복된 상의 줄로 보인다. 위치와 간격은 개념 설명용이다." />
  <figcaption>팬텀 어레이 효과의 개념도(illustration). 점의 위치와 간격은 임의이며 실제 측정이 아니다. 사카드 중 상이 반복되어 보이는 현상은 Miller 외(2024)와 Davis 외(2015)가 서술했다.</figcaption>
</figure>

사카드 중에 깜빡이는 광원이 공간 패턴으로 보이는 현상을 팬텀 어레이 효과(phantom array effect)라고 합니다. Miller 외(2024, Lighting Research & Technology)는 55명(편두통 25명)에게 85가지 파형을 검은 배경의 LED로 보이고 가시성과 불쾌도를 평가했습니다. 변조 100%의 직사각파는 1,200 Hz 미만에서 팬텀 어레이를 안정적으로 감지한 참가자 전원에게 보였고 평균 불쾌도가 0~8 척도에서 4를 넘었습니다. 편두통군의 가시성이 높았고(p=0.019), 높은 주파수에서 상대적으로 더 민감했습니다(p<0.001).

같은 논문의 표 1은 주파수에 따른 평균 불쾌도를 제시합니다. 듀티 10%, 변조 100%의 직사각파는 120 Hz에서 4.9, 400 Hz와 800 Hz에서 4.8, 1,200 Hz에서 4.7이었고, 2,400 Hz에서 3.8, 4,800 Hz에서 2.5, 10,000 Hz에서 0.9로 낮아졌습니다. 이 파형을 본 참가자의 비율은 1,200 Hz까지 89~93%, 2,400 Hz에서 85%, 4,800 Hz에서 73%, 10,000 Hz에서 16%였습니다. 변조 100%의 사인파는 같은 주파수에서 불쾌도가 2.6(120 Hz), 3.4(400 Hz), 3.1(1,200 Hz), 2.6(2,400 Hz), 1.0(4,800 Hz)으로 더 낮았습니다. 켜짐과 꺼짐이 뚜렷한 PWM 모양의 파형이 같은 주파수의 사인파보다 불쾌도가 높고, 불쾌도는 약 1,200 Hz 이후부터 낮아졌다는 뜻입니다. 이 값은 큰 사카드로 팬텀 어레이를 평가하는 조건에서 얻었습니다.

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/pnnl-annoyance-frequency.svg" alt="주파수에 따른 팬텀 어레이의 평균 불쾌도 선 그래프. 듀티 10% 변조 100% 직사각파는 120~1,200 Hz에서 4.7~4.9이고 2,400 Hz에서 3.8, 4,800 Hz에서 2.5, 10,000 Hz에서 0.9다. 듀티 50% 직사각파와 사인파는 더 낮다." />
  <figcaption>팬텀 어레이의 평균 불쾌도(0~8)와 주파수. 값은 Miller 외(2024, Lighting Research & Technology)의 표 1에서 옮겼다. 검은 배경의 LED를 큰 사카드로 평가한 실험이며 디스플레이 실험이 아니다.</figcaption>
</figure>

## 조명 연구의 두통 증거와 한계

형광등 연구에서 두통과 플리커의 연관은 Wilkins 외(1989)가 처음 체계적으로 보고한 것으로 알려져 있습니다. 이 논문의 원문은 확인하지 못했고, Veitch & Miller(2024)의 서술에 따르면 자기식 안정기 조명(북미 120 Hz, 대부분의 국가 100 Hz)의 시간 광변조가 두통·눈 피로와 연관됐으며 고주파 안정기에서 줄어든 효과는 두통 경향이 있는 사람에게서만 측정됐습니다. 같은 논문은 Küller와 Laike(1998)가 표본 전체(50명)에서는 안정기 종류의 뇌 활동 효과가 없었으나 임계 융합 주파수가 높은 사람들은 자기식 안정기에서 뇌파 알파 활동의 감쇠가 뚜렷했다고 소개합니다.

결과가 일관되지는 않습니다. Zhao 외(2020)는 100, 400, 1,500 Hz와 변조 깊이 10, 30, 70%의 9조건에서 10명을 시험해, 후두엽의 알파파 활동이 100 Hz에서 1,500 Hz보다 적었으나(각성 증가) 피로는 주파수가 아니라 변조 깊이로 예측됐고 결과가 IEEE 위험 영역 순서와 항상 일치하지는 않았다고 보고했습니다. Sekulovski 외(2020)는 창이 있는 사무실에서 수개월 동안 변조 12.5%와 36.4%(둘 다 100 Hz)를 비교해 자기보고 건강에서 유의한 차이를 찾지 못했습니다. Veitch & Miller는 시각 지각 지표가 두통 발생률 같은 건강 결과를 예측하는지는 알려지지 않았다고 서술합니다.

Miller 외(2024)의 실험에서 편두통군은 실험 후 4 h 안에 불쾌감이나 이상 반응을 64%가 보고했고 비편두통군은 19%였습니다. 두통은 41% 대 8%였습니다. 논문은 이 실험이 어떤 자극이 증상을 일으키는지 구분하도록 설계되지 않았고 가시성이 증상에 필요한지는 추가 연구가 필요하다고 적었으며, 모든 참가자에게 증상이 생길 수 있다는 정보를 미리 제공했다고 밝혔습니다. 조건은 52,400 cd/m²의 LED와 검은 배경, 큰 사카드로, 노트북 화면과 다릅니다. 편두통과 플리커는 Karanovic 외(2011)에서도 연결되는데, 편두통 환자 14명과 대조군 14명에게 10 Hz 플리커를 보였을 때 편두통군의 불편 점수가 유의하게 높았습니다.

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/pnnl-symptoms.svg" alt="편두통군과 비편두통군의 보고 비율을 비교한 막대그래프. 실험 후 4시간 안의 불쾌 또는 이상 반응은 64%와 19%, 두통은 41%와 8%이고, 일상에서 팬텀 어레이로 인한 불편, 신체 증상, 행동 변화는 각각 72%와 40%, 84%와 47%, 60%와 17%다." />
  <figcaption>편두통군(25명)과 비편두통군(30명)의 보고 비율. 값은 Miller 외(2024). 4 h 항목은 실험 후 보고이고 「Everyday」 항목은 일상에서의 팬텀 어레이 경험 설문이다. 참가자에게 증상 가능성을 미리 알렸고 디스플레이 실험이 아니다.</figcaption>
</figure>

## 디스플레이 측정: 시청 거리와 진폭

스마트폰 OLED의 PWM을 인체 영향 관점에서 측정한 논문은 삼성디스플레이 엔지니어 Minhyuk Kim(2021)의 것입니다. 광검출기와 오실로스코프로 240 Hz PWM 스마트폰을 측정해, IEEE 기준에 비추어 거리 1 cm와 저휘도에서는 퍼센트 플리커가 기준을 넘고, 240 Hz 성분은 약 4 cm까지 보이다가 5 cm 이상에서는 주변 잡음과 구별되지 않는다고 보고했습니다. 스마트폰의 평균 시청 거리는 33.95 cm라는 문헌을 인용해 일반 사용에서는 영향이 작다고 결론 내렸고, TV 등 다른 기기는 추가 연구가 필요하다고 적었습니다. 이 결론은 스마트폰에 대한 것이고, 노트북 화면은 측정 대상이 아니었으며 저자가 해당 패널 제조사 소속이라는 점을 함께 고려해야 합니다.

DXOMARK는 플리커미터(Westar TRD-200)로 스마트폰을 측정하며 OLED의 PWM이 약 50~500 Hz, LCD는 약 1,000 Hz 이상이라고 서술하고, 갤럭시 S20 울트라 241 Hz, 갤럭시 노트20 울트라 240 Hz, 화웨이 P40 프로 362 Hz, 원플러스 8 프로 481 Hz를 제시합니다. Notebookcheck의 같은 맥북 프로 리뷰 비교표에서는 240 Hz가 맥북 프로만의 값이 아닙니다.

| 기기 | 패널 | PWM 주파수(Hz) | 진폭(%) |
|---|---|---|---|
| MacBook Pro 14 M5 Pro | OLED(탠덤) | 240 | 56 |
| iPad Pro 13(2024) | OLED(탠덤) | 240 | 25.86 |
| Dell XPS 14 | OLED(LG) | 240.62 | 29 |
| HP ZBook Ultra G1a 14 | OLED(삼성) | 492.6 | 43 |
| HP OmniBook Ultra 14 | OLED(삼성) | 927.13 | 25 |
| Asus ProArt P14 | OLED | 960 | 30 |
| MacBook Pro 14 2024 M4 Pro | Mini-LED | 14,880 | 90 |

같은 240 Hz라도 진폭이 다릅니다. 맥북 프로 56%는 아이패드 프로 13(2024)의 25.86%보다 큽니다. Mini-LED 맥북 프로는 주파수가 14,880 Hz로 높지만 진폭은 90%로 표 중 가장 큽니다. 주파수만 비교하면 이 차이가 가려집니다.

<figure class="fig-single">
  <img src="/articles/2026-11-17-prolled-macbook-pwm-flicker/pwm-frequency-amplitude.svg" alt="Notebookcheck가 측정한 노트북·태블릿 일곱 기기의 PWM 주파수(가로, 로그)와 진폭(세로)을 보여 주는 산점도. 240 Hz 부근에 맥북 프로 14 OLED(56%), 아이패드 프로 13(25.86%), Dell XPS 14(29%)가 있고 Mini-LED 맥북 프로는 14,880 Hz에서 90%다. 점선은 IEEE 1789의 저위험 한계 0.08×주파수이며 1,250 Hz 이상에서는 100%다." />
  <figcaption>PWM 주파수와 진폭. 값은 Notebookcheck 측정(2024~2026). 점선은 IEEE 1789의 저위험 한계(0.08×주파수, Kim 2021 인용). Notebookcheck의 진폭과 퍼센트 플리커의 정의가 같은지는 확인되지 않았고, 측정 조건도 같다고 볼 수 없다.</figcaption>
</figure>

## 같은 제품군의 선행 측정과 애플의 조치

아이패드 프로 13(2024, 탠덤 OLED)에 대해 Notebookcheck는 2024년 7월 PWM 240 Hz, 진폭 25.86%를 측정했고 민감한 사용자는 눈의 피로를 느낄 수 있다고 평했습니다. 아이폰 12 프로는 2020년 11월 Notebookcheck 측정에서 최소 밝기부터 약 21%까지 223~250 Hz, 22~50%에서 60 Hz, 50% 초과에서 80~277.8 Hz로 불규칙했습니다. 같은 기사는 일부 불편이 남을 수 있다고 결론 냈습니다.

애플은 2025년 9월 아이폰 17 계열에 「디스플레이 펄스 스무딩(Display Pulse Smoothing)」을 넣었습니다. MacRumors는 iOS 26 릴리스 후보에서 발견됐다고 전하며 애플의 설명을 「PWM을 끄고 OLED를 다르게 디밍한다」, 「특정 조건의 저휘도 성능에 영향을 줄 수 있다」는 취지로 옮겼습니다. Notebookcheck의 측정은 이 기능이 밝기 25% 이하에서만 작동하고 디밍 주파수는 변하지 않는다는 것이며, 민감한 사용자에게 도움이 적어 보인다고 평가했습니다. AppleInsider는 이 설정이 아이패드 미니와 아이폰에 있고 macOS에는 아직 없다고 서술합니다.

애플의 특허 가운데 OLED 디스플레이의 발광 신호 PWM이나 플리커를 다룬 것으로 US 9,953,581, US 11,257,426, US 10,424,244를 확인했습니다. 세 건 모두 Google Patents의 초록만 읽었고 청구항은 읽지 않았습니다. US 9,953,581(애플, 2016년 출원, 「PWM driving scheme and bezel reduction」)은 행(line)마다 발광 신호를 PWM으로 구동하는 회로로, 게이트 인 패널(GIP) 구동기의 클록 신호와 프로그램 가능한 클록으로 발광 신호의 타이밍과 듀티를 정하는 구조를 서술합니다. US 11,257,426(애플)은 저주사율 OLED 화소(6T1C)에서 화소 갱신 기간이 길어질 때 생기는 플리커를 줄이는 구조이며, 초록은 이 구조가 발광 신호의 PWM 디밍과 함께 쓰일 수 있다고 서술합니다. US 10,424,244(애플, 2017년 출원, 「Display flicker reduction systems and methods」)는 OLED의 PWM 발광 구간을 프레임마다 조절해 플리커를 줄이는 방법을 서술합니다. 이 특허들이 맥북 프로의 240 Hz PWM과 관련이 있는지는 초록만으로는 알 수 없고, 애플이 해당 특허를 이 제품에 적용했다는 공개 자료도 찾지 못했습니다. 특허는 구조의 존재를 보여 줄 뿐 제품의 구동을 보여 주지 않습니다. 애플의 패널 공급사와 PWM 구동 방식(펄스 수, 듀티, 하이브리드 전환 구간)에 대한 공식 자료도 찾지 못했습니다.

## 사용자 포럼의 불편 보고 기록

신형 맥북 프로에 대한 포럼 기록은 MacRumors Forums의 스레드 「RIP MacBook Pro PROLED for PWM Sensitive Eyes」가 대표적입니다. 작성자는 11월 5일 Notebookcheck 리뷰의 수치(240 Hz, 진폭 56%, 99% 이하 밝기)를 요약해 올리면서, 직접 써 본 사람이 있는지 묻고 다음 날 매장에서 직접 보겠다고 적었습니다. 11월 14일 확인한 시점에 스레드는 12페이지이고, 「이 디스플레이가 눈 피로나 불편을 일으키는가」를 묻는 설문에 120명이 응답해 「예」 41명(34.2%), 「아니오」 79명(65.8%)이었습니다. 작성자는 이 노트북을 써 본 사람만 응답하라고 적었으나 응답자가 실제 사용자인지는 확인할 수 없고, 자발적으로 응답한 표본이므로 불편을 겪는 사용자의 비율로 해석할 수 없습니다.

플리커 불편을 다룬 포럼 기록은 이 제품 이전에도 있습니다. MacRumors Forums의 「Eye strain while using iPhone X and up」은 2017년 11월 6일에 시작됐고 11월 14일 현재 548페이지입니다. 첫 글은 화면을 볼 때 초점을 맞추느라 눈이 당기고 다른 곳을 보면 눈이 흐릿해진다는 증상을 적었고, 이 첫 글에서 원인으로 PWM을 지목하지는 않았습니다. 두 스레드는 모두 사용자 자기보고이며, 증상의 원인이나 발생 빈도를 보여 주지 않습니다.

## 찾아봤지만 없는 것

- 불편을 보고한 사용자 수, 반품 건수와 비율
- OLED-Info가 불만의 최초 제기처로 지목한 Reddit 원문 스레드(열어 보지 못했다)
- 이번 보도에 대한 애플의 공식 입장, 디스플레이 펄스 스무딩의 애플 공식 설명 문서
- Notebookcheck의 PWM 측정 장비와 방법
- 맥북 프로 PWM의 듀티 사이클과 밝기별 파형을 숫자로 제시한 자료
- 240 Hz, 변조 56% 수준의 디스플레이 PWM이 두통을 일으킨다는 것을 직접 측정한 연구. 이 글이 인용한 연구는 조명 실험, 저주파(30 Hz 이하) 불쾌 평가, 스마트폰 거리 측정으로 서로 다르며, 이를 잇는 것은 가설입니다.

## 전망

터치 맥북 프로의 PWM 디밍을 둘러싼 불편 보고는, 이미 아이패드 프로(2024)에서 같은 주파수의 PWM이 측정된 것과 같은 범주로 판단합니다. 새로운 점은 진폭이 56%로 아이패드 프로보다 크고, 기기가 노트북이어서 화면을 보는 면적과 시간이 스마트폰보다 크다는 것입니다. 이 판단에 쓸 수 있는 직접 근거는 Notebookcheck 측정과 비교표뿐이며, 두통과의 인과는 위 연구들로 확정되지 않습니다.

이 판단이 맞는지 보려면 세 가지를 보면 됩니다. 첫째, Notebookcheck 외의 독립 측정에서 PWM 주파수와 진폭, 듀티 사이클이 확인되는지. 둘째, 애플이 macOS에 디스플레이 펄스 스무딩이나 같은 기능을 추가하는지, 추가한다면 아이폰 17처럼 25% 이하 밝기로 제한되는지. 셋째, 불편 보고의 건수나 반품 통계가 공개되는지. 이 중 하나라도 확인되면 이 글의 판단을 고쳐야 합니다.
