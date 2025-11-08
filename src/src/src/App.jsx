import React, { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(null);

  const samplePlaces = [
    { id: 1, name: "카페 어라운드", trust: "⭐️⭐️⭐️⭐️⭐️", type: "카페" },
    { id: 2, name: "오코노미야끼집 하나", trust: "⭐️⭐️⭐️⭐️", type: "식당" },
    { id: 3, name: "로컬 편의점 24", trust: "⭐️⭐️⭐️", type: "편의점" },
  ];

  const handleSearch = () => {
    if (city.trim() === "") return;
    setPlaces(samplePlaces);
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-sky-700 mb-2">
          ✈ Layover Local
        </h1>
        <p className="text-slate-500">
          짧은 체류 시간, 진짜 후기 기반의 로컬 가이드
        </p>
      </header>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-4">
        <input
          type="text"
          placeholder="도시를 입력하세요 (예: 인천, 도쿄)"
          className="w-full border border-slate-300 rounded-md p-2 mb-3"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="w-full bg-sky-600 text-white rounded-md py-2 hover:bg-sky-700"
        >
          검색
        </button>
      </div>

      <div className="max-w-md mx-auto mt-8">
        {places.length > 0 && (
          <div className="space-y-4">
            {places.map((p) => (
              <div
                key={p.id}
                className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-sky-800">{p.name}</h3>
                <p className="text-slate-500">{p.type}</p>
                <p className="text-amber-500">{p.trust}</p>
                <button
                  onClick={() => setSelected(p)}
                  className="text-sky-600 mt-2 underline"
                >
                  자세히 보기
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-sky-700 mb-2">
              {selected.name}
            </h2>
            <p className="text-slate-600 mb-2">{selected.type}</p>
            <p className="text-amber-500">{selected.trust}</p>
            <button
              onClick={() => setSelected(null)}
              className="mt-4 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
