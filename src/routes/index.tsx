import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import { useEffect, useMemo, useState } from "react";
import { DeleteOutlined, EditOutlined, CheckOutlined, SearchOutlined, PlusOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

export const Route = createFileRoute("/")({ component: App });

type FilterMode = "ALL" | "ACTIVE" | "DONE";

function App() {
  const [todos, setTodos] = useState<Array<string>>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [checkedList, setCheckedList] = useState<Array<number>>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("checkedList");
    return stored ? JSON.parse(stored) : [];
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterMode>("ALL");
  const [dark, setDark] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("checkedList", JSON.stringify(checkedList));
  }, [checkedList]);

  function addTodo() {
    const text = newTodo.trim();
    if (!text) return;
    setTodos((prev) => [...prev, text]);
    setNewTodo("");
  }

  function toggleCheck(index: number) {
    setCheckedList((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }

  function del(index: number) {
    setTodos((prev) => prev.filter((_, i) => i !== index));
    setCheckedList((prev) =>
      prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i))
    );
    if (editingIndex === index) setEditingIndex(null);
  }

  function startEdit(index: number, text: string) {
    setEditingIndex(index);
    setEditText(text);
  }

  function saveEdit(index: number) {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setTodos((prev) => prev.map((t, i) => (i === index ? trimmed : t)));
    setEditingIndex(null);
    setEditText("");
  }

  const filtered = useMemo(() => {
    return todos
      .map((text, index) => ({ text, index }))
      .filter(({ text, index }) => {
        const matchSearch = text.toLowerCase().includes(search.toLowerCase());
        if (filter === "ACTIVE") return matchSearch && !checkedList.includes(index);
        if (filter === "DONE") return matchSearch && checkedList.includes(index);
        return matchSearch;
      });
  }, [todos, search, filter, checkedList]);

  const bg = dark ? "bg-[#0f0f1a]" : "bg-[#f5f6fa]";
  const cardBg = dark ? "bg-[#1a1a2e] text-gray-200" : "bg-white text-gray-800";
  const navBg = dark ? "bg-[#1a1a2e]/80 border-[#2a2a4a]" : "bg-white/80 border-gray-200/60";
  const inputBg = dark ? "bg-[#252545] border-[#333] text-gray-200 placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400";
  const itemBorder = dark ? "border-[#2a2a4a]" : "border-gray-100";

  const completed = checkedList.length;
  const total = todos.length;

  return (
    <div className={`min-h-screen flex flex-col ${bg} transition-colors duration-300`}>
      {/* Top nav bar */}
      <nav className={`${navBg} backdrop-blur-md sticky top-0 z-50 border-b px-3 sm:px-5 md:px-8 h-14 flex items-center gap-2 sm:gap-4 transition-colors duration-300`}>
        {/* Center: Add task input */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <div className={`flex items-center rounded-full px-3 sm:px-4 py-2 gap-2 w-full max-w-sm border ${dark ? "bg-[#252545] border-[#333]" : "bg-gray-50/80 border-gray-200"} transition-colors duration-300 focus-within:ring-2 focus-within:ring-[#6c63ff]/30 focus-within:border-[#6c63ff]/50`}>
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              className={`border-none outline-none bg-transparent flex-1 text-sm min-w-0 ${dark ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"}`}
            />
            <button
              onClick={addTodo}
              className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#5a4fff] text-white flex items-center justify-center border-none cursor-pointer hover:shadow-md hover:shadow-[#6c63ff]/30 transition-all flex-shrink-0 active:scale-95"
            >
              <PlusOutlined style={{ fontSize: 13 }} />
            </button>
          </div>
        </div>

        {/* Right: Theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-base border cursor-pointer transition-all flex-shrink-0 active:scale-95 ${
            dark
              ? "bg-[#252545] border-[#333] text-yellow-400 hover:bg-[#2a2a50]"
              : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
          }`}
        >
          {dark ? <SunOutlined style={{ fontSize: 15 }} /> : <MoonOutlined style={{ fontSize: 15 }} />}
        </button>
      </nav>

      {/* Toolbar: Filter + Stats + Search */}
      <div className="px-3 sm:px-5 md:px-8 pt-4 pb-3 flex flex-wrap items-center gap-2 sm:gap-3">
        <div className={`flex rounded-full p-0.5 ${dark ? "bg-[#1a1a2e]" : "bg-gray-100/80"} transition-colors duration-300`}>
          {(["ALL", "ACTIVE", "DONE"] as FilterMode[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold border-none cursor-pointer transition-all ${
                filter === f
                  ? "bg-[#6c63ff] text-white shadow-sm shadow-[#6c63ff]/25"
                  : dark
                    ? "bg-transparent text-gray-500 hover:text-gray-300"
                    : "bg-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {total > 0 && (
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
            dark ? "bg-[#1a1a2e] text-gray-400" : "bg-gray-100/80 text-gray-500"
          }`}>
            {completed}/{total} done
          </span>
        )}

        <div className="flex-1" />

        {/* Search */}
        <div className={`flex items-center rounded-full px-3 py-1.5 gap-2 w-full sm:w-44 border ${inputBg} transition-colors duration-300 focus-within:ring-2 focus-within:ring-[#6c63ff]/20 focus-within:border-[#6c63ff]/40 order-last sm:order-none mt-1 sm:mt-0`}>
          <SearchOutlined className="text-gray-400" style={{ fontSize: 12 }} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`border-none outline-none bg-transparent flex-1 text-xs ${dark ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"}`}
          />
        </div>
      </div>

      {/* Todo list */}
      <div className="px-3 sm:px-5 md:px-8 pb-6 flex-1 flex flex-col">
        <div className={`${cardBg} rounded-xl sm:rounded-2xl border flex-1 ${dark ? "border-[#2a2a4a] shadow-lg shadow-black/20" : "border-gray-100 shadow-sm"} transition-colors duration-300 overflow-hidden`}>
          {filtered.map(({ text, index }, i) => {
            const checked = checkedList.includes(index);
            return (
              <div
                key={index}
                className={`flex items-center gap-2 sm:gap-3 py-3 sm:py-4 px-3 sm:px-6 group transition-colors ${
                  dark ? "hover:bg-[#1f1f3a]" : "hover:bg-gray-50/60"
                } ${
                  i < filtered.length - 1 ? `border-b ${itemBorder}` : ""
                }`}
              >
                <label className="flex items-center gap-3 flex-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCheck(index)}
                    className="sr-only peer"
                  />
                  <span className={`w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    checked
                      ? "bg-[#6c63ff] border-[#6c63ff] shadow-sm shadow-[#6c63ff]/25"
                      : dark
                        ? "border-gray-600 peer-hover:border-[#6c63ff]/60"
                        : "border-gray-300 peer-hover:border-[#6c63ff]/60"
                  }`}>
                    {checked && (
                      <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
                      autoFocus
                      className={`flex-1 text-[13px] border-none outline-none rounded px-1 py-0.5 min-w-0 ${dark ? "bg-[#252545] text-gray-200" : "bg-gray-100 text-gray-700"}`}
                    />
                  ) : (
                    <span className={`text-[13px] transition-all ${
                      checked
                        ? "line-through text-gray-400"
                        : dark ? "text-gray-200" : "text-gray-700"
                    }`}>
                      {text}
                    </span>
                  )}
                </label>
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  {editingIndex === index ? (
                    <button
                      onClick={() => saveEdit(index)}
                      className={`sm:opacity-0 sm:group-hover:opacity-100 transition-all bg-transparent border-none cursor-pointer p-1.5 rounded-lg ${
                        dark ? "text-gray-500 hover:text-green-400 hover:bg-green-400/10" : "text-gray-400 hover:text-green-500 hover:bg-green-50"
                      }`}
                    >
                      <CheckOutlined style={{ fontSize: 13 }} />
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(index, text)}
                      className={`sm:opacity-0 sm:group-hover:opacity-100 transition-all bg-transparent border-none cursor-pointer p-1.5 rounded-lg ${
                        dark ? "text-gray-500 hover:text-[#6c63ff] hover:bg-[#6c63ff]/10" : "text-gray-400 hover:text-[#6c63ff] hover:bg-[#6c63ff]/10"
                      }`}
                    >
                      <EditOutlined style={{ fontSize: 13 }} />
                    </button>
                  )}
                  <button
                    onClick={() => del(index)}
                    className={`sm:opacity-0 sm:group-hover:opacity-100 transition-all bg-transparent border-none cursor-pointer p-1.5 rounded-lg ${
                      dark ? "text-gray-500 hover:text-red-400 hover:bg-red-400/10" : "text-gray-400 hover:text-red-400 hover:bg-red-50"
                    }`}
                  >
                    <DeleteOutlined style={{ fontSize: 13 }} />
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && todos.length > 0 && (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-2">
              <SearchOutlined className="text-gray-300" style={{ fontSize: 32 }} />
              <p className="text-gray-400 text-sm">No matching tasks</p>
            </div>
          )}

          {todos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6c63ff]/10 to-[#6c63ff]/5 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11L12 14L22 4" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                  <path d="M21 12V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H16" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </svg>
              </div>
              <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>No tasks yet</p>
              <p className={`text-xs ${dark ? "text-gray-600" : "text-gray-300"}`}>Type above and press Enter to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
