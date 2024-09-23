type EventHandler<T> = (data: T) => void

class EventBus<Events extends Record<string, any>> {
  private static instance: EventBus<any> | null = null

  private events: { [K in keyof Events]?: EventHandler<Events[K]>[] } = {}

  // 私有构造函数，防止外部实例化
  private constructor() {}

  // 获取单例实例
  public static getInstance<Events extends Record<string, any>>(): EventBus<Events> {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus<Events>()
    }
    return EventBus.instance as EventBus<Events>
  }
  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event]!.push(handler)
  }

  off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>) {
    if (this.events[event]) {
      this.events[event] = this.events[event]!.filter((h) => h !== handler)
    }
  }

  emit<K extends keyof Events>(event: K, data: Events[K]) {
    if (this.events[event]) {
      this.events[event]!.forEach((h) => h(data))
    }
  }
}

export default EventBus
