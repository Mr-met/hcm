"use client";

import { useMemo, useState } from "react";

type Question = { clue: string; answer: string; key: number };

const SETS: Record<"7" | "14", { title: string; keyword: string; questions: Question[] }> = {
  "7": {
    title: "Bộ 7 câu · Đoàn kết",
    keyword: "DOANKET",
    questions: [
      { clue: "Theo Hồ Chí Minh, ai là chủ thể của khối đại đoàn kết toàn dân tộc?", answer: "NHANDAN", key: 5 },
      { clue: "Điền từ còn thiếu: “Đoàn kết ... nhằm kết hợp sức mạnh dân tộc với sức mạnh thời đại”.", answer: "QUOCTE", key: 3 },
      { clue: "Hình thức tổ chức của khối đại đoàn kết toàn dân tộc được gọi là gì? (... Dân tộc thống nhất)", answer: "MATTRAN", key: 2 },
      { clue: "Lực lượng nào cùng với tầng lớp trí thức tạo thành nền tảng của khối đại đoàn kết toàn dân tộc?", answer: "CONGNONG", key: 5 },
      { clue: "Để xây dựng khối đoàn kết, cần có tấm lòng ... , độ lượng với những người từng lầm đường lạc lối.", answer: "KHOANDUNG", key: 1 },
      { clue: "Nền tảng của khối đại đoàn kết toàn dân tộc là ... công - nông - trí thức.", answer: "LIENMINH", key: 3 },
      { clue: "Sức mạnh của các dòng thác cách mạng, sự phát triển khoa học công nghệ được gọi chung là sức mạnh của ...?", answer: "THOIDAI", key: 1 },
    ],
  },
  "14": {
    title: "Bộ 14 câu · Đoàn kết toàn dân",
    keyword: "DOANKETTOANDAN",
    questions: [
      { clue: "Để cách mạng thắng lợi, cần kết hợp sức mạnh dân tộc với sức mạnh ...?", answer: "THOIDAI", key: 5 },
      { clue: "Giai cấp nào cùng với tầng lớp trí thức là nòng cốt của khối đại đoàn kết?", answer: "CONGNONG", key: 2 },
      { clue: "Lực lượng bao trùm, là chủ thể của khối đại đoàn kết toàn dân tộc là ai?", answer: "NHANDAN", key: 3 },
      { clue: "Nền tảng của khối đại đoàn kết toàn dân tộc là khối ... công - nông - trí thức.", answer: "LIENMINH", key: 4 },
      { clue: "Thái độ, tình cảm cần có để tập hợp những người từng lầm đường lạc lối?", answer: "KHOANDUNG", key: 1 },
      { clue: "Đoàn kết quốc tế nhằm góp phần cùng nhân dân ... thực hiện các mục tiêu chung.", answer: "THEGIOI", key: 3 },
      { clue: "Hình thức tổ chức của khối đại đoàn kết toàn dân tộc là ... Dân tộc thống nhất.", answer: "MATTRAN", key: 4 },
      { clue: "Tầng lớp đóng vai trò quan trọng trong liên minh nòng cốt của đại đoàn kết.", answer: "TRITHUC", key: 4 },
      { clue: "Việc kết hợp sức mạnh dân tộc và thời đại thể hiện qua tư tưởng đoàn kết ...?", answer: "QUOCTE", key: 3 },
      { clue: "Một trong những mục tiêu chung của nhân dân thế giới mà Việt Nam hướng tới bảo vệ là?", answer: "HOABINH", key: 3 },
      { clue: "Truyền thống tốt đẹp của dân tộc ta, là cơ sở để Bác xây dựng tư tưởng đoàn kết.", answer: "NHANNGHIA", key: 1 },
      { clue: "Nguyên tắc hoạt động của Mặt trận Dân tộc thống nhất là hiệp thương ...?", answer: "DANCHU", key: 1 },
      { clue: "Điền từ: “... , đoàn kết, đại đoàn kết”.", answer: "DAIDOANKET", key: 6 },
      { clue: "Điền từ: “Thành công, ..., đại thành công”.", answer: "THANHCONG", key: 4 },
    ],
  },
};

