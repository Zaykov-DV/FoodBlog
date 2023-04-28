<template>
  <nav class="pagination">
    <ul class="pagination__container">
      <li class="pagination__item">
        <button class="pagination__btn"
                :class="{'is-disabled' : isInFirstPage }"
                type="button"
                @click="onClickFirstPage"
                :disabled="isInFirstPage">
          <SvgIcon class="pagination__icon" name="arrow-backward"/>
        </button>
      </li>
      <li class="pagination__item">
        <button class="pagination__btn"
                :class="{'is-disabled' : isInFirstPage }"
                type="button"
                @click="onClickPreviousPage"
                :disabled="isInFirstPage">
          <SvgIcon class="pagination__icon" name="arrow-left"/>
        </button>
      </li>

      <li class="pagination__item" v-for="page in pages" :key="page.name">
        <button class="pagination__btn"
                :class="{'is-disabled' : page.isDisabled, 'is-active': page.name === currentPage }"
                type="button"
                @click="onClickPage(page.name)"
                :disabled="page.isDisabled">
          {{ page.name }}
        </button>
      </li>


      <li class="pagination__item">
        <button class="pagination__btn"
                :class="{'is-disabled' : isInLastPage }"
                type="button"
                @click="onClickNextPage"
                :disabled="isInLastPage">
          <SvgIcon class="pagination__icon" name="arrow-right"/>
        </button>
      </li>

      <li class="pagination__item">
        <button class="pagination__btn"
                :class="{'is-disabled' : isInLastPage }"
                type="button"
                @click="onClickLastPage"
                :disabled="isInLastPage">
          <SvgIcon class="pagination__icon" name="arrow-forward"/>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import SvgIcon from "./SvgIcon";
import {defineProps, computed, defineEmits} from "vue";

const emit = defineEmits(['pagechanged'])

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3
  },
  totalPages: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true,
  }
})


const startPage = computed(() => {
  // When on the first page
  if (props.currentPage === 1) {
    return 1;
  }

// current page
  if (props.currentPage === props.totalPages) {
    const start = props.totalPages - (props.maxVisibleButtons - 1);
    if (start === 0) {
      return 1;
    } else {
      return start;
    }
  }

// When inbetween
  return props.currentPage - 1;
})


const pages = computed(() => {
  const range = [];

  for (let i = startPage.value; i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages); i++) {

    range.push({
      name: i,
      isDisabled: i === props.currentPage
    });
  }

  return range;
})

const isInFirstPage = computed(() => {
  return props.currentPage === 1;
});

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages;
});

const onClickFirstPage = () => {
  emit('pagechanged', 1);
}

const onClickPreviousPage = () => {
  if (props.currentPage !== 1) {
    emit('pagechanged', props.currentPage - 1);
  }
}
const onClickPage = (page) => {
  emit('pagechanged', page);
}
const onClickNextPage = () => {
  emit('pagechanged', props.currentPage + 1);
}

const onClickLastPage = () => {
  emit('pagechanged', props.totalPages);
}
</script>


<style lang="scss" scoped>
.pagination {
  &__container {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000;
    border-radius: 16px;
    width: 64px;
    height: 64px;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.02em;
    margin: 0;
    transition: all 0.3s ease-in-out;
    border: 1px solid rgba(0, 0, 0, 0);

    &.is-disabled {
      background: #4e555b;
      cursor: default;
    }

    &.is-active {
      background: #fff;
      color: #000;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }

    &:hover {
      &:not(.is-active, .is-disabled) {
        background: #fff;
        color: #000;
        border: 1px solid rgba(0, 0, 0, 1);
      }
    }
  }

  &__icon {
    min-width: 24px;
    height: 24px;
  }
}

@media (max-width: 540px) {
  .pagination__btn {
    padding: 4px 16px;
    min-width: 100%;
    max-width: 40px;
    height: 35px;
  }
}

@media (max-width: 375px) {
  .pagination__btn {
    padding: 4px 16px;
    min-width: 100%;
    max-width: 40px;
    height: 28px;
  }
}

</style>