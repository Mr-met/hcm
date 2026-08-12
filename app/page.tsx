"use client";

import { useMemo, useState } from "react";

type Question = { clue: string; answer: string; key: number };

type SetId = "7" | "8" | "14";

const SETS: Record<SetId, { title: string; keyword: string; questions: Question[] }> = {
  "7": {
    title: "Bộ 7 câu hỏi",
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
  "8": {
    title: "Bộ 8 câu hỏi nâng cao",
    keyword: "THENCHOT",
    questions: [
      { clue: "Trong phương pháp luận Hồ Chí Minh về đại đoàn kết, khái niệm này chỉ tập hợp lực lượng cách mạng không dừng ở vai trò đối tượng thụ hưởng hay lực lượng bị động, mà là thực thể tự giác, sáng tạo, bao gồm toàn thể nhân dân Việt Nam yêu nước ở mọi giai cấp, tầng lớp, tôn giáo và dân tộc.", answer: "CHUTHE", key: 4 },
      { clue: "Thuộc tính thể hiện bản chất kiên định, xuyên suốt của chính sách đại đoàn kết toàn dân tộc của Đảng từ cách mạng dân tộc dân chủ nhân dân đến cách mạng xã hội chủ nghĩa; bác bỏ hoàn toàn luận điệu sai trái cho rằng đoàn kết chỉ là một “sách lược tình thế”.", answer: "NHATQUAN", key: 2 },
      { clue: "Cơ sở giá trị tinh thần cốt lõi, là “điểm tương đồng tối cao” đúc kết qua hàng ngàn năm lịch sử, được Hồ Chí Minh sử dụng làm ngọn cờ tập hợp và cầu nối gắn kết mọi người Việt Nam vượt qua sự khác biệt về giai cấp, chính kiến hay tôn giáo.", answer: "YEUNUOC", key: 2 },
      { clue: "Thực thể lịch sử vừa giữ vị trí trung tâm trong quan điểm “Cách mạng là sự nghiệp của...”, vừa là lực lượng mang tính đòi hỏi khách quan phải liên kết lại để tạo thành sức mạnh tự giải phóng khỏi áp bức.", answer: "QUANCHUNG", key: 4 },
      { clue: "Cấp độ định vị tư tưởng đại đoàn kết trong hệ thống lý luận Hồ Chí Minh, khẳng định đây là đường lối lâu dài, có tính sống còn và quyết định sự thành bại của cách mạng, tuyệt đối không phải thủ đoạn hay biện pháp ứng phó tạm thời.", answer: "CHIENLUOC", key: 1 },
      { clue: "Trạng thái năng lượng tổng hợp và bản chất nội tại mà khối đại đoàn kết tạo ra, được Hồ Chí Minh khẳng định trong luận điểm nổi tiếng: “Đoàn kết là... của chúng ta”.", answer: "SUCMANH", key: 7 },
      { clue: "Mục đích thân thiết và quyền lợi sát sườn mang tính quy luật, bắt buộc quần chúng nhân dân phải chủ động kết nối, hình thành khối đoàn kết thay vì trông chờ vào sự ban phát hay lực lượng bên ngoài.", answer: "TUGIAIPHONG", key: 9 },
      { clue: "Tính chất tác động mang ý nghĩa sinh tử, quyết định đối với kết quả thành hay bại của toàn bộ sự nghiệp cách mạng Việt Nam khi nói về vai trò của đại đoàn kết.", answer: "QUYETDINH", key: 5 },
    ],
  },
  "14": {
    title: "Bộ 14 câu hỏi",
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
  const [setId, setSetId] = useState<SetId>("7");
  const [active, setActive] = useState<number | null>(null);
  const [revealedRows, setRevealedRows] = useState<Set<number>>(new Set());
  const [verticalRevealed, setVerticalRevealed] = useState(false);
  const [hints, setHints] = useState<Record<number, number[]>>({});
  const game = SETS[setId];
  const [order, setOrder] = useState(() => SETS["7"].questions.map((_, i) => i));
  const maxLeft = useMemo(() => Math.max(...game.questions.map(q => q.key - 1)), [game]);

  const choose = (index: number) => {
    setActive(index);
  };

  const revealActive = () => {
    if (active === null) return;
    setRevealedRows(prev => new Set(prev).add(active));
  };

  const showHint = (questionIndex: number) => {
    if (revealedRows.has(questionIndex) || hints[questionIndex]) return;
    const q = game.questions[questionIndex];
    const available = q.answer.split("").map((_, i) => i).filter(i => i !== q.key - 1);
    const [min, max] = q.answer.length <= 7 ? [1, 2] : q.answer.length <= 9 ? [2, 3] : [3, 4];
    const count = Math.min(available.length, min + Math.floor(Math.random() * (max - min + 1)));
    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }
    setHints(prev => ({ ...prev, [questionIndex]: available.slice(0, count) }));
  };

  const shuffleRows = () => {
    setOrder(prev => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next.every((v, i) => v === prev[i]) ? [...next.slice(1), next[0]] : next;
    });
    setActive(null);
    setVerticalRevealed(false);
  };

  const reset = (next = setId) => {
    setSetId(next); setActive(null); setRevealedRows(new Set()); setVerticalRevealed(false); setHints({});
    setOrder(SETS[next].questions.map((_, i) => i));
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="star">★</span><div><strong>Ô CHỮ BÍ MẬT</strong><small>Chào mừng Quốc khánh 2/9</small></div></div>
        <div className="set-switch" aria-label="Chọn bộ câu hỏi">
          <button className={setId === "7" ? "selected" : ""} onClick={() => reset("7")}>Bộ 7 câu</button>
          <button className={setId === "8" ? "selected" : ""} onClick={() => reset("8")}>Bộ 8 câu</button>
          <button className={setId === "14" ? "selected" : ""} onClick={() => reset("14")}>Bộ 14 câu</button>
        </div>
        <button className="reset" onClick={() => reset()}>↻ Chơi lại</button>
      </header>

      <section className="hero">
        <div><span className="eyebrow">THỬ THÁCH KIẾN THỨC</span><h1>Giải mã tinh thần<br/><em>Đại đoàn kết</em></h1><p>Chọn hàng ngang để xem câu hỏi, sau đó chủ động mở đáp án.</p></div>
        <img src="/quoc-khanh.png" alt="Chào mừng Quốc khánh 2 tháng 9" />
      </section>

      <section className="game-layout">
        <div className="board-card">
          <div className="card-heading"><div><span>BẢNG Ô CHỮ</span><h2>{game.title}</h2></div><div className="board-actions"><button onClick={shuffleRows}>⤨ Trộn hàng</button><div className="progress"><strong>{revealedRows.size}/{game.questions.length}</strong><small>đã mở</small></div></div></div>
          <div className="crossword" style={{ "--left": maxLeft } as React.CSSProperties}>
            {order.map((i) => { const q = game.questions[i]; return (
              <button key={q.clue} className={`word-row ${active === i ? "active" : ""} ${revealedRows.has(i) ? "revealed" : ""}`} onClick={() => choose(i)} aria-label={`Mở đáp án hàng ngang câu ${i + 1}`}>
                <span className="number">{i + 1}</span>
                <span className="cells" style={{ gridTemplateColumns: `repeat(${maxLeft + 1 + q.answer.length - q.key}, var(--cell))` }}>
                  {Array.from({ length: maxLeft - (q.key - 1) }).map((_, k) => <i className="blank" key={`b${k}`} />)}
                  {q.answer.split("").map((letter, k) => <i key={k} className={`${k === q.key - 1 ? "key-cell" : ""} ${hints[i]?.includes(k) ? "hinted-cell" : ""}`}>{revealedRows.has(i) || hints[i]?.includes(k) || (verticalRevealed && k === q.key - 1) ? letter : ""}</i>)}
                </span>
                <span className={`hint-button ${hints[i] ? "used" : ""}`} role="button" tabIndex={0} title={hints[i] ? "Đã dùng gợi ý" : "Mở gợi ý"} aria-label={`Gợi ý câu ${i + 1}`} onClick={e => { e.stopPropagation(); showHint(i); }} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); showHint(i); } }}>💡</span>
                {revealedRows.has(i) && <span className="check">✓</span>}
              </button>
            )})}
          </div>
          <div className={`keyword ${verticalRevealed ? "complete" : ""}`}><span>TỪ KHÓA DỌC</span><div>{order.map(i => game.questions[i].answer[game.questions[i].key - 1]).map((c, i) => <b key={i}>{verticalRevealed ? c : "?"}</b>)}</div><button onClick={() => setVerticalRevealed(v => !v)}>{verticalRevealed ? "Ẩn từ khóa" : "Hiện từ khóa"}</button></div>
        </div>

        <aside className="question-card">
          {active === null ? <div className="empty-state"><span>?</span><h3>Sẵn sàng khám phá?</h3><p>Nhấn vào một hàng ngang để xem câu hỏi.</p></div> : <>
            <div className="question-meta"><span>CÂU {active + 1} / {game.questions.length}</span>{revealedRows.has(active) && <span className="opened-label">ĐÃ MỞ</span>}</div>
            <h3>{game.questions[active].clue}</h3>
            <p className="hint">Đáp án gồm <strong>{game.questions[active].answer.length} chữ cái</strong>.</p>
            {revealedRows.has(active) ? <div className="answer-display"><small>ĐÁP ÁN HÀNG NGANG</small><strong>{game.questions[active].answer}</strong></div> : <button className="reveal-answer" onClick={revealActive}>HIỆN ĐÁP ÁN</button>}
          </>}
        </aside>
      </section>
    </main>
  );
}
