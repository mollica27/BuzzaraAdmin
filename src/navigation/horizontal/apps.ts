export default [
  {
    title: 'Apps',
    icon: { icon: 'ri-mail-open-line' },
    children: [
     
      {
        title: 'Email',
        icon: { icon: 'ri-mail-line' },
        to: 'apps-email',
      },
      {
        title: 'Chat',
        icon: { icon: 'ri-message-line' },
        to: 'apps-chat',
      },
      {
        title: 'Calendar',
        to: 'apps-calendar',
        icon: { icon: 'ri-calendar-line' },
      },
      {
        title: 'Kanban',
        icon: { icon: 'ri-drag-drop-line' },
        to: 'apps-kanban',
      },
      {
        title: 'Invoice',
        icon: { icon: 'ri-article-line' },
        children: [
          { title: 'List', to: 'apps-invoice-list' },
          { title: 'Preview', to: { name: 'apps-invoice-preview-id', params: { id: '5036' } } },
          { title: 'Edit', to: { name: 'apps-invoice-edit-id', params: { id: '5036' } } },
          { title: 'Add', to: 'apps-invoice-add' },
        ],
      },
      {
        title: 'User',
        icon: { icon: 'ri-user-line' },
        children: [
          { title: 'List', to: 'apps-user-list' },
          { title: 'View', to: { name: 'apps-user-view-id', params: { id: 21 } } },
        ],
      },
      {
        title: 'Roles & Permissions',
        icon: { icon: 'ri-shield-user-line' },
        children: [
          { title: 'Roles', to: 'apps-roles' },
          { title: 'Permissions', to: 'apps-permissions' },
        ],
      },
    ],
  },
]
