import {create} from 'zustand';

type State = {
    filter: string
}
  
interface tabsStore {
    setFilter: (lastName: State['filter']) => void
};

const useTabs = create<State & tabsStore>((set) => ({
    filter: '',
    setFilter: (filter) => set(() => ({ filter: filter })),
  }))

export default useTabs
