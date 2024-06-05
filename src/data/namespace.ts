import type { INamespace, INamespaceStore } from '@/types/namespace'
import type { ILabelItem } from '@/types/base'
import type { UnwrapRef } from 'vue'
import apis from '@/apis'

// 前期没有使用 pinia,后继调整时考虑迁移到pinia
function createStore(): INamespaceStore {
  const currentRef: Ref<UnwrapRef<INamespace>> = ref({
    namespaceId: '',
    namespaceName: 'public',
  })
  const listListRef: Ref<UnwrapRef<Array<INamespace>>> = ref([
    {
      namespaceId: '',
      namespaceName: 'public',
    },
  ])
  const optionListRef: Ref<UnwrapRef<Array<ILabelItem>>> = ref([
    {
      label: 'public',
      value: '',
    },
  ])
  const loadRef = ref(false)

  const setCurrent = function (current: INamespace) {
    currentRef.value = current
  }

  const setLastList = function (list: Array<INamespace>) {
    const optionList = []
    for (const item of list) {
      const obj = {
        label: item.namespaceName,
        value: item.namespaceId,
      } as ILabelItem
      optionList.push(obj)
    }
    listListRef.value = list
    optionListRef.value = optionList
    loadRef.value = true
  }

  const initLoad = async () => {
    if (!loadRef.value) {
      const { status, data } = await apis.getJSON(apis.namespacesList)
      if (status == 200 && data && typeof data === 'object' && Array.isArray(data.data)) {
        setLastList(data.data)
      }
    }
  }

  const refresh = async () => {
    const { status, data } = await apis.getJSON(apis.namespacesList)
    if (status == 200 && data && typeof data === 'object' && Array.isArray(data.data)) {
      setLastList(data.data)
    }
  }

  return {
    current: currentRef,
    listList: listListRef,
    optionList: optionListRef,
    setCurrent,
    setLastList,
    initLoad,
    refresh,
  }
}

export const namespaceStore: INamespaceStore = createStore()
