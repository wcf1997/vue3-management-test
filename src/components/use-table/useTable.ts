import { h, type InjectionKey, provide, reactive, type Ref, ref, type VNode } from 'vue'
import type { IColumns } from '../table/types'
import BaseTableSimple from './base-table-simple.vue'
import { paramskey } from './provide-key'
import type { IBaseResponse } from '@/service/request/type'
import { useConfirm } from 'primevue/useconfirm'

interface IUseTableParams<T = any> {
  requestApi?: (...args: any) => Promise<any>
  dataSource?: T[]
  columns: Omit<IColumns, 'actions'>[]
  hidePaginator?: boolean
}

interface IUserTableReturn {
  UseTable: (...args: any) => VNode
}
interface IUseTableOption {
  component: any
}

export function useTable<T = any>(
  params: IUseTableParams<T>,
  props?: any,
  options?: IUseTableOption
): IUserTableReturn {
  const confirm = useConfirm()
  const isLoading = ref(false)

  const tableData = ref<T[]>([]) as Ref<T[]>
  const pageInfo = reactive({
    index: 1,
    size: 10,
    total: 0
  })

  let searchInfo = reactive({})

  /** 获取表格数据 */
  async function getTalbeData() {
    if (!params?.requestApi) {
      tableData.value = params?.dataSource || []
      pageInfo.total = params.dataSource?.length || 0
      return
    }
    try {
      const res = await params?.requestApi({ ...pageInfo, ...searchInfo })
      if (!res.success) return
      pageInfo.total = res.data.total
      tableData.value = res.data.records
    } catch (error) {
      console.log(error)
    }
  }
  getTalbeData()

  /** 页数改变事件 */
  async function handlePageChange(currentPage: number) {
    pageInfo.index = currentPage
    getTalbeData()
  }
  /** 每页条数改变事件 */
  async function handleSizeChange(size: number) {
    pageInfo.size = size
    getTalbeData()
  }
  // 搜索
  function search(data: any) {
    searchInfo = { ...data }
    pageInfo.index = 1
    getTalbeData()
  }
  // 重制
  function reload() {
    pageInfo.index = 1
    searchInfo = {}
    getTalbeData()
  }

  /** 操作按钮时间 */
  function handleActionButtonClick(item: any, $event: any) {
    item.isPopup
      ? confirm.require({
          target: $event.currentTarget,
          message: '您确定要删除这条数据吗？',
          icon: 'pi pi-info-circle',
          acceptClass: 'p-button-danger',
          accept: () => {
            item.onClick(getTalbeData)
          },
          reject: () => {}
        })
      : item.onClick(getTalbeData)
  }

  /** 注入params */
  provide(paramskey, {
    isLoading,
    columns: params.columns,
    tableData,
    pageInfo,
    handlePageChange,
    handleSizeChange,
    handleActionButtonClick
  })
  const UseTable = () => h(options?.component || BaseTableSimple, props)
  return {
    UseTable
  }
}
