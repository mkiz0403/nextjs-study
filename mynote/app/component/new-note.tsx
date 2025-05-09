"use client";
import { supabase } from "@/utils/supabase";
import { useState } from "react";

export default function NewNote({ fetchNotes, setIsCreating, setActiveNoteId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSave = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요");
      return;
    }

    const { data, error } = await supabase
      .from("note")
      .insert({
        title,
        content,
      })
      .select();

    if (error) {
      alert(error.message);
    }
    await fetchNotes();
    setActiveNoteId((data as any[])[0].id);
    setIsCreating(false);
  };

  return (
    <div className="w-2/3 p-2 flex flex-col gap-2 absolute top-0 bottom-0 right-0">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="border rounded-md border-gray-300 text-xl p-2"
        placeholder="노트의 제목을 입력해 주세요"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className=" border rounded-md border-gray-300 text-lg p-2 grow"
      />
      {/* grow 공간 채우기  */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => onSave()}
          className="py-1 px-8 rounded-md border-2 border-green-600 hover:bg-green-200 transition-all duration-300 ease-in-out"
        >
          저 장
        </button>
      </div>
    </div>
  );
}
