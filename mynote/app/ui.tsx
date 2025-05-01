'use client'

import Header from "./component/header"
import Sidebar from "./component/sidebar"

const notes = [
  {
    id: 1,
    title : "노트 1",
    content : '노트 1 입니다.'
  },
  {
    id: 2,
    title : "노트 2",
    content : '노트 2 입니다.'
  }
]

export default function UI(){
    return (
        <main className="w-full h-screen flex flex-col">
          <Header />
          <div className="grow relative">
            <Sidebar notes={notes} />
            <div>Note</div>
            {/* New Note */}
            {/* Note Viewer (Edit or View) */}
            {/* Empty Note */}
          </div>
        </main>
      )
}