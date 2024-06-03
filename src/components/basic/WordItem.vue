<template>
  <div class="jq-word-item">
    <!-- 单词、音标、所属词源网站类型、形近词 -->
    <div class="jq-word-item-header">
      <div class="jq-word-item-header-left">
        <div class="jq-word-item-type">
          {{ word.wordType?.split(':')[0] }}
        </div>
        <div class="jq-word-item-word">
          {{ word.word }}
        </div>
        <div class="jq-word-item-phonetic" v-for="(phonetic, index) in word.phonetic" :key="phonetic" @click="playSound(index)">
          {{ phonetic }}
        </div>
        <!-- <div class="jq-word-item-phonetic" v-for="(sound, index) in word.sound" :key="sound" @click="playSound(index)">
          [{{ index + 1 }}]
        </div> -->

      </div>

      <div class="jq-word-item-morph">
        <div v-if="word.morph && word.morph.length > 0" class="jq-word-item-title">相关词汇：</div>
        <div class="jq-word-item-morph-inner">
          <div class="jq-word-item-content" v-for="morph in word.morph" :key="morph">
            {{ morph }}
          </div>
        </div>
      </div>
    </div>
    <!-- 翻译 -->
    <div class="jq-word-item-trans">
      <div v-if="word.trans && word.trans.length > 0" class="jq-word-item-title">解释：</div>
      <div class="jq-word-item-trans-inner">
        <div class="jq-word-item-content" v-for="trans in word.trans" :key="trans">
          {{ trans }}
        </div>
      </div>
    </div>

    <!-- 划词时的场景信息 -->
    <div class="jq-word-item-origin">
      <div v-if="word.origin && word.origin.length > 0 && word.origin[0]" class="jq-word-item-title">情景再现：</div>
      <div class="jq-word-item-origin-inner">
        <div class="jq-word-item-origin-content" v-for="origin in word.origin" :key="origin ? origin.date : Date.now()">
          <template v-if="origin">
            <div class="jq-word-item-origin-example">
              <span>○</span>
              {{ origin?.example }}
            </div>
            <div class="jq-word-item-origin-info">
              <div class="jq-word-item-origin-href">
                <a target="_blank" :href="origin?.href">{{ origin?.href }}</a>
              </div>
              <div class="jq-word-item-origin-date">
                {{ origin?.date }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';

interface WordOriginItem {
  href: string;
  date: string;
  example: string;
}

interface Props {
  word: {
    origin: WordOriginItem[] | null;
    phonetic: string[] | null;
    trans: string[] | null;
    morph: string[] | null;
    word: string;
    wordType: string;
    sound: string[] | null;
  }
}

const props = withDefaults(defineProps<Props>(), {
  word: () => ({
    origin: null,
    phonetic: null,
    trans: null,
    morph: null,
    word: '',
    wordType: '',
    sound: null,
  })
})

const playSound = (index: number) => {
  if (!props.word.sound || !props.word.sound[index]) {
    return false
  }
  console.log(props.word.sound, props.word.sound[index], '发音列表')
  const audio = new Audio(props.word.sound[index])
  audio.play()
}

</script>

<style lang="scss" scoped>
.jq-word-item {
  padding-right: 1em;
  &-header {
    &-left {
      display: flex;
      gap: 6px;
      align-items: center;
    }
  }

  &-type {
    border: 1px solid #939393;
    background: #656565;
    border-radius: 3px;
    padding: 3px 3px;
    color: #fff;
    font-size: 0.75em;
  }

  &-word {
    font-weight: 900;
    font-size: 1.5em;
  }

  &-title {
    padding: 6px 0;
    font-weight: 600;
  }

  &-content {
    margin: 3px 0 3px 1em;

    &:before {
      content: '○';
      display: inline-block;
      padding-right: 6px;
    }
  }

  &-phonetic {
    font-size: 0.85em;

    &:first-child {
      margin-left: 3em;
    }

    &+& {
      margin-left: 6px;
    }
  }

  &-origin {
    &-content {
      margin: 3px 0 3px 1em;
    }

    &-example {
      span {
        padding-right: 6px;
      }
    }

    &-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.9em;
      color: gray;
      padding: 3px 0;
    }

    &-href {
      width: 50%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
    }
  }
}
</style>