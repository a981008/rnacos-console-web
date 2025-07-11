<template>
  <div class="relative">
    <div
      class="flex flex-row items-center border-b border-gray-300 bg-white pr-3"
      :class="{ 'h-[40px]': !isMobile }"
    >
      <div class="flex-1 text-sm pl-4">
        <span>{{ this.$t('config.config_list') }}</span>
      </div>
      <div class="flex-none">
        <NamespacePopSelect @change="queryList" />
      </div>
    </div>

    <div class="m-2">
      <div class="flex flex-col relative bg-white rounded-lg p-4">
        <n-card :bordered="false">
          <n-form label-placement="left" label-width="90">
            <n-grid cols="1 s:1 m:2 l:3 xl:3 2xl:4" responsive="screen">
              <n-gi>
                <n-form-item
                  :label="this.$t('service.name')"
                  path="param.serviceParam"
                >
                  <n-input
                    v-model:value="param.serviceParam"
                    :placeholder="this.$t('service.inputName')"
                    clearable
                    @keydown.enter.prevent
                    @keyup.enter="queryList"
                  />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item
                  :label="this.$t('service.groupName')"
                  path="param.groupParam"
                >
                  <n-input
                    v-model:value="param.groupParam"
                    :placeholder="this.$t('service.inputGroupName')"
                    clearable
                    @keydown.enter.prevent
                    @keyup.enter="queryList"
                  />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-space justify="end" class="ml-2">
                  <n-button tertiary @click="queryList">{{
                    this.$t('common.query')
                  }}</n-button>
                  <n-button
                    v-if="webResources.canUpdateService"
                    type="info"
                    @click="showCreate"
                    >{{ this.$t('common.add') }}</n-button
                  >
                </n-space>
              </n-gi>
            </n-grid>
          </n-form>
        </n-card>
        <n-data-table
          remote
          ref="table"
          :scroll-x="600"
          :bordered="false"
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :row-key="rowKey"
          @update:page="handlePageChange"
        />
      </div>
    </div>
    <n-drawer
      :block-scroll="false"
      :trap-focus="false"
      v-model:show="useForm"
      :width="isMobile ? '100%' : 600"
      placement="right"
      :show-mask="true"
      :mask-closable="true"
      :close-on-esc="true"
      resizable
    >
      <n-drawer-content :title="getDetailTitle" closable>
        <ServiceDetail :model="model" />
        <template #footer>
          <n-space align="baseline">
            <n-button text @click="closeForm">{{
              this.$t('common.return')
            }}</n-button>
            <n-button type="primary" @click="submitForm">{{
              this.$t('common.confirm')
            }}</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script>
import { ref, reactive, defineComponent } from 'vue';
import { namingApi } from '@/api/naming';
import { namespaceStore } from '@/data/namespace';
import { useWebResources } from '@/data/resources';
import { createColumns } from '@/components/naming/ServiceListColumns.jsx';
import NamespacePopSelect from '@/components/namespace/NamespacePopSelect.vue';
import ServiceDetail from './ServiceDetail.vue';
import * as constant from '@/types/constant';
import { useProjectSettingStore } from '@/store/modules/projectSetting';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  handleApiResult,
  printApiError,
  printApiSuccess
} from '@/utils/request';
import namespaceApi from '@/api/namespace';
import template from 'template_js';

