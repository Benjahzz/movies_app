import useTabs from '@/hooks/useTabs';
import React from 'react'

interface TabProps {
    label: string;
    active?: boolean
    filter: string

}

const Tab: React.FC<TabProps> = ({ label, active, filter }) => {
    const { filter:filterState,setFilter } = useTabs()
    return (
        <button className={`bg-gray-800 px-4 py-3 rounded-full min-w-[8rem] hover:bg-orange-400 transition-colors ${filterState === filter && "bg-orange-400"}`} onClick={() => setFilter(filter)}>{label}</button>
    )
}

export default Tab