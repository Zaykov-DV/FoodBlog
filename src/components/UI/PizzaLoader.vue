<template>
  <div class="pizza" aria-hidden="true">
    <div class="pizza_piece">
      <div class="pizza_crust pizza_inner"></div>
      <div class="pizza_sause pizza_inner"></div>
      <div class="pizza_cheeze pizza_inner"></div>
      <div class="pizza_filling">
      </div>
    </div>
    <div class="pizza_piece">
      <div class="pizza_crust pizza_inner"></div>
      <div class="pizza_sause pizza_inner"></div>
      <div class="pizza_cheeze pizza_inner"></div>
      <div class="pizza_filling"></div>
    </div>
    <div class="pizza_piece">
      <div class="pizza_crust pizza_inner"></div>
      <div class="pizza_sause pizza_inner"></div>
      <div class="pizza_cheeze pizza_inner"></div>
      <div class="pizza_filling"></div>
    </div>
    <div class="pizza_piece">
      <div class="pizza_crust pizza_inner"></div>
      <div class="pizza_sause pizza_inner"></div>
      <div class="pizza_cheeze pizza_inner"></div>
      <div class="pizza_filling"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$pizza-size: 120px;

.pizza {
  height: $pizza-size;
  position: relative;
  width: $pizza-size;
  z-index: 10;
}

.pizza_piece {
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-duration: 1.4s;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
}

.pizza_inner {
  border-radius: 50%;
  grid-column: 1/3;
  grid-row: 1/3;
  margin: 0 auto;
}

.pizza_crust {
  border: 13px solid #ff9439;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}

.pizza_sause {
  border: calc($pizza-size / 2 - 10px) solid #ff000e;
  height: 1px;
  width: 1px;
}

.pizza_cheeze {
  border: calc($pizza-size / 2 - 15px) solid #efde81;
  height: 1px;
  width: 1px;
}

.pizza_filling {
  background-image: radial-gradient(circle at center, red 0, red 6px, transparent 6px, transparent 100%);
  background-repeat: repeat;
  background-position: left center;
  background-size: 18px 18px;
  border-radius: 100%;
  height: calc(100% - 20px);
  margin: 0;
  overflow: hidden;
  transform: rotate(45deg);
  width: calc(100% - 20px);
}

.pizza_piece:first-child {
  animation-name: top-piece;
}

.pizza_piece:nth-child(2) {
  animation-name: right-piece;
}

.pizza_piece:nth-child(3) {
  animation-name: bottom-piece;
}

.pizza_piece:nth-child(4) {
  animation-name: left-piece;
}

.pizza_piece:first-child .pizza_inner {
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}

.pizza_piece:nth-child(2) .pizza_inner {
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-top-color: transparent;
}

.pizza_piece:nth-child(3) .pizza_inner {
  border-right-color: transparent;
  border-left-color: transparent;
  border-top-color: transparent;
}

.pizza_piece:nth-child(4) .pizza_inner {
  border-bottom-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
}

.pizza_piece:first-child .pizza_filling {
  align-self: flex-end;
  grid-column: 1/2;
  grid-row: 1/2;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  margin-left: auto;
  transform-origin: right bottom;
}

.pizza_piece:nth-child(2) .pizza_filling {
  align-self: flex-end;
  grid-column: 2/3;
  grid-row: 1/2;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  margin-right: auto;
  transform-origin: left bottom;
}

.pizza_piece:nth-child(3) .pizza_filling {
  align-self: flex-start;
  grid-column: 2/3;
  grid-row: 2/3;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-right: auto;
  transform-origin: left top;
}

.pizza_piece:nth-child(4) .pizza_filling {
  align-self: flex-start;
  grid-column: 1/2;
  grid-row: 2/3;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-left: auto;
  transform-origin: right top;
}

@keyframes top-piece {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-10px);
  }
  40% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes right-piece {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateY(0);
  }
  40% {
    transform: translateX(10px);
  }
  60% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes bottom-piece {
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(10px);
  }
  80% {
    transform: translateX(0);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes left-piece {
  0% {
    transform: translateX(0);
  }
  60% {
    transform: translateY(0);
  }
  80% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

<credits>
from https://codepen.io/a-tonkikh/pen/oNGeOdZ
</credits>
