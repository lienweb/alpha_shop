# Alpha Shop
購物車手刻

## Table of Contents
[Features](https://github.com/lienweb/alpha_shop/#features) \
[Development Guidelines](https://github.com/lienweb/alpha_shop/#development-guidelines) \
[Installation Instruction](https://github.com/lienweb/alpha_shop/#installation-instruction) \
[Deployment](https://github.com/lienweb/alpha_shop/#deployment) \
[Built With](https://github.com/lienweb/alpha_shop/#built-With)


## Features


可分為以下區塊：

切版
- [x] header + 導覽列
  - hover效果
- [x] stepper
  - 點選下一步會 - [x]
  - 點選上一步會消除 - [x]
  - 正在進行的stepper樣式
- [x] form
  - \<label>、placeholder字體顏色
  - 下拉選單的icon手刻
  - radio手刻、點選後的樣式
- [x] 購物車
  - 商品數量改變，小計也會改變
  - 運送方式改變，小計也會改變
- [x] 底下的步驟引導
  - hover效果
  - 確認下單使用sumbit button
- [x] Tweaks: 字體、字體大小、字體的粗細
- [x] RWD: 手機版導覽列會隱藏
- [ ] footer

主題色
- [x] Dark Mode
  - localStorage紀錄主題色



## Development Guidelines

- [x] CSS命名: BEM
- [x] SASS 檔案架構
- [ ] JS: MVC

## Prerequisites

Node.js dependent, if not installed on local environment, please follow [this guide](https://nodejs.org/en/)

## Installation Instruction
- `git clone` repo via SSH or HTTPS
- Execute the following command
```
npm install

npm run build

npm start
```
- Use vs code live server extension to see the results

<!-- ## Deployment -->
<!-- 
Add additional notes about how to deploy this on a live system -->

## Built With
- [x] webpack
- [x] webpack-dev-server

<!-- ## Versioning -->