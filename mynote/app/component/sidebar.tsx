'use client'

export default function Sidebar({notes}){
    return(
        <aside className="absolute">
            <button> + 새로운 노트</button>
            {notes.map((note) => <li>
                {note.title}
            </li>)}
        </aside>
    )
}