export default defineComponent({
  components: {
    NamespacePopSelect,
    ServiceDetail
  },
  setup() {
    const { t } = useI18n();
    let router = useRouter();
    let webResources = useWebResources();
    const projectSettingStore = useProjectSettingStore();
    const dataRef = ref([]);
    const loadingRef = ref(false);
    const paramRef = ref({
      serviceParam: '',
      groupParam: '',
      namespaceId: '',
      pageNo: 1,
      pageSize: 20
    });
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 10,
      itemCount: 0,
      showSizePicker: true,
      pageSizes: [10, 20, 50, 100],
      onUpdatePageSize: (pageSize) => {
        paginationReactive.pageSize = pageSize;
        paginationReactive.page = 1;
        doHandlePageChange(1);
      },
      prefix({ itemCount }) {
        return t('common.total') + `: ${itemCount}`;
      }
    });
    const useFormRef = ref(false);
    const modelRef = ref({
      groupName: '',
      serviceName: '',
      protectThreshold: '0',
      metadata: '',
      selector: '',
      mode: ''
    });
    const showUpdate = (row) => {
      let protectThreshold = '0';
      if (row.protectThreshold) {
        protectThreshold = row.protectThreshold.toString();
      }
      modelRef.value = {
        groupName: row.groupName,
        serviceName: row.name,
        protectThreshold: protectThreshold,
        metadata: row.metadata,
        selector: '',
        mode: constant.FORM_MODE_UPDATE
      };
      useFormRef.value = true;
    };
    const showInstances = (row) => {
      router.push({
        path: '/manage/service/instance',
        query: {
          groupName: row.groupName,
          serviceName: row.name,
          namespaceId: namespaceStore.current.value.namespaceId
        }
      });
    };
    const showSubscribers = (row) => {
      router.push({
        path: '/manage/subscriber',
        query: {
          groupName: row.groupName,
          serviceName: row.name,
          namespaceId: namespaceStore.current.value.namespaceId
        }
      });
    };
    const showDetail = (row) => {
      let protectThreshold = '0';
      if (row.protectThreshold) {
        protectThreshold = row.protectThreshold.toString();
      }
      modelRef.value = {
        groupName: row.groupName,
        serviceName: row.name,
        protectThreshold: protectThreshold,
        metadata: row.metadata,
        selector: '',
        mode: constant.FORM_MODE_DETAIL
      };
      useFormRef.value = true;
    };
    const removeItem = (row) => {
      let serviceKey = {
        namespaceId: namespaceStore.current.value.namespaceId,
        groupName: row.groupName,
        serviceName: row.name
      };
      namingApi
        .removeService(serviceKey)
        .then(handleApiResult)
        .then(printApiSuccess)
        .then(() => {
          doHandlePageChange(paginationReactive.page || 1);
        })
        .catch(printApiError);
    };
    const showCreate = () => {
      modelRef.value = {
        groupName: '',
        serviceName: '',
        protectThreshold: '0',
        metadata: '',
        selector: '',
        mode: constant.FORM_MODE_CREATE
      };
      useFormRef.value = true;
    };

    const doQueryList = () => {
      return namingApi.queryServicePage({
        namespaceId: namespaceStore.current.value.namespaceId,
        serviceNameParam: paramRef.value.serviceParam,
        groupNameParam: paramRef.value.groupParam,
        pageNo: paginationReactive.page,
        pageSize: paginationReactive.pageSize
      });
    };

    const doHandlePageChange = (currentPage) => {
      paginationReactive.page = currentPage;
      if (!loadingRef.value) {
        loadingRef.value = true;
        doQueryList()
          .then(handleApiResult)
          .then((page) => {
            loadingRef.value = false;
            let count = page.totalCount;
            let pageSize = paginationReactive.pageSize;
            dataRef.value = page.list;
            paginationReactive.itemCount = count;
            paginationReactive.pageCount = Math.round(
              (count + pageSize - 1) / pageSize
            );
          })
          .catch((err) => {
            loadingRef.value = false;
            namespaceApi
              .queryList()
              .then(handleApiResult)
              .then((list) => {
                const firstNamespace = list[0];
                if (firstNamespace) {
                  namespaceStore.setCurrent({
                    namespaceId: firstNamespace.namespaceId,
                    namespaceName: firstNamespace.namespaceName
                  });
                  window.$message.warning(
                    template(
                      t('namespace.namespace_permission_switch_notice'),
                      {
                        name: firstNamespace.namespaceName || 'public'
                      }
                    )
                  );
                  doHandlePageChange(1);
                } else {
                  window.$message.error(
                    t('namespace.no_permission_and_no_namespaces')
                  );
                }
              })
              .catch((err) => {
                printApiError(err);
              });
          });
      }
    };

    let columns = createColumns(
      showInstances,
      showDetail,
      showUpdate,
      removeItem,
      showSubscribers,
      webResources
    );
    return {
      columns,
      webResources,
      data: dataRef,
      pagination: paginationReactive,
      loading: loadingRef,
      param: paramRef,
      useForm: useFormRef,
      model: modelRef,
      isMobile: computed(() => projectSettingStore.getIsMobile),
      rowKey(rowData) {
        return rowData.groupName + '@@' + rowData.name;
      },
      doHandlePageChange,
      showCreate
    };
  },

  computed: {
    namespaceId() {
      return namespaceStore.current.value.namespaceId;
    },
    getDetailTitle() {
      if (this.model.mode === constant.FORM_MODE_UPDATE) {
        return this.$t('service.editTitle');
      } else if (this.model.mode === constant.FORM_MODE_CREATE) {
        return this.$t('service.addTitle');
      }
      return this.$t('service.detailTitle');
    }
  },
  methods: {
    handlePageChange(page) {
      this.doHandlePageChange(page);
    },
    queryList() {
      this.doHandlePageChange(1);
    },
    closeForm() {
      this.useForm = false;
    },
    submitForm() {
      if (this.model.mode === constant.FORM_MODE_DETAIL) {
        this.useForm = false;
        return;
      }
      let serviceInfo = {
        namespaceId: this.namespaceId,
        groupName: this.model.groupName,
        serviceName: this.model.serviceName,
        protectThreshold: parseInt(this.model.protectThreshold) || 0,
        metadata: this.model.metadata,
        tenant: this.getTenant
      };
      if (this.model.mode === constant.FORM_MODE_CREATE) {
        namingApi
          .createService(serviceInfo)
          .then(handleApiResult)
          .then(printApiSuccess)
          .then(() => {
            this.useForm = false;
            this.queryList();
          })
          .catch(printApiError);
      } else {
        namingApi
          .updateService(serviceInfo)
          .then(handleApiResult)
          .then(printApiSuccess)
          .then(() => {
            this.useForm = false;
            this.queryList();
          })
          .catch(printApiError);
      }
    }
  },
  mounted() {
    this.queryList();
  }
});
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
