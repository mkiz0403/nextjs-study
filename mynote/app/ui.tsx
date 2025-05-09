"use client";
import { useEffect, useState } from "react";

import Header from "./component/header";
import Sidebar from "./component/sidebar";
import NewNote from "./component/new-note";
import NoteViewer from "./component/note-viewer";
import EmptyNote from "./component/empty-note";
import { supabase } from "@/utils/supabase";
import { Database } from "@/types_db";

export default function UI() {
  const [activeNoteId, setActiveNoteId] = useState(null); // 클릭한 노트가 어떤건지 확인
  const [isCreating, setIsCreating] = useState(false);
  const [notes, setNotes] = useState<Database["public"]["Tables"]["note"]["Row"][]>([]);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    const { data, error } = await supabase.from("note").select("*").ilike("title", `%${search}%`); // 이게 무슨뜻??
    if (error) {
      alert(error.message);
      return;
    }
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [search]);

  return (
    <main className="w-full h-screen flex flex-col">
      <Header />
      <div className="grow relative">
        <Sidebar
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          setIsCreating={setIsCreating}
          search={search}
          setSearch={setSearch}
          notes={notes}
        />
        {isCreating ? (
          <NewNote fetchNotes={fetchNotes} setIsCreating={setIsCreating} setActiveNoteId={setActiveNoteId} />
        ) : activeNoteId ? (
          <NoteViewer
            fetchNotes={fetchNotes}
            setActiveNoteId={setActiveNoteId}
            note={notes.find((note) => note.id === activeNoteId)}
          />
        ) : (
          <EmptyNote />
        )}
      </div>
    </main>
  );
}
