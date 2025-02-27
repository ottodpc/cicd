export const regex = /(\w+):(\w+):(.*)/;

export const allowedModelSorts: Map<string, Set<string>> = new Map();

export const allowedModelFilters: Map<
  string,
  Map<string, string[]>
> = new Map();

export const fieldTypeMapper: Map<string, Map<string, string>> = new Map();

export const Operations = {
  eq: '$eq',
  gt: '$gt',
  gte: '$gte',
  lt: '$lt',
  lte: '$lte',
};

const todoModelProperty: Map<string, string> = new Map();

const allowedTodoFilters: Map<string, string[]> = new Map();

const userModelProperty: Map<string, string> = new Map();

const allowedUserFilters: Map<string, string[]> = new Map();

allowedModelSorts.set('Todo', new Set(['']));
allowedModelSorts.set('User', new Set(['']));
allowedTodoFilters.set('todoId', ['eq']);
allowedModelFilters.set('Todo', allowedTodoFilters);
allowedModelFilters.set('User', allowedUserFilters);
todoModelProperty.set('title', 'string');
todoModelProperty.set('description', 'string');
todoModelProperty.set('todoId', 'string');
fieldTypeMapper.set('Todo', todoModelProperty);
userModelProperty.set('username', 'string');
userModelProperty.set('userId', 'string');
fieldTypeMapper.set('User', userModelProperty);