export default function Home() {
  const [setId, setSetId] = useState<"7" | "14">("7");
  const [active, setActive] = useState<number | null>(null);
  const [revealedRows, setRevealedRows] = useState<Set<number>>(new Set());
  const [verticalRevealed, setVerticalRevealed] = useState(false);
  const game = SETS[setId];
  const maxLeft = useMemo(() => Math.max(...game.questions.map(q => q.key - 1)), [game]);

  const choose = (index: number) => {
    setActive(index);
    setRevealedRows(prev => new Set(prev).add(index));
  };

  const reset = (next = setId) => {
    setSetId(next); setActive(null); setRevealedRows(new Set()); setVerticalRevealed(false);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="star">★</span><div><strong>Ô CHỮ BÍ MẬT</strong><small>Chào mừng Quốc khánh 2/9</small></div></div>
        <div className="set-switch" aria-label="Chọn bộ câu hỏi">
          <button className={setId === "7" ? "selected" : ""} onClick={() => reset("7")}>Bộ 7 câu</button>
          <button className={setId === "14" ? "selected" : ""} onClick={() => reset("14")}>Bộ 14 câu</button>
        </div>
        <button className="reset" onClick={() => reset()}>↻ Chơi lại</button>
      </header>

      <section className="hero">
        <div><span className="eyebrow">THỬ THÁCH KIẾN THỨC</span><h1>Giải mã tinh thần<br/><em>Đại đoàn kết</em></h1><p>Bấm hàng ngang để mở đáp án, bấm cột đỏ để mở từ khóa.</p></div>
        <img src="/quoc-khanh.png" alt="Chào mừng Quốc khánh 2 tháng 9" />
      </section>

      <section className="game-layout">
        <div className="board-card">
          <div className="card-heading"><div><span>BẢNG Ô CHỮ</span><h2>{game.title}</h2></div><div className="progress"><strong>{revealedRows.size}/{game.questions.length}</strong><small>đã mở</small></div></div>
          <div className="crossword" style={{ "--left": maxLeft } as React.CSSProperties}>
            {game.questions.map((q, i) => (
              <button key={q.clue} className={`word-row ${active === i ? "active" : ""} ${revealedRows.has(i) ? "revealed" : ""}`} onClick={() => choose(i)} aria-label={`Mở đáp án hàng ngang câu ${i + 1}`}>
                <span className="number">{i + 1}</span>
                <span className="cells" style={{ gridTemplateColumns: `repeat(${maxLeft + 1 + q.answer.length - q.key}, var(--cell))` }}>
                  {Array.from({ length: maxLeft - (q.key - 1) }).map((_, k) => <i className="blank" key={`b${k}`} />)}
                  {q.answer.split("").map((letter, k) => <i key={k} className={k === q.key - 1 ? "key-cell" : ""} onClick={k === q.key - 1 ? e => { e.stopPropagation(); setVerticalRevealed(true); } : undefined}>{revealedRows.has(i) || (verticalRevealed && k === q.key - 1) ? letter : ""}</i>)}
                </span>
                {revealedRows.has(i) && <span className="check">✓</span>}
              </button>
            ))}
          </div>
          <button className={`keyword ${verticalRevealed ? "complete" : ""}`} onClick={() => setVerticalRevealed(true)}><span>TỪ KHÓA DỌC</span><div>{game.keyword.split("").map((c, i) => <b key={i}>{verticalRevealed ? c : "?"}</b>)}</div><small>{verticalRevealed ? "Đã mở từ khóa" : "Bấm để mở"}</small></button>
        </div>

        <aside className="question-card">
          {active === null ? <div className="empty-state"><span>?</span><h3>Sẵn sàng khám phá?</h3><p>Nhấn vào một hàng ngang để xem câu hỏi và mở đáp án.</p></div> : <>
            <div className="question-meta"><span>CÂU {active + 1} / {game.questions.length}</span><span className="opened-label">ĐÃ MỞ</span></div>
            <h3>{game.questions[active].clue}</h3>
            <p className="hint">Đáp án gồm <strong>{game.questions[active].answer.length} chữ cái</strong>.</p>
            <div className="answer-display"><small>ĐÁP ÁN HÀNG NGANG</small><strong>{game.questions[active].answer}</strong></div>
          </>}
        </aside>
      </section>
    </main>
  );
}
