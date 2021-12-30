type UniqueId = string;

type Mutation<S> = (state: S, ...args: any[]) => void
