const teamsTasks = [
    {
      id: 'team-1',
      name: 'Development Team',
      creatorId: '0001',
      tasks: [
        {
          id: 'task-1',
          title: 'Fix bug in login',
          description: 'Resolve issue with login form validation.',
          status: 'In Progress',
          isChecked: false,
          isUrgent: false,
          userName: 'Alice',
          userId: '0002',
          comments: []
        },
        {
          id: 'task-2',
          title: 'Update documentation',
          description: 'Update the API documentation for the new endpoints.',
          status: 'To Do',
          isChecked: false,
          isUrgent: false,
          userName: 'Bob',
          userId: '0003',
          comments: []
        }
      ]
    },
    {
      id: 'team-2',
      name: 'Marketing Team',
      creatorId: '0002',
      tasks: [
        {
          id: 'task-3',
          title: 'Plan social media campaign',
          description: 'Create a strategy for the upcoming product launch.',
          status: 'To Do',
          isChecked: false,
          isUrgent: true,
          userName: 'Bob',
          userId: '0003',
          comments: []
        }
      ]
    }
  ];
  
  export default teamsTasks;
  