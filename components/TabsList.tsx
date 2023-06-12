import React from 'react'
import Tab from './Tab'

interface TabsListProps{
    tabs: any[]
}


const TabsList:React.FC<TabsListProps> = ({tabs}) => {
  return (
    <div className="flex items-center gap-4 flex-wrap justify-center">
        {
            tabs.map((tab)=>(
                <Tab label={tab.label} filter={tab.filter} key={tab.label} />
            ))
        }
        </div>
  )
}

export default TabsList