<script lang="ts" setup>
import { zhCN, enUS } from 'naive-ui';
import type { GlobalThemeOverrides } from 'naive-ui';
import { langStore } from '@/data/lang';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2f6cf7'
    //hoverColor:'#2f6cf7',
    //overColor: '#2f6cf7',
    //hover:'#2f6cf7',
  },
  Button: {
    //hoverColor:'#2f6cf7',
    textColor: '#595959'
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: '#595959'
      }
    }
  },
  Drawer: {
    titleFontSize: '14px',
    footerPadding: '5px 5px',
    headerPadding: '11px 15px'
  }
  // ...
};

const locale = langStore.current.value == 'zh' ? zhCN : enUS;
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="locale"
    abstract
  >
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
