import { ref, reactive } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastOptions {
  id?: string
  title: string
  message?: string
  type?: ToastType
  duration?: number
  action?: ToastAction
}

const toasts = ref<ToastOptions[]>([])

export function useToast() {
  const generateId = () => Math.random().toString(36).substring(2, 9)

  const add = (options: ToastOptions) => {
    const id = options.id || generateId()
    const toast = { ...options, id, duration: options.duration ?? 5000 }
    toasts.value.push(toast)

    if (toast.type !== 'loading' && toast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration)
    }
    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  const update = (id: string, options: Partial<ToastOptions>) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value[index] = { ...toasts.value[index], ...options }
      
      // If updated from loading to success/error, set a timeout to remove
      if (options.type && options.type !== 'loading') {
        const duration = options.duration ?? 5000
        if (duration > 0) {
          setTimeout(() => {
            remove(id)
          }, duration)
        }
      }
    }
  }

  const promise = async <T>(
    promiseFn: Promise<T>,
    msgs: { loading: string; success: string; error: string }
  ) => {
    const id = add({ title: msgs.loading, type: 'loading', duration: 0 })
    try {
      const result = await promiseFn
      update(id, { title: msgs.success, type: 'success' })
      return result
    } catch (err) {
      update(id, { title: msgs.error, type: 'error' })
      throw err
    }
  }

  return {
    toasts,
    add,
    remove,
    update,
    promise
  }
}
