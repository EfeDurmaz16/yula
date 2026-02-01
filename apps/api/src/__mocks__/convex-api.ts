export const api = {
  conversations: {
    listByUser: 'conversations:listByUser',
    getById: 'conversations:getById',
    create: 'conversations:create',
    update: 'conversations:update',
    remove: 'conversations:remove',
  },
  messages: {
    listByConversation: 'messages:listByConversation',
    create: 'messages:create',
    remove: 'messages:remove',
  },
  memories: {
    listByUser: 'memories:listByUser',
    getById: 'memories:getById',
    vectorSearch: 'memories:vectorSearch',
    create: 'memories:create',
    remove: 'memories:remove',
  },
  subscriptions: {
    getByUser: 'subscriptions:getByUser',
    create: 'subscriptions:create',
    update: 'subscriptions:update',
    cancel: 'subscriptions:cancel',
  },
  users: {
    getByEmail: 'users:getByEmail',
    getById: 'users:getById',
    create: 'users:create',
    update: 'users:update',
  },
}
